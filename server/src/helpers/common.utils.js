const base64url = require('base64url');

module.exports.fromBase64url = (str) =>
  base64url.decode(str);

module.exports.buildUrl = (url, params) => {
  let finalUrl = url;
  Object.keys(params).forEach((key) => {
    finalUrl = finalUrl.replace(`{${key}}`, params[key]);
  });
  return finalUrl;
};
