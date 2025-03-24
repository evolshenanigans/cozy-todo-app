export const initSampleData = () => {
    try {
      console.log('Initializing sample data...');
      
      if (typeof localStorage === 'undefined') {
        console.error('localStorage is not available');
        return false;
      }
      
      let users = [];
      let tasks = [];
      
      try {
        const existingUsers = localStorage.getItem('users');
        const existingTasks = localStorage.getItem('tasks');
        
        if (existingUsers) {
          users = JSON.parse(existingUsers);
          if (!Array.isArray(users)) {
            console.warn('Existing users data is not an array, resetting');
            users = [];
          }
        }
        
        if (existingTasks) {
          tasks = JSON.parse(existingTasks);
          if (!Array.isArray(tasks)) {
            console.warn('Existing tasks data is not an array, resetting');
            tasks = [];
          }
        }
      } catch (parseError) {
        console.error('Error parsing existing data:', parseError);
        users = [];
        tasks = [];
      }
      
      if (users.length === 0) {
        users = [
          {
            _id: '1',
            username: 'demo',
            email: 'demo@example.com',
            password: 'password123',
            createdAt: new Date().toISOString(),
          },
        ];
        
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Sample users initialized');
      } else {
        console.log(`Found ${users.length} existing users, skipping initialization`);
      }
      
      if (tasks.length === 0) {
        tasks = [
          {
            _id: '1',
            title: 'Complete project setup',
            description: 'Finish setting up React project with all necessary configurations',
            completed: true,
            userId: '1',
            createdAt: new Date().toISOString(),
            priority: 'high',
            dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            category: 'Work',
            progress: 100,
          },
          {
            _id: '2',
            title: 'Learn Redux',
            description: 'Study Redux documentation and complete tutorial',
            completed: false,
            userId: '1',
            createdAt: new Date().toISOString(),
            priority: 'medium',
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            category: 'Education',
            progress: 30,
          },
          {
            _id: '3',
            title: 'Buy groceries',
            description: 'Milk, eggs, bread, and vegetables',
            completed: false,
            userId: '1',
            createdAt: new Date().toISOString(),
            priority: 'low',
            dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
            category: 'Shopping',
            progress: 0,
          },
          {
            _id: '4',
            title: 'Go for a run',
            description: 'Morning jog for 30 minutes',
            completed: false,
            userId: '1',
            createdAt: new Date().toISOString(),
            priority: 'medium',
            dueDate: new Date(Date.now()).toISOString(),
            category: 'Health',
            progress: 0,
          },
          {
            _id: '5',
            title: 'Call mom',
            description: "Don't forget to wish her happy birthday",
            completed: false,
            userId: '1',
            createdAt: new Date().toISOString(),
            priority: 'high',
            dueDate: new Date(Date.now()).toISOString(),
            category: 'Personal',
            progress: 0,
          },
        ];
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log('Sample tasks initialized');
      } else {
        console.log(`Found ${tasks.length} existing tasks, skipping initialization`);
      }
      
      console.log('Sample data initialization complete');
      return true;
    } catch (error) {
      console.error('Error initializing sample data:', error);
      return false;
    }
  };
  
  export const resetSampleData = () => {
    try {
      const users = [
        {
          _id: '1',
          username: 'demo',
          email: 'demo@example.com',
          password: 'password123',
          createdAt: new Date().toISOString(),
        },
      ];
  
      const tasks = [
        {
          _id: '1',
          title: 'Complete project setup',
          description: 'Finish setting up React project with all necessary configurations',
          completed: true,
          userId: '1',
          createdAt: new Date().toISOString(),
          priority: 'high',
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          category: 'Work',
          progress: 100,
        },
        {
          _id: '2',
          title: 'Learn Redux',
          description: 'Study Redux documentation and complete tutorial',
          completed: false,
          userId: '1',
          createdAt: new Date().toISOString(),
          priority: 'medium',
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          category: 'Education',
          progress: 30,
        },
        {
          _id: '3',
          title: 'Buy groceries',
          description: 'Milk, eggs, bread, and vegetables',
          completed: false,
          userId: '1',
          createdAt: new Date().toISOString(),
          priority: 'low',
          dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
          category: 'Shopping',
          progress: 0,
        },
        {
          _id: '4',
          title: 'Go for a run',
          description: 'Morning jog for 30 minutes',
          completed: false,
          userId: '1',
          createdAt: new Date().toISOString(),
          priority: 'medium',
          dueDate: new Date(Date.now()).toISOString(),
          category: 'Health',
          progress: 0,
        },
        {
          _id: '5',
          title: 'Call mom',
          description: "Don't forget to wish her happy birthday",
          completed: false,
          userId: '1',
          createdAt: new Date().toISOString(),
          priority: 'high',
          dueDate: new Date(Date.now()).toISOString(),
          category: 'Personal',
          progress: 0,
        },
      ];
  
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('tasks', JSON.stringify(tasks));
      
      console.log('Sample data reset complete');
      return true;
    } catch (error) {
      console.error('Error resetting sample data:', error);
      return false;
    }
  };