import * as api from './admin.api';

export const fetchUsers = filters => dispatch =>
  api.fetchUsersList(filters)
    .then(payload => dispatch({ type: 'fetchUsers', payload }));

export const fetchUser = userId => dispatch =>
  api.fetchUser(userId);

export const fetchOrders = ({ page, searchCustomerId }) => dispatch =>
  api.fetchOrders({
    page,
    searchCustomerId,
  })
    .then(payload => dispatch({ type: 'fetchAdminOrders', payload }));

export const fetchRecommendation = ({ page, searchCustomerId }) => dispatch =>
  api.fetchRecommendation({
    page,
    searchCustomerId,
  })
    .then(payload => dispatch({ type: 'fetchRecommendation', payload }));

export const fetchRandomCustomers = () => dispatch =>
  api.fetchRandomCustomers()
    .then(payload => dispatch({ type: 'fetchRandomCustomers', payload }));

