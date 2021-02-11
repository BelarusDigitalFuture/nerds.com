const moment = require('moment');

module.exports = {
  startDate: moment().toDate(),
  endDate: moment().add(1, 'second').toDate(),
  description: 'Тренировочная олимпиада по белорусскому языку (слова)',
  tasks: [
    {
     type: 'fillIn',
     maxLength: 30,
     maxWords: 1,
     text: 'Складзіце слова (аднавіць слова з літар, якія пераблытаны): к, в, р, н, а, а, а, а, ж',
     evaluationInformation: 'жаваранак',
     correctAnswerPoints: 1,
   },
   {
     type: 'fillIn',
     maxLength: 30,
     maxWords: 1,
     text: 'Складзіце слова (аднавіць слова з літар, якія пераблытаны): е, е, н, н, а, а, с, л, п, ч, ш, р',
     evaluationInformation: 'расшчапленне',
     correctAnswerPoints: 1,
   },
   {
     type: 'fillIn',
     maxLength: 30,
     maxWords: 1,
     text: 'Складзіце слова (аднавіць слова з літар, якія пераблытаны): н, г, з, а, а, а, а, д, р, у',
     evaluationInformation: 'узнагарода',
     correctAnswerPoints: 1,
   },
   {
     type: 'fillIn',
     maxLength: 30,
     maxWords: 1,
     text: 'Складзіце слова (аднавіць слова з літар, якія пераблытаны): ц, ц, л, я, і, а, е, м',
     evaluationInformation: 'мяцеліца',
     correctAnswerPoints: 1,
   },
   {
     type: 'fillIn',
     maxLength: 30,
     maxWords: 1,
     text: 'Складзіце слова (аднавіць слова з літар, якія пераблытаны): з, а, к, о, й, д, в, ч, м, а, ю',
     evaluationInformation: 'дзюймовачка',
     correctAnswerPoints: 1,
   },

    /*{
      type: 'oneAnswer',
      text: 'Choose your most favourite color',
      correctAnswerPoints: 10,
      options: [
        {label: 'Red', isCorrect: false},
        {label: 'Green', isCorrect: false},
        {label: 'Blue', isCorrect: false},
        {label: 'White', isCorrect: true},
      ]
    },
    {
      type: 'multipleAnswers',
      text: 'Choose only belarusian cities',
      correctAnswerPoints: 10,
      options: [
        {label: 'Minsk', isCorrect: true},
        {label: 'Gomel', isCorrect: true},
        {label: 'Mozyr', isCorrect: true},
        {label: 'Warsaw', isCorrect: false},
        {label: 'Moscow', isCorrect: false},
      ]
    },
    {
      type: 'fillIn',
      maxLength: 30,
      maxWords: 3,
      text: 'Name the most popular song of E.Zheludok',
      evaluationInformation: 'Schuchynschzyna or something like that',
      correctAnswerPoints: 10,
    },
    {
      type: 'essay',
      maxLength: 1000,
      maxWords: 100,
      text: 'Do you love Belarus? Explain your answer',
      evaluationInformation: 'Evaluate as you wish',
      correctAnswerPoints: 10,
    },*/
  ],
};
