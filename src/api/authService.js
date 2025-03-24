let users = JSON.parse(localStorage.getItem('users')) || [];

const generateToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  register: async (userData) => {
    await delay(800);
    const existingUser = users.find((user) => user.email === userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const newUser = {
      _id: Date.now().toString(),
      username: userData.username,
      email: userData.email,
      password: userData.password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const { password, ...userWithoutPassword } = newUser;
    const token = generateToken();

    return {
      user: userWithoutPassword,
      token,
    };
  },

  login: async (credentials) => {
    await delay(800);

    const user = users.find((user) => user.email === credentials.email);
    if (!user || user.password !== credentials.password) {
      throw new Error('Invalid email or password');
    }

    const { password, ...userWithoutPassword } = user;
    const token = generateToken();

    return {
      user: userWithoutPassword,
      token,
    };
  },

  getCurrentUser: async (token) => {
    await delay(500);

    if (!token) {
      throw new Error('No token provided');
    }

    if (users.length === 0) {
      throw new Error('No users found');
    }

    const { password, ...userWithoutPassword } = users[0];
    return userWithoutPassword;
  },
};