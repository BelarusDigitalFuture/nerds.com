import * as api from '../api/user.api';

export const getCurrentUser = () => (dispatch) => {
  return api.getCurrentUser()
    .then(payload => dispatch({ type: 'GET_USER', payload }));
};
