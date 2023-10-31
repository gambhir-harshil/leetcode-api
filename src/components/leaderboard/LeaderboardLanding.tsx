import Image from "next/image";
import BoxContainer from "../BoxContainer";
import LeaderboardTable from "./LeaderboardTable";

export default function LeaderboardLanding() {
  return (
    <BoxContainer className="shadow-fill mt-5">
      <div className="flex space-between relative w-full h-[15rem]">
        <div className="absolute w-[170px] top-[-1.8rem] left-[5.7rem]">
          <p className="py-[0.2em] px-[0.5em] absolute right-4 bg-white rounded-full z-10 font-extrabold text-[#8075FF] text-2xl">
            1
          </p>
          <Image
            src="/imgs/user1.png"
            width={230}
            height={230}
            alt="leaderboard landing image 1"
            className="absolute right-0 top-0"
          />
        </div>
        <div className="absolute w-[140px] top-10 left-[-2rem]">
          <p className="py-[0.2em] px-[0.5em] absolute left-4 bg-white rounded-full z-10 font-extrabold text-[#8075FF] text-2xl">
            2
          </p>
          <Image
            src="/imgs/user2.png"
            width={140}
            height={125}
            alt="leaderboard landing image 2"
            className="absolute top-0"
          />
        </div>
        <div className="absolute w-[120px] top-12 right-[-1rem]">
          <p className="py-[0.2em] px-[0.5em] absolute right-4 bg-white rounded-full z-10 font-extrabold text-[#8075FF] text-2xl">
            3
          </p>
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
