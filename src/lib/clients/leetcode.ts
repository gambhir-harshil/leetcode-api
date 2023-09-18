import { API_ROUTES, HTTP_STATUS_CODE } from "@/types/consts";
import CustomError from "@/types/errors";

export const fetchLeetcodeData = async (username: string) => {
  try {
    const self: any = {};
    const response = await fetch(`${API_ROUTES.leetcode}/${username}`);
    const {
      resp: {
        data: { matchedUser },
      },
    } = await response.json();

    self.username = matchedUser.username;
    self.totalSolved = matchedUser.submitStats.acSubmissionNum[0].count;
    self.easy = matchedUser.submitStats.acSubmissionNum[1].count;
    self.medium = matchedUser.submitStats.acSubmissionNum[2].count;
    self.hard = matchedUser.submitStats.acSubmissionNum[3].count;
    self._goodSubmissions =
      matchedUser.submitStats.acSubmissionNum[0].submissions;
    self._totalSubmissions =
      matchedUser.submitStats.totalSubmissionNum[0].submissions;
    self.acceptanceRate = self._goodSubmissions
      ? Number(
          ((self._goodSubmissions / self._totalSubmissions) * 100).toFixed(2)
        )
      : 0;
    self.rank = matchedUser.profile.ranking;
    self.calendar = matchedUser.submissionCalendar;
    self.submissionCalendarJson = JSON.parse(self.calendar);
    self.submissionCalendar = new Map();
    self.submitStats = matchedUser.submitStats;

    if (self.calendar) {
      const submissionCalendarJson = JSON.parse(self.calendar);

      for (const timeKey in submissionCalendarJson) {
        if (submissionCalendarJson.hasOwnProperty(timeKey)) {
          self.submissionCalendar.set(timeKey, submissionCalendarJson[timeKey]);
        }
      }
    }

    self.values = Array.from(self.submissionCalendar.values());
    self.recentTenSubmissions = self.values.slice(-10);

    return self;
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
