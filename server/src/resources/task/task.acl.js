const taskService = require('./task.service');

module.exports.getTask = async(taskId, user) => {
  const task = await taskService.findOne({
    _id: taskId,
  });
  if(!taskId || !task){
    throw new Error('not found');
  }

  await getTaskSet(task.taskSetId, user);

  return task;
}
