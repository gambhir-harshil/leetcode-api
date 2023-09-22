import { useState } from "react";
import { API_ROUTES } from "@/lib/types/consts";

type LeetcodeData = {
  username: string;
  easy: number;
  medium: number;
  hard: number;
  totalSolved: number;
  submitStats?: any;
};

export default function useLeetcode() {
  const [leetcodeData, setLeetcodeData] = useState<LeetcodeData | undefined>(
    undefined
  );

  const fetchLeetcodeStatData = async (username: string) => {
    const response = await fetch(`${API_ROUTES.leetcode.url}/${username}`);
    const { leetcodeData } = await response.json();
    setLeetcodeData(leetcodeData);
  };

  return {
    leetcodeData,
    fetchLeetcodeStatData,
  };
}
