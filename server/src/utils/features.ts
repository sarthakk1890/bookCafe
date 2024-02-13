import mongoose from "mongoose";

export const connectDB = () => {

    const MONGO_URL = process.env.MONGO_URI || "";

    mongoose.connect(
        MONGO_URL,
        {
            dbName: "BookCafe_DB"
        }
    )
        .then((c) => console.log("Database connected"))
        .catch((e) => console.log(e));
}
