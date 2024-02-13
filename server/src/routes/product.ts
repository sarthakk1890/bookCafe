import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { createProduct, createProductReview, deleteProduct, getAdminProducts, getAllProducts, getAllreviews, getFeaturedProducts, getProductDetails, updateProduct } from "../controllers/product.js";
import multer from "multer";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";


// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const app = express.Router();

app.get("/all", getAllProducts);

app.get("/featured", getFeaturedProducts);

app.get("/admin/all", adminOnly, getAdminProducts);

// app.post("/new", upload.single("image"), createProduct);
app.post("/new", upload.single("image"), adminOnly, createProduct);

app.get("/:id", getProductDetails);

app.route("/admin/:id")
    .put(adminOnly, upload.single("image"), updateProduct)
    .delete(adminOnly, deleteProduct);

app.put("/review/new", isLoggedIn, createProductReview);

app.get("/reviews/:productId", getAllreviews);

export default app;
