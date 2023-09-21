"use client";
import { useAuth } from "@/context/authContext";
import { fetchLeetcodeData } from "@/lib/clients/leetcode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function UserPage() {
  const [username, setUsername] = useState<string>("gambhir-harshil");
  const [userStats, setUserStats] = useState<any>(undefined);
  const { apiLogout } = useAuth();
  const router = useRouter();

  const userLogout = async () => {
    await apiLogout();
    router.push("/login");
  };

  async function fetchData(e?: any) {
    e?.preventDefault();
    const data = await fetchLeetcodeData(username);
    setUserStats(data);
  }

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line

  return (
    <div className="p-5">
      <form>
        <label>Username: </label>
        <input
          type="text"
          className="p-3 px-[2rem] m-5 border-b-2"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" onClick={fetchData} />
      </form>
      {userStats ? (
        <div>
          <h1>User: {userStats.username}</h1>
          <h2>
            <b>Submission Stats</b>
          </h2>
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
          <br />
          <br />
          <button onClick={userLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserPage;
