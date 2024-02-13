export interface User {
    _id: string;
    name: string;
    email: string;
    photo: string;
    role: "admin" | "user";
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface Review {
    _id: string;
    user: string;
    name: string;
    rating: number;
    comment: string;
}

export interface Products {
    _id: string;
    name: string;
    description: string;
    price: number;
    ratings: number;
    image: string;
    category: string;
    stock: number;
    numberOfReviews: number;
    reviews: Review[];
    returnDays: number;
}

export interface CartItems {
    product: string;
    image: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
}

export type ShippingInfo = {
    hostel: string;
    roomNumber: string;
    phoneNo: string;
};