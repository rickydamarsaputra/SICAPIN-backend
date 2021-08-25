const { PrismaClient } = require('@prisma/client');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const { responseSend } = require('../lib/response');

const prisma = new PrismaClient();
const saltRounds = 10;

const signupSchema = Joi.object({
	full_name: Joi.string().required(),
	user_class: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
}).options({ abortEarly: false });
const signinSchema = Joi.object({
	full_name: Joi.string().required(),
	password: Joi.string().required(),
}).options({ abortEarly: false });

const formatErrorValidation = ({ details }) => {
	const errors = details.map((error) => {
		return {
			message: error.message,
			field: error.context.label,
		};
	});
	return errors;
};

module.exports.signupUser = async (req, res) => {
	const { full_name, user_class, email, password } = req.body;

	const { error } = signupSchema.validate(req.body);
	if (error) {
		return res.status(400).json(responseSend('data send not valid', null, formatErrorValidation(error)));
	}

	try {
		const salt = await bcrypt.genSalt(saltRounds);
		const hashPassword = await bcrypt.hash(password, salt);

		const user = await prisma.user.create({
			data: {
				full_name,
				user_class,
				email,
				password: hashPassword,
			},
			select: {
				full_name: true,
				user_class: true,
				email: true,
			},
		});

		return res.status(201).json(responseSend('success', user, null));
	} catch (err) {
		return res.json(err.message);
	}
};

module.exports.signinUser = async (req, res) => {
	const { full_name, password } = req.body;
	const { error } = signinSchema.validate(req.body);
	if (error) {
		return res.status(400).json(responseSend('data send not valid', null, formatErrorValidation(error)));
	}

	try {
		const user = await prisma.user.findFirst({
			where: {
				full_name,
			},
			select: {
				full_name: true,
				user_class: true,
				email: true,
				password: true,
			},
		});

		const checkPassword = await bcrypt.compare(password, user.password);

		if (!user || !checkPassword) {
			return res.status(400).json(responseSend('invalid user login', null, 'wrong name or password'));
		}
		return res.status(200).json(responseSend('success', user, null));
	} catch (err) {
		return res.json(err.message);
	}
};
