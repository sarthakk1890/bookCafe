import express from "express";
import { deleteUser, getAllUsers, getUser, newUser } from "../controllers/user.js";
import { getAdminDashboardDetails } from "../controllers/adminDashboard.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

app.post("/new", newUser);
app.get("/all", adminOnly, getAllUsers);

app.route("/:id")
    .get(getUser)
    .delete(adminOnly, deleteUser);

// app.get("/admin/dashboard", getAdminDashboardDetails);
app.get("/admin/dashboard", adminOnly, getAdminDashboardDetails);

export default app;
