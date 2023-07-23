import { useQuery } from "@tanstack/react-query";
import { User } from "./useSignup";
import APIClient from "../services/api-client";

const apiClient = new APIClient<User>("/me");

const useGetUser = () => {
  return useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: apiClient.get,
  });
};

export default useGetUser;
