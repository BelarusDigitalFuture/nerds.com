const moment = require('moment');
 
module.exports = {
 startDate: moment('2021-02-12T16:00:00Z').toDate(),
 endDate: moment('2021-02-12T19:00:00Z').toDate(),
 description: 'Belarus Digital Future: финал хакатона',
 tasks: [
   {
     type: 'oneAnswer',
     text: 'Выберыце свой самы любімы колер',
     correctAnswerPoints: 10,
     options: [
       {label: 'Сіні', isCorrect: false},
       {label: 'Зялёны', isCorrect: false},
       {label: 'Аліўкавы', isCorrect: false},
       {label: 'Белы', isCorrect: true},
     ]
   },
   {
     type: 'multipleAnswers',
     text: 'Выбірайце толькі гарады Беларусі',
     correctAnswerPoints: 10,
     options: [
       {label: 'Мінск', isCorrect: true},
       {label: 'Гомель', isCorrect: true},
       {label: 'Мазыр', isCorrect: true},
       {label: 'Варшава', isCorrect: false},
       {label: 'Масква', isCorrect: false},
     ]
   },
   {
     type: 'fillIn',
     maxLength: 30,
     maxWords: 1,
     text: 'Калі ласка, увядзіце назву самай папулярнай песні Е. Жалудок',
     evaluationInformation: 'Шчучыншчына',
     correctAnswerPoints: 10,
   },
   {
     type: 'essay',
     maxLength: 30,
     maxWords: 30,
     text: 'Жыве Беларусь!',
     evaluationInformation: 'жыве',
     correctAnswerPoints: 20,
   },
 ],
};
