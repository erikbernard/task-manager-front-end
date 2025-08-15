import {Task} from "../../task/model/task.model";

export type User = {
  id:  string;
  name:  string;
  email:  string;
  password:  string;
  created_at:  string;
}
export type CreateUser = Omit<Task, "id" | "created_at">;
export type UpdateUser = Omit<Task, "id" | "created_at" | "password">;
export type LoggedIn = {
  user: User;
  token: string;
}
