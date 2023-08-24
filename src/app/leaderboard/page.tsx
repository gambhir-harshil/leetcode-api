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

