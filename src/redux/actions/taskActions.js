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
  import { taskService } from '../../api/taskService';
  
  export const getTasks = (userId) => async (dispatch) => {
    try {
      if (!userId) {
        dispatch({
          type: TASK_ERROR,
          payload: 'User ID is required to load tasks',
        });
        return;
      }
      
      dispatch({ type: TASK_LOADING });
      
      console.log(`Fetching tasks for user ID: ${userId}`);
      const tasks = await taskService.getTasks(userId);
      
      const safeTasksArray = Array.isArray(tasks) ? tasks : [];
      
      console.log(`Retrieved ${safeTasksArray.length} tasks`);
      
      dispatch({
        type: GET_TASKS,
        payload: safeTasksArray,
      });
    } catch (error) {
      console.error('Error in getTasks action:', error);
      dispatch({
        type: TASK_ERROR,
        payload: error.message || 'Failed to load tasks',
      });
    }
  };
  
  export const addTask = (taskData) => async (dispatch) => {
    try {
      if (!taskData || !taskData.title || !taskData.userId) {
        dispatch({
          type: TASK_ERROR,
          payload: 'Invalid task data. Title and user ID are required.',
        });
        return;
      }
      
      dispatch({ type: TASK_LOADING });
  
      const newTask = await taskService.addTask(taskData);
      
      if (!newTask || !newTask._id) {
        throw new Error('Invalid response from task service');
      }
  
      dispatch({
        type: ADD_TASK,
        payload: newTask,
      });
    } catch (error) {
      dispatch({
        type: TASK_ERROR,
        payload: error.message || 'Failed to add task',
      });
    }
  };
  
  export const updateTask = (taskId, taskData) => async (dispatch) => {
    try {
      if (!taskId) {
        dispatch({
          type: TASK_ERROR,
          payload: 'Task ID is required for updates',
        });
        return;
      }
      
      dispatch({ type: TASK_LOADING });
  
      const updatedTask = await taskService.updateTask(taskId, taskData);
      
      if (!updatedTask || !updatedTask._id) {
        throw new Error('Invalid response from task service');
      }
  
      dispatch({
        type: UPDATE_TASK,
        payload: updatedTask,
      });
    } catch (error) {
      dispatch({
        type: TASK_ERROR,
        payload: error.message || 'Failed to update task',
      });
    }
  };
  
  export const deleteTask = (taskId) => async (dispatch) => {
    try {
      if (!taskId) {
        dispatch({
          type: TASK_ERROR,
          payload: 'Task ID is required for deletion',
        });
        return;
      }
      
      dispatch({ type: TASK_LOADING });
  
      const result = await taskService.deleteTask(taskId);
      
      if (!result || !result.message) {
        throw new Error('Invalid response from task service');
      }
  
      dispatch({
        type: DELETE_TASK,
        payload: taskId,
      });
    } catch (error) {
      dispatch({
        type: TASK_ERROR,
        payload: error.message || 'Failed to delete task',
      });
    }
  };
  
  export const setCurrentTask = (task) => (dispatch) => {
    if (!task || !task._id) {
      console.warn('Attempted to set invalid task as current');
      return;
    }
    
    dispatch({
      type: SET_CURRENT_TASK,
      payload: task,
    });
  };
  
  export const clearCurrentTask = () => (dispatch) => {
    dispatch({ type: CLEAR_CURRENT_TASK });
  };
  
  export const filterTasks = (text) => (dispatch) => {
    if (typeof text !== 'string') {
      console.warn('Invalid filter text provided');
      text = '';
    }
    
    dispatch({
      type: FILTER_TASKS,
      payload: text,
    });
  };
  
  export const clearFilter = () => (dispatch) => {
    dispatch({ type: CLEAR_FILTER });
  };
  
  export const setTaskCategory = (category) => (dispatch) => {
    dispatch({
      type: SET_TASK_CATEGORY,
      payload: category,
    });
  };