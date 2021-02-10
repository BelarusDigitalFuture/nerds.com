import * as api from '../api/scoreboard.api';

export const getScoreboardByContest = ({ contestId }) => (dispatch) => {
  return api.getScoreboardByContest({ contestId })
    .then(payload => dispatch({ type: 'GET_SCOREBOARD', payload }));
};
