const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: register new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - user_class
 *               - email
 *               - username
 *               - password
 *             properties:
 *               full_name:
 *                 type: string
 *               user_class:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               full_name: john doe
 *               user_class: kelas 12
 *               email: john@gmail.com
 *               username: johndoe
 *               password: john123
 *     responses:
 *       201:
 *         description: success registered user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                status:
 *                  type: string
 *                data:
 *                  type: object
 *                errors:
 *                  type: string
 *               example:
 *                 status: success
 *                 data:
 *                   id: 6139810e00ba1546003b5cbd
 *                   username: johndoe
 *                   password: $2b$10$4uMmodoV5AFT8.IFZ48Y/uFuUoId2SWrniVmm2LMqweRJtiSyoh6y
 *                 errors: null
 *       400:
 *         description: failed registered user, when send data is not valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                status:
 *                  type: string
 *                data:
 *                  type: string
 *                errors:
 *                  type: array
 *               example:
 *                 status: data send not valid
 *                 data: null
 *                 errors:
 *                   -
 *                     message: \"username\" is required
 *                     field: username
 *                   -
 *                     message: \"password\" is required
 *                     field: password
 */
router.post('/register', AuthController.signupUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: success login user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                status:
 *                  type: string
 *                data:
 *                  type: object
 *                errors:
 *                  type: string
 *               example:
 *                 status: success
 *                 data:
 *                   id: 6139810e00ba1546003b5cbd
 *                   username: johndoe
 *                   password: $2b$10$4uMmodoV5AFT8.IFZ48Y/uFuUoId2SWrniVmm2LMqweRJtiSyoh6y
 *                 errors: null
 *       400:
 *         description: failed login user, when send data is not valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                status:
 *                  type: string
 *                data:
 *                  type: string
 *                errors:
 *                  type: array
 *               example:
 *                 status: data send not valid
 *                 data: null
 *                 errors:
 *                   -
 *                     message: \"username\" is required
 *                     field: username
 *                   -
 *                     message: \"password\" is required
 *                     field: password
 *       404:
 *         description: failed login user, when wrong name or password
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: string
 *                 errors:
 *                   type: string
 *               example:
 *                 status: invalid user login
 *                 data: null
 *                 errors: wrong name or password
 */
router.post('/login', AuthController.signinUser);

module.exports = router;
