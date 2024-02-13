import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { BsSpellcheck } from 'react-icons/bs';
import { MdAttachMoney, MdDescription, MdAccountTree } from 'react-icons/md';
import { GiReturnArrow } from "react-icons/gi";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { useAddProductAdminMutation } from "../../../redux/api/productAPI";
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

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // State for loader

  const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer) || {};

  const [AddProduct] = useAddProductAdminMutation();

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [returnDays, setReturnDays] = useState<number>(5);
  const [stock, setStock] = useState<number>(0);
  const [image, setImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>(new FormData());

  const AddProductSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true); // Start loader

    try {
      // Add all form data
      formData.set("name", name);
      formData.set("price", String(price));
      formData.set("description", description);
      formData.set("category", category.toLowerCase());
      formData.set("returnDays", String(returnDays));
      formData.set("stock", String(stock));

      if (image) {
        formData.set("image", image);
      }

      const { data, error } = await AddProduct({ myForm: formData, userId: user?._id || "" });

      if (data) {
        navigate("/admin/products");
        toast.success("Product Added successfully");
      } else if (error) {
        toast.error(`Error: ${error.data.message}`);
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  const AddProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            className="AddProductForm"
            onSubmit={AddProductSubmitHandler}
          >
            <h1>Add Product</h1>

            <div>
              <BsSpellcheck />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <MdAttachMoney />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>

            <div>
              <MdDescription />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols={30}
                rows={1}
              ></textarea>
            </div>

            <div>
              <MdAccountTree />
              <select
                value={category.toLowerCase()} // Set the selected value here
                onChange={(e) => setCategory(e.target.value)}
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
                onChange={(e) => setReturnDays(Number(e.target.value))}
              />
            </div>

            <div>
              <GrStorage />
              <input
                type="number"
                placeholder="Stock"
                required
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>

            <div id="AddProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={AddProductImageChange}
              />
            </div>

            <div id="AddProductFormImage">
              {imagePreview.map((item, index) => (
                <img key={index} src={item} alt="Product Preview" />
              ))}
            </div>

            <button id="AddProductBtn" type="submit" style={{ cursor: "pointer" }}>
              {isLoading ? "Adding..." : "Add"}
            </button>
          </form>
        </main>
      </div>
    </Fragment>
  );
};

export default AddProduct;
