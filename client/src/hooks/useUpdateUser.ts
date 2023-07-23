import { useMutation } from "@tanstack/react-query";
import useLogout from "./useLogout";
import APIClient from "../services/api-client";
import { AxiosError } from "axios";

interface User {
  email: string;
  name: string;
  password: string;
  newPassword?: string;
}

const apiClient = new APIClient<User>("/auth/update");
const useUpdateUser = (
  onUpdate: (message: string) => void,
  onError: (message: string) => void
) => {
  const logoutUser = useLogout();
  return useMutation<User, AxiosError<string>, User>({
    mutationFn: apiClient.put,
    onSuccess: (_savedUser, inputData) => {
      const message = inputData.newPassword
        ? "Password Updated"
        : "Profile Updated";
      onUpdate(message);
      logoutUser(() => console.log("message"));
    },
    onError: (error) => {
      onError(error.response?.data!);
    },
  });
};

export default useUpdateUser;
