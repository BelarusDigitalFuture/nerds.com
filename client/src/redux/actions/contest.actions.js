import * as api from '../api/contest.api';

export const getContestsBySubject = ({ subjectId, page }) => dispatch =>
  api.getContestBySubject({ subjectId, page })
    .then(payload => dispatch({ type: 'GET_CONTESTS', payload }));
