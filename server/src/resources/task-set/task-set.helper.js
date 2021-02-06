const format = (taskSet) => {
  return taskSet;
};

module.exports.format = format

module.exports.formatArray = (taskSets) => {
  return taskSets.map(format);
};
