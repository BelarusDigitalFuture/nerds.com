const _ = require('lodash');
const moment = require('moment');
const answerService = require('../answer.service');
const taskService = require('../../task/task.service');
const contestService = require('../../contest/contest.service');
const taskOptionService = require('../../task-option/task-option.service');
const baseValidator = require('../../base.validator');
const taskConstants = require("../../task/task.constants");

const populate = async (ctx) => {
  const userId = ctx.state.user._id;
  const {taskId, contestId} = ctx.request.body || ctx.request.query;

  if (!taskId || !contestId || !userId) {
    // ctx.errors.push({ answer: 'Answer not found' });
    return false;
  }

  return true;
};

module.exports.populate = populate;

module.exports.validate = (ctx) => baseValidator(ctx, async () => {
  let check;

  ctx.checkBody('taskId')
    .notEmpty()
    .trim();

  ctx.checkBody('contestId')
    .notEmpty()
    .trim();

  ctx.checkBody('value')
    .notEmpty();

  if (ctx.errors.length > 0) {
    return false;
  }

  const { taskId, contestId, value } = ctx.request.body;
  let points;

  const task = await taskService.findOne({_id: taskId});
  if (!task) {
    ctx.errors.push({taskId: 'Task with the following id was not found'});
    return false;
  }

  const contest = await contestService.findOne({_id: contestId});
  if (!contest) {
    ctx.errors.push({contestId: 'Contest with the following id was not found'});
    return false;
  }

  const curTime = moment();
  const isPointsRated = contest.ratingEnabled && curTime.isBetween(moment(contest.startDate), moment(contest.endDate));
  if (curTime.isBefore(moment(contest.startDate))) {
    ctx.errors.push({ contestId: 'Соревнование еще не началось'});
    return false;
  }

  const { results: taskOptions } = await taskOptionService.find({ taskId: task._id });
  switch(task.type){
    case taskConstants.taskType.fillIn:
      points = (value.toLowerCase() === _.get(task, 'evaluationInformation', '').toLowerCase()) * task.correctAnswerPoints;
      break;
    case taskConstants.taskType.oneAnswer:
      const appropriateTaskOption = taskOptions.find(x => x._id === value);
      if (!appropriateTaskOption) {
        ctx.errors.push({value: `${value} task option does not exist`});
        return false;
      } else {
        points = appropriateTaskOption.isCorrect * task.correctAnswerPoints;
      }
      break;
    case taskConstants.taskType.multipleAnswers:
      if(Array.isArray(value)) {
        let optionsValid = true;
        value.forEach(taskOptionId => {
          if (!taskOptions.map(x => x._id).includes(taskOptionId)) {
            ctx.errors.push({value: `${taskOptionId} task option does not exist`});
            optionsValid = false;
          }
        });

        if(optionsValid){
          const correctTaskOptionIds = taskOptions
            .filter(to => to.isCorrect)
            .map(to => to._id);
          const [validValues, invalidValues] = _.partition(value, (v) => correctTaskOptionIds.includes(v));
          if (invalidValues.length) {
            points = 0;
          } else {
            points = correctTaskOptionIds.length === 0  ? 0 : validValues.length / correctTaskOptionIds.length * task.correctAnswerPoints;
          }
        }
      } else {
        ctx.errors.push({value: `value should be an array`});
        return false;
      }
      break;
  }

  if (ctx.errors.length > 0) {
    return false;
  }

  await populate(ctx);

  return {
    taskId,
    contestId,
    value,
    points,
    isPointsRated,
  };
});
