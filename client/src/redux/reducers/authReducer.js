const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SIGNUP_USER': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'LOGIN_USER': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'LOGOUT_USER': {
      return {
        ...initialState,
      };
    }
    default: return state;
  }
}
