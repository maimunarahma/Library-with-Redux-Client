import React, { useEffect } from 'react';
import { useBorrowBookMutation, useGetBookByIdQuery } from '../redux/baseApi';
import { toast, ToastContainer } from 'react-toastify';

const Borrow = () => {

    const id = window.location.pathname.split('/').pop();
    const { data: book ,refetch} = useGetBookByIdQuery(id)
    const [borrowBook, { data, isLoading, isError }] = useBorrowBookMutation()
    console.log(borrowBook, data, isLoading, isError)
    
    const handleSubmit=async (e : React.FormEvent) =>{
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        const quantity = (form.elements.namedItem('quantity') as HTMLInputElement).value;
        const dueDate = (form.elements.namedItem('dueDate') as HTMLInputElement).value;
        const borrow={
            book: book?.data?._id,
            quantity: quantity,
            dueDate: dueDate
        }
      const res=  await borrowBook(borrow).unwrap();

      console.log(res)
    if(res.success===true){
        toast.success("Book borrowed Successfully",{
            position:"top-center"
        })
    }else{
           toast.error("Book borrowed unsuccessfull",{
            position:"top-center"
        })
    }
}
useEffect(()=>{
    refetch()
},[refetch])
    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-4">Borrow {book?.data?.title}</h2>
            <ToastContainer/>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Quantity</label>
                    <input
                        type="number"
                        name='quantity'
                        min="1"
                        max={book?.data?.copies}
                        // value={copies}
                        // onChange={(e) => setQuantity(Number(e.target.value))}
                        className="input input-bordered w-full"
                        required
                    />
                    <p className="text-sm text-gray-500">Available:
                        {book?.data?.copies}
                    </p>
                </div>

                <div>
                    <label className="block font-medium">Due Date</label>
                    <input
                        type="date"
                        name='dueDate'
                        // value={dueDate}
                        // onChange={(e) => setDueDate(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={book?.data?.copies === 0}
                >
                    {book?.data?.copies === 0 ? 'Unavailable' : 'Confirm Borrow'}
                </button>
            </form>
        </div>
    );
};

export default Borrow;