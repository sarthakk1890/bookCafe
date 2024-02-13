import { configureStore } from '@reduxjs/toolkit';
export const server = import.meta.env.VITE_SERVER;

import { userAPI } from './api/userAPI';
import { userReducer } from './reducer/userReducer';
import { productAPI } from './api/productAPI';
import { cartReducer } from './reducer/cartReducer';
import { orderAPI } from './api/orderAPI';

export const store = configureStore({
    reducer: {
        [userAPI.reducerPath]: userAPI.reducer,
        [productAPI.reducerPath]: productAPI.reducer,
        [orderAPI.reducerPath]: orderAPI.reducer,
        [userReducer.name]: userReducer.reducer,
        [cartReducer.name]: cartReducer.reducer,
    },
    middleware: (defaultMiddleware) => [...defaultMiddleware(), userAPI.middleware, productAPI.middleware, orderAPI.middleware], //defaultMiddleware() it'll return array
})

export type RootState = ReturnType<typeof store.getState>;