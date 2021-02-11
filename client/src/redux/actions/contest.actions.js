import * as api from '../api/contest.api';

export const getContestList = () => dispatch =>
  api.getContestList()
    .then(payload => dispatch({ type: 'SET_CONTEST_LIST', payload }));
