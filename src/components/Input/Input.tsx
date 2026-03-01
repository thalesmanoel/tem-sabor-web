import type { InputHTMLAttributes } from "react";
import "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, ...rest }: InputProps) {
  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <input className="input-field" {...rest} />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
}