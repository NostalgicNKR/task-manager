import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Todo } from "./useTodo";

const apiClient = new APIClient<Todo, Todo>("/todos");
const useAddTodo = (
  onAdd: (message: string) => void,
  onFail: (message: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, Todo>({
    mutationFn: apiClient.post,
    onSuccess: (savedTodo) => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
      onAdd(savedTodo.name);
    },
    onError: (error) => {
      onFail(error.message);
    },
  });
};
export default useAddTodo;
