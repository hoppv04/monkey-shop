export interface UserI {
  id?: string;
  email: string;
  password: string;
  confirmPass: string;
  role?: "admin" | "member" | "guest";
}
