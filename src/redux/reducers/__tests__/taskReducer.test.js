import taskReducer from '../taskReducer';
import * as types from '../../types';

describe('Task Reducer', () => {
  const initialState = {
    tasks: [],
    currentTask: null,
    loading: false,
    error: null,
    filtered: null,
    categories: ['Personal', 'Work', 'Shopping', 'Health', 'Education', 'Other'],
    currentCategory: 'All',
  };

  it('should return the initial state', () => {
    expect(taskReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle TASK_LOADING', () => {
    const action = { type: types.TASK_LOADING };
    const expectedState = {
      ...initialState,
      loading: true,
      error: null,
    };
    expect(taskReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle GET_TASKS', () => {
    const mockTasks = [
      { _id: '1', title: 'Test Task 1' },
      { _id: '2', title: 'Test Task 2' },
    ];
    const action = {
      type: types.GET_TASKS,
      payload: mockTasks,
    };
    const expectedState = {
      ...initialState,
      tasks: mockTasks,
      loading: false,
    };
    expect(taskReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle ADD_TASK', () => {
    const initialTasks = [{ _id: '1', title: 'Test Task 1' }];
    const newTask = { _id: '2', title: 'Test Task 2' };
    const action = {
      type: types.ADD_TASK,
      payload: newTask,
    };
    const stateWithTasks = {
      ...initialState,
      tasks: initialTasks,
    };
    const expectedState = {
      ...initialState,
      tasks: [newTask, ...initialTasks],
      loading: false,
    };
    expect(taskReducer(stateWithTasks, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_TASK', () => {
    const initialTasks = [
      { _id: '1', title: 'Test Task 1' },
      { _id: '2', title: 'Test Task 2' },
    ];
    const updatedTask = { _id: '1', title: 'Updated Task 1' };
    const action = {
      type: types.UPDATE_TASK,
      payload: updatedTask,
    };
    const stateWithTasks = {
      ...initialState,
      tasks: initialTasks,
    };
    const expectedState = {
      ...initialState,
      tasks: [updatedTask, initialTasks[1]],
      loading: false,
    };
    expect(taskReducer(stateWithTasks, action)).toEqual(expectedState);
  });

  it('should handle DELETE_TASK', () => {
    const initialTasks = [
      { _id: '1', title: 'Test Task 1' },
      { _id: '2', title: 'Test Task 2' },
    ];
    const action = {
      type: types.DELETE_TASK,
      payload: '1',
    };
    const stateWithTasks = {
      ...initialState,
      tasks: initialTasks,
    };
    const expectedState = {
      ...initialState,
      tasks: [initialTasks[1]],
      loading: false,
    };
    expect(taskReducer(stateWithTasks, action)).toEqual(expectedState);
  });

  it('should handle FILTER_TASKS', () => {
    const initialTasks = [
      { _id: '1', title: 'Test Task 1', description: 'One' },
      { _id: '2', title: 'Test Task 2', description: 'Two' },
      { _id: '3', title: 'Another Task', description: 'Three' },
    ];
    const action = {
      type: types.FILTER_TASKS,
      payload: 'test',
    };
    const stateWithTasks = {
      ...initialState,
      tasks: initialTasks,
    };
    const expectedState = {
      ...initialState,
      tasks: initialTasks,
      filtered: initialTasks.slice(0, 2), // Only the tasks with 'test' in the title
    };
    expect(taskReducer(stateWithTasks, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_FILTER', () => {
    const initialTasks = [
      { _id: '1', title: 'Test Task 1' },
      { _id: '2', title: 'Test Task 2' },
    ];
    const stateWithFilter = {
      ...initialState,
      tasks: initialTasks,
      filtered: [initialTasks[0]],
    };
    const action = { type: types.CLEAR_FILTER };
    const expectedState = {
      ...initialState,
      tasks: initialTasks,
      filtered: null,
    };
    expect(taskReducer(stateWithFilter, action)).toEqual(expectedState);
  });

  it('should handle TASK_ERROR', () => {
    const errorMessage = 'Something went wrong';
    const action = {
      type: types.TASK_ERROR,
      payload: errorMessage,
    };
    const expectedState = {
      ...initialState,
      error: errorMessage,
      loading: false,
    };
    expect(taskReducer(initialState, action)).toEqual(expectedState);
  });
});