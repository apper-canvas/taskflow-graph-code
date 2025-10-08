import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  className,
  type = "text",
  error,
  ...props 
}, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "w-full px-4 py-2.5 bg-white border outline-none transition-all duration-200",
        "focus:border-primary focus:ring-2 focus:ring-primary/20",
        "placeholder:text-gray-400",
        error ? "border-error focus:border-error focus:ring-error/20" : "border-gray-300",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;