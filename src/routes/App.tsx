import Footer from "../Common/Footer";
import Nav from "../Common/Nav";
import { Outlet } from "react-router";

function App() {
 
 
  return (
    <>
      <Nav />
      <Outlet />
    <Footer/>
      
      </>
  );
}

export default App;
