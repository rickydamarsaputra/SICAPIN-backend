const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - full_name
 *         - user_class
 *         - email
 *         - password
 *       properties:
 *         full_name:
 *           type: string
 *         user_class:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         full_name: jhon doe
 *         user_class: kelas 12
 *         email: doe@gmail.com
 *         password: doepassword123
 *     User201:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         data:
 *           type: object
 *         errors:
 *           type: string
 *       example:
 *         status: success
 *         data:
 *           full_name: jhon doe
 *           user_class: kelas 12
 *           email: doe@gmail.com
 *           password: $2b$10$bWQpgl9Y3vsgMKAXYj8OLumwKrNlBw.x4TEH/mnwpzYeRFPG2DodC
 *         errors: null
 *     User400:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         data:
 *           type: string
 *         errors:
 *           type: array
 *       example:
 *         status: data send not valid
 *         data: null
 *         errors:
 *           -
 *             message: \"full_name\" is required
 *             field: full_name
 *           -
 *             message: \"password\" is required
 *             field: password
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: success registered user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User201'
 *       400:
 *         description: failed registered user, when send data is not valid
 *         content:
 *           aplication/json:
 *             schema:
 *               $ref: '#/components/schemas/User400'
 */
router.post('/register', AuthController.signupUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - password
 *             properties:
 *               full_name:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               full_name: jhon doe
 *               password: doepassword123
 *     responses:
 *       200:
 *         description: success login user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User201'
 *       400:
 *         description: failed login user, when send data is not valid
 *         content:
 *           aplication/json:
 *             schema:
 *               $ref: '#/components/schemas/User400'
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
