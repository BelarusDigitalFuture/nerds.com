import { combineReducers } from 'redux';

import auth from './authReducer';
import subject from './subjectReducer';
import contest from './contestReducer';

export default combineReducers({
  auth,
  subject,
  contest,
});
