const format = (task) => {
  return task;
};

module.exports.format = format;

module.exports.formatArray = (tasks) => {
  return tasks.map(format);
};
