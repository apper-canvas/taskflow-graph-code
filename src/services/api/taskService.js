import tasksData from "@/services/mockData/tasks.json";

const STORAGE_KEY = "taskflow_tasks";
const WEBHOOK_URL = "https://webhook.site/9dd90ca4-8f1d-4037-938a-cf214154ba98";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [...tasksData];
  } catch (error) {
    console.error("Error loading from storage:", error);
    return [...tasksData];
  }
};

const saveToStorage = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving to storage:", error);
  }
};

const sendWebhook = async (task) => {
  try {
    const payload = {
      event: "task_created",
      task: task,
      timestamp: new Date().toISOString()
    };

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Webhook error:", error);
    return { success: false, error: error.message };
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
    await delay(300);
    const tasks = loadFromStorage();
    
    const maxId = tasks.length > 0 
      ? Math.max(...tasks.map(t => t.Id))
      : 0;
    
    const newTask = {
      Id: maxId + 1,
      id: `task_${Date.now()}`,
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
  }
};

export default taskService;