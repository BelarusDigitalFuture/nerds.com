const initialState = {
  contests: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_CONTESTS': {
      return {
        ...state,
        contests: action.payload.results,
      };
    }
    default: return state;
  }
}
