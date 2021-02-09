const subjectService = require('../resources/subject/subject.service');
const contestService = require('../resources/contest/contest.service');
const userService = require('../resources/user/user.service');
const taskSetService = require('../resources/task-set/task-set.service');
const taskService = require('../resources/task/task.service');
const taskOptionService = require('../resources/task-option/task-option.service');
const contestData = require('./data/contest');

const subjectId = process.argv[2];

const createTaskSet = async (authorId) => {
  const taskSetData = {
    name: 'test taskset',
    description: 'test taskset description',
    subjectId,
    authorId,
  }
  const taskSet = await taskSetService.create(taskSetData);

  console.info(`Created new task set ${JSON.stringify(taskSet)}`);

  return taskSet._id;
}

const createTasks = async (taskSetId) => {
  const tasksData = contestData.tasks.map(x => {
    return {
      ...x,
      taskSetId,
    }
  });

  return Promise.all(tasksData.map(async taskData => {
    const options = taskData.options;
    delete taskData.options;
    const task = await taskService.create(taskData);
    const taskId = task._id;

    console.info(`Created new task ${JSON.stringify(task)}`);

    if(options){
      const taskOptions = await Promise.all(options.map(async taskOptionData => taskOptionService.create({
        ...taskOptionData,
        taskId,
      })));

      console.info(`Created new task options ${JSON.stringify(taskOptions)}`);
    }


    return taskId;
  }));
}

const createContest = async (taskSetId) => {
  const contest = await contestService.create({
    startDate: contestData.startDate,
    endDate: contestData.endDate,
    description: contestData.description,
    ratingEnabled: true,
    taskSetId,
  });

  console.info(`Created new contest ${JSON.stringify(contest)}`);
}

const run = async () => {
  if(!subjectId){
    throw new Error('usage: createSampleContest.js subjectId');
  }
  const subject = await subjectService.findOne({ _id: subjectId });
  if(!subject){
    throw new Error('subject not found');
  }

  const admin = await userService.findOne({ email: 'admin@geekcon.online' });
  if(!admin){
    throw new Error('admin user does not exist');
  }
  const authorId = admin._id;

  const taskSetId = await createTaskSet(authorId);

  await createTasks(taskSetId);

  await createContest(taskSetId);
};

run()
  .then(() => {
    console.info('Success');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
