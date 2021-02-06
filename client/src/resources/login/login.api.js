import config from '../../config';
import fetchApi from '../../services/fetch-api';

const baseApi = fetchApi({
  baseApiUrl: config.apiUrl,
  defaultQueryStringObject: {},
});

export function loginUser(userData) {
  return baseApi
    .post('account/login', null, userData)
    .then((response) => {
      return response;
    });
}
