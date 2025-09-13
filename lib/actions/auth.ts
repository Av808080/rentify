"use server";
import { redirect } from "next/navigation";
import { AuthMode } from "@/types/AuthMode.type";
import { getCollection } from "../db";
import { hashPassword } from "@/helpers/hashPassword";
import { createToken } from "@/helpers/token";
import { Role } from "@/types/user.type";
import { setAccessToken } from "@/helpers/setAccessToken";
import { LoginState } from "@/types/prevState.types";

export async function login(mode:AuthMode, _:LoginState, formData: FormData ) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;
  const rules = !!(formData.get("rules") as string);
  // const mode = formData.get("mode") as AuthMode;
  const values = { password, firstName, lastName, phone, rules };
  const errors = {
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    rules: "",
  };
  if (mode === "register") {
    if (!firstName || firstName.trim().length < 3)
      return {
        values,
        errors: {
          ...errors,
          firstName: "نام باید حداقل 3 حرف یاشد.",
        },
      };
    if (!lastName || lastName.trim().length < 3)
      return {
        values,
        errors: {
          ...errors,
          lastName: "نام خانوادگی باید حداقل 3 حرف یاشد.",
        },
      };
    if (!phone)
      return {
        values,
        errors: {
          ...errors,
          phone: "تلفن همراه را وارد کنید.",
        },
      };
    if (
      phone.trim().length < 11 ||
      !phone.trim().startsWith("09") ||
      isNaN(+phone)
    )
      return {
        values,
        errors: {
          ...errors,
          phone: "فرمت شماره صحیح نمیباشد.",
        },
      };
    if (!password || password.trim().length < 8)
      return {
        values,
        errors: {
          ...errors,
          password: "رمزعبور باید حداقل 8 حرف باشد.",
        },
      };
    if (!rules)
      return {
        values,
        errors: {
          ...errors,
          rules: "برای ثبت نام لازم است قوانین را بپذیرید.",
        },
      };
    try {
      const _password = await hashPassword(password);
      const payload = {
        firstName,
        lastName,
        phone,
        password: _password,
        role: "USER" as Role,
        userId: crypto.randomUUID(),
        createdAt: new Date().getTime(),
        email: "",
        job: "",
        avatar: "",
      };

      const userCollection = await getCollection("user");
      if (!userCollection) return undefined;
      const res =  await userCollection.insertOne({ ...payload });
      console.log({res});
      const token = createToken(payload);
      await setAccessToken(token);
    } catch {}
    redirect("/");
  } // End Of Register Part
}
