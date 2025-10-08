import React from "react";
import { format, isPast, isToday, isTomorrow, differenceInDays } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const DateDisplay = ({ date, completed }) => {
  if (!date) return null;

  const dueDate = new Date(date);
  const isOverdue = isPast(dueDate) && !isToday(dueDate) && !completed;
  const isDueSoon = differenceInDays(dueDate, new Date()) <= 3 && !isOverdue && !completed;

  let displayText = format(dueDate, "MMM d, yyyy");
  if (isToday(dueDate)) displayText = "Today";
  if (isTomorrow(dueDate)) displayText = "Tomorrow";

  return (
    <div className={cn(
      "flex items-center gap-1.5 text-sm font-medium",
      isOverdue && "text-error",
      isDueSoon && "text-warning",
      !isOverdue && !isDueSoon && "text-gray-600"
    )}>
      <ApperIcon name="Calendar" className="w-4 h-4" />
      {displayText}
    </div>
  );
};

export default DateDisplay;