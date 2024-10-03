const express = require('express');
const rateLimiterMiddleware = require('../middlewares/rateLimiter');
const router = express.Router();

router.post('/task', rateLimiterMiddleware);

module.exports = router;
