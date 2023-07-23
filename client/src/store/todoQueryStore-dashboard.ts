import { create } from "zustand";

export interface TodoQuery {
  sort: string;
  status: "isPending" | "isCompleted";
  page: number;
  limit: number;
  deadline: string;
}

interface TodoQueryStoreType {
  todoQuery: TodoQuery;
  setSortOrder: (sortOrder: string) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setDeadline: (deadline: string) => void;
}

const useTodoQueryDashboard = create<TodoQueryStoreType>((set) => ({
  todoQuery: {
    page: 1,
    limit: 10,
    status: "isPending",
    deadline: "isOverdue",
  } as TodoQuery,
  setSortOrder: (sortOrder) =>
    set((store) => ({ todoQuery: { ...store.todoQuery, sort: sortOrder } })),
  setPage: (page) =>
    set((store) => ({ todoQuery: { ...store.todoQuery, page } })),
  setLimit: (limit) =>
    set((store) => ({ todoQuery: { ...store.todoQuery, limit } })),
  setDeadline: (deadline) =>
    set((store) => ({ todoQuery: { ...store.todoQuery, deadline } })),
}));

export default useTodoQueryDashboard;
