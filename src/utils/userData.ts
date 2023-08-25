import { API_ROUTES } from "./consts";

export default class UserData {
  username: string;
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  goodSubmissions: number;
  totalSubmissions: number;
  acceptanceRate: number;
  rank: number;
  submissionCalendar: any;
  submissionCalendarJson: any;
  calendar: any;
  values: any[];
  recentTenSubmissions: any[];
  submitStats: any;

  constructor() {
    this.username = undefined || "";
    this.totalSolved = undefined || 0;
    this.easy = undefined || 0;
    this.medium = undefined || 0;
    this.hard = undefined || 0;
    this.goodSubmissions = undefined || 0;
    this.totalSubmissions = undefined || 0;
    this.acceptanceRate = undefined || 0;
    this.rank = undefined || 0;
    this.submissionCalendar = undefined;
    this.submissionCalendarJson = undefined;
    this.calendar = undefined || {};
    this.values = undefined || [];
    this.recentTenSubmissions = undefined || [];
    this.submitStats = undefined;
  }

  fetchLeetcodeData = async (username: string) => {
    try {
      const response = await fetch(`${API_ROUTES.leetcode}/${username}`);
      const {
        resp: {
          data: { matchedUser },
        },
      } = await response.json();

      this.username = matchedUser.username;
      this.totalSolved = matchedUser.submitStats.acSubmissionNum[0].count;
      this.easy = matchedUser.submitStats.acSubmissionNum[1].count;
      this.medium = matchedUser.submitStats.acSubmissionNum[2].count;
      this.hard = matchedUser.submitStats.acSubmissionNum[3].count;
      this.goodSubmissions =
        matchedUser.submitStats.acSubmissionNum[0].submissions;
      this.totalSubmissions =
        matchedUser.submitStats.totalSubmissionNum[0].submissions;
      this.acceptanceRate = this.goodSubmissions
        ? Number(
            ((this.goodSubmissions / this.totalSubmissions) * 100).toFixed(2)
          )
        : 0;
      this.rank = matchedUser.profile.ranking;
      this.calendar = matchedUser.submissionCalendar;
      this.submissionCalendarJson = JSON.parse(this.calendar);
      this.submissionCalendar = new Map();
      this.submitStats = matchedUser.submitStats;

      if (this.calendar) {
        const submissionCalendarJson = JSON.parse(this.calendar);

        for (const timeKey in submissionCalendarJson) {
          if (submissionCalendarJson.hasOwnProperty(timeKey)) {
            this.submissionCalendar.set(
              timeKey,
              submissionCalendarJson[timeKey]
            );
          }
        }
      }

      this.values = Array.from(this.submissionCalendar.values());
      this.recentTenSubmissions = this.values.slice(-10);

      return this;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  getCalender = () => {
    for (const timeKey in this.submissionCalendarJson()) {
      if (this.submissionCalendarJson.hasOwnProperty(timeKey)) {
        this.submissionCalendar.set(
          timeKey,
          this.submissionCalendarJson[timeKey]
        );
      }
    }
  };
}
