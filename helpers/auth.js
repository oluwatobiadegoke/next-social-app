import { hash, compare } from "bcryptjs";

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
}

export async function comparePassword(password, hashedPassword) {
  const isMatch = await compare(password, hashedPassword);
  return isMatch;
}
