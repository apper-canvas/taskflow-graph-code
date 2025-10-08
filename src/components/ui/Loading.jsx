import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="w-full space-y-4">
      {[1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white shadow-sm p-4 border-l-4 border-gray-200"
        >
          <div className="space-y-3">
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-6 bg-gray-100 rounded w-20 animate-pulse" />
              <div className="h-6 bg-gray-100 rounded w-24 animate-pulse" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Loading;