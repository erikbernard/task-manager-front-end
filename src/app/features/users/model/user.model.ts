export type User = {
  id:  string;
  name:  string;
  email:  string;
  password?:  string;
  created_at:  string;
}
export type CreateUser = Omit<User, "id" | "created_at">;
export type Login = Omit<User, "id" | "name" |"created_at">;
export type UpdateUser = Omit<User, "id" | "created_at" | "password">;
export type LoggedIn = {
  user: User;
  token: string;
}
export type UpdatePassword = {
  oldPassword: string;
  newPassword: string;
}
export const INITIAL_USER: User = {
  id: "",
  name: "",
  email: "",
  created_at: "",
}
