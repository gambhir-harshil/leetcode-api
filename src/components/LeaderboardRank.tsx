import { ReactNode } from "react";

type LeaderboardRankProps = {
  value: number;
};

export default function LeaderboardRank({ value }: LeaderboardRankProps) {
  return (
    <p className="py-[0.3em] px-[0.6em] absolute right-4 bg-white rounded-full z-10 font-extrabold text-[#8075FF] text-xl">
      {value}
    </p>
  );
}
