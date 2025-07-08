
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../redux/features/authSlice';
import type { RootState } from '../redux/store';
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react';

const Nav = () => {

  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user)
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(prev => !prev);

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <Link to='/books'> <li>All Books</li></Link>
            <Link to='/create-book'><li>Add Book</li></Link>
            {
              user && <>
                <Link to='/borrow-summary'><li>Borrow</li></Link>
                <details className="dropdown">
                  <summary className="btn m-1">User Info</summary>
                  <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li>{user?.name}</li>
                    <li>{user?.email}</li>
                    <li>
                      <div className="flex items-center justify-between w-full">
                        <span>
                          {showPassword ? user?.password : '••••••••'}
                        </span>
                        <button onClick={togglePassword}>
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </li>

                  </ul>
                </details>
              </>
            }



          </ul>
        </div>
        <a className="btn btn-ghost text-xl font-bold">ReadVault </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="list-none flex gap-6 items-center text-base font-semibold text-gray-700">
          <Link to="/books">
            <li className="hover:text-blue-600 transition-all duration-200 cursor-pointer">
              All Books
            </li>
          </Link>
          <Link to="/create-book">
            <li className="hover:text-blue-600 transition-all duration-200 cursor-pointer">
              Add Book
            </li>
          </Link>
          {user && (
            <>
              <Link to="/borrow-summary">
                <li className="hover:text-blue-600 transition-all duration-200 cursor-pointer">
                  Borrow
                </li>
              </Link>
              <details className="dropdown">
                <summary className="btn m-1">User Info</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                  <li>{user?.name}</li>
                  <li>{user?.email}</li>
                  <li>
                    <div className="flex items-center justify-between w-full">
                      <span>
                        {showPassword ? user?.password : '••••••••'}
                      </span>
                      <button onClick={togglePassword}>
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </li>

                </ul>
              </details>
            </>
          )}
        </ul>
      </div>


      <div className="navbar-end">
        {
          !user ?
            <Link to='/register'>  <a className="btn">Register</a></Link>


            :
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-outline btn-error hover:scale-105 transition duration-200"
            >
              Log out
            </button>
        }

      </div>
    </div>
  );
};

export default Nav;