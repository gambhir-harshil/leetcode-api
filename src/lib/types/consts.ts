export const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";

export const API_ROUTES = {
  leetcode: {
    url: "/api/leetcode",
    protected: false,
  },
  userLogin: {
    url: "/api/user/auth/login",
    protected: false,
  },
  userRegister: {
    url: "/api/user/auth/register",
    protected: false,
  },
  userForgotPassword: {
    url: "/api/user/auth/forgot-password",
    protected: false,
  },
  userLogout: {
    url: "/api/user/auth/logout",
    protected: false,
  },
  adminLogin: {
    url: "/api/admin/auth/login",
    protected: false,
  },
  getUserById: (id: string) => {
    return { url: `/api/user/${id}`, protected: true };
  },
};

export const MONGODB_URI = process.env.MONGODB_URI || "";

export const HTTP_STATUS_CODE = {
  NOT_FOUND: 404,
  INTERNAL: 500,
  BAD_REQUEST: 400,
  UNAUTHORISED: 401,
  CREATED: 201,
  FOUND: 200,
  CONFLICT: 409,
};

export const ROLES = {
  USER: "user",
  ADMIN: "admin",
};

export const LEETCODE_GRAPHQL_QUERY = (username: string) => {
  return `
  { matchedUser(username: "${username}") {
    username
    submitStats: submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
        submissions
      }

      totalSubmissionNum {
        difficulty
        count
        submissions
      }
    }
    submissionCalendar
    profile { reputation ranking }
  }
}`;
};

export const MAX_AMOUNT_OF_RECENT_SUBMISSIONS = -10;
