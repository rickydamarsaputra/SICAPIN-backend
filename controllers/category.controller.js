const { PrismaClient } = require('@prisma/client');
const imagekit = require('../lib/imagekit');

const { responseSend } = require('../lib/response');
const { createCategorySchema } = require('../lib/validationSchema');
const { formatErrorValidation } = require('../lib/validationErrorFormat');
const generateSlug = require('../lib/generateSlug');

const prisma = new PrismaClient();

module.exports.getAllCategory = async (req, res) => {
	try {
		const categories = await prisma.category.findMany({
			select: {
				id: true,
				title: true,
				icon: true,
			},
		});

		return res.status(200).json(responseSend('success', categories, null));
	} catch (err) {
		return res.json(err.message);
	}
};

module.exports.getSingleCategory = async (req, res) => {
	const { categoryId } = req.params;

	try {
		const category = await prisma.category.findUnique({
			where: {
				id: categoryId,
			},
			select: {
				id: true,
				title: true,
				icon: true,
			},
		});

		if (!category) {
			return res.status(404).json(responseSend('failed get category', null, 'category not found'));
		}

		return res.status(200).json(responseSend('success', category, null));
	} catch (err) {
		return res.status(404).json(responseSend('failed get category', null, 'category not found'));
	}
};

module.exports.createCategory = async (req, res) => {
	const { title } = req.body;
	const icon = req.file;

	const { error } = createCategorySchema.validate(req.body);

	if (error) {
		return res.status(400).json(responseSend('data send not valid', null, formatErrorValidation(error)));
	}

	if (!icon) {
		return res.status(422).json(responseSend('data send not valid', null, 'file icon not send'));
	}

	const slug = generateSlug(title);
	const fileType = icon.mimetype.replace('image/', '');

	if (fileType != 'png' && fileType != 'jpg' && fileType != 'jpeg') {
		return res.status(415).json(responseSend('data send not valid', null, 'file icon type is not valid'));
	}

	try {
		const imageUpload = await imagekit.upload({
			file: icon.buffer,
			fileName: `${slug}.${fileType}`,
		});

		const category = await prisma.category.create({
			data: {
				title: title.toLowerCase(),
				icon: imageUpload.url,
			},
			select: {
				title: true,
				icon: true,
			},
		});

		return res.status(201).json(responseSend('success', category, null));
	} catch (err) {
		return res.json(err.message);
	}
};

module.exports.updateCategory = async (req, res) => {
	const { title } = req.body;
	const icon = req.file;
	const { categoryId } = req.params;

	const { error } = createCategorySchema.validate(req.body);

	if (error) {
		return res.status(400).json(responseSend('data send not valid', null, formatErrorValidation(error)));
	}

	if (!icon) {
		return res.status(422).json(responseSend('data send not valid', null, 'file icon not send'));
	}

	const slug = generateSlug(title);
	const fileType = icon.mimetype.replace('image/', '');

	if (fileType != 'png' && fileType != 'jpg' && fileType != 'jpeg') {
		return res.status(415).json(responseSend('data send not valid', null, 'file icon type is not valid'));
	}

	try {
		const imageUpload = await imagekit.upload({
			file: icon.buffer,
			fileName: `${slug}.${fileType}`,
		});

		const category = await prisma.category.update({
			where: {
				id: categoryId,
			},
			data: {
				title,
				icon: imageUpload.url,
			},
			select: {
				id: true,
				title: true,
				icon: true,
			},
		});

		if (!category) {
			return res.status(404).json(responseSend('failed get category', null, 'category not found'));
		}

		return res.status(200).json(responseSend('success', category, null));
	} catch (err) {
		return res.status(404).json(responseSend('failed get category', null, 'category not found'));
	}
};

module.exports.deleteCategory = async (req, res) => {
	const { categoryId } = req.params;

	try {
		const category = await prisma.category.delete({
			where: {
				id: categoryId,
			},
			select: {
				id: true,
				title: true,
				icon: true,
			},
		});

		return res.status(200).json(responseSend('success', category, null));
	} catch (err) {
		return res.status(404).json(responseSend('failed delete category', null, 'category not found'));
	}
};
