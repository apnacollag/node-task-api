const Queue = require('bull');
const taskQueue = new Queue('taskQueue', process.env.REDIS_URL || 'redis://127.0.0.1:6379');

taskQueue.process(async (job) => {
    const { user_id } = job.data;
    await task(user_id);
});

module.exports = taskQueue;
