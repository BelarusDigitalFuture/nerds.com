const subjectService = require('../resources/subject/subject.service');
const contestService = require('../resources/contest/contest.service');
const userService = require('../resources/user/user.service');
const taskSetService = require('../resources/task-set/task-set.service');
const taskService = require('../resources/task/task.service');
const taskOptionService = require('../resources/task-option/task-option.service');
const contestDataMain = require('./data/contest');
const contestDataWords = require('./data/contest_words');
const contestDataQuotes = require('./data/contest_quotes');
const contestDataBelarus = require('./data/contest_belarus');

const subjectId = process.argv[2];
const set = process.argv[3];
const taskSetDescription = process.argv[4] || 'Тестовый сет задач для олимпиады по белорусскому языку';

let contestData;
switch (set) {
  case 'main':
    contestData = contestDataMain;
    break;
  case 'quotes':
    contestData = contestDataQuotes;
    break;
  case 'words':
    contestData = contestDataWords;
    break;
  case 'belarus':
    contestData = contestDataBelarus;
    break;
  default:
    contestData = contestDataMain;
    break;
}

const createTaskSet = async (authorId) => {
  const taskSetData = {
    name: 'Belmova test',
    description: taskSetDescription,
    subjectId,
    authorId,
  };
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
    subjectId,
  });

  console.info(`Created new contest ${JSON.stringify(contest)}`);
}

const run = async () => {
  if(!subjectId){
    const subjects = await subjectService.find({});
    console.log('SUBJECTS TO USE');
    console.log(JSON.stringify(subjects, null, 2));
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
