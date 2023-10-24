type MaxWidthWrapperProps = {
  val: string;
  children: React.ReactNode;
  className?: string;
};

export default function MaxWidthWrapper({
  children,
  val,
  className,
}: MaxWidthWrapperProps) {
  return (
    <div className={`tw-w-full ${className}`}>
      <div
        className="tw-relative"
        style={{
          maxWidth: val,
          margin: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}
