import express from "express";
import cors from "cors";

// Importing Routes
import userRoutes from './routes/user.js';
import productRoutes from './routes/product.js';
import orderRoutes from './routes/order.js';
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";

require('dotenv').config();


const port = 9193;


connectDB();

const app = express();

app.use(express.json());

// CORS configuration allowing requests from any origin and accepting JSON content
app.use(cors({
  origin: '*', // Allow requests from any origin
  credentials: true, // Allow sending cookies from the origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specified HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specified headers
}));

app.get("/", (req, res) => {
  res.send("API Working");
});

// Using routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);

// Error middleware
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
