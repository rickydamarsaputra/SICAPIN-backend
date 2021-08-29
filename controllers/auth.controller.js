const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const { responseSend } = require('../lib/response');
const { signupSchema, signinSchema } = require('../lib/validationSchema');
const { formatErrorValidation } = require('../lib/validationErrorFormat');

const prisma = new PrismaClient();
const saltRounds = 10;

module.exports.signupUser = async (req, res) => {
	const { full_name, user_class, email, point, username, password } = req.body;

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
				username,
				password: hashPassword,
			},
			select: {
				username: true,
				password: true,
			},
		});

		return res.status(201).json(responseSend('success', user, null));
	} catch (err) {
		return res.json(err.message);
	}
};

module.exports.signinUser = async (req, res) => {
	const { username, password } = req.body;
	const { error } = signinSchema.validate(req.body);
	if (error) {
		return res.status(400).json(responseSend('data send not valid', null, formatErrorValidation(error)));
	}

	try {
		const user = await prisma.user.findUnique({
			where: {
				username,
			},
			select: {
				username: true,
				password: true,
			},
		});

		if (!user) {
			return res.status(404).json(responseSend('invalid user login', null, 'wrong name or password'));
		}
		const checkPassword = await bcrypt.compare(password, user.password);
		if (!checkPassword) {
			return res.status(404).json(responseSend('invalid user login', null, 'wrong name or password'));
		}
		return res.status(200).json(responseSend('success', user, null));
	} catch (err) {
		return res.json(err.message);
	}
};
