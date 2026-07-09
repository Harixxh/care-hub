import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  default: "bg-gradient-to-r from-[#2f8fe5] to-[#1fc8c0] text-white shadow-[0_16px_40px_rgba(47,143,229,0.22)]",
  secondary: "border border-[#2f8fe5] bg-white text-[#2f8fe5] hover:bg-slate-50 shadow-sm",
  outline: "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 shadow-sm",
  ghost: "text-slate-600 hover:bg-slate-100",
  destructive: "bg-rose-600 text-white hover:bg-rose-500 shadow-[0_12px_35px_rgba(225,29,72,0.18)]",
} as const;

type ButtonVariant = keyof typeof buttonVariants;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "default" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:pointer-events-none disabled:opacity-50",
          buttonVariants[variant],
          size === "sm" && "h-9 px-3",
          size === "default" && "h-11 px-5",
          size === "lg" && "h-12 px-6 text-base",
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
