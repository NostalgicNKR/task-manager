import { Navigate, Outlet } from "react-router-dom";
import authService from "../services/AuthService";

const PrivateRoutes = () => {
  const currentUser = authService();
  if (!currentUser.isLogged) {
    return <Navigate to="/auth/login" />;
  }
  return <Outlet />;
};

export default PrivateRoutes;
