import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ message, actionLabel, onAction }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="CheckSquare" className="w-12 h-12 text-primary" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        No tasks yet
      </h3>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        {message || "Start being productive! Add your first task to get organized and stay on track."}
      </p>
      {onAction && actionLabel && (
        <button
          onClick={onAction}
          className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:brightness-110 active:scale-95 transition-all duration-200 flex items-center gap-2 shadow-lg"
        >
          <ApperIcon name="Plus" className="w-5 h-5" />
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
};

export default Empty;