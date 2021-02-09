const _ = require('lodash');
const db = require('../../services/db.service');
const schema = require('./task.schema');

const service = db.createService('task', schema);

service.updateEntity = async (taskId, updateObject) => {
  return service.findOneAndUpdate({
    _id: taskId,
  }, {
    $set: _.pickBy(updateObject, _.identity),
  });
};

module.exports = service;
