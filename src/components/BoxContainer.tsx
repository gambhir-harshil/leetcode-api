import { ReactNode } from "react";

type BoxContainerProps = {
  children: ReactNode;
  className: string;
};
export default function BoxContainer({
  children,
  className,
}: BoxContainerProps) {
  return <div className={`p-3 rounded-lg ${className} mb-5`}>{children}</div>;
}
