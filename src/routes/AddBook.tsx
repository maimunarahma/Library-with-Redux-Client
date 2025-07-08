
import type React from 'react';
import { useCreateBookMutation } from '../redux/baseApi';
import { toast, ToastContainer } from 'react-toastify';

const AddBook = () => {

   const [createBook, {data, isError, isLoading}] = useCreateBookMutation(undefined);
   console.log(createBook, data, isError, isLoading);
    const handleSubmit =async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const title = (form.elements.namedItem('title') as HTMLInputElement).value;
        const author = (form.elements.namedItem('author') as HTMLInputElement).value;
        const genre = (form.elements.namedItem('genre') as HTMLInputElement).value;
        const isbn = (form.elements.namedItem('isbn') as HTMLInputElement).value;
        const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;
        const copies = parseInt((form.elements.namedItem('copies') as HTMLInputElement).value, 10);
const available = copies > 0 ? true : false;

        const book = {
            title,
            author,
            genre,
            isbn,
            description,
            copies,
            available
        }
   const res=await createBook(book).unwrap();
   if(res.success===true){
    toast.success("Book addedd Successfully",{
        position:"top-center"
    })
   }else{
      toast.error("Book addedd Unsuccessfull",{
        position:"top-center"
    })
   }
   console.log(res)
    }
    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg p-8 rounded-lg mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-center">Add New Book</h2>
            <ToastContainer/>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="title"  required
                    className="w-full px-4 py-2 border rounded" placeholder="Title" />
                <input name="author"  required
                    className="w-full px-4 py-2 border rounded" placeholder="Author" />
                <input name="genre"  required
                    className="w-full px-4 py-2 border rounded" placeholder="Genre" />
                <input name="isbn" required
                    className="w-full px-4 py-2 border rounded" placeholder="ISBN" />
                <textarea name="description" 
                    className="w-full px-4 py-2 border rounded" placeholder="Description" rows={3}></textarea>
                <input name="copies"  required type="number"
                    className="w-full px-4 py-2 border rounded" placeholder="Number of Copies" />
               
                <button type="submit" className='btn btn-primary'>
                 add book
                </button>
            </form>
        </div>
    );
};

export default AddBook;