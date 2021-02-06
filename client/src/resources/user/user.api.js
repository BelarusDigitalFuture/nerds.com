import config from '../../config';
import fetchApi from '../../services/fetch-api';

const baseApi = fetchApi({
  baseApiUrl: config.apiUrl,
  defaultQueryStringObject: {},
});

export function fetchUser() {
  return baseApi
    .get('users/current', null)
    .then((user) => {
      return user;
    });
}

export function logoutUser() {
  return baseApi
    .get('account/logout', null)
    .then((success) => {
      return success;
    });
}
