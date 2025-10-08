import React from "react";
import { motion } from "framer-motion";
import TaskCard from "@/components/organisms/TaskCard";
import Empty from "@/components/ui/Empty";

const TaskList = ({ tasks, onUpdate, onDelete }) => {
  if (tasks.length === 0) {
    return <Empty message="No tasks found. Add your first task to get started!" />;
  }

  return (
    <motion.div 
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {tasks.map((task, index) => (
        <motion.div
          key={task.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <TaskCard
            task={task}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TaskList;