import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Todo } from "./useTodo";
import { AxiosError } from "axios";

const apiClient = new APIClient<Todo>("/todos");
const useDeleteTodo = (
  onDelete: (message: string) => void,
  onFail: (message: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation<Todo, AxiosError<string>, string>({
    mutationFn: apiClient.delete,
    onSuccess: (savedTodo) => {
      onDelete(savedTodo.name);
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: (error) => {
      onFail(error.response?.data!);
    },
  });
};

export default useDeleteTodo;
