const _ = require('lodash');
const userService = require('../../user/user.service');

module.exports.list = async (ctx) => {
  let page = 1;
  if (ctx.request.query.page) {
    page = ctx.checkQuery('page').toInt().value;
  }

  const {
    searchUserId, searchUserEmail, searchUsername,
    searchCountryName, searchClick, searchLead,
  } = ctx.request.query;

  let query = {};

  if (searchUserId) {
    query._id = searchUserId;
  }

  if (searchUserEmail) {
    query = {
      ...query,
      email: new RegExp(searchUserEmail, 'i'),
    };
  }

  if (searchClick) {
    query = {
      ...query,
      firstSurveyClickAt: { $exists: searchClick === 'yes' },
    };
  }

  if (searchLead) {
    query = {
      ...query,
      firstSurveyLeadAt: { $exists: searchLead === 'yes' },
    };
  }

  if (searchCountryName) {
    query = {
      ...query,
      countryName: new RegExp(searchCountryName, 'i'),
    };
  }

  if (searchUsername) {
    query = {
      ...query,
      username: new RegExp(searchUsername, 'i'),
    };
  }

  const options = {
    page,
    perPage: 20,
  };

  const result = await userService.find(query, options);

  const users = result.results.map((user) => {
    return {
      email: user.email,
      _id: user._id,
    };
  });

  ctx.body = {
    results: users,
    pagesCount: result.pagesCount,
    count: result.count,
    searchUserId,
    searchUserEmail,
    searchUsername,
  };
};
