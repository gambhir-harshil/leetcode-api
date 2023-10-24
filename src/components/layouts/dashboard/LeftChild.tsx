import { ReactNode } from "react";

type LeftChildProps = {
  children: ReactNode;
};

export default function LeftChild({ children }: LeftChildProps) {
  return <div className="lg:col-span-5 lg:p-5">{children}</div>;
}
