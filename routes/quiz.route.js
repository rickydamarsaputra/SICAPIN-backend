const router = require('express').Router();
const QuizController = require('../controllers/quiz.controller');

/**
 * @swagger
 * /quiz:
 *  get:
 *    summary: get all quiz
 *    tags: [Quiz]
 *    parameters:
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        description: if you do not fill in the limit then by default it will contain 10
 *      - in: query
 *        name: categoryId
 *        schema:
 *          type: string
 *    responses:
 *       200:
 *         description: success get all quiz
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                status:
 *                  type: string
 *                data:
 *                  type: array
 *                errors:
 *                  type: string
 *               example:
 *                 status: success
 *                 data:
 *                   -
 *                     id: 612a411800c0263900081d96
 *                     question: html is programming language ?
 *                     correct_answer: no
 *                     answers:
 *                       - yes
 *                       - no
 *                     mapel: programming
 *                 errors: null
 *       404:
 *         description: failed get quiz
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                status:
 *                  type: string
 *                data:
 *                  type: array
 *                errors:
 *                  type: string
 *               example:
 *                 status: failed get quiz
 *                 data: null
 *                 errors: the category was not found
 */
router.get('/', QuizController.getAllQuiz);

/**
 * @swagger
 * /quiz/{quizId}:
 *  get:
 *    summary: get single quiz
 *    tags: [Quiz]
 *    parameters:
 *      - in: path
 *        name: quizId
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *       200:
 *         description: success get quiz
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
 *                   id: 612a411800c0263900081d96
 *                   question: html is programming language ?
 *                   correct_answer: no
 *                   answers:
 *                     - yes
 *                     - no
 *                 errors: null
 *       404:
 *         description: failed get quiz
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
 *                  type: string
 *               example:
 *                 status: failed get quiz
 *                 data: null
 *                 errors: quiz not found
 */
router.get('/:quizId', QuizController.getSingleQuiz);

/**
 * @swagger
 * /quiz:
 *   post:
 *     summary: create new quiz
 *     tags: [Quiz]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - correct_answer
 *               - answers
 *               - category_id
 *             properties:
 *               question:
 *                 type: string
 *               correct_answer:
 *                 type: string
 *               answers:
 *                 type: array
 *               category_id:
 *                 type: string
 *             example:
 *               question: html is programming language ?
 *               correct_answer: no
 *               answers:
 *                 - yes
 *                 - no
 *               category_id: 612ebec200016a6600229e66
 *     responses:
 *       201:
 *         description: success create quiz
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
 *                   question: html is programming language ?
 *                 errors: null
 *       400:
 *         description: failed created quiz, when send data is not valid
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
 *                     message: \"question\" is required
 *                     field: question
 */
router.post('/', QuizController.createQuiz);

/**
 * @swagger
 * /quiz/{quizId}:
 *   put:
 *     summary: update quiz
 *     tags: [Quiz]
 *     parameters:
 *       - in: path
 *         name: quizId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - correct_answer
 *               - answers
 *               - category_id
 *             properties:
 *               question:
 *                 type: string
 *               correct_answer:
 *                 type: string
 *               answers:
 *                 type: array
 *               category_id:
 *                 type: string
 *             example:
 *               question: html is programming language ?
 *               correct_answer: no
 *               answers:
 *                 - yes
 *                 - no
 *               category_id: 612ebec200016a6600229e66
 *     responses:
 *       200:
 *         description: success update quiz
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
 *                   question: html is programming language ?
 *                 errors: null
 *       400:
 *         description: failed updated quiz, when send data is not valid
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
 *                     message: \"question\" is required
 *                     field: question
 */
router.put('/:quizId', QuizController.updateQuiz);

/**
 * @swagger
 * /quiz/{quizId}:
 *  delete:
 *    summary: delete quiz
 *    tags: [Quiz]
 *    parameters:
 *      - in: path
 *        name: quizId
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *       200:
 *         description: success delete quiz
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
 *                   id: 612a411800c0263900081d96
 *                   question: javascript is programming language ?
 *                 errors: null
 *       404:
 *         description: failed delete quiz
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
 *                  type: string
 *               example:
 *                 status: failed delete quiz
 *                 data: null
 *                 errors: quiz not found
 */
router.delete('/:quizId', QuizController.deleteQuiz);

module.exports = router;
