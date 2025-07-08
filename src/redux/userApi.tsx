import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://mongoose-assignment-ruddy.vercel.app/api'}),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/users',
        }),
        createUser: builder.mutation({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user,
            }),
        }),
  
    })
})
export const { useGetUsersQuery, useCreateUserMutation  } = userApi;