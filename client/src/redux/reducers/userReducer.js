const initialState = {
  name: '',
  school: '',
  email: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_USER':
    case 'GET_USER': {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: return state;
  }
}
