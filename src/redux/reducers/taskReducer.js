import {
    TASK_LOADING,
    TASK_ERROR,
    GET_TASKS,
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    SET_CURRENT_TASK,
    CLEAR_CURRENT_TASK,
    FILTER_TASKS,
    CLEAR_FILTER,
    SET_TASK_CATEGORY,
  } from '../types';
  
  const initialState = {
    tasks: [],
    currentTask: null,
    loading: false,
    error: null,
    filtered: null,
    categories: ['Personal', 'Work', 'Shopping', 'Health', 'Education', 'Other'],
    currentCategory: 'All',
  };
  
  const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case TASK_LOADING:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case GET_TASKS:
        const tasks = Array.isArray(action.payload) ? action.payload : [];
        console.log(`Task reducer: Received ${tasks.length} tasks`);
        
        return {
          ...state,
          tasks: tasks,
          loading: false,
        };
      case ADD_TASK:
        if (!action.payload || !action.payload._id) {
          console.error('Invalid task payload in ADD_TASK', action.payload);
          return {
            ...state,
            loading: false,
            error: 'Invalid task data received',
          };
        }
        
        return {
          ...state,
          tasks: [action.payload, ...state.tasks],
          loading: false,
        };
      case UPDATE_TASK:
        if (!action.payload || !action.payload._id) {
          console.error('Invalid task payload in UPDATE_TASK', action.payload);
          return {
            ...state,
            loading: false,
            error: 'Invalid task update data received',
          };
        }
        
        return {
          ...state,
          tasks: state.tasks.map((task) =>
            task._id === action.payload._id ? action.payload : task
          ),
          loading: false,
        };
      case DELETE_TASK:
        if (!action.payload) {
          console.error('Invalid task ID in DELETE_TASK', action.payload);
          return {
            ...state,
            loading: false,
            error: 'Invalid task ID for deletion',
          };
        }
        
        return {
          ...state,
          tasks: state.tasks.filter((task) => task._id !== action.payload),
          loading: false,
        };
      case SET_CURRENT_TASK:
        return {
          ...state,
          currentTask: action.payload,
        };
      case CLEAR_CURRENT_TASK:
        return {
          ...state,
          currentTask: null,
        };
      case FILTER_TASKS:
        const filterText = typeof action.payload === 'string' ? action.payload : '';
        
        return {
          ...state,
          filtered: state.tasks.filter((task) => {
            const regex = new RegExp(`${filterText}`, 'gi');
            return (
              (task.title && task.title.match(regex)) || 
              (task.description && task.description.match(regex))
            );
          }),
        };
      case CLEAR_FILTER:
        return {
          ...state,
          filtered: null,
        };
      case TASK_ERROR:
        console.error('Task reducer error:', action.payload);
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      case SET_TASK_CATEGORY:
        return {
          ...state,
          currentCategory: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default taskReducer;