const initialState = {
  auth: false,
  authError: false,
  authFetching: false,
  token: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_AUTH': {
      return {
        ...state,
        auth: action.auth,
      };
    }
    case 'SET_AUTH_ERROR': {
      return {
        ...state,
        authError: action.authError,
      };
    }
    case 'AUTH_FETCHING': {
      return {
        ...state,
        authFetching: action.authFetching,
      };
    }
    default: return state;
  }
}
