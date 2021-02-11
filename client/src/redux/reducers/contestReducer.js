const initialState = {
  contestList: [],
  trainingList: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CONTEST_LIST': {
      return {
        ...state,
        contestList: action.payload.contests,
        trainingList: action.payload.trainings,
      };
    }
    default: return state;
  }
}
