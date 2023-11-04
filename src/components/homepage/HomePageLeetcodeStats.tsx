import BoxContainer from "../BoxContainer";
import ActivityFrequencyChart from "./ActivityFrequencyChart";

export default function HomePageLeetcodeStats() {
  return (
    <BoxContainer className="shadow-fill">
      <p className="text-[#5d5d5d] text-base font-bold">
        Your Leetcode Stats 📊
      </p>
      <ActivityFrequencyChart />
      <div className="text-lightgray flex justify-around list-none mt-5 flex-nowrap overflow-x-scroll space-x-4 no-scrollbar">
        <li className="ml-[6rem] cursor-pointer hover:text-[#3061f1] whitespace-nowrap">
          Acceptance Rate
        </li>
        <li className="cursor-pointer hover:text-[#3061f1] whitespace-nowrap">
          Easy Solved
        </li>
        <li className="cursor-pointer hover:text-[#3061f1] whitespace-nowrap">
          Medium Solved
        </li>
        <li className="cursor-pointer hover:text-[#3061f1] whitespace-nowrap">
          Hard Solved
        </li>
      </div>
    </BoxContainer>
  );
}
