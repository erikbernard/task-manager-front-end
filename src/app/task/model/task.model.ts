
export type Task = {
  id: string;
  title: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: "PENDING" | "COMPLETED" | "STARTED" | "BLOCKED" | "NOSTARTED";
  user_id: string;
  created_at: string;
  updated_at: string;
}
export type CreateTask = Omit<Task, "id" | "status" | "created_at" | "updated_at">;
export type UpdateTask = Omit<Task, "id" | "created_at" | "updated_at">;
export type ListTask = {
  data: Task[];
  pagination: {
    totalCount: number;
    totalPages: number;
    page: number;
    limit: number;
  }
}

