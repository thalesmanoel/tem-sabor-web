import { useId, type InputHTMLAttributes } from "react";
import "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, ...rest }: InputProps) {
  const generatedId = useId();
  const inputId = rest.id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className="input-container">
      <label className="input-label" htmlFor={inputId}>
        {label}
      </label>
      <input
        className="input-field"
        {...rest}
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : rest["aria-describedby"]}
      />
      {error && (
        <span className="input-error" id={errorId}>
          {error}
        </span>
      )}
    </div>
  );
}
