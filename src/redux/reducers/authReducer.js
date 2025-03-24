import {
    AUTH_LOADING,
    AUTH_SUCCESS,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_SUCCESS,
  } from '../types';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    user: null,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case AUTH_LOADING:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case AUTH_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: action.payload,
        };
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          loading: false,
        };
      case AUTH_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case LOGOUT:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;