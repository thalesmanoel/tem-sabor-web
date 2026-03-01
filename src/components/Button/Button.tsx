import type { ButtonHTMLAttributes } from "react";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button className="custom-button" {...rest}>
      {children}
    </button>
  );
}