"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { MAX_WIDTH } from "@/lib/types/consts";

type HeaderProps = {
  openMenu: () => void;
};

export default function Header({ openMenu }: HeaderProps) {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("home");

  return (
    <MaxWidthWrapper val={MAX_WIDTH} className="bg-[#8075FF]">
      <header>
        <div className="w-full px-4 py-6 lg:px-7 lg:py-5 text-white flex justify-between items-center">
          <p className="font-extrabold text-sm w-[50%] lg:text-xl lg:w-[35%]">
            Nothing to FAANG 🚀
          </p>
          <ul className="w-[30%] items-center space-x-7 font-bold hidden lg:flex">
            <li>
              <Link
                href="/homepage/#"
                onClick={() => setSelectedMenuItem("home")}
                className={`${
                  selectedMenuItem === "home" ? "text-white" : "text-[#C4BFFF]"
                } hover:text-white`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/homepage/#"
                onClick={() => setSelectedMenuItem("roadmap")}
                className={`${
                  selectedMenuItem === "roadmap"
                    ? "text-white"
                    : "text-[#C4BFFF]"
                } hover:text-white`}
              >
                Roadmap
              </Link>
            </li>
            <li>
              <Link
                href="/homepage/#"
                onClick={() => setSelectedMenuItem("leaderboard")}
                className={`${
                  selectedMenuItem === "leaderboard"
                    ? "text-white"
                    : "text-[#C4BFFF]"
                } hover:text-white`}
              >
                Leaderboard
              </Link>
            </li>
          </ul>
          <FaBars className="lg:hidden cursor-pointer" onClick={openMenu} />
          <div className="hidden lg:block lg:w-[30%]"></div>
        </div>
      </header>
    </MaxWidthWrapper>
  );
}
