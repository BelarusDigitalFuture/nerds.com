import config from '../../config';
import fetchApi from '../../services/fetch-api';

const baseApi = fetchApi({
  baseApiUrl: config.apiUrl,
  defaultQueryStringObject: {},
});

export function getCurrentUser() {
  return baseApi
    .get('user')
    .then((user) => user);
}
