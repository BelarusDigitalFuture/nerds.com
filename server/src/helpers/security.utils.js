const _ = require('lodash');
const Promise = require('bluebird');
const crypto = require('crypto');

const randomBytes = Promise.promisify(crypto.randomBytes, crypto);

module.exports.generateSecureToken = function generateSecureToken() {
  return randomBytes(48).then(buf => buf.toString('hex'));
};

module.exports.generateSalt = function generateSalt() {
  return randomBytes(16).then(buf => buf.toString('hex'));
};

module.exports.generateReferralCode = function generateReferralCode() {
  return randomBytes(5).then(buf => buf.toString('hex'));
};

module.exports.generateShaHash = function generateShaHash(text, shaSecret) {
  return crypto.createHmac('sha256', shaSecret).update(text).digest('hex');
};

module.exports.generateMD5Hash = function generateMD5Hash(text) {
  return crypto.createHash('md5').update(text).digest('hex');
};

module.exports.generatePlainPassword = () => {
  return crypto.randomBytes(4).toString('hex');
};
