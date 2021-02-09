const db = require('../../services/db.service');
const schema = require('./answer.schema');

const service = db.createService('answer', schema);

service.updateEntity = async (answerId, updateObject) => {
  return service.findOneAndUpdate({
    _id: answerId,
  }, {
    $set: updateObject,
  });
};


module.exports = service;
