const router = require('express').Router();
const ArticleController = require('../controllers/article.controller');

/**
 * @swagger
 * /article:
 *  get:
 *    summary: get all article
 *    tags: [Article]
 *    parameters:
 *      - in: query
 *        name: categoryId
 *        schema:
 *          type: string
 *    responses:
 *       200:
 *         description: success get all article
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
 *                     id: 612c79ee00107df3003b8fa3
 *                     title: berkenalan dengan biologi
 *                   -
 *                     id: 612a41a000c0263900081d97
 *                     title: rantai makanan
 *                 errors: null
 *       404:
 *         description: failed get article
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
 *                 status: failed get article
 *                 data: null
 *                 errors: the category was not found
 */
router.get('/', ArticleController.getAllArticle);

/**
 * @swagger
 * /article/{articleId}:
 *  get:
 *    summary: get single article
 *    tags: [Article]
 *    parameters:
 *      - in: path
 *        name: articleId
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *       200:
 *         description: success get article
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
 *                   title: berkenalan dengan biologi
 *                   thumbnail: https://ik.imagekit.io/rickydamarsaputra/matematika_Jx0zUCn8a.png
 *                   body: <p>Biologi atau ilmu hayat adalah kajian tentang kehidupan, dan organisme hidup, termasuk struktur, fungsi, pertumbuhan, evolusi, persebaran, dan taksonominya.</p>
 *                 errors: null
 *       404:
 *         description: failed get article
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
 *                 status: failed get article
 *                 data: null
 *                 errors: article not found
 */
router.get('/:articleId', ArticleController.getSingleArticle);

/**
 * @swagger
 * /article:
 *  post:
 *    summary: create new article
 *    tags: [Article]
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              body:
 *                type: string
 *              category_id:
 *                type: string
 *              thumbnail:
 *                type: string
 *                format: binary
 *    responses:
 *       201:
 *         description: success create article
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
 *                   title: berkenalan dengan biologi
 *                   thumbnail: https://ik.imagekit.io/rickydamarsaputra/matematika_Jx0zUCn8a.png
 *                 errors: null
 *       400:
 *         description: failed created article, when send data is not valid
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
 *                     message: \"title\" is required
 *                     field: title
 *       415:
 *         description: failed created article, when file thumbnail type not valid (png | jpg | jpeg)
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
 *                 status: data send not valid
 *                 data: null
 *                 errors: file thumbnail type is not valid
 *       422:
 *         description: failed created article, when file thumbnail not send
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
 *                 status: data send not valid
 *                 data: null
 *                 errors: file thumbnail not send
 */
router.post('/', ArticleController.createArticle);

/**
 * @swagger
 * /article/{articleId}:
 *  put:
 *    summary: update article
 *    tags: [Article]
 *    parameters:
 *      - in: path
 *        name: articleId
 *        schema:
 *          type: string
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              body:
 *                type: string
 *              category_id:
 *                type: string
 *              thumbnail:
 *                type: string
 *                format: binary
 *    responses:
 *       200:
 *         description: success update article
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
 *                   title: berkenalan dengan biologi
 *                   thumbnail: https://ik.imagekit.io/rickydamarsaputra/matematika_Jx0zUCn8a.png
 *                 errors: null
 *       400:
 *         description: failed update category, when send data is not valid
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
 *                     message: \"title\" is required
 *                     field: title
 *       415:
 *         description: failed update article, when file thumbnail type not valid (png | jpg | jpeg)
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
 *                 status: data send not valid
 *                 data: null
 *                 errors: file thumbnail type is not valid
 *       422:
 *         description: failed update article, when file thumbnail not send
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
 *                 status: data send not valid
 *                 data: null
 *                 errors: file thumbnail not send
 *       404:
 *         description: failed updated article
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
 *                 status: failed delete article
 *                 data: null
 *                 errors: article not found
 */
router.put('/:articleId', ArticleController.updateArticle);

/**
 * @swagger
 * /article/{articleId}:
 *  delete:
 *    summary: delete article
 *    tags: [Article]
 *    parameters:
 *      - in: path
 *        name: articleId
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *       200:
 *         description: success delete category
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
 *                   title: berkenalan dengan biologi
 *                   thumbnail: https://ik.imagekit.io/rickydamarsaputra/matematika_Jx0zUCn8a.png
 *                 errors: null
 *       404:
 *         description: failed delete article
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
 *                 status: failed delete article
 *                 data: null
 *                 errors: article not found
 */
router.delete('/:articleId', ArticleController.deleteArticle);

module.exports = router;
