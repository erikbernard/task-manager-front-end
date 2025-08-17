
export type Task = {
  id: string;
  title: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: "PENDING" | "COMPLETED" | "STARTED" | "BLOCKED" | "NOSTARTED";
  user_id: string;
  created_at?: string;
  updated_at?: string;
}
export type CreateTask = Omit<Task, "id" | "status" | "created_at" | "updated_at">;
export type UpdateTask = Omit<Task, "id" | "created_at" | "updated_at">;
export type Pagination = {
  totalCount: number;
  totalPages: number;
  page: number;
  limit: number;
}
export type ListTask = {
  data: Task[];
  pagination: Pagination;
}
export type TaskQueryFilters = Partial<Omit<Task, "id" | "title" | "description" | "user_id"> & { page: number,limit: number}>;
export const INITIAL_PAGINITION = {
  totalCount: 0,
  totalPages: 0,
  page: 0,
  limit:5,
}
//foi necessario
export type Priority = "HIGH" | "MEDIUM" | "LOW";
export type Status = "PENDING" | "COMPLETED" | "STARTED" | "BLOCKED" | "NOSTARTED";

