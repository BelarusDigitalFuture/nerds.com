import moment from 'moment';
import _ from 'lodash';
import base64url from 'base64url';
import { genderConstants } from '../config'

module.exports.toBase64Url = str =>
  base64url.encode(str);

module.exports.getWordsCapitalLetters = (string, splitRegExp = /[\s(\/)]+/, maxNumberOfLetters = 3) => {
  const words = string.split(splitRegExp);

  return words
    .slice(0, maxNumberOfLetters)
    .map(x => x[0])
    .join('')
    .toUpperCase();
};

module.exports.formatDateString = (data, dateFormat, defaultValue = 'No data for some reason', message = '') => {
  return data ?
    `${message}${moment(data).format(dateFormat)}` :
    defaultValue;
};

module.exports.formatDouble = (value) => {
  if (!value) {
    return 0;
  }
  return +value.toFixed(2);
};

module.exports.formatInt = (value) => {
  if (!value) {
    return 0;
  }
  return +value;
};

module.exports.formatPercent = (value) => {
  if (!value) {
    return '0.00%';
  }
  return `${(+value * 100).toFixed(2)} %`;
};

module.exports.getPrecodeForChildrenQuestion = (gender, age) => {
  if (gender && _.isInteger(age)) {
    return _.toString((age * 2) + 1 + _.toInteger(gender === genderConstants.female));
  }
  return '-3105';
};

module.exports.getCountryCodeByLanguageQuestionPrecode = (precode) => {
  switch (+precode) {
    case 1:
      return 'gb';
    case 2:
      return 'fr';
    case 3:
      return 'es';
    case 4:
      return 'de';
    case 5:
      return 'it';
    case 6:
      return 'pt';
    case 7:
      return 'cn';
    case 8:
      return 'cn';
    case 9:
      return 'jp';
    case 10:
      return 'arab_league';
    case 11:
      return 'united_nations';
    case 12:
      return 'id';
    case 13:
      return 'kr';
    case 14:
      return 'my';
    case 15:
      return 'ru';
    case 16:
      return 'th';
    case 17:
      return 'tr';
    case 18:
      return 'vn';
    case 19:
      return 'in';
    case 20:
      return 'ke';
    case 21:
      return 'pl';
    case 22:
      return 'ro';
    case 23:
      return 'ua';
    case 24:
      return 'nl';
    case 25:
      return 'pk';
    default:
      return '';
  }
};

module.exports.getZipRegExpByIso2CountryCode = (iso2CountryCode) => {
  switch (iso2CountryCode) {
    case 'AR':
      return /^[A-Z]{0,1}[1-9]{1}\d{3}[A-Z]{0,3}$/i;
    case 'AT':
    case 'AU':
      return /^\d{4}$/;
    case 'BE':
      return /^\d{6}$/;
    case 'BG':
    case 'BO':
    case 'CH':
    case 'ET':
    case 'GE':
    case 'HU':
    case 'LU':
    case 'NO':
    case 'NZ':
    case 'PA':
    case 'PH':
    case 'PY':
    case 'SV':
    case 'ZA':
      return /^\d{4}$/;
    case 'DK':
      return /^(DK\-)?\d{4}$/i;
    case 'CU':
      return /(CP\s)?\d{4}/i;
    case 'DE':
    case 'DO':
    case 'DZ':
    case 'EE':
    case 'EG':
    case 'ES':
    case 'FR':
    case 'GT':
    case 'HR':
    case 'IT':
    case 'JO':
    case 'KE':
    case 'KR':
    case 'KW':
    case 'MA':
    case 'MX':
    case 'MY':
    case 'NI':
    case 'PE':
    case 'PK':
    case 'RS':
    case 'TH':
    case 'TR':
    case 'UA':
    case 'UY':
      return /^\d{5}$/;
    case 'FI':
      return /^(FI\-)?\d{5}$/i;
    case 'CN':
    case 'CO':
    case 'EC':
    case 'KZ':
    case 'NG':
    case 'RO':
    case 'RU':
    case 'SG':
    case 'VN':
      return /^\d{6}$/;
    case 'BH':
      return /^[1-9]?\d{3}$/;
    case 'BR':
      return /^\d{5}[\-]?\d{3}$/;
    case 'CA':
      return /^[A-Z]\d[A-Z] \d[A-Z]\d$/i;
    case 'CL':
      return /^\d{3}[\-]?\d{4}$/;
    case 'CR':
      return /^\d{5}([\-]\d{4})?$/;
    case 'CZ':
    case 'GR':
    case 'SE':
    case 'SK':
      return /^\d{3} \d{2}$/;
    case 'GB':
      return /[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}/i;
    case 'HN':
      return /^(HN)?\d{5}$/i;
    case 'IE':
      return /^[AC-FHKNPRTV-Y]{1}[0-9]{1}[0-9W]{1}[ \-]?[0-9AC-FHKNPRTV-Y]{4}$/i;
    case 'IL':
      return /^\d{7}$/;
    case 'IN':
      return /^\d{3}\s?\d{3}$/i;
    case 'IQ':
      return /^BB\dD 1ZZ$/i;
    case 'IS':
    case 'OM':
      return /^\d{3}$/;
    case 'JM':
      return /^(JM)[A-Z]{3}\d{2}$/i;
    case 'JP':
      return /^\d{3}\-\d{4}$/;
    case 'LB':
      return /^\d{4}(\s\d{4})?$/;
    case 'LV':
      return /^LV\-\d{4}$/i;
    case 'MT':
      return /^[A-Z]{3} \d{4}$/i;
    case 'NL':
      return /\d{4} [A-Z]{2}/i;
    case 'PL':
      return /^\d{2}\-\d{3}$/;
    case 'PT':
      return /^\d{4}\-\d{3}$/;
    case 'PR':
    case 'SA':
    case 'US':
      return /^\d{5}(\-\d{4})?$/;
    case 'SI':
      return /^(SI\-)?\d{4}$/i;
    case 'TW':
      return /^\d{3}(\-\d{2})?$/;
    case 'VE':
      return /^\d{4}(\-[A-Z])?$/i;
    default:
      return null;
  }
};

module.exports.isMobile = (userAgent) => {
  return /(android|bb\d+|meego).+(?!mobile)|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|t a(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0,4));
};

module.exports.IPv4ToNumber = (ipv4String) => {
  const parts = ipv4String.split('.').map(o => +o);

  let resultNumber = 0;
  resultNumber += parts[0] << 24;
  resultNumber += parts[1] << 16;
  resultNumber += parts[2] << 8;
  resultNumber += parts[3];

  return resultNumber >>> 0;
};

module.exports.numberToIPv4 = (number) => {
  const part1 = number & 255;
  const part2 = ((number >> 8) & 255);
  const part3 = ((number >> 16) & 255);
  const part4 = ((number >> 24) & 255);

  return `${part4}.${part3}.${part2}.${part1}`;
};

module.exports.getUrlParameter = (search, key) => {
  let name = key;
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

module.exports.stripTitle = (title) => {
  if (!title) {
    return title;
  }
  if (title.length < 29) {
    return title;
  }
  return `${title.substr(0, 26)}...`;
};
