const crypto = require('crypto');
const base64url = require('base64-url');
const config = require('../config');

module.exports.encrypt = async function encrypt(value, algo = 'aes192', secret = config.cryptoSecret) {
  const cipher = crypto.createCipher(algo, secret);
  let encrypted = cipher.update(value, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

module.exports.decrypt = async function decrypt(value, algo = 'aes192', secret = config.cryptoSecret) {
  const decipher = crypto.createDecipher(algo, secret);
  let decrypted = decipher.update(value, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

module.exports.sha256 = (value) => {
  return crypto.createHash('sha256').update(value).digest('hex');
};

module.exports.toBase64 = (value) => {
  return base64url.escape(base64url.encode(value));
};

module.exports.fromBase64 = (value) => {
  return base64url.decode(base64url.unescape(value));
};
