const moment = require('moment');

module.exports = {
  startDate: moment().add(1, 'week').toDate(),
  endDate: moment().add(1, 'week').add(2, 'hours').toDate(),
  description: 'Тренировочная олимпиада по белорусскому языку (цитаты)',
  tasks: [
    {
     type: 'fillIn',
     maxLength: 30,
     maxWords: 1,
     text: 'Хто аўтар наступнага афарызму? Не пакідайце ж мовы нашай беларускай, как не ўмёрлі… Увядзіце толькі прозвішча ў назоўным склоне',
     evaluationInformation: 'Багушэвіч',
     correctAnswerPoints: 1,
   },
   {
     type: 'fillIn',
     maxLength: 30,
     maxWords: 1,
     text: 'Хто аўтар наступнага афарызму? Беларусь! Твой народ дачакаецца залацістага, яснага дня! Увядзіце толькі прозвішча ў назоўным склоне',
     evaluationInformation: 'Багдановіч',
     correctAnswerPoints: 1,
   },
   {
     type: 'fillIn',
     maxLength: 30,
     maxWords: 1,
     text: 'Хто аўтар наступнага афарызму? Зайграй, зайграй, хлопча малы, у скрыпачку і цымбалы… Увядзіце толькі прозвішча ў назоўным склоне',
     evaluationInformation: 'Багрым',
     correctAnswerPoints: 1,
   },
   {
     type: 'fillIn',
     maxLength: 30,
     maxWords: 1,
     text: 'Хто аўтар наступнага афарызму? І будзе ўнукаў панаванне там, дзе сягоння плача дзед. Увядзіце толькі прозвішча ў назоўным склоне',
     evaluationInformation: 'Купала',
     correctAnswerPoints: 1,
   },
   {
     type: 'fillIn',
     maxLength: 30,
     maxWords: 1,
     text: 'Хто аўтар наступнага афарызму? Ад зямлі да зор і сонца няма думкам забаронцы. Увядзіце толькі прозвішча ў назоўным склоне',
     evaluationInformation: 'Колас',
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
