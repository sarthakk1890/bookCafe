import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/product.js';
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";
import ApiFeatures from '../utils/apiFeatures.js';
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import firebaseConfiguration from '../utils/firebaseConfig.js';
import { IUser, NewProductRequestBody } from "../types/types.js";
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/user.js';

initializeApp(firebaseConfiguration.firebaseConfig);

const createFileName = () => {
    const uuid: string = uuidv4();
    return uuid;
}

const getFileNameFromURL = (url: string): string => {
    const urlParts = url.split('/');
    const encodedImageNamePart = urlParts.find(part => part.includes('%2F'));
    if (encodedImageNamePart === undefined) {
        throw new Error('Encoded image name not found in URL.');
    }
    const decodedImageName = decodeURIComponent(encodedImageNamePart);
    const imageName = decodedImageName.replace('files/', '');
    const imageNameWithoutQueryString = imageName.split('?')[0];
    return imageNameWithoutQueryString;
};

// Create Product -- Admin
export const createProduct = TryCatch(async (req: Request<{}, {}, NewProductRequestBody>, res: Response, next: NextFunction) => {

    const existingProduct = await Product.findOne({ name: req.body.name });
    if (existingProduct) {
        return next(new ErrorHandler("Product with the same name already exists", 400));
    }

    if (!req.body.name || !req.body.description || !req.body.price || !req.body.category || !req.body.stock) {
        return next(new ErrorHandler("Name, description, price, category and stock are mandatory", 400));
    }

    if (!req.file) {
        return next(new ErrorHandler("No file uploaded", 400));
    }

    req.body.name = req.body.name.toLowerCase();
     req.body.category = req.body.category.toLowerCase();
    
    const imageBuffer = req.file.buffer;
    if (!imageBuffer) {
        next(new ErrorHandler("No image uploaded", 400));
    }

    const storageRef = ref(getStorage(), `files/${createFileName() + "_" + req.file.originalname}`);
    const metadata = {
        contentType: req.file.mimetype,
    };

    const snapshot = await uploadBytesResumable(storageRef, imageBuffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);

    const image: string = downloadURL;

    req.body.image = image;
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
});

// Get all Products
export const getAllProducts = TryCatch(
    async (req: Request, res: Response) => {
        const resultPerPage = 8;
        const productsQuery = Product.find();
        // const productsCount = await Product.countDocuments();

        const apiFeature = new ApiFeatures(productsQuery, req.query)
            .search()
            .filter()
            .pagination(resultPerPage);

        const products = await apiFeature.query;
        const productsCount = await Product.countDocuments();

        res.status(200).json({
            success: true,
            products,
            productsCount,
            resultPerPage,
            filteredProductCount: products.length,
        });
    }
);

//Get featured Products
export const getFeaturedProducts = TryCatch(async (req: Request, res: Response) => {
    const productsQuery = await Product.find().sort({ ratings: -1 }).limit(6);

    res.status(200).json({
        success: true,
        products: productsQuery,
    });
});

// Get all Products --(Admin)
export const getAdminProducts = TryCatch(async (req: Request, res: Response, next: NextFunction) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

// Get product details
export const getProductDetails = TryCatch(async (req: Request, res: Response, next: NextFunction) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});

// Update Product --admin
export const updateProduct = TryCatch(async (req: Request, res: Response, next: NextFunction) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    // Image Update
    if (req.file) {

        // Delete previous product image if it exists
        if (product.image) {
            try {
                const previousImageRef = ref(getStorage(), `files/${getFileNameFromURL(product.image)}`);
                console.log(`files/${getFileNameFromURL(product.image)}`)
                await deleteObject(previousImageRef);
            }
            catch (error) {
            }
        }

        //upload new Image
        const imageBuffer = req.file.buffer;
        const storageRef = ref(getStorage(), `files/${createFileName() + "_" + req.file.originalname}`);
        const metadata = {
            contentType: req.file.mimetype,
        };
        const snapshot = await uploadBytesResumable(storageRef, imageBuffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
        const image = downloadURL;
        req.body.image = image;
    }

    // Check if category is provided and convert it to lowercase
    if (req.body.category) {
        req.body.category = req.body.category.toLowerCase();
    }
    if (req.body.name) {
        req.body.name = req.body.name.toLowerCase();
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        product,
    });
}
);

// Delete Product
export const deleteProduct = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const ImgDel = await Product.findById(req.params.id);

    if (!ImgDel) {
        return next(new ErrorHandler('Product not found', 404));
    }

    // Deleting from firestore
    try {
        const storageRefToDelete = ref(getStorage(), `files/${getFileNameFromURL(ImgDel.image)}`);
        await deleteObject(storageRefToDelete);
    }
    catch (error) {
    }

    await Product.findOneAndDelete({ _id: req.params.id });

    return res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
    });
}
);

// Create a new review or update the review
export const createProductReview = TryCatch(async (req: Request, res: Response, next: NextFunction) => {

    const { rating, comment, productId } = req.body;

    // Explicitly specifying the type for user
    const user = await User.findById(req.query.id) as IUser;

    // Create the review object
    const review = {
        user: user._id,
        name: user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const existingReview = product.reviews.find((rev) => rev.user?.toString() === user?._id?.toString());

    if (existingReview) {
        existingReview.rating = rating;
        existingReview.comment = comment;
    } else {
        product.reviews.push(review);
    }

    product.numberOfReviews = product.reviews.length;

    let totalRating = 0;
    product.reviews.forEach((rev) => {
        totalRating += rev.rating;
    });
    product.ratings = totalRating / product.numberOfReviews;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

//Get all reviews of a product
export const getAllreviews = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
})
