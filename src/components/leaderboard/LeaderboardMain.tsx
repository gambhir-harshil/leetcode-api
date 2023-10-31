"use client";

import DashboardLayout from "../layouts/dashboard/DashboardLayout";
import LeftChild from "../layouts/dashboard/LeftChild";
import RightChild from "../layouts/dashboard/RightChild";
import LeaderboardLanding from "./LeaderboardLanding";

export default function LeaderboardMain() {
  return (
    <DashboardLayout>
      <LeftChild>
        <LeaderboardLanding />
      </LeftChild>
      <RightChild>
        <p></p>
      </RightChild>
    </DashboardLayout>
  );
}
