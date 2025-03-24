import {
    AUTH_LOADING,
    AUTH_SUCCESS,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_SUCCESS,
  } from '../types';
  import { authService } from '../../api/authService';
  
  export const register = (formData) => async (dispatch) => {
    try {
      dispatch({ type: AUTH_LOADING });
  
      const data = await authService.register(formData);
  
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      });
  
      dispatch(loadUser(data.token));
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: error.message,
      });
    }
  };
  
  export const login = (formData) => async (dispatch) => {
    try {
      dispatch({ type: AUTH_LOADING });
  
      const data = await authService.login(formData);
  
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
  
      dispatch(loadUser(data.token));
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: error.message,
      });
    }
  };
  
  export const loadUser = (token) => async (dispatch) => {
    try {
      dispatch({ type: AUTH_LOADING });
  
      const user = await authService.getCurrentUser(token);
  
      dispatch({
        type: AUTH_SUCCESS,
        payload: user,
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: error.message,
      });
    }
  };
  
  export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
  };