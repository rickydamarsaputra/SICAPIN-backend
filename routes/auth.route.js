const router = require('express').Router();

router.get('/', (req, res) => {
	res.json(req.baseUrl);
});

module.exports = router;
