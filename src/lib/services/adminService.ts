import CustomError from "@/lib/types/errors";
import Admin from "@/lib/types/admins";
import { HTTP_STATUS_CODE } from "@/lib/types/consts";

export const _getAdminById = (id: string) => Admin.findById(id);

export const _getAdminByEmail = (email: string) => Admin.findOne({ email });

export const fetchAdminById = async (id: string) => {
  const admin = await _getAdminById(id);

  if (!admin) {
    throw new AdminNotFoundError(`id: ${id}`);
  }

  return admin;
};

export const findAdminByEmail = async (email: string) => {
  const admin = await _getAdminByEmail(email);

  if (!admin) {
    throw new AdminNotFoundError(`email: ${email}`);
  }

  return admin;
};

export const createUser = () => {};

export const updateAdmin = () => {};

export const updateUser = () => {};

class AdminNotFoundError extends CustomError {
  constructor(identifier: string) {
    super(`Admin with ${identifier} not found`, HTTP_STATUS_CODE.NOT_FOUND);
  }
}
