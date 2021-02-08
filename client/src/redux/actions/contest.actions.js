import * as api from '../api/contest.api';

export const getContestList = () => (dispatch) => {
  return api.getContestList()
    .then(response => dispatch({
      type: 'SET_CONTEST_LIST',
      payload: (response || {}).results,
    }));
};
