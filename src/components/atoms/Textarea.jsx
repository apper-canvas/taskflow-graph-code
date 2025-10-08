import React from "react";
import { cn } from "@/utils/cn";

const Textarea = React.forwardRef(({ 
  className,
  error,
  ...props 
}, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full px-4 py-2.5 bg-white border outline-none transition-all duration-200 resize-none",
        "focus:border-primary focus:ring-2 focus:ring-primary/20",
        "placeholder:text-gray-400",
        error ? "border-error focus:border-error focus:ring-error/20" : "border-gray-300",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;