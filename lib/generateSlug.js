module.exports = (text) => {
	return text
		.toString()
		.toLowerCase()
		.replace(/^-+/, '')
		.replace(/-+$/, '')
		.replace(/\s+/g, '_')
		.replace(/\-\-+/g, '_')
		.replace(/[^\w\-]+/g, '');
};
