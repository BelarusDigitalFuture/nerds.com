const db = require('../../services/db.service');
const schema = require('./task-set.schema');

const service = db.createService('taskSet', schema);

service.updateEntity = async (taskSet, $set) => {
  const {name, description, subjectId} = $set;
  $set = Object.fromEntries(Object.entries({name, description, subjectId}).filter(x => typeof x[1] !== 'undefined'));

  return service.findOneAndUpdate({
    _id: taskSet._id,
  }, {
    $set,
  }, { returnOriginal: false });
}

module.exports = service;
