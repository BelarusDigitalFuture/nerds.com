const subjectService = require('../resources/subject/subject.service');
const contestService = require('../resources/contest/contest.service');
const userService = require('../resources/user/user.service');
const taskSetService = require('../resources/task-set/task-set.service');
const taskService = require('../resources/task/task.service');
const taskOptionService = require('../resources/task-option/task-option.service');
const taskConstants = require('../resources/task/task.constants');
const moment = require('moment');

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
  const correctAnswerPoints = 10;

  const tasksData = [
    {
      taskSetId,
      type: taskConstants.taskType.oneAnswer,
      text: 'Choose your most favourite color',
      correctAnswerPoints,
      options: [
        {label: 'Red', isCorrect: false},
        {label: 'Green', isCorrect: false},
        {label: 'Blue', isCorrect: false},
        {label: 'White', isCorrect: true},
      ]
    },
    {
      taskSetId,
      type: taskConstants.taskType.multipleAnswers,
      text: 'Choose only belarusian cities',
      correctAnswerPoints,
      options: [
        {label: 'Minsk', isCorrect: true},
        {label: 'Gomel', isCorrect: true},
        {label: 'Mozyr', isCorrect: true},
        {label: 'Warsaw', isCorrect: false},
        {label: 'Moscow', isCorrect: false},
      ]
    },
    {
      taskSetId,
      type: taskConstants.taskType.fillIn,
      maxLength: 30,
      maxWords: 3,
      text: 'Name the most popular song of E.Zheludok',
      evaluationInformation: 'Schuchynschzyna or something like that',
      correctAnswerPoints,
    },
    {
      taskSetId,
      type: taskConstants.taskType.oneAnswer,
      maxLength: 1000,
      maxWords: 100,
      text: 'Do you love Belarus? Explain your answer',
      evaluationInformation: 'Evaluate as you wish',
      correctAnswerPoints,
    },
  ];

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
  const contestData = {
    startDate: moment().add(1, 'week').toDate(),
    endDate: moment().add(1, 'week').add(2, 'hours').toDate(),
    description: 'test description',
    ratingEnabled: true,
    taskSetId,
  }
  const contest = await contestService.create(contestData);

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

  const admin = await userService.findOne({ email: 'admin@geekcon.online.com' });
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
