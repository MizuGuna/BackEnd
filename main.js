const { updateDb } = require('./updatedb')
const cron = require('node-cron');
const express = require('express')
const { pool } = require('./db')
const cors = require('cors');

const app = express()
app.use(cors());

app.get('/api/data', (req, res) => {
    pool.query('SELECT * FROM Test', (err, results) => {
        if (err) {
            console.error('DB Error:', err);
            return res.status(500).json({ error: 'DB query failed' });
        }
        res.json(results);
    });
});

app.listen(5754, () => {
    console.log("Server running on http://localhost:5754");
});


let isRunning = false;
const iteration = async () => {
    if (isRunning) return;
    isRunning = true;

    try {
        console.log("Triggering update:", new Date());
        await updateDb();
    } catch (err) {
        console.error("Interval error:", err);
    } finally {
        isRunning = false;
    }
}
// cron.schedule('* * * * *', iteration)
setInterval(iteration, 10000);
