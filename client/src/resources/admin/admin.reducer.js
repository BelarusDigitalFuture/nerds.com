const initialState = {
  users: [],
  orders: [],
  totalOrdersPages: 0,
  totalOrdersCount: 0,
  recommendation: {},
  customersIds: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'fetchUsers': {
      const newUsers = [];
      const newUsersIds = [];
      action.payload.results.forEach((user) => {
        if (!state.usersIds.includes(user._id)) {
          newUsers.push(user);
          newUsersIds.push(user._id);
        }
      });

      return {
        ...state,
        users: action.payload.results,
        totalUsersPages: action.payload.pagesCount,
        usersIds: action.payload.results.map(user => user._id),
        hasMoreUsers: state.users.length + action.payload.results.length < action.payload.count,
        totalUsersCount: action.payload.count,
        searchUserId: action.payload.searchOrderId,
        searchUserEmail: action.payload.searchUserEmail,
        searchUsername: action.payload.searchUsername,
      };
    }
    case 'fetchAdminOrders': {
      return {
        ...state,
        orders: action.payload.results,
        totalOrdersPages: action.payload.pagesCount,
        totalOrdersCount: action.payload.count,
      };
    }
    case 'fetchRecommendation': {
      return {
        ...state,
        recommendation: action.payload,
      };
    }
    case 'fetchRandomCustomers': {
      return {
        ...state,
        customersIds: action.payload.customersIds,
      };
    }
    default:
      return state;
  }
};
