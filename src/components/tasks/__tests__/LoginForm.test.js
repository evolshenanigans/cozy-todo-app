import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../../utils/test-utils';
import LoginForm from '../LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

// Mock necessary dependencies
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

jest.mock('../../../redux/actions/authActions', () => ({
  login: jest.fn()
}));

describe('LoginForm Component', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);
    useSelector.mockImplementation(() => ({
      isAuthenticated: false,
      loading: false,
      error: null
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form correctly', () => {
    render(<LoginForm />);
    
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('submits the form with valid credentials', async () => {
    render(<LoginForm />);
    
    // Fill the form
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });

  it('displays validation errors for invalid inputs', async () => {
    render(<LoginForm />);
    
    // Submit empty form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
    
    // Fill with invalid email
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'invalid-email' }
    });
    
    // Submit again
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/email is invalid/i)).toBeInTheDocument();
    });
    
    // Verify login action was not called
    expect(login).not.toHaveBeenCalled();
  });

  it('displays error message when login fails', () => {
    const errorMessage = 'Invalid credentials';
    
    // Mock selector to return error
    useSelector.mockImplementation(() => ({
      isAuthenticated: false,
      loading: false,
      error: errorMessage
    }));
    
    render(<LoginForm />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('redirects to dashboard when authenticated', () => {
    // Mock selector to return authenticated state
    useSelector.mockImplementation(() => ({
      isAuthenticated: true,
      loading: false,
      error: null
    }));
    
    render(<LoginForm />);
    
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('navigates to register page when sign up button is clicked', () => {
    render(<LoginForm />);
    
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });

  it('toggles password visibility', () => {
    render(<LoginForm />);
    
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    // Click on toggle button
    const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i });
    fireEvent.click(toggleButton);
    
    expect(passwordInput).toHaveAttribute('type', 'text');
    
    // Toggle back
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});