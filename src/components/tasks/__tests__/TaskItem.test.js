import React from 'react';
import { render, screen, fireEvent } from '../../../utils/test-utils';
import TaskItem from '../TaskItem';
import { useDispatch } from 'react-redux';
import { setCurrentTask, updateTask, deleteTask } from '../../../redux/actions/taskActions';

// Mock Redux dispatch
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn()
}));

// Mock the actions
jest.mock('../../../redux/actions/taskActions', () => ({
  setCurrentTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn()
}));

describe('TaskItem Component', () => {
  const mockTask = {
    _id: '1',
    title: 'Test Task',
    description: 'This is a test task',
    completed: false,
    priority: 'medium',
    category: 'Work',
    dueDate: new Date().toISOString(),
    progress: 50
  };

  const mockDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders task details correctly', () => {
    render(<TaskItem task={mockTask} />);
    
    expect(screen.getByText(mockTask.title)).toBeInTheDocument();
    expect(screen.getByText(mockTask.description)).toBeInTheDocument();
    expect(screen.getByText(mockTask.category)).toBeInTheDocument();
    expect(screen.getByText(`${mockTask.priority.charAt(0).toUpperCase()}${mockTask.priority.slice(1)} Priority`)).toBeInTheDocument();
  });

  it('handles edit button click', () => {
    render(<TaskItem task={mockTask} />);
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    expect(setCurrentTask).toHaveBeenCalledWith(mockTask);
  });

  it('shows delete confirmation dialog when delete button is clicked', () => {
    render(<TaskItem task={mockTask} />);
    
    // Open the confirmation dialog
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    
    // Check if dialog is shown
    expect(screen.getByText(/are you sure you want to delete the task/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('handles task completion toggle', () => {
    render(<TaskItem task={mockTask} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(updateTask).toHaveBeenCalledWith(mockTask._id, {
      ...mockTask,
      completed: !mockTask.completed,
      progress: mockTask.completed ? mockTask.progress : 100,
    });
  });

  it('handles task deletion after confirmation', () => {
    render(<TaskItem task={mockTask} />);
    
    // Open the confirmation dialog
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    
    // Confirm deletion
    const confirmButton = screen.getByRole('button', { name: /delete/i, hidden: false });
    fireEvent.click(confirmButton);
    
    expect(deleteTask).toHaveBeenCalledWith(mockTask._id);
  });
});