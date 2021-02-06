import reducers from '.';

export function rootReducer(state, action) {
  if (action.type === 'CLEAR_STATE') {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }
  return reducers(state, action);
}

export default rootReducer;
