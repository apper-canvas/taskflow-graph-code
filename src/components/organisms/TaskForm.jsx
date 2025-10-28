import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import FormField from "@/components/molecules/FormField";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import taskService from "@/services/api/taskService";

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    category: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error("Task title is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await taskService.create(formData);
      
      if (result.webhookResult.success) {
        toast.success("Task created and webhook sent successfully!");
      } else {
        toast.warning("Task created but webhook delivery failed");
      }
      
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
        category: ""
      });
      
      if (onTaskCreated) {
        onTaskCreated(result.task);
      }
    } catch (error) {
      toast.error("Failed to create task");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white shadow-md p-6 mb-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
          <ApperIcon name="Plus" className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Add New Task</h2>
      </div>

      <div className="space-y-4">
        <FormField
          label="Task Title"
          required
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="What needs to be done?"
        />

        <FormField label="Description">
          <Textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Add more details..."
            rows={3}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Priority">
            <Select
              value={formData.priority}
              onChange={(e) => handleChange("priority", e.target.value)}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </Select>
          </FormField>

          <FormField
            label="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
          />

          <FormField
            label="Category"
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            placeholder="e.g., Work, Personal"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <ApperIcon name="Plus" className="w-4 h-4" />
                Add Task
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.form>
  );
};

export default TaskForm;