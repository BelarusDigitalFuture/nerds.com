const subjectService = require('./subject.service');

const getSubject = async(subjectId) => {
  const subject = await subjectService.findOne({
    _id: subjectId,
  });
  if(!subjectId || !subject){
    throw new Error('not found');
  }

  return subject;
}

module.exports = {getSubject};
