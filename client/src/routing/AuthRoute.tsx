import { Navigate, Outlet } from "react-router-dom";
import authService from "../services/AuthService";

const AuthRoute = () => {
  const currentUser = authService();
  if (currentUser.isLogged) {
    return <Navigate to="/member" />;
  }
  return <Outlet />;
};

export default AuthRoute;
