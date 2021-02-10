const initialState = {
  scoreboardByContest: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_SCOREBOARD': {
      return {
        ...state,
        scoreboardByContest: action.payload,
      };
    }
    default: return state;
  }
}
