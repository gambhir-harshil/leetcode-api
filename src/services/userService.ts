import bcrypt from "bcryptjs";
import CustomError from "@/types/errors";
import User, { IUser } from "@/types/users";
import { HTTP_STATUS_CODE } from "../types/consts";
import { RegisterPayload } from "@/types/auth";

export const _hashPassword = (password: string) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const _getUserByEmail = (email: string) => {
  return User.findOne({ email });
};

export const getAllUsers = async () => {
  return await User.find({});
};

export const getUserById = async (id: string) => {
  const user = await User.findById(id).select("-password");

  if (!user) {
    throw new UserNotFoundError(`id: ${id}`);
  }

  return user;
};

export const findUserByEmail = async (email: string) => {
  const user = await _getUserByEmail(email);

  if (!user) {
    throw new UserNotFoundError(`email: ${email}`);
  }

  return user;
};

export const createUser = async (payload: RegisterPayload | IUser) => {
  const user = await _getUserByEmail(payload.email);

  if (user) throw new UserAlreadyExistsError();

  payload.password = _hashPassword(payload.password);

  return await User.create(payload);
};

class UserAlreadyExistsError extends CustomError {
  constructor() {
    super(`User already exists'`, HTTP_STATUS_CODE.BAD_REQUEST);
  }
}

class UserNotFoundError extends CustomError {
  constructor(identifier: string) {
    super(`User with ${identifier} not found`, HTTP_STATUS_CODE.NOT_FOUND);
  }
}
