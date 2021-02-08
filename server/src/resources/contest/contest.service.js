const db = require('../../services/db.service');
const schema = require('./contest.schema');

const service = db.createService('contest', schema);

service.updateEntity = async (contest, $set) => {
  const {startDate, endDate, description,
    ratingEnabled, taskSetId,} = $set;
  $set = Object.fromEntries(Object.entries({
    startDate, endDate, description,
    ratingEnabled, taskSetId,
  }).filter(x => typeof x[1] !== 'undefined'));

  return service.findOneAndUpdate({
    _id: contest._id,
  }, {
    $set,
  }, { returnOriginal: false });
}

module.exports = service;
