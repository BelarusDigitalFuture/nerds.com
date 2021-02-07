const format = (taskSet) => {
  return taskSet;
};

module.exports.format = format

module.exports.formatArray = (taskSets) => {
  return {results: taskSets.results.map(format)};
};
