const initialState = {
  list: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CONTEST_LIST': {
      return {
        ...state,
        list: action.payload,
      };
    }
    default: return state;
  }
}
