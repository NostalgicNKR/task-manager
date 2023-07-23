import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "./useTodo";
import APIClient from "../services/api-client";

const apiClient = new APIClient<Todo>("/todos");
const useUpdateTodo = (onUpdate: (message: string) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiClient.put,
    onSuccess: (savedTodo) => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
      onUpdate(savedTodo.name);
    },
  });
};

export default useUpdateTodo;
