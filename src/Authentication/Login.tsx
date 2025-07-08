
import { Link, useNavigate } from 'react-router';
import { useGetUsersQuery } from '../redux/userApi';
import { useDispatch } from 'react-redux';
import { login } from '../redux/features/authSlice';
import { toast, ToastContainer } from 'react-toastify';



const Login: React.FC = () => {
  const { data, isLoading, isError } = useGetUsersQuery(undefined);
  console.log(data, isLoading, isError);

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;


    const credentials = { email, password };

    try {
      const isExist = data?.data.find(((user: any) => user.email === credentials.email && user.password === credentials.password))
      console.log(isExist)
      if (password !== isExist.password) {
     
       toast.error("Passwords do not match!",{
        position:"top-center"
       });
        setTimeout(() => {
    navigate('/');
  }, 800);
    }
      console.log(isExist)
      if (isExist) {
        dispatch(login(isExist));
       
        // alert('Login successful!');
        toast.success("Login successful!", {
          position: "top-center"
        });
        setTimeout(() => {
    navigate('/');
  }, 1000);

      }

    } 
    catch (err) {
      toast.error("Login unsuccessful!", {
        position: "top-center"
      });
     setTimeout(() => {
    navigate('/');
  }, 800);

    console.error('Login failed:', err);
    }
   
  }


return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-center text-gray-700">Login to Your Account</h2>
      <ToastContainer   position="top-center"/>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {isError && <p className="text-center text-red-500">Login failed. Try again.</p>}
      <p className="text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register
        </Link>
      </p>
    </div>
  </div>
);
};

export default Login;
