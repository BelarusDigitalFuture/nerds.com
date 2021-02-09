const db = require('../../services/db.service');
const schema = require('./answer.schema');

const service = db.createService('answer', schema);

service.updateEntity = async (answerId, value) => {
  return service.findOneAndUpdate({
    _id: answerId,
  }, {
    $set: {
      value,
    },
  });
};


module.exports = service;
