import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";

const SearchBar = ({ value, onChange, placeholder = "Search tasks..." }) => {
  return (
    <div className="relative">
      <ApperIcon 
        name="Search" 
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
      />
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-12 bg-white"
      />
    </div>
  );
};

export default SearchBar;