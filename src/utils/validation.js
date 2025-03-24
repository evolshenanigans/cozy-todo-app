export const validateRegister = (values) => {
    const errors = {};
  
    if (!values.username) {
      errors.username = 'Username is required';
    } else if (values.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    } else if (values.username.length > 20) {
      errors.username = 'Username must be less than 20 characters';
    }
  
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }
  
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
  
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
  
    return errors;
  };
  
  export const validateLogin = (values) => {
    const errors = {};
  
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }
  
    if (!values.password) {
      errors.password = 'Password is required';
    }
  
    return errors;
  };
  
  export const validateTask = (values) => {
    const errors = {};
  
    if (!values.title) {
      errors.title = 'Title is required';
    } else if (values.title.length > 100) {
      errors.title = 'Title must be less than 100 characters';
    }
  
    if (values.description && values.description.length > 500) {
      errors.description = 'Description must be less than 500 characters';
    }
  
    if (values.dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dueDate = new Date(values.dueDate);
      
      if (!(dueDate instanceof Date && !isNaN(dueDate))) {
        errors.dueDate = 'Invalid date format';
      }
    }
  
    return errors;
  };
  
  export const isFormValid = (errors) => {
    return Object.keys(errors).length === 0;
  };