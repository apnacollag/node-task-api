const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/task.log');

async function task(user_id) {
    const log = `${user_id} - task completed at - ${new Date().toISOString()}\n`;
    fs.appendFileSync(logFilePath, log);
    console.log(log);
}

module.exports = { task };
