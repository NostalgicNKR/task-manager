import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const logoutUser = (onLogout: () => void) => {
    localStorage.clear();
    queryClient.removeQueries({
      queryKey: ["todos"],
    });
    navigate("/auth/login");
    onLogout();
  };
  return logoutUser;
};

export default useLogout;
