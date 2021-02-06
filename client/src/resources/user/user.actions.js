import * as api from './user.api';

export const initUser = user => dispatch => dispatch({ type: 'initUser', user });

export const fetchUser = userId => dispatch =>
  api.fetchUser(userId)
    .then(payload => dispatch({ type: 'fetchUser', payload }));

export const logoutUser = () => dispatch =>
  api.logoutUser()
    .then(payload => dispatch({ type: 'logoutUser', payload }));
