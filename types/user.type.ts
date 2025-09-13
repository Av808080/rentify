export type Role = "USER" | "ADMIN";
export type User = {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  role: Role;
  userId: string;
  createdAt: number;
  email: string;
  job: string;
  avatar: string;
};
