import React from "react";
import { cn } from "@/utils/cn";

const PriorityBadge = ({ priority }) => {
  const styles = {
    low: "bg-gray-100 text-gray-700",
    medium: "bg-secondary/10 text-secondary",
    high: "bg-accent/10 text-accent"
  };

  const labels = {
    low: "Low",
    medium: "Medium",
    high: "High"
  };

  return (
    <span className={cn(
      "px-2.5 py-1 text-xs font-semibold rounded-full",
      styles[priority] || styles.medium
    )}>
      {labels[priority] || priority}
    </span>
  );
};

export default PriorityBadge;