const format = (taskOption) => {
  return taskOption;
};

module.exports.format = format

module.exports.formatArray = (taskOptions) => {
  return { results: taskOptions.results.map(format) };
};
