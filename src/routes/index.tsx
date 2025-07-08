import { createBrowserRouter } from "react-router";
import App from "./App";
import Books from "./Books";

import Login from "../Authentication/Login";
import AddBook from "./AddBook";
import EditBook from "./EditBook";
import Borrow from "./Borrow";
import Details from "./Details";
import Private from "../Private";
import BorrowHistory from "./BorrowHistory";
import Banner from "./Banner";
import Register from "../Authentication/Register";
import Public from "./Public";


const router = createBrowserRouter([{
    path: "/",
    element: <App />,
    children:[
        {
            path:'/',
            element:<Banner/>
        },
        {
            path:'/books',
            element:<Books/>
        },
        {
            path: '/register',
          element:<Public><Register/></Public>
        },{
            path: '/login',
            element:<Public><Login/></Public>
        },{
            path: '/create-book',
            element:<Private><AddBook/></Private>
        },{
            path: '/edit-book/:id',
            element:<Private><EditBook/></Private>
        },{
            path:'/borrow/:id',
            element:<Private><Borrow/></Private>
        },{
            path:'/books/:id',
            element:<Private><Details/></Private>
        },{
            path:'/borrow-summary',
            element:<Private><BorrowHistory/></Private>
        }
    ]
}])
export default router;