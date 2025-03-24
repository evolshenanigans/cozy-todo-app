import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../../utils/test-utils';
import TaskForm from '../TaskForm';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask, clearCurrentTask } from '../../../redux/actions/taskActions';

// Mock Redux
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

// Mock the actions
jest.mock('../../../redux/actions/taskActions', () => ({
  addTask: jest.fn(),
  updateTask: jest.fn(),
  clearCurrentTask: jest.fn()
}));

describe('TaskForm Component', () => {
  const mockUser = { _id: 'user1', username: 'testuser' };
  const mockCategories = ['Personal', 'Work', 'Shopping', 'Health', 'Education', 'Other'];
  
  const mockTask = {
    _id: 'task1',
    title: 'Test Task',
    description: 'Test Description',
    priority: 'medium',
    category: 'Work',
    dueDate: new Date().toISOString(),
    progress: 50
  };

  const mockDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockImplementation(selector => {
      // Mock different parts of the state based on the selector
      if (selector.toString().includes('auth')) {
        return { user: mockUser };
      }
      if (selector.toString().includes('task')) {
        return { 
          currentTask: null, 
          loading: false,
          categories: mockCategories
        };
      }
      return {};
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the add task form correctly', () => {
    render(<TaskForm />);
    
    expect(screen.getByText(/add new task/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/task title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
    expect(screen.getByText(/progress/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  it('submits the form with valid data to add a task', async () => {
    render(<TaskForm />);
    
    // Fill form fields
    fireEvent.change(screen.getByLabelText(/task title/i), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Task Description' } });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));
    
    await waitFor(() => {
      expect(addTask).toHaveBeenCalledWith(expect.objectContaining({
        title: 'New Task',
        description: 'Task Description',
        userId: mockUser._id
      }));
    });
  });

  it('renders the edit form when currentTask is provided', () => {
    // Update selector mock to return a current task
    useSelector.mockImplementation(selector => {
      if (selector.toString().includes('auth')) {
        return { user: mockUser };
      }
      if (selector.toString().includes('task')) {
        return { 
          currentTask: mockTask, 
          loading: false,
          categories: mockCategories
        };
      }
      return {};
    });
    
    render(<TaskForm />);
    
    expect(screen.getByText(/edit task/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockTask.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockTask.description)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update task/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('updates a task when editing', async () => {
    // Update selector mock to return a current task
    useSelector.mockImplementation(selector => {
      if (selector.toString().includes('auth')) {
        return { user: mockUser };
      }
      if (selector.toString().includes('task')) {
        return { 
          currentTask: mockTask, 
          loading: false,
          categories: mockCategories
        };
      }
      return {};
    });
    
    render(<TaskForm />);
    
    // Modify task title
    fireEvent.change(screen.getByDisplayValue(mockTask.title), { 
      target: { value: 'Updated Task Title' } 
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /update task/i }));
    
    await waitFor(() => {
      expect(updateTask).toHaveBeenCalledWith(mockTask._id, expect.objectContaining({
        title: 'Updated Task Title',
        userId: mockUser._id
      }));
    });
  });

  it('validates form inputs before submission', async () => {
    render(<TaskForm />);
    
    // Submit empty form
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));
    
    // Check validation error
    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    });
    
    // Verify action was not called
    expect(addTask).not.toHaveBeenCalled();
  });

  it('handles cancel button when editing', () => {
    // Update selector mock to return a current task
    useSelector.mockImplementation(selector => {
      if (selector.toString().includes('auth')) {
        return { user: mockUser };
      }
      if (selector.toString().includes('task')) {
        return { 
          currentTask: mockTask, 
          loading: false,
          categories: mockCategories
        };
      }
      return {};
    });
    
    render(<TaskForm />);
    
    // Click cancel button
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    
    expect(clearCurrentTask).toHaveBeenCalled();
  });
});