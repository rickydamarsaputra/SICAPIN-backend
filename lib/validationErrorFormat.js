module.exports.formatErrorValidation = ({ details }) => {
	return details.map((error) => ({
		message: error.message,
		field: error.context.label,
	}));
};
