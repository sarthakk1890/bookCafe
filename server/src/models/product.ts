import mongoose from "mongoose";

interface Review {
    user: string;
    name: string;
    rating: number;
    comment: string;
}

interface Product extends mongoose.Document {
    name: string;
    description: string;
    price: number;
    ratings: number;
    image: string;
    category: string;
    stock: number;
    numberOfReviews: number;
    reviews: Review[];
    returnDays: number;
    createdAt: Date;
    updatedAt: Date;
}

const schema = new mongoose.Schema<Product>(
    {
        name: {
            type: String,
            required: [true, 'Please enter product name'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please enter product description'],
        },
        price: {
            type: Number,
            required: [true, 'Please enter product price'],
            maxLength: [3, 'Price limit exceeded'],
        },
        ratings: {
            type: Number,
            default: 0,
        },
        image: {
            type: String,
            required: [true, "Please upload image"],
        },
        category: {
            type: String,
            required: [true, "Please specify the product's category"],
        },
        stock: {
            type: Number,
            required: [true, 'Please specify stock'],
            maxLength: [2, 'Stock limit exceeded'],
            default: 1,
        },
        numberOfReviews: {
            type: Number,
            default: 0,
        },
        returnDays: {
            type: Number,
            required: true,
            default: 5,
        },
        reviews: [
            {
                user: {
                    type: String,
                    ref: 'User',
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                rating: {
                    type: Number,
                    required: true,
                },
                comment: {
                    type: String,
                    required: true,
                },
            },
        ]
    },
    {
        timestamps: true,
    }
);

// Ensure that category is saved in lowercase before saving the document
schema.pre<Product>('save', function (next) {
    if (this.isModified('category')) {
        this.category = this.category.toLowerCase();
    }
    next();
});

export const Product = mongoose.model<Product>('Product', schema);

