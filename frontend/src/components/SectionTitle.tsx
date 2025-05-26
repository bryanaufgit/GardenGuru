import clsx from "clsx";
type Props = {
    children: React.ReactNode;
    className?: string;
  };
  
  export default function SectionTitle({ children, className = "" }: Props) {
    return (
      <h2
        className={clsx(
          "text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4",
          className
        )}
      >
        {children}
      </h2>
    );
  }