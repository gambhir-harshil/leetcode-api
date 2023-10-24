import { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <section className="lg:grid lg:grid-cols-7">{children}</section>;
}
