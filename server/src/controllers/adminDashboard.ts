// Import necessary modules (assuming you are using Mongoose)
import { Request, Response } from 'express';
import { User } from '../models/user.js';
import { Product } from '../models/product.js';
import { Order } from '../models/order.js';
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";

// Get dashboard details
export const getAdminDashboardDetails = TryCatch(async (req: Request, res: Response) => {
    const productCount = await Product.countDocuments();
    const userCount = await User.countDocuments();
    const orderCount = await Order.countDocuments();

    const totalAmountResult = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalAmount: { $sum: '$totalPrice' },
            },
        },
    ]);

    const totalAmount = totalAmountResult.length > 0 ? totalAmountResult[0].totalAmount : 0;

    // Calculate inStock and outOfStock based on the stock field in the Product collection
    const productStock = await Product.aggregate([
        {
            $group: {
                _id: null,
                totalInStock: { $sum: { $cond: [{ $gte: ['$stock', 1] }, 1, 0] } },
                totalOutOfStock: { $sum: { $cond: [{ $eq: ['$stock', 0] }, 1, 0] } },
            },
        },
    ]);

    const inStock = productStock.length > 0 ? productStock[0].totalInStock : 0;
    const outOfStock = productStock.length > 0 ? productStock[0].totalOutOfStock : 0;

    res.status(200).json({
        success: true,
        productCount,
        userCount,
        orderCount,
        totalAmount,
        inStock,
        outOfStock,
    });
});
