import { compare, hash } from "bcryptjs";

export async function hashPassword(password: string) {
  const _password = await hash(password, 12);
  return _password;
}

export async function comparePassword(
  hashedPassword: string,
  realPassword: string
) {
  const isVaild = await compare(realPassword, hashedPassword);
  return isVaild;
}
