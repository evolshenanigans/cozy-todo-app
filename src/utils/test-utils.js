import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import rootReducer from '../redux/reducers/rootReducer';
import theme from '../theme';

function render(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>{children}</BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render };
export const mockTasks = [
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
  }
];

export const mockUser = {
  _id: '1',
  username: 'testuser',
  email: 'test@example.com'
};

export const mockLocalStorage = () => {
  let store = {};
  
  return {
    getItem: jest.fn(key => {
      return store[key] || null;
    }),
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
};

export const mockInitialState = {
  auth: {
    token: 'mock-token',
    isAuthenticated: true,
    loading: false,
    user: mockUser,
    error: null
  },
  task: {
    tasks: mockTasks,
    currentTask: null,
    loading: false,
    error: null,
    filtered: null,
    categories: ['Personal', 'Work', 'Shopping', 'Health', 'Education', 'Other'],
    currentCategory: 'All'
  }
};