
import { useGetBorrowBookQuery } from '../redux/baseApi';

type Borrow = {
  _id: string;
  book: {
    title: string;
    isbn?: string;
  };
  totalQuantity: number;
};

const BorrowHistory = () => {
    const {  data, isLoading, isError } = useGetBorrowBookQuery(undefined)
    console.log( data, isLoading, isError)
    return (
    <div className="w-full max-w-4xl mx-auto">
  {/* Table Header */}
  <div className="flex font-bold border-b-2 pb-2 mb-2">
    <div className="w-1/2">Book Title</div>
    <div className="w-1/4">ISBN</div>
    <div className="w-1/4">Total Quantity Borrowed</div>
  </div>

  {/* Table Rows */}
  {data?.data?.length > 0 && (
    <>
      {data.data.map((borrow :Borrow) => (
        <div key={borrow._id} className="flex border-b py-2">
          <div className="w-1/2">{borrow?.book?.title}</div>
          <div className="w-1/4">{borrow?.book?.isbn}</div>
          <div className="w-1/4">{borrow?.totalQuantity}</div>
        </div>
      ))}
    </>
  )}
</div>


    );
};

export default BorrowHistory;