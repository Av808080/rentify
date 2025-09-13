import { User } from "@/types/user.type";
import jwt from "jsonwebtoken";
export function createToken(payload: User) {
  const token = jwt.sign(payload, process.env.SECRET_KEY || "");
  return token;
}
