const db = require('../../services/db.service');
const schema = require('./answer.schema');

const service = db.createService('answer', schema);

service.updateEntity = async (answer, $set) => {
  const {value} = $set;

  return service.findOneAndUpdate({
    _id: answer._id,
  }, {
    $set: {value},
  }, { returnOriginal: false });
}


module.exports = service;
