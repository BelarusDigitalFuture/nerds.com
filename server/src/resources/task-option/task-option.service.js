const db = require('../../services/db.service');
const schema = require('./task-option.schema');

const service = db.createService('taskOption', schema);

service.updateEntity = async (taskOption, $set) => {
  const {taskId, label, isCorrect} = $set;
  $set = Object.fromEntries(Object.entries({taskId, label, isCorrect}).filter(x => typeof x[1] !== 'undefined'));

  return service.findOneAndUpdate({
    _id: taskOption._id,
  }, {
    $set,
  }, { returnOriginal: false });
}


module.exports = service;
