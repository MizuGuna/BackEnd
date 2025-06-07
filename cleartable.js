const { pool } = require('./db')

pool.connect(async (err) => {
    if (err) {
        console.error(err);
        return;
    }
    pool.query("DELETE FROM TEST", (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(res)
    })
})

