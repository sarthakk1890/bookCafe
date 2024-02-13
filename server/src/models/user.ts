import mongoose from "mongoose";
import validator from "validator";

interface IUser extends Document{
    _id: string;
    name: string;
    email: string;
    photo: string;
    role: "user" | "admin";
    createdAt: Date;
    updatedAt: Date;
}

const schema = new mongoose.Schema(
    {

        _id: { //added _id to provide firebase id
            type: String,
            required: [true, "Please enter ID"]
        },
        name: {
            type: String,
            required: [true, "Please enter Name"]
        },
        email: {
            type: String,
            required: [true, "Please enter Email"],
            unique: [true, "Email already in use"],
            validate: validator.default.isEmail,
        },
        photo: {
            type: String,
            required: [true, "Please add Photo"]
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },


    },
    {
        timestamps: true,
    }
)

export const User = mongoose.model<IUser>("User", schema);