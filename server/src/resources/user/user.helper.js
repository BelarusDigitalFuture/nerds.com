const _ = require('lodash');
const moment = require('moment');

module.exports.formatUser = (user) => {
  const omittedFields = [
    'passwordHash', 'passwordSalt', 'google',
    'facebook', 'twitter', 'signupToken',
    'profiler', 'initialQuestions',
    'redHerringScore', 'pairedQuestionsScore',
  ];

  return _.omit(user, omittedFields);
};
