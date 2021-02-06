const router = require('koa-router')();
const { isAdmin } = require('../../middleware/roles.middleware');
const isAuthenticated = require('../../middleware/isAuthenticated.middleware');
const userResource = require('./user');

// router.use(isAuthenticated, isAdmin);

router.use('/users', userResource);

module.exports = router.routes();
