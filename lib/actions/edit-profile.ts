"use server";
import { PreviousState } from "@/types/prevState.types";
import { getCollection } from "../db";
import { createToken } from "@/helpers/token";
import { setAccessToken } from "@/helpers/accessToken";
import { User } from "@/types/user.type";
import { getAuth } from "../getAuth";

export async function editProfile(
  userId: string,
  _: PreviousState,
  formData: FormData
) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;
  const job = formData.get("job") as string;
  const email = formData.get("email") as string;
  const avatar = formData.get("avatar") as string;

  const values = { password, firstName, lastName, phone, email, job };
  const errors = {
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  };

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
        phone: "شماره همراه را وارد کنید.",
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
  if (email)
    if (!/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim.test(email))
      return {
        values,
        errors: {
          ...errors,
          email: "فرمت ایمیل صحیح نمیباشد.",
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
  // Checking SuccuessFully

  try {
    const userCollection = await getCollection("user");
    if (!userCollection) return undefined;
    const updatedUser = await userCollection.findOneAndUpdate(
      { userId },
      { $set: { firstName, lastName, email, job, phone, avatar } }
    );
    if (!updatedUser) return undefined;
    const { createdAt, role } = updatedUser;
    await setAccessToken(
      createToken({
        userId,
        role,
        createdAt,
        email,
        job,
        lastName,
        firstName,
        phone,
        password,
        avatar,
      })
    );
    return { values, errors, ack: true };
  } catch (err) {
    console.log({ err });
    return {
      ack: false,
      errors,
      values,
    };
  }
}

export async function deleteAvatar(userId: string) {
  try {
    const userCollection = await getCollection("user");
    if (!userCollection) return;
    await userCollection.findOneAndUpdate({ userId }, { $set: { avatar: "" } });
    const user = (await getAuth()) as User;
    const payload = { ...user, avatar: "" };
    await setAccessToken(createToken(payload));
  } catch (err) {
    console.log({ err });
  }
}
