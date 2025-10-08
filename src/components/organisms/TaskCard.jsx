import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Checkbox from "@/components/atoms/Checkbox";
import Button from "@/components/atoms/Button";
import PriorityBadge from "@/components/molecules/PriorityBadge";
import DateDisplay from "@/components/molecules/DateDisplay";
import taskService from "@/services/api/taskService";
import { cn } from "@/utils/cn";

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const priorityColors = {
    low: "border-gray-300",
    medium: "border-secondary",
    high: "border-accent"
  };

  const handleToggleComplete = async () => {
    try {
      const updated = await taskService.update(task.Id, {
        completed: !task.completed
      });
      onUpdate(updated);
      toast.success(task.completed ? "Task marked as incomplete" : "Task completed!");
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await taskService.delete(task.Id);
      onDelete(task.Id);
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Failed to delete task");
      setIsDeleting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -100 }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "bg-white shadow-sm p-4 border-l-4 hover:shadow-md transition-shadow duration-200",
          priorityColors[task.priority] || priorityColors.medium,
          task.completed && "opacity-60"
        )}
      >
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <Checkbox
              checked={task.completed}
              onChange={handleToggleComplete}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "text-lg font-semibold text-gray-900 mb-1",
              task.completed && "line-through text-gray-500"
            )}>
              {task.title}
            </h3>

            {task.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {task.description}
              </p>
            )}

            <div className="flex flex-wrap gap-2 items-center">
              <PriorityBadge priority={task.priority} />
              
              {task.category && (
                <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                  {task.category}
                </span>
              )}

              {task.dueDate && (
                <DateDisplay date={task.dueDate} completed={task.completed} />
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="small"
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-error hover:bg-error/10"
            >
              {isDeleting ? (
                <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
              ) : (
                <ApperIcon name="Trash2" className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TaskCard;