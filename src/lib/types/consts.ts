export const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";

export const API_ROUTES = {
  leetcode: "/api/leetcode",
  userLogin: "/api/user/auth/login",
  userRegister: "/api/user/auth/register",
  userForgotPassword: "/api/user/auth/forgot-password",
  userLogout: "/api/user/auth/logout",
  adminLogin: "/api/admin/auth/login",
  getUserById: (id: string) => `/api/user/${id}`,
};

export const MONGODB_URI = process.env.MONGODB_URI || "";

export const HTTP_STATUS_CODE = {
  NOT_FOUND: 404,
  INTERNAL: 500,
  BAD_REQUEST: 400,
  UNAUTHORISED: 401,
};

export const ROLES = {
  USER: "user",
  ADMIN: "admin",
};
