import authReducer from '../authReducer';
import * as types from '../../types';

describe('Auth Reducer', () => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    user: null,
    error: null,
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle AUTH_LOADING', () => {
    const action = { type: types.AUTH_LOADING };
    const expectedState = {
      ...initialState,
      loading: true,
      error: null,
    };
    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle AUTH_SUCCESS', () => {
    const user = { _id: '1', name: 'Test User' };
    const action = {
      type: types.AUTH_SUCCESS,
      payload: user,
    };
    const expectedState = {
      ...initialState,
      isAuthenticated: true,
      loading: false,
      user,
    };
    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle LOGIN_SUCCESS', () => {
    const loginData = {
      token: 'test-token',
      user: { _id: '1', name: 'Test User' },
    };
    const action = {
      type: types.LOGIN_SUCCESS,
      payload: loginData,
    };
    const expectedState = {
      ...initialState,
      ...loginData,
      isAuthenticated: true,
      loading: false,
    };
    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle AUTH_ERROR', () => {
    const error = 'Authentication failed';
    const action = {
      type: types.AUTH_ERROR,
      payload: error,
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error,
    };
    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle LOGOUT', () => {
    const loggedInState = {
      token: 'test-token',
      isAuthenticated: true,
      loading: false,
      user: { _id: '1', name: 'Test User' },
      error: null,
    };
    const action = { type: types.LOGOUT };
    const expectedState = {
      ...initialState,
      token: null,
      isAuthenticated: false,
      loading: false,
      user: null,
    };
    expect(authReducer(loggedInState, action)).toEqual(expectedState);
  });
});
