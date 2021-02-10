const _ = require('lodash');
const contestService = require('./../contest/contest.service');
const userService = require('./../user/user.service');
const answerService = require('./../answer/answer.service');
const taskService = require('./../task/task.service');
const taskSetService = require('./../task-set/task-set.service');

const userHelper = require('../user/user.helper');

module.exports.getForContest = async (ctx) => {
  const { contestId } = ctx.params;

  const answers = await answerService.find({contestId});
  const contest = await contestService.findOne({_id: contestId});
  const tasks = await taskService.find({taskSetId: contest.taskSetId});

  const scoreboard = {};

  answers.results.forEach(answer => {
    if(!scoreboard[answer.userId]){
      scoreboard[answer.userId] = {
        tasks: Object.fromEntries(tasks.results.map(task => [task._id, 0])),
        total: 0,
      }
    }
    scoreboard[answer.userId].tasks[answer.taskId] = answer.points;
    scoreboard[answer.userId].total += answer.points;
  });

  const userIds = Object.keys(scoreboard);
  const users = await userService.atomic.find({ _id: { $in: userIds }});

  const scoreBoardTable = [];
  userIds.forEach((userId) => {
    const user = users.find(u => u._id === userId);
    scoreBoardTable.push({
      user: _.pick(user, ['name', '_id', 'school', 'email']),
      ...scoreboard[userId],
    })
  });
  ctx.body = scoreBoardTable.sort((a, b) => b.total - a.total);
};

module.exports.getForSubject = async (ctx) => {
  const { subjectId } = ctx.params;

  const taskSets = await taskSetService.find({subjectId});
  // console.log(taskSets);
  const contests = await contestService.find({taskSetId: {$in: taskSets.results.map(x => x._id)}});
  const scoreboard = {};

  await Promise.all(contests.results.map(async contest => {
    const answers = await answerService.find({contestId: contest._id});

    answers.results.forEach(answer => {
      if(!scoreboard[answer.userId]){
        scoreboard[answer.userId] = {
          contests: Object.fromEntries(contests.results.map(contest => [contest._id, 0])),
          total: 0,
        }
      }
      scoreboard[answer.userId].contests[answer.contestId] += answer.points;
      scoreboard[answer.userId].total += answer.points;
    });
  }));

  ctx.body = scoreboard;
};
