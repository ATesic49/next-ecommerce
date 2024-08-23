"use client";
import { useFormStatus } from "react-dom";
type buttonProprs = {
  children: ReactNode;
  className?: string;
} & ComponentProps<"button">;
import React, { ComponentProps, ReactNode } from "react";

const Button = ({ children, className, ...props }: buttonProprs) => {
  const { pending } = useFormStatus();
  return (
    <>
      <button
        {...props}
        disabled={pending}
        type="submit"
        className={`btn btn-primary ${className}`}
      >
        {pending && (
          <span className="loading loading-spinner loading-sm"></span>
        )}
        {children}
      </button>
    </>
  );
};

export default Button;
