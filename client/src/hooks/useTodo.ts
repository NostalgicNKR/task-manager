import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { TodoQuery } from "../store/todoQueryStore-dashboard";

export interface Todo {
  _id: string;
  name: string;
  status?: 0 | 1;
  deadline?: Date;
}

const apiClient = new APIClient<Todo>("/todos");
const useTodo = (todoQuery: TodoQuery) =>
  useQuery<FetchResponse<Todo>, Error>({
    queryKey: ["todos", todoQuery],
    queryFn: () =>
      apiClient.getAll({
        params: { ...todoQuery },
      }),
    keepPreviousData: true,
  });

export default useTodo;
