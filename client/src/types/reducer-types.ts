import { CartItems, Products, ShippingInfo, User } from "./types";

export interface UserReducerInitialState {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
}

export interface ProductReducerInitialState {
    products: Products[] | null;
    loading: boolean;
    productsCount: number;
    resultPerPage: number;
    filteredProductCount: number;
}

export interface CartReducerInitialState {
    loading: boolean;
    cartItems: CartItems[];
    itemsPrice: number;
    deliveryCharge: number;
    totalPrice: number;
    shippingInfo: ShippingInfo;
}