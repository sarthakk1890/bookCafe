import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { deleteOrder, getAllOrders, getSingleOrder, myOrders, newOrder, newOrderOnline, paymentVerification, updateOrders } from "../controllers/order.js";

const app = express.Router();

app.post("/new/cod", isLoggedIn, newOrder);

app.post("/new/online", isLoggedIn, newOrderOnline);

app.post("/paymentverification", isLoggedIn, paymentVerification);

app.get("/:id", isLoggedIn, getSingleOrder);

app.post("/myOrders", isLoggedIn, myOrders)

app.get("/admin/all", adminOnly, getAllOrders)

app.route("/admin/:orderId")
    .put(adminOnly, updateOrders)
    .delete(adminOnly, deleteOrder);

export default app;
