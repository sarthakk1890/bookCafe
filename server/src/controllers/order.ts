import { Request, Response, NextFunction } from 'express';
import { Order } from '../models/order.js';
import { Payment } from '../models/payment.js';
import ErrorHandler from '../utils/utility-class.js';
import { TryCatch } from '../middlewares/error.js';
import { instance } from '../utils/razorpayConfig.js';
import { IUser } from '../types/types.js';
import { Types } from 'mongoose';
import crypto from 'crypto';
import { Product } from '../models/product.js';

interface RequestWithUser extends Request {
    user?: IUser;
}

interface IOrderItem {
    name: string;
    price: number;
    quantity: number;
    image: string;
    product: Types.ObjectId;
    returnDays: number;
}

// Create new Order
export const newOrder = TryCatch(async (req: RequestWithUser, res: Response, next: NextFunction) => {

    const { shippingInfo, orderItems, paymentMethod, itemsPrice, deliveryCharge, totalPrice } = req.body;

    const user: IUser | undefined = req.user;

    if (!user) {
        return next(new ErrorHandler("User not authenticated", 401));
    }

    const maxReturnDays = Math.max(...(orderItems as IOrderItem[]).map((item) => item.returnDays || 0));
    console.log(maxReturnDays);

    const savedOrder = await Order.create({
        shippingInfo,
        orderItems,
        paymentMethod,
        itemsPrice,
        deliveryCharge,
        totalPrice,
        paidAt: Date.now(),
        user: user._id,
        returnDate: Date.now() + maxReturnDays * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
        success: true,
        savedOrder,
        message: "Order Placed Successfully via Cash On Delivery",
    });

});

// Create new Order Online
export const newOrderOnline = TryCatch(async (req: RequestWithUser, res: Response, next: NextFunction) => {

    const { shippingInfo, orderItems, paymentMethod, itemsPrice, deliveryCharge, totalPrice } = req.body;

    const user: IUser | undefined = req.user;

    if (!user) {
        return next(new ErrorHandler("User not authenticated", 401));
    }

    const maxReturnDays = Math.max(...(orderItems as IOrderItem[]).map((item) => item.returnDays || 0));
    console.log(maxReturnDays);

    const orderOptions = {
        shippingInfo,
        orderItems,
        paymentMethod,
        itemsPrice,
        deliveryCharge,
        totalPrice,
        paidAt: Date.now(),
        user: user._id,
        returnDate: Date.now() + maxReturnDays * 24 * 60 * 60 * 1000,
    };

    const options = {
        amount: Number(totalPrice) * 100,
        currency: "INR"
    };
    const savedOrder = await instance.orders.create(options);

    res.status(201).json({
        success: true,
        savedOrder,
        orderOptions,
    });

});

//Payment verification
export const paymentVerification = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        orderOptions
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const secret: String | any = "62cNHa9nI8mrKnHJzLn1M3DL";
    const expectedSignature = crypto.createHmac("sha256", secret).update(body).digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        const payment = await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        });

        const savedORder = await Order.create({
            ...orderOptions,
            paidAt: new Date(Date.now()),
            paymentInfo: payment._id,
        })

        res.status(201).json({
            success: true,
            savedORder,
            message: `Order Placed Successfully. Payment ID: ${payment._id}`
        })
    }
    else {
        return next(new ErrorHandler("Payment Failed", 400));
    }
})

// Get single order
export const getSingleOrder = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.findById(req.params.id)
                            .populate('user', 'name email')
                            .populate('paymentInfo','razorpay_order_id razorpay_payment_id razorpay_signature');
    
    if (!order) {
        return next(new ErrorHandler('Order not found with this Id', 404));
    }
    res.status(200).json({
        success: true,
        order,
    });
});

// // Get logged in users' Orders
export const myOrders = TryCatch(async (req: RequestWithUser, res: Response, next: NextFunction) => {

    const user: IUser | undefined = req.user;
    
    if (!user) {
        return next(new ErrorHandler("User not authenticated", 401));
    }

    const orders = await Order.find({ user: user._id })
                            .populate('user', 'name email')
                            .populate('paymentInfo','razorpay_order_id razorpay_payment_id razorpay_signature');

    res.status(200).json({
        success: true,
        orders,
    });
});

// Get all users' Orders -- Admin
export const getAllOrders = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find()
                            .populate('user', 'name email')
                            .populate('paymentInfo','razorpay_order_id razorpay_payment_id razorpay_signature');

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});

// Update Order Status-- Admin
export const updateOrders = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
        return next(new ErrorHandler('Order not found with this Id', 404));
    }

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400));
    }

    if (order.orderStatus === 'Processing') {
        order.orderStatus = 'Delivered';

        order.orderItems.forEach(async (temp) => {
            await updateStock(temp.product, temp.quantity);
        });
        order.deliveredAt = Date.now();
    }

    await order.save({
        validateBeforeSave: false,
    });

    res.status(200).json({
        success: true,
        order,
    });
});

// Delete Order --Admin
export const deleteOrder = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.findByIdAndDelete(req.params.orderId);

    if (!order) {
        return next(new ErrorHandler('Order not found with this Id', 404));
    }

    res.status(200).json({
        success: true,
    });
});

// For Update Order Status route
async function updateStock(id: Types.ObjectId, quantity: number): Promise<void> {
    const product = await Product.findById(id);

    if (product) {
        product.stock -= quantity;
        await product.save({ validateBeforeSave: false });
        console.log("Quantity updated Successfully")
    }
}
