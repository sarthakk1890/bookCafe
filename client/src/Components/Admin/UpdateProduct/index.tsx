import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar";
import { BsSpellcheck } from 'react-icons/bs';
import { MdAttachMoney, MdDescription, MdAccountTree } from 'react-icons/md';
import { GiReturnArrow } from "react-icons/gi";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { useGetSingleProductQuery, useUpdateProductAdminMutation } from "../../../redux/api/productAPI";
import { GrStorage } from "react-icons/gr";
import '../AddProduct/style.scss';
import { toast } from "react-toastify";

const bookGenres = [
    "Fiction",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Thriller",
    "Romance",
    "Historical Fiction",
    "Non-fiction",
    "Biography",
    "Autobiography",
    "Self-Help",
    "Science",
    "Horror",
    "Adventure",
    "Poetry",
    "Children's",
    "Young Adult",
    "Drama",
    "Comedy",
    "Crime",
    "Fantasy",
    "Manga",
    "Graphic Novel",
    "Cookbook",
    "Travel",
    "History",
    "Philosophy",
    "Religion",
    "Art",
    "Music",
    "Sports",
];

const UpdateProduct: React.FC = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // State for loader

    const { id } = useParams<{ id: string }>();
    const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer) || {};
    const { data, refetch } = useGetSingleProductQuery(id || '');
    const product = data?.product;

    const [updateProduct] = useUpdateProductAdminMutation();

    const [name, setName] = useState<string>(product?.name.toUpperCase() || "");
    const [price, setPrice] = useState<number>(product?.price || 0);
    const [description, setDescription] = useState<string>(product?.description || "");
    const [category, setCategory] = useState<string>(product?.category || "");
    const [returnDays, setReturnDays] = useState<number>(product?.returnDays || 5);
    const [stock, setStock] = useState<number>(product?.stock || 0);
    const [image, setImage] = useState<File>();
    const [imagePreview, setImagePreview] = useState<string[]>([]);
    const [formData, setFormData] = useState<FormData>(new FormData());

    // Fetch details based on id
    useEffect(() => {
        refetch();
    }, [id, refetch]);

    useEffect(() => {
        if (product) {
            setName(product.name.toUpperCase());
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setReturnDays(product.returnDays);
            setStock(product.stock);
        }
    }, [product]);

    const UpdateProductSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (image) {
            formData.set("image", image);
        }

        setIsLoading(true); // Start loader

        try {
            const { data, error } = await updateProduct({ myForm: formData, userId: user?._id || "", id: id || "" });

            if (data) {
                navigate("/admin/products");
                toast.success("Product Updated successfully");
            } else if (error) {
                toast.error(`Error: ${error}`);
            }
        } catch (error) {
            toast.error(`Error: ${error}`);
        } finally {
            setIsLoading(false); // Stop loader
        }
    };


    const UpdateProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (file) {
            setImage(file);
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagePreview([reader.result as string]);
                    setFormData((prev) => {
                        prev.set("image", file);
                        return prev;
                    });
                }
            };

            reader.readAsDataURL(file);
        }
    };


    return (
        <Fragment>
            <div className="newProduct">
                <Sidebar />
                <main className="newProductContainer">
                    <form
                        encType="multipart/form-data"
                        className="UpdateProductForm"
                        onSubmit={UpdateProductSubmitHandler}
                    >
                        <h1>Update Product</h1>

                        <div>
                            <BsSpellcheck />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setFormData((prev) => {
                                        prev.set("name", e.target.value);
                                        return prev;
                                    });
                                }}
                            />
                        </div>

                        <div>
                            <MdAttachMoney />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                value={price}
                                onChange={(e) => {
                                    setPrice(Number(e.target.value));
                                    setFormData((prev) => {
                                        prev.set("price", e.target.value);
                                        return prev;
                                    });
                                }}
                            />
                        </div>

                        <div>
                            <MdDescription />
                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    setFormData((prev) => {
                                        prev.set("description", e.target.value);
                                        return prev;
                                    });
                                }}
                                cols={30}
                                rows={1}
                            ></textarea>
                        </div>

                        <div>
                            <MdAccountTree />
                            <select
                                value={category.toLowerCase()} // Set the selected value here
                                onChange={(e) => {
                                    const selectedCategory = e.target.value;
                                    setCategory(selectedCategory);
                                    setFormData((prev) => {
                                        prev.set("category", selectedCategory.toLowerCase());
                                        return prev;
                                    });
                                }}
                            >
                                <option value="">Choose Category</option>
                                {bookGenres.map((genre, index) => (
                                    <option
                                        key={index}
                                        value={genre.toLowerCase()}
                                    >
                                        {genre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <GiReturnArrow />
                            <input
                                type="number"
                                placeholder="Returning Days"
                                required
                                value={returnDays}
                                onChange={(e) => {
                                    setReturnDays(Number(e.target.value));
                                    setFormData((prev) => {
                                        prev.set("returnDays", e.target.value);
                                        return prev;
                                    });
                                }}
                            />
                        </div>

                        <div>
                            <GrStorage />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                value={stock}
                                onChange={(e) => {
                                    setStock(Number(e.target.value));
                                    setFormData((prev) => {
                                        prev.set("stock", e.target.value);
                                        return prev;
                                    });
                                }}
                            />
                        </div>

                        <div id="AddProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={UpdateProductImageChange}
                            />
                        </div>

                        <div id="AddProductFormImage">
                            {imagePreview.map((item, index) => (
                                <img key={index} src={item} alt="Product Preview" />
                            ))}
                        </div>

                        <button id="UpdateProductBtn" type="submit" style={{cursor: "pointer"}}>
                            {isLoading ? "Updating..." : "Update"}
                        </button>
                    </form>
                </main>
            </div>
        </Fragment>
    );
};

export default UpdateProduct;
