"use server";
import { cookies } from "next/headers";

const ACCESS_TOEKN = "AccessToken";

export async function setAccessToken(token: string) {
  (await cookies()).set({
    name: ACCESS_TOEKN,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60, // one hour
  });
}

export async function clearAccessToken() {
  (await cookies()).delete(ACCESS_TOEKN);
}

export async function getAccessToken() {
  return (await cookies()).get(ACCESS_TOEKN)?.value;
}
