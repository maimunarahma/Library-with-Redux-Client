
import { createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
export const bsaseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({baseUrl:'https://mongoose-assignment-ruddy.vercel.app/api'}),
    endpoints:(builder)=>{
        return {
            getBooks: builder.query({
                query: () => '/books',
    }),
    createBook:builder.mutation({
        query: (book) => ({
            url: '/books',
            method: 'POST',
            body:book
      })
        }),
        getBookById:builder.query({
            query: (id) => `/books/${id}`,
        }),
        updateBook:builder.mutation({
            query: ({id, ...book}) => ({
                url: `/books/${id}`,
                method: 'PUT',
                body: book
        })
    }),
    deleteBook:builder.mutation({
        query: (id) => ({   
            url: `/books/${id}`,
            method: 'DELETE',
        })
    }),
    borrowBook:builder.mutation({
        query:(book)=>({
            url:'/borrow',
            method:'POST',
            body: book

        })
    }),
    getBorrowBook:builder.query({
        query:()=> '/borrow'
    })
    }
}
})

export const { useGetBooksQuery ,useCreateBookMutation
     , useGetBookByIdQuery, useUpdateBookMutation ,useDeleteBookMutation ,useBorrowBookMutation ,useGetBorrowBookQuery} = bsaseApi;