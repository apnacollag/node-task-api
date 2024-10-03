const { RateLimiterMemory } = require('rate-limiter-flexible');
const taskQueue = require('../models/taskQueue');

const rateLimiter = new RateLimiterMemory({
    points: 1, 
    duration: 1, 
    keyPrefix: 'user_task_',
});

const minuteLimiter = new RateLimiterMemory({
    points: 20,
    duration: 60,
    keyPrefix: 'user_task_minute_',
});

async function rateLimiterMiddleware(req, res, next) {
    const userId = req.body.user_id;

    try {
        await rateLimiter.consume(userId); 
        await minuteLimiter.consume(userId);
        
        taskQueue.add({ user_id: userId }); 
        res.status(200).send('Task queued successfully');
    } catch (err) {
        res.status(429).send('Rate limit exceeded. Try again later.');
    }
}

module.exports = rateLimiterMiddleware;
