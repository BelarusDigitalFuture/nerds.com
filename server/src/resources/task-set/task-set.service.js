const _ = require('lodash');
const db = require('../../services/db.service');
const schema = require('./task-set.schema');

const service = db.createService('taskSet', schema);

service.updateEntity = async (taskSetId, updateObject) => {
  return service.findOneAndUpdate({
    _id: taskSetId,
  }, {
    $set: _.pickBy(updateObject, _.identity),
  });
};

module.exports = service;
