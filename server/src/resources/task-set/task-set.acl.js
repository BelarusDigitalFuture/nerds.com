const taskSetService = require('./task-set.service');

module.exports.getTaskSet = async(taskSetId, user) => {
  const taskSet = await taskSetService.findOne({
    _id: taskSetId,
  });
  if(!taskSetId || !taskSet || taskSet.authorId !== user._id){
    throw new Error('not found');
  }

  return taskSet;
}
