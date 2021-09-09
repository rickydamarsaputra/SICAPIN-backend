const { PrismaClient } = require('@prisma/client');
const imagekit = require('../lib/imagekit');

const { responseSend } = require('../lib/response');
const { createAssetSchema } = require('../lib/validationSchema');
const { formatErrorValidation } = require('../lib/validationErrorFormat');
const generateSlug = require('../lib/generateSlug');

const prisma = new PrismaClient();

module.exports.getAllAsset = async (req, res) => {
	try {
		const assets = await prisma.asset.findMany({
			select: {
				id: true,
				title: true,
				icon: true,
			},
		});

		return res.status(200).json(responseSend('success', assets, null));
	} catch (err) {
		return res.json(err.message);
	}
};

module.exports.getSingleAsset = async (req, res) => {
	const { assetId } = req.params;

	try {
		const asset = await prisma.asset.findUnique({
			where: {
				id: assetId,
			},
			select: {
				id: true,
				title: true,
				icon: true,
				asset_url: true,
			},
		});

		if (!asset) {
			return res.status(404).json(responseSend('failed get asset', null, 'asset not found'));
		}

		return res.status(200).json(responseSend('success', asset, null));
	} catch (err) {
		return res.status(404).json(responseSend('failed get asset', null, 'asset not found'));
	}
};

module.exports.createAsset = async (req, res) => {
	const { title, asset_url, category_id } = req.body;
	const icon = req.file;

	const { error } = createAssetSchema.validate(req.body);

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

		const asset = await prisma.asset.create({
			data: {
				title: title.toLowerCase(),
				icon: imageUpload.url,
				asset_url,
				category: {
					connect: {
						id: category_id,
					},
				},
			},
			select: {
				title: true,
				icon: true,
			},
		});

		return res.status(201).json(responseSend('success', asset, null));
	} catch (err) {
		return res.json(err.message);
	}
};

module.exports.updateAsset = async (req, res) => {
	res.send('update asset');
};

module.exports.deleteAsset = async (req, res) => {
	res.send('delete asset');
};
