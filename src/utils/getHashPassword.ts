import bcrypt from "bcrypt";

export const getHashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(16);
  return await bcrypt.hash(password, salt);
};
