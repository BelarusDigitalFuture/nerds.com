const initialState = {
  name: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_USER': {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: return state;
  }
}
