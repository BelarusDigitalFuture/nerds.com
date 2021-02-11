import * as api from '../api/user.api';

export const getCurrentUser = () => (dispatch) => {
  return api.getCurrentUser()
    .then(payload => dispatch({ type: 'GET_USER', payload }));
};

export const updateUser = (userData) => (dispatch) => {
  return api.updateUser(userData)
    .then(payload => dispatch({ type: 'UPDATE_USER', payload }));
};
