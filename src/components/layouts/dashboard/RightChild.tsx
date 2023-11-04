import { ReactNode } from "react";

type RightChildProps = {
  children: ReactNode;
};

export default function RightChild({ children }: RightChildProps) {
  return <div className="lg:col-span-2 lg:p-5">{children}</div>;
}
1;
