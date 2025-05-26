import clsx from "clsx";

type Props = {
    children: React.ReactNode;
    className?: string;
  };
  
  export default function Card({ children, className = "" }: Props) {
    return (
      <div className={clsx("bg-white shadow-md rounded-xl p-4", className)}>
        {children}
      </div>
    );
  }