const { PrismaClient } = require('@prisma/client');
const imagekit = require('../lib/imagekit');

const { responseSend } = require('../lib/response');
const { createArticleSchema } = require('../lib/validationSchema');
const { formatErrorValidation } = require('../lib/validationErrorFormat');
const generateSlug = require('../lib/generateSlug');

const prisma = new PrismaClient();

module.exports.getAllArticle = async (req, res) => {
	const { categoryId } = req.query;

	try {
		const articles = await prisma.article.findMany({
			where: {
				category_id: categoryId,
			},
			select: {
				id: true,
				title: true,
			},
		});

		return res.status(200).json(responseSend('success', articles, null));
	} catch (err) {
		return res.status(404).json(responseSend('failed get article', null, 'the category was not found'));
	}
};

module.exports.getSingleArticle = async (req, res) => {
	const { articleId } = req.params;

	try {
		const article = await prisma.article.findUnique({
			where: {
				id: articleId,
			},
			select: {
				id: true,
				title: true,
				thumbnail: true,
				body: true,
			},
		});

		if (!article) {
			return res.status(404).json(responseSend('failed get article', null, 'article not found'));
		}

		return res.status(200).json(responseSend('success', article, null));
	} catch (err) {
		return res.status(404).json(responseSend('failed get article', null, 'article not found'));
	}
};

module.exports.createArticle = async (req, res) => {
	const { title, body, category_id } = req.body;
	const thumbnail = req.file;

	const { error } = createArticleSchema.validate(req.body);

	if (error) {
		return res.status(400).json(responseSend('data send not valid', null, formatErrorValidation(error)));
	}

	if (!thumbnail) {
		return res.status(422).json(responseSend('data send not valid', null, 'file thumbnail not send'));
	}

	const slug = generateSlug(title);
	const fileType = thumbnail.mimetype.replace('image/', '');

	if (fileType != 'png' && fileType != 'jpg' && fileType != 'jpeg') {
		return res.status(415).json(responseSend('data send not valid', null, 'file thumbnail type is not valid'));
	}

	try {
		const imageUpload = await imagekit.upload({
			file: thumbnail.buffer,
			fileName: `${slug}.${fileType}`,
		});

		const article = await prisma.article.create({
			data: {
				title: title.toLowerCase(),
				thumbnail: imageUpload.url,
				body: JSON.parse(body),
				category: {
					connect: {
						id: category_id,
					},
				},
			},
			select: {
				title: true,
				thumbnail: true,
			},
		});

		return res.status(201).json(responseSend('success', article, null));
	} catch (err) {
		return res.json(err.message);
	}
};

module.exports.updateArticle = async (req, res) => {
	const { title, body, category_id } = req.body;
	const thumbnail = req.file;
	const { articleId } = req.params;

	const { error } = createArticleSchema.validate(req.body);

	if (error) {
		return res.status(400).json(responseSend('data send not valid', null, formatErrorValidation(error)));
	}

	if (!thumbnail) {
		return res.status(422).json(responseSend('data send not valid', null, 'file thumbnail not send'));
	}

	const slug = generateSlug(title);
	const fileType = thumbnail.mimetype.replace('image/', '');

	if (fileType != 'png' && fileType != 'jpg' && fileType != 'jpeg') {
		return res.status(415).json(responseSend('data send not valid', null, 'file thumbnail type is not valid'));
	}

	try {
		const imageUpload = await imagekit.upload({
			file: thumbnail.buffer,
			fileName: `${slug}.${fileType}`,
		});

		const article = await prisma.article.update({
			where: {
				id: articleId,
			},
			data: {
				title: title.toLowerCase(),
				thumbnail: imageUpload.url,
				body,
				category: {
					connect: {
						id: category_id,
					},
				},
			},
			select: {
				title: true,
				thumbnail: true,
			},
		});

		if (!article) {
			return res.status(404).json(responseSend('failed get article', null, 'article not found'));
		}

		return res.status(200).json(responseSend('success', article, null));
	} catch (err) {
		return res.status(404).json(responseSend('failed get article', null, 'article not found'));
	}
};

module.exports.deleteArticle = async (req, res) => {
	const { articleId } = req.params;

	try {
		const article = await prisma.article.delete({
			where: {
				id: articleId,
			},
			select: {
				id: true,
				title: true,
				thumbnail: true,
			},
		});

		return res.status(200).json(responseSend('success', article, null));
	} catch (err) {
		return res.status(404).json(responseSend('failed delete article', null, 'article not found'));
	}
};
