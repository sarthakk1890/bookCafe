import mongoose, { Document, Schema } from "mongoose";

interface PaymentDocument extends Document {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

const schema = new Schema<PaymentDocument>(
    {
        razorpay_order_id: {
            type: String,
            required: true,
        },
        razorpay_payment_id: {
            type: String,
            required: true,
        },
        razorpay_signature: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Payment = mongoose.model<PaymentDocument>("Payment", schema);