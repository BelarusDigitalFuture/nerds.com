const format = (contest) => {
  return contest;
};

module.exports.format = format;

module.exports.formatArray = (contests) => {
  return {results: contests.results.map(format)};
};
