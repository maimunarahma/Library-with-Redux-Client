import { useEffect } from 'react';
import { useDeleteBookMutation, useGetBooksQuery } from '../redux/baseApi';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const Books = () => {
  const { data, isLoading, isError, refetch } = useGetBooksQuery(undefined);
  console.log(data, isLoading, isError);
  useEffect(() => {
    refetch();
  }, [refetch]);
  const [deleteBook] = useDeleteBookMutation(undefined)
  const handleDelete = (id: String) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const res = deleteBook(id).unwrap();
        console.log(res)
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });



  }
  return <div className="p-4 max-w-7xl mx-auto">
    <div className="mb-4">
      <Link to="/create-book">
        <button className="btn btn-primary">Add New Book</button>
      </Link>
    </div>

    {/* Table Header */}
    <div className="hidden lg:flex font-semibold border-b pb-2 text-sm text-gray-700">
      <div className="w-1/5">Title</div>
      <div className="w-1/6">Author</div>
      <div className="w-1/6">Genre</div>
      <div className="w-1/6">ISBN</div>
      <div className="w-1/12">Copies</div>
      <div className="w-1/12">Available</div>
      <div className="w-1/4 text-right">Actions</div>
    </div>

    {/* Book Rows */}
    {data?.data?.length > 0 &&
      data.data.map((book: { _id: string, title: string; author: string; isbn: string; genre: string, copies: number, available: boolean, description: string }) => (
        <div
          key={book._id}
          className="flex flex-col lg:flex-row border-b py-3 items-start lg:items-center text-sm"
        >
          <div className="w-full lg:w-1/5">{book.title}</div>
          <div className="w-full lg:w-1/6">{book.author}</div>
          <div className="w-full lg:w-1/6">{book.genre}</div>
          <div className="w-full lg:w-1/6">{book.isbn}</div>
          <div className="w-full lg:w-1/12">{book.copies}</div>
          <div className="w-full lg:w-1/12">
            {book.copies > 0 ? (
              <span className="text-green-600 font-medium">Available</span>
            ) : (
              <span className="text-red-500 font-medium">Unavailable</span>
            )}
          </div>
          <div className="w-full lg:w-1/4 flex flex-wrap justify-end gap-2 mt-2 lg:mt-0">
            <Link to={`/edit-book/${book._id}`}>
              <button className="btn btn-sm btn-outline btn-info">Edit</button>
            </Link>
            <Link to={`/borrow/${book._id}`}>
              <button className="btn btn-sm btn-outline btn-success">Borrow</button>
            </Link>
            <Link to={`/books/${book._id}`}>
              <button className="btn btn-sm btn-outline btn-primary">Details</button>
            </Link>
            <button
              onClick={() => handleDelete(book._id)}
              className="btn btn-sm btn-outline btn-error"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
  </div>

};

export default Books;