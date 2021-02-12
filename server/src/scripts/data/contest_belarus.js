const moment = require('moment');
 
module.exports = {
 startDate: moment().add(1, 'week').toDate(),
 endDate: moment().add(1, 'week').add(2, 'hours').toDate(),
 description: 'Тестовая олимпиада белорусов',
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
     type: 'fillIn',
     maxLength: 30,
     maxWords: 3,
     text: 'Жыве Беларусь',
     evaluationInformation: 'жыве',
     correctAnswerPoints: 10,
   },
 ],
}
