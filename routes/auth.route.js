const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');

router.post('/register', AuthController.signupUser);
router.post('/login', AuthController.signinUser);

module.exports = router;
