import React, { useEffect, useState } from 'react';
import { useGetBookByIdQuery, useUpdateBookMutation } from '../redux/baseApi';
import { toast, ToastContainer } from 'react-toastify';

const EditBook = () => {
    const  id= window.location.pathname.split('/').pop();
    console.log(id);
    const {data,refetch} = useGetBookByIdQuery(id)
    console.log( data);
    const [updateBook, {data: data1,isLoading: isLoading1,isError: isError1}] = useUpdateBookMutation(undefined);
    const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 1,
    available: true,
  });
    useEffect(() => {
    if (data?.data) {
      setFormData({
        title: data.data.title || '',
        author: data.data.author || '',
        genre: data.data.genre || '',
        isbn: data.data.isbn || '',
        description: data.data.description || '',
        copies: data.data.copies || 0,
       
 available: data.data.copies === 0 ? false : data.data.available ?? true,        

      });
    }
    refetch()
  }, [data]);

    console.log(updateBook, data1, isLoading1, isError1);
    const handleSubmit=async (e : React.FormEvent)=>{
        e.preventDefault();
      
      const res=await updateBook({id, ...formData}).unwrap();
      await refetch();
      console.log(res)
      if(res.success===true){
           toast.success("Book updated Successfully",{
                    position:"top-center"
                })
      }
      else{
           toast.error("Book borrowed unsuccessfull",{
                    position:"top-center"
                })
      }
    }
   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
   const { name, value, type } = e.target;
const checked = type === 'checkbox' && 'checked' in e.target
  ? (e.target as HTMLInputElement).checked
  : undefined;

 setFormData({
  ...formData,
  [name]: type === 'checkbox' ? checked : value,
});

  };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg p-8 rounded-lg mt-10">
          <ToastContainer/> 
           <form onSubmit={handleSubmit} className="space-y-4">
                <input name="title"  required
                    className="w-full px-4 py-2 border rounded"
                     value={formData.title}  onChange={handleChange}
                     placeholder="Title" />
                <input name="author"  required
                    className="w-full px-4 py-2 border rounded" onChange={handleChange} value={formData.author} placeholder="Author" />
                <input name="genre"  required
                    className="w-full px-4 py-2 border rounded" onChange={handleChange} value={formData.genre} placeholder="Genre" />
                <input name="isbn" required
                    className="w-full px-4 py-2 border rounded" onChange={handleChange} value={formData.isbn} placeholder="ISBN" />
                <textarea name="description" 
                    className="w-full px-4 py-2 border rounded" onChange={handleChange} value={formData.description} placeholder="Description" rows={3}></textarea>
                <input name="copies"  required type="number"
                    className="w-full px-4 py-2 border rounded" onChange={handleChange} value={formData.copies} placeholder="Number of Copies" />
                    <input name="available"  required  
                    className="w-full px-4 py-2 border rounded" onChange={handleChange} value={formData.available=== true?"YES" :"NO "} placeholder="Available" />
                <label className="flex items-center space-x-2">
                   
                </label>
                <button type="submit" className='btn btn-primary'>
                 Update book
                </button>
            </form>
        </div>
    );
};

export default EditBook;