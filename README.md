Deployment:
- `ansible-galaxy install -p /home/gitlab-runner/.ansible/roles weareinteractive.docker`

Database:
-

- User (email, password, name, school, dateOfBirth, description, role={user, admin}, createdAt, updatedAt, deletedAt)
- Subject (name, createdAt, updatedAt, deletedAt)
- Contest (duration, startDate, description, taskSet, ratingEnabled, author, createdAt, updatedAt, deletedAt)
- ContestParticipant (user, contest, createdAt, updatedAt, deletedAt)
- TaskSet (name, description, subject, author, createdAt, updatedAt, deletedAt)
- Task (taskSet, type (one answer, multiple answers, essay, fill-in), maxLength, maxWords, text, evaluationInformation, correctAnswerPoints, createdAt, updatedAt, deletedAt)
- TaskOption (task, label, isCorrect, createdAt, updatedAt, deletedAt)
- Answer (contest, user, task, taskOptions, value, manuallyVerified, verifiedBy, points, createdAt, updatedAt, deletedAt)


API:
- 

All entities are soft deletable

Account
- POST /account/signup - signup
- POST /account/login - login
- GET /account/logout - logout

User
- GET /user - get current user
- PUT /user - update user 
  
Subject
- GET /api/subject - get all subjects
  
TaskSet
- POST /api/task-set - create task set
- GET /api/task-set - get my task sets
- PUT /api/task-set/:id - update task set (only accessible for the author or admin)
- DELETE /api/task-set/:id - delete task set (only accessible for the author or admin)
  
Task
- POST /api/task - create task 
- GET /api/task?taskSet - get tasks in the task set
- PUT /api/task/:id - update task
- DELETE /api/task/:id - delete task
  
TaskOption
- POST /api/task-option/ - create option for the task
- GET /api/task-option/?taskId - get task options for the task
- PUT /api/task-option/:id - update option for the task
- DELETE /api/task-option/:id - delete option for the task
  
Contest
- POST /api/contest - create contest
- GET /api/contest - get all contests ({active: Contest[], soonToStart: Contest[], training: Contest[]})
- GET /api/contest/my - get my contests 
- PUT /api/contest/:id - update contest
- POST /api/contest/:id/register - sign up for the contest
- DELETE /api/contest/:id - delete contest
  
Answer
- POST /api/answer?contest&task - create answer for the task and contest. Answers are immutable (creating one should remove previous)
- GET /api/answer?contest&task - get answers for the specified contest and task
- DELETE /api/answer/:id - delete answer

Fixtures:
-

- Users (admin)
- Subjects (belarusian language)
