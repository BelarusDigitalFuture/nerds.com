const router = require('koa-router')();
const controller = require('./user.controller');

router.get('/list', controller.list);

module.exports = router.routes();
