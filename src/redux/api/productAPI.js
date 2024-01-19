import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BACKEND_URL } from "../../constants.js"

export const ProductApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/products`}),
    tagTypes: ["Products"],
    endpoints: (build) => ({
        getAllProducts: build.query({
            query: () => '/',
            providesTags: ["Products"]
        })
    })
})

export const {
    useGetAllProductsQuery
 } = ProductApi