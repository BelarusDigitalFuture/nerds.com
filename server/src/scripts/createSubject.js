const subjectService = require('../resources/subject/subject.service');

const name = process.argv[2] || 'Test subject';

const run = async () => {
  const existingSubject = await subjectService.findOne({ name });
  if (existingSubject) {
    console.info(`Subject with name ${name} already exists, id - ${existingSubject._id}`);
    return;
  }

  const subject = await subjectService.create({ name });
  console.info(subject._id);
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
