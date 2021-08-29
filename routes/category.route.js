const router = require('express').Router();
const CategoryController = require('../controllers/category.controller');

/**
 * @swagger
 * /category:
 *  get:
 *    summary: get all category
 *    tags: [Category]
 *    responses:
 *       200:
 *         description: success get all category
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
 *                     title: matematika
 *                     icon: https://ik.imagekit.io/rickydamarsaputra/matematika_Jx0zUCn8a.png
 *                   -
 *                     id: 612a41a000c0263900081d97
 *                     title: ilmu sosial
 *                     icon: https://ik.imagekit.io/rickydamarsaputra/ilmu_sosial_-mLIlM-JD.png
 *                 errors: null
 */
router.get('/', CategoryController.getAllCategory);

/**
 * @swagger
 * /category/{categoryId}:
 *  get:
 *    summary: get single category
 *    tags: [Category]
 *    parameters:
 *      - in: path
 *        name: categoryId
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *       200:
 *         description: success get category
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
 *                   title: matematika
 *                   icon: https://ik.imagekit.io/rickydamarsaputra/matematika_Jx0zUCn8a.png
 *                 errors: null
 *       404:
 *         description: failed get category
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
 *                 status: failed get category
 *                 data: null
 *                 errors: category not found
 */
router.get('/:categoryId', CategoryController.getSingleCategory);

/**
 * @swagger
 * /category:
 *  post:
 *    summary: create new category
 *    tags: [Category]
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              icon:
 *                type: string
 *                format: binary
 *    responses:
 *       201:
 *         description: success create category
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
 *                   title: matematika
 *                   icon: https://ik.imagekit.io/rickydamarsaputra/matematika_Jx0zUCn8a.png
 *                 errors: null
 *       400:
 *         description: failed created category, when title not send
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
 *         description: failed created category, when file icon type not valid (png | jpg | jpeg)
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
 *                 errors: file icon type is not valid
 *       422:
 *         description: failed created category, when file icon not send
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
 *                 errors: file icon not send
 */
router.post('/', CategoryController.createCategory);

/**
 * @swagger
 * /category/{categoryId}:
 *  put:
 *    summary: update category
 *    tags: [Category]
 *    parameters:
 *      - in: path
 *        name: categoryId
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
 *              icon:
 *                type: string
 *                format: binary
 *    responses:
 *       200:
 *         description: success update category
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
 *                   title: matematika
 *                   icon: https://ik.imagekit.io/rickydamarsaputra/matematika_Jx0zUCn8a.png
 *                 errors: null
 *       400:
 *         description: failed update category, when title not send
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
 *         description: failed update category, when file icon type not valid (png | jpg | jpeg)
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
 *                 errors: file icon type is not valid
 *       422:
 *         description: failed update category, when file icon not send
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
 *                 errors: file icon not send
 *       404:
 *         description: failed updated category
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
 *                 status: failed delete category
 *                 data: null
 *                 errors: category not found
 */
router.put('/:categoryId', CategoryController.updateCategory);

/**
 * @swagger
 * /category/{categoryId}:
 *  delete:
 *    summary: delete category
 *    tags: [Category]
 *    parameters:
 *      - in: path
 *        name: categoryId
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *       200:
 *         description: success get category
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
 *                   title: matematika
 *                   icon: https://ik.imagekit.io/rickydamarsaputra/matematika_Jx0zUCn8a.png
 *                 errors: null
 *       404:
 *         description: failed delete category
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
 *                 status: failed delete category
 *                 data: null
 *                 errors: category not found
 */
router.delete('/:categoryId', CategoryController.deleteCategory);

module.exports = router;
