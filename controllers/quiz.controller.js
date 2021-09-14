const { PrismaClient } = require('@prisma/client');

const { responseSend } = require('../lib/response');
const { createQuizSchema } = require('../lib/validationSchema');
const { formatErrorValidation } = require('../lib/validationErrorFormat');

const prisma = new PrismaClient();

module.exports.getAllQuiz = async (req, res) => {
	const { limit, categoryId } = req.query;

	try {
		const quiz = await prisma.quiz.findMany({
			where: {
				category_id: categoryId,
			},
			take: parseInt(limit) || 10,
			select: {
				id: true,
				question: true,
				correct_answer: true,
				answers: true,
				category: {
					select: {
						title: true,
					},
				},
			},
		});

		const formatQuiz = quiz.map((qui) => {
			return {
				id: qui.id,
				question: qui.question,
				correct_answer: qui.correct_answer,
				answers: qui.answers,
				mapel: qui.category.title,
			};
		});

		return res.status(200).json(responseSend('success', formatQuiz, null));
	} catch (err) {
		return res.status(404).json(responseSend('failed get article', null, 'the category was not found'));
	}
};

module.exports.getSingleQuiz = async (req, res) => {
	const { quizId } = req.params;

	try {
		const quiz = await prisma.quiz.findUnique({
			where: {
				id: quizId,
			},
			select: {
				id: true,
				question: true,
				correct_answer: true,
				answers: true,
			},
		});

		if (!quiz) {
			return res.status(404).json(responseSend('failed get quiz', null, 'quiz not found'));
		}

		return res.status(200).json(responseSend('success', quiz, null));
	} catch (err) {
		return res.send(err.message);
		// return res.status(404).json(responseSend('failed get quiz', null, 'quiz not found'));
	}
};

module.exports.createQuiz = async (req, res) => {
	const { question, correct_answer, answers, category_id } = req.body;
	const { error } = createQuizSchema.validate(req.body);

	if (error) {
		return res.status(400).json(responseSend('data send not valid', null, formatErrorValidation(error)));
	}

	try {
		const quiz = await prisma.quiz.create({
			data: {
				question,
				correct_answer,
				answers,
				category: {
					connect: {
						id: category_id,
					},
				},
			},
			select: {
				question: true,
			},
		});

		return res.status(201).json(responseSend('success', quiz, null));
	} catch (err) {
		return res.status(400).json(responseSend('failed create quiz', null, 'invalid category id'));
	}
};

module.exports.updateQuiz = async (req, res) => {
	const { question, correct_answer, answers, category_id } = req.body;
	const { quizId } = req.params;

	const { error } = createQuizSchema.validate(req.body);

	if (error) {
		return res.status(400).json(responseSend('data send not valid', null, formatErrorValidation(error)));
	}

	try {
		const quiz = await prisma.quiz.update({
			where: {
				id: quizId,
			},
			data: {
				question,
				correct_answer,
				answers,
				category: {
					connect: {
						id: category_id,
					},
				},
			},
			select: {
				question: true,
			},
		});

		if (!quiz) {
			return res.status(404).json(responseSend('failed get quiz', null, 'quiz not found'));
		}

		return res.status(200).json(responseSend('success', quiz, null));
	} catch (err) {
		return res.status(404).json(responseSend('failed get quiz', null, 'quiz not found'));
	}
};

module.exports.deleteQuiz = async (req, res) => {
	const { quizId } = req.params;

	try {
		const quiz = await prisma.quiz.delete({
			where: {
				id: quizId,
			},
			select: {
				id: true,
				question: true,
			},
		});

		return res.status(200).json(responseSend('success', quiz, null));
	} catch (err) {
		return res.status(404).json(responseSend('failed delete quiz', null, 'quiz not found'));
	}
};
