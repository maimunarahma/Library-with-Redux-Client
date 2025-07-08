import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router'; 
import { useCreateUserMutation } from '../redux/userApi';
import { toast, ToastContainer } from 'react-toastify';

const Register: React.FC = () => {
  const [createUser, {  isLoading, isError }] = useCreateUserMutation();
const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
     
       toast.error("Passwords do not match!",{
        position:"top-center"
       });
        setTimeout(() => {
    navigate('/');
  }, 800);
    }

    const user = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      const res = await createUser(user).unwrap();
      console.log("User registered:", res);
      toast.success("User Registration Successful",{
        position:"top-center"
      });
        setTimeout(() => {
    navigate('/');
  }, 900);
    } catch (error) {
      console.error("Error registering user:", error);
       toast.error("User Registration Unsuccessful",{
        position:"top-center"
       });
         setTimeout(() => {
    navigate('/');
  }, 900);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-2xl">
        <ToastContainer/>
        <h2 className="text-2xl font-bold text-center text-gray-700">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        {isError && <p className="text-red-500 text-sm text-center">Registration failed. Try again.</p>}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
