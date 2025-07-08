
import { Link } from "react-router";
import { useGetBookByIdQuery } from "../redux/baseApi";


const Details = () => {
    const id= window.location.pathname.split('/').pop()
    const {data}=useGetBookByIdQuery(id)
    console.log( data)
    return (
         <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
      <Link to="/" className="btn btn-sm btn-outline mb-4">← Back</Link>
      <h2 className="text-2xl font-bold mb-2">{data?.data?.title}</h2>
      <p className="text-gray-700 italic mb-4">by {data?.data?.author}</p>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
        <div><span className="font-semibold">Genre:</span> {data?.data?.genre}</div>
        <div><span className="font-semibold">ISBN:</span> {data?.data?.isbn}</div>
        <div><span className="font-semibold">Copies:</span> {data?.data?.copies}</div>
        <div>
          <span className="font-semibold">Availability:</span>{" "}
          {data?.data?.available ? (
            <span className="text-green-600 font-medium">Available</span>
          ) : (
            <span className="text-red-500 font-medium">Unavailable</span>
          )}
        </div>
        <div className="col-span-2">
          <span className="font-semibold">Description:</span>
          <p className="mt-1">{data?.data?.description}</p>
        </div>
        <div><span className="font-semibold">Created At:</span> {new Date(data?.data?.createdAt).toLocaleString()}</div>
        <div><span className="font-semibold">Last Updated:</span> {new Date(data?.data?.updatedAt).toLocaleString()}</div>
      </div>
    </div>
    );
};

export default Details;