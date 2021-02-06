const initialState = {
  username: '',
  settings: {},
  verifiedPhoneNumber: '',
  payPalEmail: '',
  resentOrdersCount: 0,
  marks: {},
  pushNotificationsSubscriptions: [],
  isSurveyProfilerFilled: false,
  isVerificationEmailDelivered: false,
  countryISO: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'fetchUser': {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
