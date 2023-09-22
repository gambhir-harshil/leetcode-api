import {
  HTTP_STATUS_CODE,
  LEETCODE_GRAPHQL_QUERY,
  LEETCODE_GRAPHQL_URL,
} from "@/lib/types/consts";
import CustomError from "@/lib/types/errors";
import { httpFetch } from "@/lib/helpers";

export const fetchLeetcodeData = async (username: string) => {
  try {
    const data = {
      query: LEETCODE_GRAPHQL_QUERY(username),
    };

    const {
      data: { matchedUser },
    } = await httpFetch(LEETCODE_GRAPHQL_URL, "POST", data);

    return {
      username: matchedUser.username as string,
      easy: matchedUser.submitStats.acSubmissionNum[1].count,
      medium: matchedUser.submitStats.acSubmissionNum[2].count,
      hard: matchedUser.submitStats.acSubmissionNum[3].count,
      totalSolved: matchedUser.submitStats.acSubmissionNum[0].count,
      submitStats: matchedUser.submitStats,
    };
  } catch (error) {
    throw new LeetcodeClientFetchUserStatError(username, error as Error);
  }
};

class LeetcodeClientFetchUserStatError extends CustomError {
  constructor(username: string, error: Error) {
    super(
      `Error fetching leetcode data for username: ${username}`,
      HTTP_STATUS_CODE.INTERNAL,
      error
    );
  }
}
