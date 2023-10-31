import { ReactNode, useState } from "react";
import MobileMenu from "@/components/MobileMenu";
import Header from "@/components/Header";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { MAX_WIDTH } from "@/lib/types/consts";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className="text-sm">
      {isMenuOpen && <MobileMenu closeMenu={() => setIsMenuOpen(false)} />}
      <Header openMenu={() => setIsMenuOpen(true)} />
      <MaxWidthWrapper val={MAX_WIDTH} className="p-3">
        <section className="lg:grid lg:grid-cols-7">{children}</section>
      </MaxWidthWrapper>
    </div>
  );
}
