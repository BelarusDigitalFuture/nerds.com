const _ = require('lodash');

const format = (task) => {
  const omittedFields = [
    'evaluationInformation',
  ];

  return _.omit(task, omittedFields);
};

module.exports.format = format;

module.exports.formatArray = (tasks) => {
  return {results: tasks.results.map(format)};
};
