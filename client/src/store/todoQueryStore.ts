import { create } from "zustand";

interface TodoQuery {
  sort: string;
  status: "isCompleted";
  page: number;
  limit: number;
  deadline: "all";
}

interface TodoQueryStoreType {
  todoQuery: TodoQuery;
  setSortOrder: (sortOrder: string) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

const useTodoQueryStore = create<TodoQueryStoreType>((set) => ({
  todoQuery: {
    page: 1,
    limit: 10,
    status: "isCompleted",
    deadline: "all",
  } as TodoQuery,
  setSortOrder: (sortOrder) =>
    set((store) => ({ todoQuery: { ...store.todoQuery, sort: sortOrder } })),
  setPage: (page) =>
    set((store) => ({ todoQuery: { ...store.todoQuery, page } })),
  setLimit: (limit) =>
    set((store) => ({ todoQuery: { ...store.todoQuery, limit } })),
}));

export default useTodoQueryStore;
