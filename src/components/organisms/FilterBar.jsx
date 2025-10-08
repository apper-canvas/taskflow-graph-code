import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import SearchBar from "@/components/molecules/SearchBar";
import { cn } from "@/utils/cn";

const FilterBar = ({ 
  filterStatus, 
  onFilterChange, 
  sortBy, 
  onSortChange,
  searchQuery,
  onSearchChange,
  stats 
}) => {
  const statusOptions = [
    { value: "all", label: "All Tasks", count: stats.total },
    { value: "active", label: "Active", count: stats.active },
    { value: "completed", label: "Completed", count: stats.completed }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-sm p-4 mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SearchBar
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
        />

        <div className="flex gap-2">
          {statusOptions.map((option) => (
            <Button
              key={option.value}
              variant={filterStatus === option.value ? "primary" : "outline"}
              size="small"
              onClick={() => onFilterChange(option.value)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2",
                filterStatus === option.value && "shadow-md"
              )}
            >
              <span>{option.label}</span>
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs font-bold",
                filterStatus === option.value 
                  ? "bg-white/20 text-white" 
                  : "bg-gray-100 text-gray-600"
              )}>
                {option.count}
              </span>
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ApperIcon name="ArrowUpDown" className="w-5 h-5 text-gray-400" />
          <Select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="flex-1"
          >
            <option value="createdAt">Sort by Created Date</option>
            <option value="dueDate">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="title">Sort by Title</option>
          </Select>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;