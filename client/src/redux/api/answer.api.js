import config from '../../config';
import fetchApi from '../../services/fetch-api';

const baseApi = fetchApi({
  baseApiUrl: config.apiUrl,
  defaultQueryStringObject: {},
});

export function submitAnswer({ taskId, contestId, value }) {
  return baseApi
    .post(`answer/`, null, { taskId, contestId, value })
    .then(answer => answer);
}

export function getAnswer({ taskId, contestId }) {
  return baseApi
    .get(`answer/`, { taskId, contestId })
    .then(answer => answer);
}
