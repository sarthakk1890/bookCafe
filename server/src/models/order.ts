import mongoose, { Document, Schema, model, Types } from 'mongoose';

interface IShippingInfo {
    roomNumber: string;
    hostel: string;
    // branch: string;
    // course: string;
    // semester: string;
    phoneNo: string;
}

interface IOrderItem {
    name: string;
    price: number;
    quantity: number;
    image: string;
    product: Types.ObjectId;
    returnDays: number;
}

interface IOrder extends Document {
    shippingInfo: IShippingInfo;
    orderItems: IOrderItem[];
    user: string;
    paidAt: Date | number;
    itemsPrice: number;
    deliveryCharge: number;
    totalPrice: number;
    paymentMethod: string;
    paymentInfo: Types.ObjectId;
    orderStatus: string;
    deliveredAt?: Date | number;
    createdAt: Date | number;
    returnDate?: Date | number;
}

const orderSchema: Schema<IOrder> = new Schema<IOrder>(
    {
        shippingInfo: {
            roomNumber: {
                type: String,
                // required: true,
            },
            hostel: {
                type: String,
                // required: true,
            },
            // branch: {
            //     type: String,
            //     // required: true,
            // },
            // course: {
            //     type: String,
            //     // required: true,
            // },
            // semester: {
            //     type: String,
            //     required: true,
            // },
            phoneNo: {
                type: String,
                // required: true,
            },
        },
        orderItems: [
            {
                name: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                image: {
                    type: String,
                    required: true,
                },
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
            },
        ],
        user: {
            type: String,
            ref: 'User', // Replace with the actual reference model
            required: true,
        },
        itemsPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        deliveryCharge: {
            type: Number,
            required: true,
            default: 0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        paymentMethod: {
            type: String,
            enum: ["COD", "Online"],
            required: true,
        },
        paymentInfo: {
            type: mongoose.Schema.ObjectId,
            ref: "Payment"
        },
        paidAt: {
            type: Date,
            // required: true,
        },
        orderStatus: {
            type: String,
            required: true,
            default: 'Processing',
        },
        deliveredAt: {
            type: Date,
            // default: Date.now,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        returnDate: {
            type: Date
        },
    }
    ,
    {
        timestamps: true,
    }
);

export const Order = model<IOrder>('Order', orderSchema);

