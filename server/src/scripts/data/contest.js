const moment = require('moment');

module.exports = {
  startDate: moment().add(1, 'week').toDate(),
  endDate: moment().add(1, 'week').add(2, 'hours').toDate(),
  description: 'Тестовая олимпиада по белорусскому языку',
  tasks: [
    {
      type: 'multipleAnswers',
      text: 'Выберыце словы, у якіх націск падае на першую галосную',
      correctAnswerPoints: 5,
      options: [
        {label: 'генезіс', isCorrect: true},
        {label: 'запыт', isCorrect: true},
        {label: 'прыяцель', isCorrect: true},
        {label: 'клюшня', isCorrect: true},
        {label: 'дыхальны', isCorrect: true},
        {label: 'мезенец', isCorrect: true},
        {label: 'відарыс', isCorrect: false},
        {label: 'ракушка', isCorrect: false},
        {label: 'параліч', isCorrect: false},
        {label: 'газіраваны', isCorrect: false},
      ]
    },
    {
      type: 'oneAnswer',
      text: 'Праверце, ці правільна прыведзены беларускія адпаведнікі да наступных рускіх назв маладых істот у форме меснага склону: "гусёнок - аб гусяняці", "орлёнок - аб арляняці", "утёнок - аб качаняці", "аистёнок - аб бусляняці", "цыплёнок - аб кураняці", "телёнок - аб цяляці", "жеребёнок - аб жарабяці", "тигрёнок - аб тыграняці", "волчонок - аб ваўчаняці", "котёнок - аб кацяняці".',
      correctAnswerPoints: 5,
      options: [
        {label: 'Усё правільна', isCorrect: true},
        {label: 'Ёсць памылкі', isCorrect: false},
      ]
    },
    {
      type: 'fillIn',
      maxLength: 30,
      maxWords: 1,
      text: 'Як назваць жанчыну, якая танцуе ў балеце?',
      evaluationInformation: 'балерына',
      correctAnswerPoints: 1,
    },
    {
      type: 'fillIn',
      maxLength: 30,
      maxWords: 1,
      text: 'Як назваць жанчыну, якая піша вершы?',
      evaluationInformation: 'паэтка',
      correctAnswerPoints: 1,
    },
    {
      type: 'fillIn',
      maxLength: 30,
      maxWords: 1,
      text: 'Як назваць жанчыну, якая доіць кароў?',
      evaluationInformation: 'даярка',
      correctAnswerPoints: 1,
    },
    {
      type: 'fillIn',
      maxLength: 30,
      maxWords: 1,
      text: 'Як назваць жанчыну, якая вучыць дзяцей?',
      evaluationInformation: 'настаўніца',
      correctAnswerPoints: 1,
    },
    {
      type: 'fillIn',
      maxLength: 30,
      maxWords: 1,
      text: 'Як назваць жанчыну, якая камандуе караблём?',
      evaluationInformation: 'капітан',
      correctAnswerPoints: 1,
    },
  
    {
      type: 'oneAnswer',
      text: 'Растлумачце сэнс перыфразы "сейбіты разумнага, добрага, вечнага" праз іншае слова або выраз',
      correctAnswerPoints: 1,
      options: [
        {label: 'Настаўнікі', isCorrect: true},
        {label: 'Аграномы', isCorrect: false},
        {label: 'Прапагандысты', isCorrect: false},
        {label: 'Святыя людзі', isCorrect: false},
      ]
    },
    {
      type: 'oneAnswer',
      text: 'Растлумачце сэнс перыфразы "атаман мужыцкай праўды" праз іншае слова або выраз',
      correctAnswerPoints: 1,
      options: [
        {label: 'Кастусь Каліноўскі', isCorrect: true},
        {label: 'Правадыр', isCorrect: false},
        {label: 'Першы хлопец', isCorrect: false},
        {label: 'Мясцовы жыхар', isCorrect: false},
      ]
    },
    {
      type: 'oneAnswer',
      text: 'Растлумачце сэнс перыфразы "Зямля пад белымі крыламі" праз іншае слова або выраз',
      correctAnswerPoints: 1,
      options: [
        {label: 'Беларусь', isCorrect: true},
        {label: 'Радзіма', isCorrect: false},
        {label: 'Чароўную выспу', isCorrect: false},
        {label: 'Падпахі у бусла', isCorrect: false},
      ]
    },
    {
      type: 'oneAnswer',
      text: 'Растлумачце сэнс перыфразы "сардэчны пажар" праз іншае слова або выраз',
      correctAnswerPoints: 1,
      options: [
        {label: 'Каханне', isCorrect: true},
        {label: 'Ратуйце мяне!', isCorrect: false},
        {label: 'Гары, гары ясна', isCorrect: false},
        {label: 'Пацалунак полымя', isCorrect: false},
      ]
    },
    {
      type: 'oneAnswer',
      text: 'Растлумачце сэнс перыфразы "нябесныя вочы" праз іншае слова або выраз',
      correctAnswerPoints: 1,
      options: [
        {label: 'Зоркі', isCorrect: true},
        {label: 'Хмары', isCorrect: false},
        {label: 'Ліхтары', isCorrect: false},
        {label: 'Душы продкаў', isCorrect: false},
      ]
    },
    {
      type: 'fillIn',
      maxLength: 30,
      maxWords: 1,
      text: 'Растлумачце адным словам – дзеясловам наступны фразеалагізм: паказаць, дзе ракі зімуюць',
      evaluationInformation: 'правучыць',
      correctAnswerPoints: 1,
    },
    {
      type: 'fillIn',
      maxLength: 30,
      maxWords: 1,
      text: 'Растлумачце адным словам – дзеясловам наступны фразеалагізм: крукам носа не дастаць',
      evaluationInformation: 'заганарыцца',
      correctAnswerPoints: 1,
    },
    {
      type: 'fillIn',
      maxLength: 30,
      maxWords: 1,
      text: 'Растлумачце адным словам – дзеясловам наступны фразеалагізм: вачам не верыць',
      evaluationInformation: 'здзіўляцца',
      correctAnswerPoints: 1,
    },
    {
      type: 'fillIn',
      maxLength: 30,
      maxWords: 1,
      text: 'Растлумачце адным словам – дзеясловам наступны фразеалагізм: наламаць дроў',
      evaluationInformation: 'памыліцца',
      correctAnswerPoints: 1,
    },
    {
      type: 'fillIn',
      maxLength: 30,
      maxWords: 1,
      text: 'Растлумачце адным словам – дзеясловам наступны фразеалагізм: дрыжаць як асінавы ліст',
      evaluationInformation: 'палохацца',
      correctAnswerPoints: 1,
    },
    {
      type: 'fillIn',
      maxLength: 30,
      maxWords: 1,
      text: 'Складзіце слова (аднавіць слова з літар, якія пераблытаны): к, в, р, н, а, а, а, а, ж',
      evaluationInformation: 'жаваранак',
      correctAnswerPoints: 5,
    },
    {
      type: 'oneAnswer',
      text: 'Вызначыце, якой часцінай мовы з’яўляецца прапанаванае слова: дзясятак',
      correctAnswerPoints: 1,
      options: [
        {label: 'назоўнік', isCorrect: true},
        {label: 'прыслоўе', isCorrect: false},
        {label: 'дзеяслоў', isCorrect: false},
        {label: 'прыметнік', isCorrect: false},
      ]
    },
    {
      type: 'oneAnswer',
      text: 'Вызначыце, якой часцінай мовы з’яўляецца прапанаванае слова: сотня',
      correctAnswerPoints: 1,
      options: [
        {label: 'назоўнік', isCorrect: true},
        {label: 'прыслоўе', isCorrect: false},
        {label: 'дзеяслоў', isCorrect: false},
        {label: 'прыметнік', isCorrect: false},
      ]
    },
    {
      type: 'oneAnswer',
      text: 'Вызначыце, якой часцінай мовы з’яўляецца прапанаванае слова: патроіць',
      correctAnswerPoints: 1,
      options: [
        {label: 'назоўнік', isCorrect: false},
        {label: 'прыслоўе', isCorrect: false},
        {label: 'дзеяслоў', isCorrect: true},
        {label: 'прыметнік', isCorrect: false},
      ]
    },
    {
      type: 'oneAnswer',
      text: 'Вызначыце, якой часцінай мовы з’яўляецца прапанаванае слова: чвэрць',
      correctAnswerPoints: 1,
      options: [
        {label: 'назоўнік', isCorrect: true},
        {label: 'прыслоўе', isCorrect: false},
        {label: 'дзеяслоў', isCorrect: false},
        {label: 'прыметнік', isCorrect: false},
      ]
    },
    {
      type: 'oneAnswer',
      text: 'Вызначыце, якой часцінай мовы з’яўляецца прапанаванае слова: пяцітомны',
      correctAnswerPoints: 1,
      options: [
        {label: 'назоўнік', isCorrect: false},
        {label: 'прыслоўе', isCorrect: false},
        {label: 'дзеяслоў', isCorrect: false},
        {label: 'прыметнік', isCorrect: true},
      ]
    },
    {
      type: 'oneAnswer',
      text: 'Вызначыце, якім членам сказа выступае інфінітыў. Жаданне вучыцца было ў ім заўсёды на першым месцы',
      correctAnswerPoints: 2.5,
      options: [
        {label: 'дзейнік', isCorrect: false},
        {label: 'дапаўненне', isCorrect: false},
        {label: 'акалічнасць', isCorrect: false},
        {label: 'азначэнне', isCorrect: true},
      ]
    },
    {
      type: 'oneAnswer',
      text: 'Вызначыце, якім членам сказа выступае інфінітыў. Бацькі даручылі мне сустрэць бабулю з цягніка',
      correctAnswerPoints: 2.5,
      options: [
        {label: 'дзейнік', isCorrect: false},
        {label: 'дапаўненне', isCorrect: true},
        {label: 'акалічнасць', isCorrect: false},
        {label: 'азначэнне', isCorrect: false},
      ]
    },
    {
      type: 'fillIn',
      maxLength: 30,
      maxWords: 2,
      text: 'Адкажыце, каму належыць наступны псеўданім: Янка Купала. Увядзіце імя і прозвішча ў назоўным склоне.',
      evaluationInformation: 'Іван Луцэвіч',
      correctAnswerPoints: 2.5,
    },
    {
      type: 'fillIn',
      maxLength: 30,
      maxWords: 2,
      text: 'Адкажыце, каму належыць наступны псеўданім: Якуб Колас. Увядзіце імя і прозвішча ў назоўным склоне.',
      evaluationInformation: 'Кантанцін Міцкевіч',
      correctAnswerPoints: 2.5,
    },
    {
      type: 'fillIn',
      maxLength: 30,
      maxWords: 1,
      text: 'Хто аўтар наступнага афарызму? "Беларусь! Твой народ дачакаецца залацістага, яснага дня!" Увядзіце толькі прозвішча ў назоўным склоне',
      evaluationInformation: 'Багдановіч',
      correctAnswerPoints: 5,
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
