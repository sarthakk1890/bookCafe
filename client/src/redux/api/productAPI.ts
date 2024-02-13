import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AddProductData, AdminAllProductResponse, DeleteProductData, ProductDetailsResponse, Productresponse, ReviewBodyData, ReviewResponseInterface, UpdateProductData } from '../../types/api-types';

interface AllProducts {
    currentPage: number;
    ratings: number;
    category: string;
    name: string;
}

export const productAPI = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/` }),
    endpoints: (builder) => ({
        getAllProducts: builder.query<Productresponse, AllProducts>({
            query: ({ name, currentPage, ratings, category }) => {
                let queryString = `all?page=${currentPage}&ratings[gte]=${ratings}`;

                if (category && category.length !== 0) {
                    queryString += `&category=${category.toLowerCase()}`;
                }
                if (name && name.length !== 0) {
                    queryString += `&name=${name.toLowerCase()}`;
                }

                return queryString;
            },
        }),
        getSingleProduct: builder.query<ProductDetailsResponse, string>({ query: (id) => `${id}` }),
        getFeaturedProducts: builder.query<Productresponse, string>({ query: () => "featured" }),
        addReview: builder.mutation<ReviewResponseInterface, ReviewBodyData>({
            query: ({ myForm, userId }) => ({
                url: `review/new?id=${userId}`,
                method: "PUT",
                body: myForm
            })
        }),

        //Admin
        getAllProductAdmin: builder.query<AdminAllProductResponse, string>({ query: (id) => `admin/all?id=${id}` }),
        updateProductAdmin: builder.mutation<ReviewResponseInterface, UpdateProductData>({
            query: ({ myForm, userId, id }) => ({
                url: `admin/${id}?id=${userId}`,
                method: "PUT",
                body: myForm
            })
        }),
        addProductAdmin: builder.mutation<ReviewResponseInterface, AddProductData>({
            query: ({ myForm, userId }) => ({
                url: `new?id=${userId}`,
                method: "POST",
                body: myForm
            })
        }),
        deleteProductAdmin: builder.mutation<ReviewResponseInterface, DeleteProductData>({
            query: ({ userId, id }) => ({
                url: `admin/${id}?id=${userId}`,
                method: "DELETE",
            })
        }),
    }),
});


export const {
    useGetFeaturedProductsQuery,
    useGetSingleProductQuery,
    useAddReviewMutation,
    useGetAllProductsQuery,
    useGetAllProductAdminQuery,
    useUpdateProductAdminMutation,
    useAddProductAdminMutation,
    useDeleteProductAdminMutation
} = productAPI;