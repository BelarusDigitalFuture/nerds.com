const loginController = require('./login/login.controller');
const signupController = require('./signup/signup.controller');
const router = require('koa-router')();


router.post('/signup', signupController.signup);
router.post('/login', loginController.login);
router.get('/logout', loginController.logout);

module.exports = router.routes();
