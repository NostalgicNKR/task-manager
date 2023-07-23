import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { AxiosError } from "axios";

interface LoginUser {
  email: string;
  password: string;
}

interface Token {
  name: string;
  email: string;
  token: string;
}

const useLogin = (onAdd: () => void, onFail: (message: string) => void) => {
  const apiClient = new APIClient<Token, LoginUser>("/auth/login");
  return useMutation<Token, AxiosError<string>, LoginUser>({
    mutationFn: apiClient.post,
    onSuccess: (data) => {
      localStorage.setItem("x-auth-token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.name, email: data.email })
      );
      onAdd();
    },
    onError: (error) => {
      onFail(error.response?.data!);
    },
  });
};

export default useLogin;
