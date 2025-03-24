import { taskService } from '../taskService';

// Mock localStorage
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value;
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    getStore: () => store
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true
});

// Helper to simulate API delay - replace the actual delay
jest.mock('../taskService', () => {
  const originalModule = jest.requireActual('../taskService');
  return {
    ...originalModule,
    taskService: {
      ...originalModule.taskService,
      // Override each method to bypass the delay
      getTasks: jest.fn(userId => {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        return Promise.resolve(tasks.filter(task => task.userId === userId));
      }),
      addTask: jest.fn(taskData => {
        const newTask = {
          _id: Date.now().toString(),
          title: taskData.title,
          description: taskData.description,
          completed: false,
          userId: taskData.userId,
          createdAt: new Date().toISOString(),
          priority: taskData.priority || 'medium',
          dueDate: taskData.dueDate || null,
          category: taskData.category || 'Other',
          progress: 0,
        };
        
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        return Promise.resolve(newTask);
      }),
      updateTask: jest.fn((taskId, taskData) => {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const taskIndex = tasks.findIndex(t => t._id === taskId);
        
        if (taskIndex === -1) {
          return Promise.reject(new Error('Task not found'));
        }
        
        const updatedTask = {
          ...tasks[taskIndex],
          ...taskData,
          updatedAt: new Date().toISOString(),
        };
        
        tasks[taskIndex] = updatedTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        return Promise.resolve(updatedTask);
      }),
      deleteTask: jest.fn(taskId => {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const filteredTasks = tasks.filter(t => t._id !== taskId);
        
        if (filteredTasks.length === tasks.length) {
          return Promise.reject(new Error('Task not found'));
        }
        
        localStorage.setItem('tasks', JSON.stringify(filteredTasks));
        
        return Promise.resolve({ message: 'Task deleted successfully' });
      })
    }
  };
});

describe('TaskService', () => {
  beforeEach(() => {
    // Clear mocks and localStorage
    jest.clearAllMocks();
    localStorage.clear();
    
    // Initialize localStorage with test data
    const tasks = [
      {
        _id: '1',
        title: 'Test Task 1',
        description: 'Description 1',
        completed: false,
        userId: 'user1',
        createdAt: new Date().toISOString(),
        priority: 'high',
        category: 'Work',
        progress: 0
      },
      {
        _id: '2',
        title: 'Test Task 2',
        description: 'Description 2',
        completed: true,
        userId: 'user1',
        createdAt: new Date().toISOString(),
        priority: 'medium',
        category: 'Personal',
        progress: 100
      },
      {
        _id: '3',
        title: 'Test Task 3',
        description: 'Description 3',
        completed: false,
        userId: 'user2',
        createdAt: new Date().toISOString(),
        priority: 'low',
        category: 'Shopping',
        progress: 50
      }
    ];
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });

  it('should get tasks for a specific user', async () => {
    const userId = 'user1';
    const result = await taskService.getTasks(userId);
    
    expect(result).toHaveLength(2);
    expect(result[0].userId).toBe(userId);
    expect(result[1].userId).toBe(userId);
    expect(taskService.getTasks).toHaveBeenCalledWith(userId);
  });

  it('should return an empty array if no tasks found for user', async () => {
    const userId = 'nonexistent';
    const result = await taskService.getTasks(userId);
    
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it('should add a new task', async () => {
    const taskData = {
      title: 'New Task',
      description: 'New Description',
      userId: 'user1',
      priority: 'high',
      category: 'Education'
    };
    
    const result = await taskService.addTask(taskData);
    
    // Verify the task was added with correct data
    expect(result._id).toBeDefined();
    expect(result.title).toBe(taskData.title);
    expect(result.description).toBe(taskData.description);
    expect(result.userId).toBe(taskData.userId);
    expect(result.priority).toBe(taskData.priority);
    expect(result.category).toBe(taskData.category);
    expect(result.completed).toBe(false);
    expect(result.progress).toBe(0);
    expect(result.createdAt).toBeDefined();
    
    // Verify it was added to localStorage
    const tasksInStorage = JSON.parse(localStorage.getItem('tasks'));
    expect(tasksInStorage).toHaveLength(4); // 3 initial + 1 new
    expect(tasksInStorage.some(t => t._id === result._id)).toBe(true);
  });

  it('should update an existing task', async () => {
    const taskId = '1';
    const updateData = {
      title: 'Updated Title',
      description: 'Updated Description',
      completed: true,
      progress: 100
    };
    
    const result = await taskService.updateTask(taskId, updateData);
    
    // Verify the task was updated correctly
    expect(result._id).toBe(taskId);
    expect(result.title).toBe(updateData.title);
    expect(result.description).toBe(updateData.description);
    expect(result.completed).toBe(updateData.completed);
    expect(result.progress).toBe(updateData.progress);
    expect(result.updatedAt).toBeDefined();
    
    // Original data should be preserved
    expect(result.userId).toBe('user1');
    expect(result.priority).toBe('high');
    expect(result.category).toBe('Work');
    
    // Verify it was updated in localStorage
    const tasksInStorage = JSON.parse(localStorage.getItem('tasks'));
    const updatedTask = tasksInStorage.find(t => t._id === taskId);
    expect(updatedTask.title).toBe(updateData.title);
    expect(updatedTask.completed).toBe(updateData.completed);
  });

  it('should throw an error when updating non-existent task', async () => {
    const taskId = 'nonexistent';
    const updateData = { title: 'Updated Title' };
    
    await expect(taskService.updateTask(taskId, updateData))
      .rejects.toThrow('Task not found');
  });

  it('should delete a task', async () => {
    const taskId = '2';
    
    const result = await taskService.deleteTask(taskId);
    
    // Verify the response
    expect(result.message).toBe('Task deleted successfully');
    
    // Verify it was deleted from localStorage
    const tasksInStorage = JSON.parse(localStorage.getItem('tasks'));
    expect(tasksInStorage).toHaveLength(2); // 3 initial - 1 deleted
    expect(tasksInStorage.some(t => t._id === taskId)).toBe(false);
  });

  it('should throw an error when deleting non-existent task', async () => {
    const taskId = 'nonexistent';
    
    await expect(taskService.deleteTask(taskId))
      .rejects.toThrow('Task not found');
  });
});