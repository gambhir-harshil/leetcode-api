"use client";

import { useState } from "react";
import Header from "@/components/Header";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MobileMenu from "@/components/MobileMenu";
import HomePageBlogWrapper from "@/components/homepage/HomePageBlogWrapper";
import HomePageLanding from "@/components/homepage/HomePageLanding";
import HomePageLeaderboard from "@/components/homepage/HomePageLeaderboard";
import HomePageLeetcodeStats from "@/components/homepage/HomePageLeetcodeStats";
import HomePageLevel from "@/components/homepage/HomePageLevel";
import { MAX_WIDTH } from "@/lib/types/consts";
import LeftChild from "@/components/layouts/dashboard/LeftChild";
import RightChild from "@/components/layouts/dashboard/RightChild";
import DashboardLayout from "@/components/layouts/dashboard/DashboardLayout";

export default function HomePageMain() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <div className="text-sm">
      {isMenuOpen && <MobileMenu closeMenu={() => setIsMenuOpen(false)} />}
      <Header openMenu={() => setIsMenuOpen(true)} />
      <MaxWidthWrapper val={MAX_WIDTH} className="p-3">
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
      </MaxWidthWrapper>
    </div>
  );
}
