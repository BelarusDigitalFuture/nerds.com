const router = require('koa-router')();
const isAuthenticated = require('../../middleware/isAuthenticated.middleware');
const controller = require('./user.controller');

router.use(isAuthenticated);

router.get('/', controller.getCurrent);
router.put('/', controller.update);

module.exports = router.routes();
