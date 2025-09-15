"use server";
import { redirect } from "next/navigation";
import { AuthMode } from "@/types/AuthMode.type";
import { getCollection } from "../db";
import { comparePassword, hashPassword } from "@/helpers/hashPassword";
import { createToken } from "@/helpers/token";
import { Role } from "@/types/user.type";
import { clearAccessToken, setAccessToken } from "@/helpers/accessToken";
import { LoginState } from "@/types/prevState.types";

export async function login(mode: AuthMode, _: LoginState, formData: FormData) {
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
     const existedUser =  await userCollection.findOne({phone})
     if(existedUser)
      return {
        values,
        errors: {
          ...errors,
          phone: "این شماره قبلا ثبت شده است.",
        },
      };
      await userCollection.insertOne({ ...payload });
      await setAccessToken(createToken(payload));
    } catch (err) {
      console.log({ err });
    }
    redirect("/");
  } // End Of Register Part

  if (mode === "login") {
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
          password: "رمزعبور صحیح نمیباشد.",
        },
      };
    try {
      const userCollection = await getCollection("user");
      if (!userCollection) return undefined;
      const existedUser = await userCollection.findOne({
        phone,
      });
      if (!existedUser)
        return {
          values,
          errors: {
            ...errors,
            phone: "کاربری با این شماره یافت نشد.",
          },
        };
      const isPasswordValid = comparePassword(existedUser.password, password);
      if (!isPasswordValid)
        return {
          values,
          errors: {
            ...errors,
            password: "رمزعبور صحیح نمیباشد.",
          },
        };

      const {
        role,
        firstName,
        lastName,
        userId,
        job,
        email,
        avatar,
        createdAt,
      } = existedUser;
      const payload = {
        firstName,
        lastName,
        phone,
        password,
        role,
        userId,
        createdAt,
        email,
        job,
        avatar,
      };
      await setAccessToken(createToken(payload));
    } catch (err) {
      console.log({ err });
    }
    redirect("/");
  } // End Of Login Part
}

export async function logOut() {
  await clearAccessToken();
  redirect("/auth?mode=login");
}
