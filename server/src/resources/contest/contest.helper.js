const moment = require('moment');

const format = (contest) => {
  const curDate = moment();
  let status = 'Соревнование еще не началось';
  if (curDate.isBetween(moment(contest.startDate), moment(contest.endDate))) {
    status = 'Соревнование идёт';
  } else if (curDate.isAfter(moment(contest.endDate))) {
    status = 'Соревнование окончено';
  }
  return {
    ...contest,
    status,
  };
};

module.exports.format = format;

module.exports.formatArray = (contests) => contests.map(c => format(c));
