import { LEADERBOARD_DUMMY_USERS } from "@/lib/types/consts";
import BoxContainer from "../BoxContainer";

export default function HomePageLeaderboard() {
  return (
    <BoxContainer className="shadow-fill">
      <p className="text-darkgray text-base font-bold mb-3">
        Friends on the Leaderboard 📈
      </p>
      {LEADERBOARD_DUMMY_USERS.map((user) => {
        return (
          <div
            key={user.id}
            className="flex text-[#676767] bg-[#eaebff] rounded px-4 py-2 my-2 cursor-pointer hover:opacity-90"
          >
            <p className="mr-5 w-5">{user.id}</p>
            <p>{user.name}</p>
          </div>
        );
      })}
    </BoxContainer>
  );
}
