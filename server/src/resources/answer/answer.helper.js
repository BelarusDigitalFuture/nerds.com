const _ = require('lodash');

const format = (answer) => {
  const omittedFields = [
    'manuallyVerified', 'verifiedBy',  'points',
  ];

  return _.omit(answer, omittedFields);
};

module.exports.format = format;

module.exports.formatArray = (answers) => {
  return {results: answers.results.map(format)};
};
