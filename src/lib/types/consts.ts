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

export const MAX_WIDTH = "1500px";

export const DAILY_TRACKER_COLORS = {
  green1: "#219223",
  green2: "#00c802",
  green3: "#4bfd4d",
  green4: "#c7f9cc",
  white: "#ffffff",
};

export const DAILY_TRACKER_COLORS_VALUES = Object.values(DAILY_TRACKER_COLORS);

export const LEADERBOARD_DUMMY_USERS = [
  {
    id: "1",
    name: "Mukesh Ambani",
  },
  {
    id: "2",
    name: "Steve Jobs",
  },
  {
    id: "14",
    name: "Sundar Picchai",
  },
  {
    id: "23",
    name: "Jeff Bezos",
  },
  {
    id: "45",
    name: "Anand Mahindra",
  },
  {
    id: "47",
    name: "Steve Wozniak",
  },
  {
    id: "66",
    name: "John Rockefeller",
  },
  {
    id: "81",
    name: "Bill Gates",
  },
  {
    id: "99",
    name: "Donald Trump",
  },
  {
    id: "247",
    name: "Sam Altman",
  },
];
