import Image from "next/image";
import BoxContainer from "../BoxContainer";
import LeaderboardTable from "./LeaderboardTable";
import LeaderboardRank from "../LeaderboardRank";

export default function LeaderboardLanding() {
  return (
    <BoxContainer className="shadow-fill mt-5">
      <div className="flex space-between relative w-full h-[15rem]">
        <div className="absolute w-[170px] top-[-1.8rem] left-[50%] ml-[85px] leaderboard-lead">
          <LeaderboardRank value={1} />
          <Image
            src="/imgs/user1.png"
            width={230}
            height={230}
            alt="leaderboard landing image 1"
            className="absolute right-0 top-0"
          />
        </div>
        <div className="absolute w-[140px] top-10 left-[-2rem]">
          <LeaderboardRank value={2} />
          <Image
            src="/imgs/user2.png"
            width={140}
            height={125}
            alt="leaderboard landing image 2"
            className="absolute top-0"
          />
        </div>
        <div className="absolute w-[120px] top-12 right-[-1rem]">
          <LeaderboardRank value={3} />
          <Image
            src="/imgs/user3.png"
            width={168}
            height={168}
            alt="leaderboard landing image 3"
            className="absolute"
          />
        </div>
      </div>
      <LeaderboardTable />
    </BoxContainer>
  );
}
