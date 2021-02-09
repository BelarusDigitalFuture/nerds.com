const _ = require('lodash');
const db = require('../../services/db.service');
const schema = require('./contest.schema');

const service = db.createService('contest', schema);

service.updateEntity = async (contestId, updateObject) => {
  return service.findOneAndUpdate({
    _id: contestId,
  }, {
    $set: _.pickBy(updateObject, _.identity),
  });
};

module.exports = service;
