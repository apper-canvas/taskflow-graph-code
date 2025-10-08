import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  children, 
  className, 
  variant = "primary",
  size = "medium",
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-primary text-white hover:brightness-110",
    secondary: "bg-secondary text-white hover:brightness-110",
    accent: "bg-accent text-white hover:brightness-110",
    outline: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
    danger: "bg-error text-white hover:brightness-110"
  };

  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg"
  };

  return (
    <button
      ref={ref}
      className={cn(
        "font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;