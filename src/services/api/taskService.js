import tasksData from "@/services/mockData/tasks.json";

const STORAGE_KEY = "taskflow_tasks";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const initialTasks = JSON.parse(JSON.stringify(tasksData));
      saveToStorage(initialTasks);
      return initialTasks;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error("Error loading from storage:", error);
    return JSON.parse(JSON.stringify(tasksData));
  }
};

const saveToStorage = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving to storage:", error);
  }
};

let apperClient = null;

const initializeApperClient = () => {
  if (!apperClient) {
    if (!window.ApperSDK || !window.ApperSDK.ApperClient) {
      throw new Error('ApperSDK not loaded. Ensure the SDK script is included in index.html.');
    }
    const { ApperClient } = window.ApperSDK;
    apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  }
  return apperClient;
};

const sendWebhook = async (task) => {
  try {
    const client = initializeApperClient();
    const result = await client.functions.invoke(
      import.meta.env.VITE_SEND_TASK_WEBHOOK,
      {
        body: JSON.stringify({ task }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (result.success === false) {
      console.info(`apper_info: Got an error in this function: ${import.meta.env.VITE_SEND_TASK_WEBHOOK}. The response body is: ${JSON.stringify(result)}.`);
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.info(`apper_info: Got this error in this function: ${import.meta.env.VITE_SEND_TASK_WEBHOOK}. The error is: ${error.message}`);
    return { success: false, error: error.message };
  }
};
const callBhusanFunction = async () => {
  try {
    const client = initializeApperClient();
    const result = await client.functions.invoke(import.meta.env.VITE_BHUSAN_TEST, {
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (result.success === false) {
      console.info(`apper_info: Got an error in this function: ${import.meta.env.VITE_BHUSAN_TEST}. The response body is: ${JSON.stringify(result)}.`);
      throw new Error(result.message || 'Failed to generate description');
    }

    return result;
  } catch (error) {
    console.info(`apper_info: Got this error in this function: ${import.meta.env.VITE_BHUSAN_TEST}. The error is: ${error.message}`);
    throw error;
  }
};
const taskService = {
  getAll: async () => {
    await delay(300);
    const tasks = loadFromStorage();
    return [...tasks];
  },

  getById: async (id) => {
    await delay(200);
    const tasks = loadFromStorage();
    const task = tasks.find(t => t.Id === parseInt(id));
    return task ? { ...task } : null;
  },

create: async (taskData) => {
    try {
      await delay(300);
      const tasks = loadFromStorage();
      
      const maxId = tasks.length > 0 
        ? Math.max(...tasks.map(t => t.Id))
        : 0;
      
      const newTask = {
        Id: maxId + 1,
        title: taskData.title,
        description: taskData.description || "",
        completed: false,
        priority: taskData.priority || "medium",
        dueDate: taskData.dueDate || null,
        category: taskData.category || "",
        createdAt: new Date().toISOString(),
        completedAt: null
      };
      
      tasks.push(newTask);
      saveToStorage(tasks);
      
      const webhookResult = await sendWebhook(newTask);
      
      return { 
        task: { ...newTask },
        webhookResult 
      };
    } catch (error) {
      throw new Error(error.message || "Failed to create task");
    }
  },

  update: async (id, updates) => {
    await delay(250);
    const tasks = loadFromStorage();
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    tasks[index] = {
      ...tasks[index],
      ...updates,
      Id: tasks[index].Id,
      id: tasks[index].id,
      createdAt: tasks[index].createdAt
    };
    
    if (updates.completed && !tasks[index].completedAt) {
      tasks[index].completedAt = new Date().toISOString();
    } else if (updates.completed === false) {
      tasks[index].completedAt = null;
    }
    
    saveToStorage(tasks);
    return { ...tasks[index] };
  },

  delete: async (id) => {
    await delay(200);
    const tasks = loadFromStorage();
    const filteredTasks = tasks.filter(t => t.Id !== parseInt(id));
    saveToStorage(filteredTasks);
    return { success: true };
  },

  callBhusanFunction
};

export default taskService;