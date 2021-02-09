const _ = require('lodash');
const db = require('../../services/db.service');
const schema = require('./task-option.schema');

const service = db.createService('taskOption', schema);

service.updateEntity = async (taskOptionId, updateObject) => {
  return service.findOneAndUpdate({
    _id: taskOptionId,
  }, {
    $set: _.pickBy(updateObject, _.identity),
  });
};


module.exports = service;
