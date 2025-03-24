import { authService } from '../authService';

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

// Mock authService to bypass delays
jest.mock('../authService', () => {
  const originalModule = jest.requireActual('../authService');
  return {
    ...originalModule,
    authService: {
      ...originalModule.authService,
      // Override methods to bypass delay
      register: jest.fn(async (userData) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if email already exists
        if (users.some(user => user.email === userData.email)) {
          throw new Error('User with this email already exists');
        }
        
        // Create new user
        const newUser = {
          _id: Date.now().toString(),
          username: userData.username,
          email: userData.email,
          password: userData.password,
          createdAt: new Date().toISOString(),
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Return user without password
        const { password, ...userWithoutPassword } = newUser;
        return {
          user: userWithoutPassword,
          token: 'mock-token-' + Date.now()
        };
      }),
      
      login: jest.fn(async (credentials) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Find user
        const user = users.find(u => u.email === credentials.email);
        if (!user || user.password !== credentials.password) {
          throw new Error('Invalid email or password');
        }
        
        // Return user without password
        const { password, ...userWithoutPassword } = user;
        return {
          user: userWithoutPassword,
          token: 'mock-token-' + Date.now()
        };
      }),
      
      getCurrentUser: jest.fn(async (token) => {
        if (!token) {
          throw new Error('No token provided');
        }
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.length === 0) {
          throw new Error('No users found');
        }
        
        // For demo, return first user
        const { password, ...userWithoutPassword } = users[0];
        return userWithoutPassword;
      })
    }
  };
});

describe('AuthService', () => {
  beforeEach(() => {
    // Clear mocks and localStorage
    jest.clearAllMocks();
    localStorage.clear();
    
    // Initialize localStorage with test users
    const users = [
      {
        _id: '1',
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        createdAt: new Date().toISOString()
      }
    ];
    
    localStorage.setItem('users', JSON.stringify(users));
  });

  it('should register a new user', async () => {
    const userData = {
      username: 'newuser',
      email: 'new@example.com',
      password: 'newpassword'
    };
    
    const result = await authService.register(userData);
    
    // Verify the response
    expect(result.user._id).toBeDefined();
    expect(result.user.username).toBe(userData.username);
    expect(result.user.email).toBe(userData.email);
    expect(result.user.password).toBeUndefined(); // Password should not be returned
    expect(result.token).toBeDefined();
    
    // Verify user was added to localStorage
    const usersInStorage = JSON.parse(localStorage.getItem('users'));
    expect(usersInStorage).toHaveLength(2); // 1 initial + 1 new
    expect(usersInStorage.some(u => u.email === userData.email)).toBe(true);
  });

  it('should throw an error when registering with existing email', async () => {
    const userData = {
      username: 'another',
      email: 'test@example.com', // Email already exists
      password: 'password456'
    };
    
    await expect(authService.register(userData))
      .rejects.toThrow('User with this email already exists');
  });

  it('should login a user with valid credentials', async () => {
    const credentials = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    const result = await authService.login(credentials);
    
    // Verify the response
    expect(result.user._id).toBe('1');
    expect(result.user.username).toBe('testuser');
    expect(result.user.email).toBe(credentials.email);
    expect(result.user.password).toBeUndefined(); // Password should not be returned
    expect(result.token).toBeDefined();
  });

  it('should throw an error when logging in with invalid email', async () => {
    const credentials = {
      email: 'wrong@example.com',
      password: 'password123'
    };
    
    await expect(authService.login(credentials))
      .rejects.toThrow('Invalid email or password');
  });

  it('should throw an error when logging in with invalid password', async () => {
    const credentials = {
      email: 'test@example.com',
      password: 'wrongpassword'
    };
    
    await expect(authService.login(credentials))
      .rejects.toThrow('Invalid email or password');
  });

  it('should get current user with valid token', async () => {
    const token = 'valid-token';
    
    const user = await authService.getCurrentUser(token);
    
    // Verify user data
    expect(user._id).toBe('1');
    expect(user.username).toBe('testuser');
    expect(user.email).toBe('test@example.com');
    expect(user.password).toBeUndefined(); // Password should not be returned
  });

  it('should throw an error when getting user without token', async () => {
    await expect(authService.getCurrentUser(null))
      .rejects.toThrow('No token provided');
  });

  it('should throw an error when no users exist', async () => {
    // Clear users
    localStorage.setItem('users', JSON.stringify([]));
    
    await expect(authService.getCurrentUser('token'))
      .rejects.toThrow('No users found');
  });
});