const _ = require('lodash');

module.exports.formatUser = (user) => {
  const omittedFields = [
    'passwordHash', 'passwordSalt',  'signupToken',
  ];

  return _.omit(user, omittedFields);
};
