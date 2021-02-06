const initialState = {
  email: '',
  password: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'loginUser': {
      return state;
    }
    default:
      return state;
  }
};
