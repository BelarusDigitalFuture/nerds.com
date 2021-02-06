import { createStore, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import combineSectionReducers from 'combine-section-reducers';

import admin from './admin/admin.reducer';
import user from './user/user.reducer';

const reducer = combineSectionReducers({
  admin,
  user,
  form: formReducer,
});

export default createStore(
  reducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() :
      noop => noop,
  ),
);
