const loginController = require('./login/login.controller');
const router = require('koa-router')();

router.post('/login', loginController.login);
router.get('/logout', loginController.logout);

module.exports = router.routes();
