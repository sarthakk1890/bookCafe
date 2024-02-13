import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DeleteProductData, GetAllOrderData, GetMyOrderData, OrderCodBody, OrderDetailResponse, OrderResponse, PaymentVerification, DeleteOrderResponse } from '../../types/api-types';

export const orderAPI = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/` }),
    endpoints: (builder) => ({

        newCodOrder: builder.mutation<OrderResponse, OrderCodBody>({
            query: ({ myForm, userId }) => ({
                url: `new/cod?id=${userId}`,
                method: "POST",
                body: myForm
            })
        }),

        paymentVerification: builder.mutation<OrderResponse, PaymentVerification>({
            query: ({ myForm, userId }) => ({
                url: `paymentverification?id=${userId}`,
                method: "POST",
                body: myForm
            })
        }),

        getOrderDetails: builder.query<OrderDetailResponse, DeleteProductData>({ query: ({ id, userId }) => `${id}?id=${userId}` }),

        getAllOrders: builder.query<GetAllOrderData, string>({ query: (id) => `admin/all?id=${id}` }),

        // updateOrderStatus: builder.query<OrderDetailResponse, DeleteProductData>({ query: ({ userId, id }) => `admin/${id}?id=${userId}` }),

        getMyOrders: builder.mutation<GetMyOrderData, string>({
            query: (id) => ({
                url: `myOrders?id=${id}`,
                method: "POST"
            })
        }),

        updateOrderStatus: builder.mutation<OrderDetailResponse, DeleteProductData>({
            query: ({ userId, id }) => ({
                url: `admin/${id}?id=${userId}`,
                method: "PUt"
            })
        }),
        
        deleteOrder: builder.mutation<DeleteOrderResponse, DeleteProductData>({
            query: ({ userId, id }) => ({
                url: `admin/${id}?id=${userId}`,
                method: "DELETE"
            })
        }),


    }),
});


export const {
    useNewCodOrderMutation,
    usePaymentVerificationMutation,
    useGetOrderDetailsQuery,
    useGetAllOrdersQuery,
    useGetMyOrdersMutation,
    useUpdateOrderStatusMutation,
    useDeleteOrderMutation
} = orderAPI;