import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';

let middleware = applyMiddleware(thunk);
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line no-underscore-dangle
  middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(middleware);
}
const enhancer = compose(middleware);

export default createStore(rootReducer, enhancer);
