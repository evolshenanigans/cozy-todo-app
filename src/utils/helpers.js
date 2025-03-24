/**
 * Verifies that the application's localStorage data is properly initialized
 * @returns {Object} Object containing verification results
 */
export const verifyAppInitialization = () => {
    const results = {
      usersInitialized: false,
      tasksInitialized: false,
      errors: [],
      details: {
        userCount: 0,
        taskCount: 0,
      }
    };
    
    try {
      const usersData = localStorage.getItem('users');
      if (!usersData) {
        results.errors.push('Users data not found in localStorage');
      } else {
        try {
          const users = JSON.parse(usersData);
          if (!Array.isArray(users)) {
            results.errors.push('Users data is not an array');
          } else {
            results.usersInitialized = users.length > 0;
            results.details.userCount = users.length;
          }
        } catch (error) {
          results.errors.push(`Error parsing users data: ${error.message}`);
        }
      }
      
      const tasksData = localStorage.getItem('tasks');
      if (!tasksData) {
        results.errors.push('Tasks data not found in localStorage');
      } else {
        try {
          const tasks = JSON.parse(tasksData);
          if (!Array.isArray(tasks)) {
            results.errors.push('Tasks data is not an array');
          } else {
            results.tasksInitialized = tasks.length > 0;
            results.details.taskCount = tasks.length;
          }
        } catch (error) {
          results.errors.push(`Error parsing tasks data: ${error.message}`);
        }
      }
    } catch (error) {
      results.errors.push(`Verification failed: ${error.message}`);
    }
    
    return results;
  };
  
  /**
   * Debug function to print the current state of localStorage to console
   */
  export const debugLocalStorage = () => {
    try {
      console.group('localStorage Debug');
      
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i));
      }
      console.log('localStorage keys:', keys);
    
      try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        console.log(`Users (${users.length}):`, users);
      } catch (e) {
        console.error('Error parsing users:', e);
      }
      
      try {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        console.log(`Tasks (${tasks.length}):`, tasks);
      } catch (e) {
        console.error('Error parsing tasks:', e);
      }
      
      console.groupEnd();
    } catch (error) {
      console.error('Debug localStorage failed:', error);
    }
  };
  
  /**
   * Format a date string in a user-friendly format
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date string
   */
  export const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };