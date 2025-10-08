import React from "react";
import { cn } from "@/utils/cn";

const Select = React.forwardRef(({ 
  className,
  children,
  error,
  ...props 
}, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        "w-full px-4 py-2.5 bg-white border outline-none transition-all duration-200 appearance-none",
        "focus:border-primary focus:ring-2 focus:ring-primary/20",
        "cursor-pointer",
        error ? "border-error focus:border-error focus:ring-error/20" : "border-gray-300",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = "Select";

export default Select;