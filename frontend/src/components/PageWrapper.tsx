import clsx from "clsx";
type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function PageWrapper({ children, className }: Props) {
  return (
    <div className={clsx("w-full max-w-screen-lg mx-auto px-4 sm:px-8 py-6", className)}>
      {children}
    </div>
  );
}