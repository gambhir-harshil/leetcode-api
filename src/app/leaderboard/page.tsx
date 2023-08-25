"use client";
import { useEffect, useState } from 'react';

interface SubmissionStats {
  difficulty: string;
  count: number;
  submissions: number;
}

interface UserData {
  username: string;
  submitStats: {
    acSubmissionNum: SubmissionStats[];
    totalSubmissionNum: SubmissionStats[];
  };
}

function UserPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const username = "gambhir-harshil"; 

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/leetcode/${username}`);
        const data = await response.json();
        setUserData(data.data.data.matchedUser);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [username]);

  //stats
  const name = userData?.username;
  const totalSolved = userData?.submitStats.acSubmissionNum[0].count;
  const easy = userData?.submitStats.acSubmissionNum[1].count;
  const medium = userData?.submitStats.acSubmissionNum[2].count;
  const hard = userData?.submitStats.acSubmissionNum[3].count;

  //acceptancy rate
  const goodSubmissions = userData?.submitStats.acSubmissionNum[0].submissions;
  const totalSubmissions = userData?.submitStats.totalSubmissionNum[0].submissions;
  const acceptanceRate = goodSubmissions !== 0 ? ((goodSubmissions / totalSubmissions) * 100).toFixed(2) : 0;

  //rank
  const rank = userData?.profile.ranking;

  //calendar
  const submissionCalendar = new Map();
  const calendar = userData?.submissionCalendar;

  if(calendar) {
    const submissionCalendarJson = JSON.parse(calendar);

    for (const timeKey in submissionCalendarJson) {
      if (submissionCalendarJson.hasOwnProperty(timeKey)) {
        submissionCalendar.set(timeKey, submissionCalendarJson[timeKey]);
      }
    }
  }

  const values = Array.from(submissionCalendar.values());
  const recentTenSubmissions = values.slice(-10);




  return (
    <div>
      {userData ? (
        <div>
          <h1>User: {userData.username}</h1>
          <h2>Submission Stats</h2>
          <ul>
            {userData.submitStats.acSubmissionNum.map((stat, index) => (
              <li key={index}>
                Difficulty: {stat.difficulty}, Count: {stat.count}, Submissions: {stat.submissions}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserPage;

