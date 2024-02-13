import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer-types";
import { CartItems, ShippingInfo } from "../../types/types";

const initialState: CartReducerInitialState = {
    loading: false,
    cartItems: [],
    itemsPrice: 0,
    deliveryCharge: 0,
    totalPrice: 0,
    shippingInfo: {
        hostel: "",
        roomNumber: "",
        phoneNo: "",
    },
};

export const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItems>) => {
            state.loading = true;

            const index = state.cartItems.findIndex(
                (i) => i.product === action.payload.product
            );

            if (index !== -1) state.cartItems[index] = action.payload;
            else state.cartItems.push(action.payload);
            state.loading = false;
        },

        removeCartItem: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.cartItems = state.cartItems.filter(
                (i) => i.product !== action.payload
            );
            state.loading = false;
        },

        calculatePrice: (state, action: PayloadAction<number>) => {
            const itemsPrice = state.cartItems.reduce(
                (totalPrice, item) => totalPrice + item.price * item.quantity,
                0
            );

            state.itemsPrice = itemsPrice;
            state.deliveryCharge = action.payload;
            state.totalPrice = state.itemsPrice + state.deliveryCharge;
        },

        saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
            state.shippingInfo = action.payload;
        },
        
        resetCart: () => initialState,
    },
});

export const {
    addToCart,
    removeCartItem,
    calculatePrice,
    saveShippingInfo,
    resetCart,
} = cartReducer.actions;