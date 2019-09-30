const express = require('express');
const router = express.Router();


router.get('/status', (req, res) => {
	res.status(200).json({
		status: 'online',
		versão: 'v2.0'
	});
});

module.exports = router;
