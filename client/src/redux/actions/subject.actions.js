import * as api from '../api/subject.api';

export const getSubjects = () => dispatch =>
  api.getSubjects()
    .then(payload => dispatch({ type: 'GET_SUBJECTS', payload }));
