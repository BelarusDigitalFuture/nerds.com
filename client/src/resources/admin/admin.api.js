import config from '../../config';
import fetchApi from '../../services/fetch-api';

const baseApi = fetchApi({
  baseApiUrl: config.apiUrl,
  defaultQueryStringObject: {},
});

export function fetchUsersList(filters) {
  return baseApi
    .get('admin/users/list', filters)
    .then((users) => {
      return users;
    });
}

export function fetchUser(userId) {
  return baseApi
    .get(`admin/users/${userId}`)
    .then((user) => {
      return user;
    });
}

export function fetchOrders({
  page, searchCustomerId,
}) {
  return baseApi
    .get('admin/orders', {
      page,
      searchCustomerId,
    })
    .then((orders) => {
      return orders;
    });
}

export function fetchRecommendation({
  page, searchCustomerId,
}) {
  return baseApi
    .get('admin/recommendation', {
      page,
      searchCustomerId,
    })
    .then((recommendation) => {
      return recommendation;
    });
}

export function fetchRandomCustomers() {
  return baseApi
    .get('admin/recommendation/random-customers')
    .then((customers) => {
      return customers;
    });
}

