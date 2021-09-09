const router = require('express').Router();
const AssetController = require('../controllers/asset.controller');

/**
 * @swagger
 * /asset:
 *  get:
 *    summary: get all asset
 *    tags: [Asset 3D]
 *    responses:
 *       200:
 *         description: success get all asset
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
 *                     title: html is programming language ?
 *                     icon: https://ik.imagekit.io/rickydamarsaputra/ilmu_sosial_-mLIlM-JD.png
 *                 errors: null
 */
router.get('/', AssetController.getAllAsset);

/**
 * @swagger
 * /asset/{assetId}:
 *  get:
 *    summary: get single asset
 *    tags: [Asset 3D]
 *    parameters:
 *      - in: path
 *        name: assetId
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *       200:
 *         description: success get asset
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
 *                   title: html is programming language ?
 *                   icon: https://ik.imagekit.io/rickydamarsaputra/ilmu_sosial_-mLIlM-JD.png
 *                   asset_url: https://ik.imagekit.io/rickydamarsaputra/ilmu_sosial_-mLIlM-JD.png
 *                 errors: null
 *       404:
 *         description: failed get asset
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
 *                 status: failed get asset
 *                 data: null
 *                 errors: asset not found
 */
router.get('/:assetId', AssetController.getSingleAsset);

/**
 * @swagger
 * /asset:
 *  post:
 *    summary: create new asset
 *    tags: [Asset 3D]
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
 *              asset_url:
 *                type: string
 *              category_id:
 *                type: string
 *    responses:
 *       201:
 *         description: success create asset
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
 *         description: failed created asset, when send data is not valid
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
 *         description: failed created asset, when file icon type not valid (png | jpg | jpeg)
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
 *         description: failed created asset, when file icon not send
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
router.post('/', AssetController.createAsset);

/**
 * @swagger
 * /asset/{assetId}:
 *   put:
 *     summary: update asset
 *     tags: [Asset 3D]
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
router.put('/:assetId', AssetController.updateAsset);

/**
 * @swagger
 * /asset/{assetId}:
 *  delete:
 *    summary: delete asset
 *    tags: [Asset 3D]
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
router.delete('/:assetId', AssetController.deleteAsset);

module.exports = router;
