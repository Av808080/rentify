import jwt from "jsonwebtoken";
import { getAccessToken } from "@/helpers/accessToken";
import { User } from "@/types/user.type";

export async function getAuth(): Promise<null | User> {
  const token = await getAccessToken();
  if (!token) return null;
  return jwt.decode(token);
}
