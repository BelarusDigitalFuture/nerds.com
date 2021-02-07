const format = (task) => {
  return task;
};

module.exports.format = format;

module.exports.formatArray = (tasks) => {
  return {results: tasks.results.map(format)};
};
