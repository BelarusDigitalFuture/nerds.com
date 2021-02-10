import config from '../../config';
import fetchApi from '../../services/fetch-api';

const baseApi = fetchApi({
  baseApiUrl: config.apiUrl,
  defaultQueryStringObject: {},
});

export function getScoreboardByContest({ contestId }) {
  return baseApi
    .get(`scoreboard/contest/${contestId}`)
    .then((scoreboard) => scoreboard);
}
