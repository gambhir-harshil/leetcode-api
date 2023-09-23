"use client";
import { useAuth } from "@/context/authContext";
import useLeetcode from "@/hooks/useLeetcode";
import { useEffect, useState } from "react";

function UserPage() {
  const [username, setUsername] = useState<string>("gambhir-harshil");
  const { apiLogout } = useAuth();
  const { leetcodeData, fetchLeetcodeStatData } = useLeetcode();

  const userLogout = async () => {
    await apiLogout();
  };

  async function fetchData(e?: any) {
    e?.preventDefault();
    await fetchLeetcodeStatData(username);
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
      {leetcodeData ? (
        <div>
          <h1>User: {leetcodeData?.username}</h1>
          <h2>
            <b>Submission Stats</b>
          </h2>
          <ul>
            {leetcodeData?.submitStats.acSubmissionNum.map(
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
