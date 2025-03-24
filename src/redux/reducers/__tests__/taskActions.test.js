import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../taskActions';
import * as types from '../../types';
import { taskService } from '../../../api/taskService';

// Mock the taskService
jest.mock('../../../api/taskService');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Task Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      task: {
        tasks: [],
        currentTask: null,
        loading: false,
        error: null,
      },
    });
    jest.clearAllMocks();
  });

  it('should create an action to get tasks', async () => {
    const mockTasks = [
      { _id: '1', title: 'Test Task 1' },
      { _id: '2', title: 'Test Task 2' },
    ];
    taskService.getTasks.mockResolvedValue(mockTasks);

    const expectedActions = [
      { type: types.TASK_LOADING },
      { type: types.GET_TASKS, payload: mockTasks },
    ];

    await store.dispatch(actions.getTasks('user-1'));
    expect(store.getActions()).toEqual(expectedActions);
    expect(taskService.getTasks).toHaveBeenCalledWith('user-1');
  });

  it('should create an action to add a task', async () => {
    const newTask = { 
      title: 'New Task', 
      description: 'Task description',
      userId: 'user-1' 
    };
    const createdTask = { 
      _id: '3', 
      ...newTask,
      completed: false,
      createdAt: expect.any(String)
    };
    
    taskService.addTask.mockResolvedValue(createdTask);

    const expectedActions = [
      { type: types.TASK_LOADING },
      { type: types.ADD_TASK, payload: createdTask },
    ];

    await store.dispatch(actions.addTask(newTask));
    expect(store.getActions()).toEqual(expectedActions);
    expect(taskService.addTask).toHaveBeenCalledWith(newTask);
  });

  it('should create an action to update a task', async () => {
    const taskId = '1';
    const taskData = { 
      title: 'Updated Task',
      completed: true 
    };
    const updatedTask = { 
      _id: taskId, 
      ...taskData,
      updatedAt: expect.any(String) 
    };
    
    taskService.updateTask.mockResolvedValue(updatedTask);

    const expectedActions = [
      { type: types.TASK_LOADING },
      { type: types.UPDATE_TASK, payload: updatedTask },
    ];

    await store.dispatch(actions.updateTask(taskId, taskData));
    expect(store.getActions()).toEqual(expectedActions);
    expect(taskService.updateTask).toHaveBeenCalledWith(taskId, taskData);
  });

  it('should create an action to delete a task', async () => {
    const taskId = '1';
    taskService.deleteTask.mockResolvedValue({ message: 'Task deleted successfully' });

    const expectedActions = [
      { type: types.TASK_LOADING },
      { type: types.DELETE_TASK, payload: taskId },
    ];

    await store.dispatch(actions.deleteTask(taskId));
    expect(store.getActions()).toEqual(expectedActions);
    expect(taskService.deleteTask).toHaveBeenCalledWith(taskId);
  });

  it('should create an action to filter tasks', () => {
    const text = 'test';
    const expectedAction = {
      type: types.FILTER_TASKS,
      payload: text,
    };

    store.dispatch(actions.filterTasks(text));
    expect(store.getActions()).toEqual([expectedAction]);
  });

  it('should create an action to clear filter', () => {
    const expectedAction = { type: types.CLEAR_FILTER };

    store.dispatch(actions.clearFilter());
    expect(store.getActions()).toEqual([expectedAction]);
  });
});