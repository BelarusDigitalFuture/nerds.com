const router = require('koa-router')();
const isAuthenticated = require('../../middleware/isAuthenticated.middleware');
const controller = require('./user.controller');

router.use(isAuthenticated);

router.get('/current', controller.getCurrent);

module.exports = router.routes();
