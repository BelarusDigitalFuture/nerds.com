const moment = require('moment');

const format = (contest) => {
  const curDate = moment();
  let status = 'antiсipation';
  if (curDate.isBetween(moment(contest.startDate), moment(contest.endDate))) {
    status = 'active';
  } else if (curDate.isAfter(moment(contest.endDate))) {
    status = 'finished';
  }
  return {
    ...contest,
    status,
  };
};

module.exports.format = format;

module.exports.formatArray = (contests) => contests.map(c => format(c));
