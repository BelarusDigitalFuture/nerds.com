const taskOptionService = require('./task-option.service');
const {getTask} = require('./../task/task.acl');

module.exports.getTaskOption = async(taskOptionId, user) => {
  const taskOption = await taskOptionService.findOne({
    _id: taskOptionId,
  });
  if(!taskOptionId || !taskOption){
    throw new Error('not found');
  }

  await getTask(taskOption.taskId, user);

  return taskOption;
}
