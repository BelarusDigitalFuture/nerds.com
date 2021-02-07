const _ = require('lodash');

const format = (taskOption) => {
  const omittedFields = [
    'isCorrect',
  ];

  return _.omit(taskOption, omittedFields);
};

module.exports.format = format

module.exports.formatArray = (taskOptions) => {
  return { results: taskOptions.results.map(format) };
};
