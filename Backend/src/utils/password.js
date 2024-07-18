import bcryptjs from "bcryptjs";

export const hashPassword = (password) => {
  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(password, salt);
};

export const comparePassword = (password, hashPassword) => {
  return bcryptjs.compareSync(password, hashPassword);
};
