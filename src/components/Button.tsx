import {ReactNode} from "react";
import {classNames} from "../utils/helpers.ts";

interface ButtonProps {
  children: ReactNode | string;
  variant?: "primary" | "secondary" | "tertiary" | "error" | "error-icon";
  className?: string;
  type?: "button" | "submit" | "reset";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick: () => void;
}

const Button = ({ children, className, type = "button", size = "medium", disabled, startIcon, endIcon, onClick, variant = "primary" }: ButtonProps) => {
  return (
    <button
      className={classNames("inline-flex items-center justify-center gap-x-1.5 rounded-full font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-500 ease-in-out",
        variant === "error-icon" ? "" : "shadow-md",
        variant === "primary" ? "text-white bg-primary-700 hover:bg-primary-600 focus-visible:outline-primary-600" :
          variant === "secondary" ? "bg-primary-300 text-gray-700 hover:bg-primary-200" :
            variant === "error" ? "bg-red-600 hover:bg-red-500" :
        variant === "error-icon" ? "text-red-600 hover:text-red-400 shadow-none bg-transparent" :
          "bg-gray-50 text-primary-800 hover:bg-gray-100 border border-primary-600",
        size === "small" ? "px-2.5 py-1.5 text-sm" : size === "medium" ? "px-3 py-2 text-sm" : "px-3.5 py-2.5 text-lg uppercase",
        className)}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
}

export default Button;