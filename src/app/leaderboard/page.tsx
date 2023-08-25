"use client";
import UserData from "@/utils/userData";
import { useEffect, useState } from "react";

function UserPage() {
  const [username, setUsername] = useState<string>("gambhir-harshil");
  const [userStats, setUserStats] = useState<any>(undefined);
  const userData = new UserData();

  useEffect(() => {
    async function fetchData() {
      await userData.fetchLeetcodeData(username);
      setUserStats(userData);
    }
    fetchData();
  }, [username]); // eslint-disable-line

  return (
    <div>
      {userStats ? (
        <div>
          <h1>User: {userData.username}</h1>
          <h2>Submission Stats</h2>
          <ul>
            {userStats.submitStats.acSubmissionNum.map(
              (stat: any, index: any) => (
                <li key={index}>
                  Difficulty: {stat.difficulty}, Count: {stat.count},
                  Submissions: {stat.submissions}
                </li>
              )
            )}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserPage;
