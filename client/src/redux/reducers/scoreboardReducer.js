const initialState = {
  scoreboardByContest: [],
  scoreboardByTraining: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_SCOREBOARD': {
      return {
        ...state,
        scoreboardByContest: action.payload.contest,
        scoreboardByTraining: action.payload.training,
      };
    }
    default: return state;
  }
}
