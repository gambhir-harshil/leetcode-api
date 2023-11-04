import BoxContainer from "../BoxContainer";
import DailyTracker from "./DailyTracker";

export default function HomePageLanding() {
  return (
    <BoxContainer className="shadow-fill">
      <p className="text-[#5d5d5d] text-base font-bold">Hey, Yash 👋</p>
      <p className="text-[#878787]">
        You have a streak of 18 days 🔥. Keep it up!
      </p>
      <DailyTracker />
    </BoxContainer>
  );
}
