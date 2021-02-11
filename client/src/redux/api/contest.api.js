import config from '../../config';
import fetchApi from '../../services/fetch-api';

const baseApi = fetchApi({
  baseApiUrl: config.apiUrl,
  defaultQueryStringObject: {},
});

export function getContest(id) {
  return baseApi
    .get(`contest/${id}`)
    .then((contest) => contest);
}

export function getContestList(subjectId, page) {
  return baseApi
    .get('contest')
    .then(res => res);
}
