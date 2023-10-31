"use client";

import HomePageBlogWrapper from "@/components/homepage/HomePageBlogWrapper";
import HomePageLanding from "@/components/homepage/HomePageLanding";
import HomePageLeaderboard from "@/components/homepage/HomePageLeaderboard";
import HomePageLeetcodeStats from "@/components/homepage/HomePageLeetcodeStats";
import HomePageLevel from "@/components/homepage/HomePageLevel";
import LeftChild from "@/components/layouts/dashboard/LeftChild";
import RightChild from "@/components/layouts/dashboard/RightChild";
import DashboardLayout from "@/components/layouts/dashboard/DashboardLayout";

export default function HomePageMain() {
  return (
    <DashboardLayout>
      <LeftChild>
        <HomePageLanding />
        <HomePageLevel />
        <HomePageLeetcodeStats />
      </LeftChild>
      <RightChild>
        <HomePageLeaderboard />
        <HomePageBlogWrapper />
      </RightChild>
    </DashboardLayout>
  );
}
