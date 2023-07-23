import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { AxiosError } from "axios";

export interface User {
  email: string;
  name: string;
  password?: string;
}

const apiClient = new APIClient<User, User>("/auth/register");

const useSignup = (onAdd: () => void, onFail: (message: string) => void) => {
  return useMutation<User, AxiosError<string>, User>({
    mutationFn: apiClient.post,
    onSuccess: () => {
      console.log("The User has been registered!");
      onAdd();
    },
    onError: (error) => {
      onFail(error.response?.data!);
    },
  });
};

export default useSignup;
