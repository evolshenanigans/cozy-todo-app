const fs = require('fs');
const path = require('path');

// Sample users data
const users = [
  {
    _id: '1',
    username: 'demo',
    email: 'demo@example.com',
    password: 'password123',
    createdAt: new Date().toISOString(),
  },
];

// Sample tasks data
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

// Write sample data to localStorage
if (typeof localStorage !== 'undefined') {
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('tasks', JSON.stringify(tasks));
  console.log('Sample data added to localStorage');
} else {
  // If running in Node.js, create JSON files instead
  const dataDir = path.join(__dirname, '../public/data');
  
  // Create data directory if it doesn't exist
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // Write sample data to JSON files
  fs.writeFileSync(path.join(dataDir, 'users.json'), JSON.stringify(users, null, 2));
  fs.writeFileSync(path.join(dataDir, 'tasks.json'), JSON.stringify(tasks, null, 2));
  
  console.log('Sample data files created in public/data directory');
  console.log('');
  console.log('-------------------------------------');
  console.log('Setup complete!');
  console.log('-------------------------------------');
  console.log('');
  console.log('To start the app, run:');
  console.log('npm start');
  console.log('');
  console.log('Demo user credentials:');
  console.log('Email: demo@example.com');
  console.log('Password: password123');
  console.log('-------------------------------------');
}
