"use server";
import { cookies } from "next/headers";

export async function setAccessToken(token: string) {
  (await cookies()).set({
    name: "AcessToken",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60, // one hour
  });
}
