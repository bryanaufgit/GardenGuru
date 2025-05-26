import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export default function Button({ variant = "primary", className, ...props }: Props) {
  const base = "px-4 py-2 rounded-xl font-medium focus:outline-none focus:ring-2";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark focus:ring-primary",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400",
    danger: "bg-danger text-white hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button
      {...props}
      type={props.type ?? "button"}
      className={clsx(base, variants[variant], className)}
    />
  );
}