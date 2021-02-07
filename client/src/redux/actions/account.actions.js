import * as api from '../api/account.api';

export const signUpUser = userData => (dispatch) => {
  return api.signUpUser(userData)
    .then(payload => dispatch({ type: 'SIGNUP_USER', payload }));
};

export const loginUser = userData => (dispatch) => {
  return api.loginUser(userData)
    .then(payload => dispatch({ type: 'LOGIN_USER', payload }));
};

export const logoutUser = () => dispatch => api.logoutUser()
  .then(payload => dispatch({ type: 'LOGOUT_USER', payload }));
