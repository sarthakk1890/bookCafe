import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DashboardResponse, GetAdminUsersResponse, UserResponse } from '../../types/api-types';
import axios from "axios";

export const userAPI = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/` }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (user) => ({
                url: "new",
                method: "POST",
                body: user,
            })
        }),

        //Admin
        getDashboardDetails: builder.query<DashboardResponse, string>({ query: (id) => `admin/dashboard?id=${id}` }),
        getAllUserADmin: builder.query<GetAdminUsersResponse, string>({ query: (id) => `all?id=${id}` }),
        getUserDetailsAdmin: builder.query<UserResponse, string>({ query: (id) => `${id}` }),
        
    }),
});

export const getUser = async (id: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const { data }: { data: UserResponse } = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/user/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
}

export const { useLoginMutation, useGetDashboardDetailsQuery, useGetAllUserADminQuery, useGetUserDetailsAdminQuery } = userAPI;