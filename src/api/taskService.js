const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getTasks = () => {
  try {
    const tasksData = localStorage.getItem('tasks');
    if (!tasksData) {
      console.log('No tasks found in localStorage, returning empty array');
      return [];
    }
    
    const parsedTasks = JSON.parse(tasksData);
    if (!Array.isArray(parsedTasks)) {
      console.error('Tasks data is not an array:', parsedTasks);
      return [];
    }
    
    return parsedTasks;
  } catch (error) {
    console.error('Error reading tasks from localStorage:', error);
    return [];
  }
};

const saveTasks = (tasks) => {
  try {
    if (!Array.isArray(tasks)) {
      throw new Error('Cannot save tasks: data is not an array');
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return true;
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
    return false;
  }
};

export const taskService = {
  getTasks: async (userId) => {
    try {
      await delay(800);
      if (!userId) {
        console.warn('getTasks called without a valid userId');
        return [];
      }
      
      const tasks = getTasks();
      const userTasks = tasks.filter((task) => task.userId === userId);
      
      console.log(`Retrieved ${userTasks.length} tasks for user ${userId}`);
      return userTasks;
    } catch (error) {
      console.error('Error in getTasks service:', error);
      throw new Error(`Failed to get tasks: ${error.message}`);
    }
  },

  addTask: async (taskData) => {
    try {
      await delay(500);
      
      if (!taskData || !taskData.userId) {
        throw new Error('Invalid task data or missing userId');
      }

      const newTask = {
        _id: Date.now().toString(),
        title: taskData.title || 'Untitled Task',
        description: taskData.description || '',
        completed: false,
        userId: taskData.userId,
        createdAt: new Date().toISOString(),
        priority: taskData.priority || 'medium',
        dueDate: taskData.dueDate || null,
        category: taskData.category || 'Other',
        progress: 0,
      };

      const tasks = getTasks();
      tasks.push(newTask);
      const saveSuccess = saveTasks(tasks);
      
      if (!saveSuccess) {
        throw new Error('Failed to save task to storage');
      }

      return newTask;
    } catch (error) {
      console.error('Error in addTask service:', error);
      throw new Error(`Failed to add task: ${error.message}`);
    }
  },

  updateTask: async (taskId, taskData) => {
    try {
      await delay(500);
      
      if (!taskId) {
        throw new Error('Task ID is required');
      }

      const tasks = getTasks();
      const taskIndex = tasks.findIndex((task) => task._id === taskId);

      if (taskIndex === -1) {
        throw new Error('Task not found');
      }

      const updatedTask = {
        ...tasks[taskIndex],
        ...taskData,
        updatedAt: new Date().toISOString(),
      };

      tasks[taskIndex] = updatedTask;
      const saveSuccess = saveTasks(tasks);
      
      if (!saveSuccess) {
        throw new Error('Failed to save updated task to storage');
      }

      return updatedTask;
    } catch (error) {
      console.error('Error in updateTask service:', error);
      throw new Error(`Failed to update task: ${error.message}`);
    }
  },

  deleteTask: async (taskId) => {
    try {
      await delay(500);
      
      if (!taskId) {
        throw new Error('Task ID is required');
      }

      const tasks = getTasks();
      const initialLength = tasks.length;
      const filteredTasks = tasks.filter((task) => task._id !== taskId);

      if (filteredTasks.length === initialLength) {
        throw new Error('Task not found');
      }

      const saveSuccess = saveTasks(filteredTasks);
      
      if (!saveSuccess) {
        throw new Error('Failed to save after task deletion');
      }

      return { message: 'Task deleted successfully', taskId };
    } catch (error) {
      console.error('Error in deleteTask service:', error);
      throw new Error(`Failed to delete task: ${error.message}`);
    }
  },
};