const express = require('express');
const cluster = require('cluster');
const os = require('os');
const mongoose = require('mongoose');
const taskRoute = require('./routes/taskRoute');
require('dotenv').config();

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    for (let i = 0; i < 2; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} exited. Forking a new one.`);
        cluster.fork();
    });
} else {
    const app = express();
    app.use(express.json());

    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.log(err));

    app.use('/api', taskRoute);

    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT} with worker ${process.pid}`);
    });
}
