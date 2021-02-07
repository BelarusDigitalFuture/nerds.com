const moment = require('moment');
const taskConstants = require('./../../resources/task/task.constants');
const axios = require('axios')
const host = 'localhost:8081'

const email = `test_user_${Math.floor(Math.random() * 1e9)}@example.com`;
const password = 'password';

const signup = async () => {
  return new Promise((resolve, reject) =>
    axios.post(`http://${host}/account/signup`, {
      email,
      password,
      name: email,
      school: 'test school',
      birthDate: '2000-01-01',
    }).then(res => {
      const {token} = res.data;

      if(!token){
        throw new Error('token undefined');
      }

      resolve(token);
    }).catch(error => {
      console.error(error.response?.data);
      reject();
    })
  );
}

const login = async () => {
  return new Promise((resolve, reject) =>
    axios.post(`http://${host}/account/login`, {
      email,
      password,
    }).then(res => {
      const {token} = res.data;

      if(!token){
        throw new Error('token undefined');
      }

      resolve(token);
    }).catch(error => {
      console.error(error.response.data);
      reject();
    })
  );
}

const userGetMe = async (token) => {
  return new Promise((resolve, reject) =>
    axios.get(`http://${host}/user/`, {
      headers: {'Authorization': `Bearer ${token}`},
    }).then(res => {
      resolve(res.data);
    }).catch(error => {
      console.error(error.response.data);
      reject();
    })
  );
}

const userUpdateMe = async (token) => {
  const data = {
    name: email + '_updated',
    school: 'test school updated',
    birthDate: '2000-01-02',
  };

  return new Promise((resolve, reject) =>
    axios.put(`http://${host}/user/`, data, {
      headers: {'Authorization': `Bearer ${token}`},
    }).then(res => {
      if(res.data.name !== data.name || res.data.school !== data.school || res.data.birthDate !== '2000-01-02T00:00:00.000Z'){
        reject('update data mismatch');
      }
      resolve(res.data);
    }).catch(error => {
      console.error(error.response.data);
      reject();
    })
  );
}

const subjectGet = async (token) => {
  return new Promise((resolve, reject) =>
    axios.get(`http://${host}/subject/`, {
      headers: {'Authorization': `Bearer ${token}`},
    }).then(res => {
      if(!res.data.results.length){
        reject('no subjects');
      }
      resolve(res.data.results);
    }).catch(error => {
      console.error(error.response.data);
      reject();
    })
  );
}

const taskSetCreate = async (token, subjectId) => {
  const data = {
    name: 'test name',
    description: 'test description',
    subjectId,
  };
  return new Promise((resolve, reject) =>
    axios.post(`http://${host}/task-set/`, data,{
      headers: {'Authorization': `Bearer ${token}`},
    }).then(res => {
      if(res.data.name !== data.name || res.data.description !== data.description || res.data.subjectId !== data.subjectId){
        reject('taskSet create data mismatch');
      }
      resolve(res.data);
    }).catch(error => {
      console.error(error.response.data);
      reject();
    })
  );
}

const taskSetGet = async (token) => {
  return new Promise((resolve, reject) =>
    axios.get(`http://${host}/task-set/`, {
      headers: {'Authorization': `Bearer ${token}`},
    }).then(res => {
      if(res.data.results.length !== 1){
        reject('taskSet get invalid length');
      }
      resolve(res.data);
    }).catch(error => {
      console.error(error.response.data);
      reject();
    })
  );
}

const taskSetUpdate = async (token, taskSet) => {
  const data = {
    name: 'test name2',
    description: 'test description2',
  };

  return new Promise((resolve, reject) =>
    axios.put(`http://${host}/task-set/${taskSet._id}`, data, {
      headers: {'Authorization': `Bearer ${token}`},
    }).then(res => {
      if(res.data.name !== data.name || res.data.description !== data.description || res.data.subjectId !== taskSet.subjectId){
        reject('taskSet update data mismatch');
      }
      resolve(res.data);
    }).catch(error => {
      console.error(error.response.data);
      reject();
    })
  );
}

const taskSetDelete = async (token, taskSetId) => {
  return new Promise((resolve, reject) =>
    axios.delete(`http://${host}/task-set/${taskSetId}`, {
      headers: {'Authorization': `Bearer ${token}`},
    }).then(res => {
      resolve(res.data);
    }).catch(error => {
      console.error(error.response.data);
      reject();
    })
  );
}

const tasksCreate = async (token, taskSetId) => {
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
      type: taskConstants.taskType.essay,
      maxLength: 1000,
      maxWords: 100,
      text: 'Do you love Belarus? Explain your answer',
      evaluationInformation: 'Evaluate as you wish',
      correctAnswerPoints,
    },
  ]

  return Promise.all(tasksData.map(async taskData => {
    const options = taskData.options;
    delete taskData.options;

    const task = await new Promise((resolve, reject) =>
      axios.post(`http://${host}/task/`, taskData,{
        headers: {'Authorization': `Bearer ${token}`},
      }).then(res => {
        Object.entries(taskData).forEach(([k,v]) => {
          if(v !== taskData[k]){
            console.log(taskData, res.data, k, v);
            reject('task create data mismatch');
          }
        });
        resolve(res.data);
      }).catch(error => {
        console.error(error.response.data);
        reject();
      })
    );

    if(options) {
      const taskId = task._id;
      const taskOptions = await Promise.all(options.map(async taskOptionData => new Promise((resolve, reject) => {
        taskOptionData = {
          ...taskOptionData,
          taskId,
        }
        axios.post(`http://${host}/task-option/`, taskOptionData, {
          headers: {'Authorization': `Bearer ${token}`},
        }).then(res => {
          Object.entries(taskOptionData).forEach(([k, v]) => {
            if (v !== taskOptionData[k]) {
              console.log(taskOptionData, res.data);
              reject('task option create data mismatch');
            }
          });
          resolve(res.data);
        }).catch(error => {
          console.error(error.response.data);
          reject();
        });
      })));
    }

    return task;
  }));
}

const tasksGet = async (token, taskSetId) => {
  return new Promise((resolve, reject) =>
    axios.get(`http://${host}/task/?taskSetId=${taskSetId}`, {
      headers: {'Authorization': `Bearer ${token}`},
    }).then(res => {
      if(res?.data?.results?.length !== 4){
        console.log(res?.data);
        reject('task get invalid length');
      }
      resolve(res.data.results);
    }).catch(error => {
      console.error(error.response?.data);
      reject();
    })
  );
}

const taskUpdate = async (token, task) => {
  const data = {
    text: task.text + '2',
    evaluationInformation: task.evaluationInformation + '2'
  };

  return new Promise((resolve, reject) =>
    axios.put(`http://${host}/task/${task._id}`, data, {
      headers: {'Authorization': `Bearer ${token}`},
    }).then(res => {
      Object.entries(data).forEach(([k, v]) => {
        if (v !== data[k]) {
          console.log(data, res.data);
          reject('task update data mismatch');
        }
      });
      resolve(res.data);
    }).catch(error => {
      console.error('taskUpdate', data, error.response.data);
      reject();
    })
  );
}

const taskDelete = async (token, taskId) => {
  return new Promise((resolve, reject) =>
    axios.delete(`http://${host}/task/${taskId}`, {
      headers: {'Authorization': `Bearer ${token}`},
    }).then(res => {
      resolve(res.data);
    }).catch(error => {
      console.error(error.response.data);
      reject();
    })
  );
}

const taskOptionsGet = async (token, taskId, skipCheck) => {
  return new Promise((resolve, reject) =>
    axios.get(`http://${host}/task-option/?taskId=${taskId}`, {
      headers: {'Authorization': `Bearer ${token}`},
    }).then(res => {
      if(skipCheck !== true && res.data.results.length !== 4){
        console.log(res.data.results);
        reject('task options get invalid length');
      }
      resolve(res.data.results);
    }).catch(error => {
      console.error(error.response.data);
      reject();
    })
  );
}

const taskOptionUpdate = async (token, taskOption) => {
  const data = {
    label: taskOption.label + '2',
    isCorrect: !taskOption.isCorrect,
  };

  return new Promise((resolve, reject) =>
    axios.put(`http://${host}/task-option/${taskOption._id}`, data, {
      headers: {'Authorization': `Bearer ${token}`},
    }).then(res => {
      Object.entries(data).forEach(([k, v]) => {
        if (v !== data[k]) {
          console.log(data, res.data);
          reject('task option update data mismatch');
        }
      });
      resolve(res.data);
    }).catch(error => {
      console.error(error.response.data);
      reject();
    })
  );
}

const taskOptionDelete = async (token, taskOptionId) => {
  return new Promise((resolve, reject) =>
    axios.delete(`http://${host}/task-option/${taskOptionId}`, {
      headers: {'Authorization': `Bearer ${token}`},
    }).then(res => {
      resolve(res.data);
    }).catch(error => {
      console.error(error.response.data);
      reject();
    })
  );
}

const contestCreate = async (token, taskSetId) => {
  const data = {
    startDate: moment().add(1, 'week').toISOString(),
    endDate: moment().add(1, 'week').add(2, 'hours').toISOString(),
    description: 'test description',
    ratingEnabled: true,
    taskSetId,
  };
  return new Promise((resolve, reject) =>
    axios.post(`http://${host}/contest/`, data, {
      headers: {'Authorization': `Bearer ${token}`},
    }).then(res => {
      Object.entries(data).forEach(([k, v]) => {
        if (v !== data[k]) {
          console.log(data, res.data);
          reject('contest create data mismatch');
        }
      });
      resolve(res.data);
    }).catch(error => {
      console.error(error.response.data);
      reject();
    })
  );
}

const contestGetOne = async (token, contestId) => {
  return new Promise((resolve, reject) =>
    axios.get(`http://${host}/contest/${contestId}`, {
      headers: {'Authorization': `Bearer ${token}`},
    }).then(res => {
      resolve(res.data);
    }).catch(error => {
      console.error(error.response.data);
      reject();
    })
  );
}

const contestGet = async (token, contestId) => {
  return new Promise((resolve, reject) =>
    axios.get(`http://${host}/contest/`, {
      headers: {'Authorization': `Bearer ${token}`},
    }).then(res => {
      if(!res.data.results){
        console.log(res.data);
        reject('contest results unset');
      }
      if(!res.data.results.find(x => x._id === contestId)){
        console.log(res.data);
        reject('contest not found invalid length');
      }
      resolve(res.data);
    }).catch(error => {
      console.error(error.response.data);
      reject();
    })
  );
}

const contestUpdate = async (token, contest) => {
  const data = {
    startDate: moment().add(2, 'week').toISOString(),
    endDate: moment().add(2, 'week').add(3, 'hours').toISOString(),
    description: 'test description2',
    ratingEnabled: false,
  };

  return new Promise((resolve, reject) =>
    axios.put(`http://${host}/contest/${contest._id}`, data, {
      headers: {'Authorization': `Bearer ${token}`},
    }).then(res => {
      Object.entries(data).forEach(([k, v]) => {
        if (v !== data[k]) {
          console.log(data, res.data);
          reject('contest update data mismatch');
        }
      });
      resolve(res.data);
    }).catch(error => {
      console.error(error.response.data);
      reject();
    })
  );
}

const contestDelete = async (token, contestId) => {
  return new Promise((resolve, reject) =>
    axios.delete(`http://${host}/contest/${contestId}`, {
      headers: {'Authorization': `Bearer ${token}`},
    }).then(res => {
      resolve(res.data);
    }).catch(error => {
      console.error(error.response.data);
      reject();
    })
  );
}

const answersCreate = async (token, tasks, contestId) => {
  return Promise.all(tasks.map(async task => {
    let value, taskOptions;
    switch(task.type){
      case taskConstants.taskType.oneAnswer:
        taskOptions = await taskOptionsGet(token, task._id, true);
        value = taskOptions[0]._id;
        break;
      case taskConstants.taskType.multipleAnswers:
        taskOptions = await taskOptionsGet(token, task._id, true);
        value = taskOptions.slice(0, 2).map(x => x._id);
        break;
      case taskConstants.taskType.fillIn:
      case taskConstants.taskType.essay:
        value = 'test';
        break;
    }
    const data = {
      taskId: task._id,
      contestId,
      value,
    };
    return new Promise((resolve, reject) =>
      axios.post(`http://${host}/answer/`, data, {
        headers: {'Authorization': `Bearer ${token}`},
      }).then(res => {
        Object.entries(data).forEach(([k, v]) => {
          if (v !== data[k]) {
            console.log(data, res.data);
            reject('answer create data mismatch');
          }
        });
        resolve(res.data);
      }).catch(error => {
        console.error(error.response.data);
        reject();
      })
    );
  }));
}

const answerUpdate = async (token, answer) => {
  const data = {
    taskId: answer.taskId,
    contestId: answer.contestId,
    value: 'test2',
  };
  return new Promise((resolve, reject) =>
    axios.post(`http://${host}/answer/`, data, {
      headers: {'Authorization': `Bearer ${token}`},
    }).then(res => {
      data._id = answer._id;
      Object.entries(data).forEach(([k, v]) => {
        if (v !== data[k]) {
          console.log(data, res.data);
          reject('answer update data mismatch');
        }
      });
      resolve(res.data);
    }).catch(error => {
      console.error(error.response.data);
      reject();
    })
  );
}

const answerDelete = async (token, answer) => {
  const data = {
    taskId: answer.taskId,
    contestId: answer.contestId,
  };
  return new Promise((resolve, reject) =>
    axios.delete(`http://${host}/answer/`, {
      data,
      headers: {'Authorization': `Bearer ${token}`},
    }).then(res => {
      resolve(res.data);
    }).catch(error => {
      console.error('answerDelete', error.response.data);
      reject();
    })
  );
}

const run = async () => {
  await signup();
  const token = await login();
  await userGetMe(token);
  await userUpdateMe(token);
  const subjects = await subjectGet(token);

  const taskSet = await taskSetCreate(token, subjects[0]._id);
  await taskSetGet(token);
  await taskSetUpdate(token, taskSet);

  const tasks = await tasksCreate(token, taskSet._id);
  await tasksGet(token, taskSet._id);
  await taskUpdate(token, tasks[0]);
  const taskOptions = await taskOptionsGet(token, tasks[0]._id);
  await taskOptionUpdate(token, taskOptions[0]);
  
  const contest = await contestCreate(token, taskSet._id);
  await contestGet(token, contest._id);
  await contestGetOne(token, contest._id);
  await contestUpdate(token, contest);

  const answers = await answersCreate(token, tasks, contest._id);
  await answerUpdate(token, answers[2]);
  await answerDelete(token, answers[2]);

  await taskOptionDelete(token, taskOptions[0]._id);
  await taskDelete(token, tasks[0]._id);
  await taskSetDelete(token, taskSet._id);
  await contestDelete(token, contest._id);

}

run()
  .then(() => {
    console.info('Success');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
