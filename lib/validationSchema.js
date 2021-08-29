const Joi = require('joi');

const joiOptions = { abortEarly: false };

module.exports.signupSchema = Joi.object({
	full_name: Joi.string().required(),
	user_class: Joi.string().required(),
	email: Joi.string().email().required(),
	username: Joi.string().required(),
	password: Joi.string().required(),
}).options(joiOptions);

module.exports.signinSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
}).options(joiOptions);

module.exports.createCategorySchema = Joi.object({
	title: Joi.string().required(),
});
