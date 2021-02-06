import * as api from './login.api';

export const loginUser = userData => (dispatch) => {
  return api.loginUser(userData)
    .then(payload => dispatch({ type: 'loginUser', payload }));
};
