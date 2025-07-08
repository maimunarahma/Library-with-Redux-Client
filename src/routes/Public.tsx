import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import type { RootState } from "../redux/store";
// import { RootState } from "../redux/store";

const Public = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  // If user is logged in, redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }

  // Else, show public content (login/register)
  return <>{children}</>;
};

export default Public;
