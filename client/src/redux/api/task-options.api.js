import config from '../../config';
import fetchApi from '../../services/fetch-api';

const baseApi = fetchApi({
  baseApiUrl: config.apiUrl,
  defaultQueryStringObject: {},
});

export function getByTask(taskId) {
  return baseApi
    .get(`task-option/`, {taskId})
    .then((taskOptions) => taskOptions.results);
}

// export function loginUser(userData) {
//   return baseApi
//     .post('account/login', null, userData)
//     .then(user => user);
// }
//
// export function logoutUser() {
//   return baseApi
//     .get('account/logout', null)
//     .then(success => success);
// }
