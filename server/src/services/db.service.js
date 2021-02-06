const config = require('../config/index');
const dbService = require('./mongo/index').connect(config.mongo.connection);

module.exports = dbService;
