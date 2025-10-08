import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = React.forwardRef(({ 
  className,
  checked,
  onChange,
  ...props 
}, ref) => {
  return (
    <motion.button
      ref={ref}
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "w-6 h-6 border-2 flex items-center justify-center transition-all duration-150",
        checked 
          ? "bg-primary border-primary" 
          : "bg-white border-gray-300 hover:border-primary",
        className
      )}
      {...props}
    >
      {checked && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <ApperIcon name="Check" className="w-4 h-4 text-white" strokeWidth={3} />
        </motion.div>
      )}
    </motion.button>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;