const initialState = {
  subjects: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_SUBJECTS': {
      return {
        ...state,
        subjects: action.payload.results,
      };
    }
    default: return state;
  }
}
