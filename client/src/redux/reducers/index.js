import { combineReducers } from 'redux';

import auth from './authReducer';
import subject from './subjectReducer';
import contest from './contestReducer';
import user from './userReducer';
import scoreboard from './scoreboardReducer';

export default combineReducers({
  auth,
  subject,
  contest,
  user,
  scoreboard,
});
