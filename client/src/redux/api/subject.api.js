import config from '../../config';
import fetchApi from '../../services/fetch-api';

const baseApi = fetchApi({
  baseApiUrl: config.apiUrl,
  defaultQueryStringObject: {},
});

export function getSubjects() {
  return baseApi
    .get(`subject`)
    .then((subjects) => subjects);
}
