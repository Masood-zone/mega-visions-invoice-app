import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storeApi = createApi({
  reducerPath: "storeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3030/api",
  }),
  endpoints: (builder) => ({
    // Analytics
    getAnalytics: builder.query({
      query: () => "/analytics",
    }),
    // User endpoints
    userProfile: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
      }),
    }),
    updateUser: builder.mutation({
      query: (queryArg) => ({
        url: `user/update/${queryArg.id}`,
        method: "PUT",
        body: queryArg,
      }),
    }),
    login: builder.mutation({
      query: (queryArg) => ({
        url: "/user/signin",
        method: "POST",
        body: queryArg,
      }),
    }),
    // Company endpoints
    getAllCompanies: builder.query({
      query: () => "/company",
    }),
    createCompany: builder.mutation({
      query: (queryArg) => ({
        url: "/company/create",
        method: "POST",
        body: queryArg,
      }),
    }),
    updateCompany: builder.mutation({
      query: (queryArg) => ({
        url: `/company/update/${queryArg.id}`,
        method: "PUT",
        body: queryArg,
      }),
    }),
    getSingeCompany: builder.query({
      query: (id) => `/company/${id}`,
    }),
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `/company/delete/${id}`,
        method: "DELETE",
      }),
    }),
    //Invoice endpoints
    getAllInvoice: builder.query({
      query: () => ({
        url: "/invoice",
        method: "GET",
      }),
    }),
    createInvoice: builder.mutation({
      query: (queryArg) => ({
        url: "/invoice/create",
        method: "POST",
        body: queryArg,
      }),
    }),
    updateInvoice: builder.mutation({
      query: (queryArg) => ({
        url: `/invoice/update/${queryArg.id}`,
        method: "PUT",
        body: queryArg,
      }),
    }),
    getSingleInvoice: builder.query({
      query: (id) => `/invoice/${id}`,
    }),
    deleteInvoice: builder.mutation({
      query: (queryArg) => ({
        url: `/invoice/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    // Product endpoints
    getAllProducts: builder.query({
      query: () => "/product",
    }),
    createProduct: builder.mutation({
      query: (queryArg) => ({
        url: "/product/create",
        method: "POST",
        body: queryArg,
      }),
    }),
    updateProduct: builder.mutation({
      query: (queryArg) => ({
        url: `/product/update/${queryArg.id}`,
        method: "PUT",
        body: queryArg,
      }),
    }),
    getSingleProduct: builder.query({
      query: (queryArg) => `/product/${queryArg.id}`,
    }),
    deleteProduct: builder.mutation({
      query: (queryArg) => ({
        url: `/product/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    // Sales endpoints
    getAllSales: builder.query({
      query: () => "/sales",
    }),
    createSales: builder.mutation({
      query: (queryArg) => ({
        url: "/sales/create",
        method: "POST",
        body: queryArg,
      }),
    }),
    updateSales: builder.mutation({
      query: (queryArg) => ({
        url: `/sales/update/${queryArg.id}`,
        method: "PUT",
        body: queryArg,
      }),
    }),
    getSingleSales: builder.query({
      query: (queryArg) => `/sales/${queryArg.id}`,
    }),
    deleteSales: builder.mutation({
      query: (queryArg) => ({
        url: `/sales/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    // Employee endpoints
    getAllEmployees: builder.query({
      query: () => "/employee",
    }),
    createEmployee: builder.mutation({
      query: (queryArg) => ({
        url: "/employee/create",
        method: "POST",
        body: queryArg,
      }),
    }),
    updateEmployee: builder.mutation({
      query: (queryArg) => ({
        url: `/employee/update/${queryArg.id}`,
        method: "PUT",
        body: queryArg,
      }),
    }),
    getSingleEmployee: builder.query({
      query: (queryArg) => `/employee/${queryArg.id}`,
    }),
    deleteEmployee: builder.mutation({
      query: (queryArg) => ({
        url: `/employee/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    // Customer endpoints
    getAllCustomers: builder.query({
      query: () => "/customer",
    }),
    createCustomer: builder.mutation({
      query: (queryArg) => ({
        url: "/customer/create",
        method: "POST",
        body: queryArg,
      }),
    }),
    updateCustomer: builder.mutation({
      query: (queryArg) => ({
        url: `/customer/update/${queryArg.id}`,
        method: "PUT",
        body: queryArg,
      }),
    }),
    getSingleCustomer: builder.query({
      query: (queryArg) => `/customer/${queryArg.id}`,
    }),
    deleteCustomer: builder.mutation({
      query: (queryArg) => ({
        url: `/customer/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
  }),
});
