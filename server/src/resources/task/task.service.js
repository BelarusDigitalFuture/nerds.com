const db = require('../../services/db.service');
const schema = require('./task.schema');

const service = db.createService('task', schema);

service.updateEntity = async (task, $set) => {
  const {taskSetId, type, maxLength,
    maxWords, text, evaluationInformation,
    correctAnswerPoints,} = $set;
  $set = Object.fromEntries(Object.entries({
    taskSetId, type, maxLength,
    maxWords, text, evaluationInformation,
    correctAnswerPoints,
  }).filter(x => typeof x[1] !== 'undefined'));

  return service.findOneAndUpdate({
    _id: task._id,
  }, {
    $set,
  }, { returnOriginal: false });
}


module.exports = service;
