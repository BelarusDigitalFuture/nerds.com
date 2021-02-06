Deployment:
- `ansible-galaxy install -p /home/gitlab-runner/.ansible/roles weareinteractive.docker`

Database:

- User (email, password, name, school, dateOfBirth, description)
- Subject (name)
- Contest (duration, startDate, description, taskSet, ratingEnabled)
- ContestParticipant (user, contest)
- TaskSet (name, description, subject, author)
- Task (taskSet, type (one answer, multiple answers, essay, fill-in), maxLength, maxWords, text, evaluationInformation, correctAnswerPoints)
- TaskOption (task, label, isCorrect)
- Answer (contest, user, task, taskOptions, value, manuallyVerified, verifiedBy, points)
