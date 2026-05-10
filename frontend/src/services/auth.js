import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi=createApi({
    reducerPath: "authApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:8000/api/auth"}),
    endpoints:(builder)=>({
       
        register:builder.mutation({
            query:(user)=>({
                url:`/register`,
                method:'POST',
                body:user,
            })
        }),

        login: builder.mutation({
            query: (user) => ({
                url: "/login",
                method: "POST",
                body: user,
            }),
        }),
    })
});

export const {useRegisterMutation, useLoginMutation}=authApi;