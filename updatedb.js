const { readSpreedsheet } = require('./gconnect');
const { pool } = require('./db');

const updateDb = async () => {
    pool.connect(async (err) => {
        if (err) {
            console.error('Error Connecting:', err);
            return;
        }
        console.log("Connection successfull!");
        var sql = "REPLACE INTO Test(datetime,temperature,ph,tds,orp) VALUES ?"
        const values = await readSpreedsheet()
        // console.log(values)
        pool.query(sql, [values], function (err, result) {
            if (err) {
                console.error("Error Occured during insert Query:", err);
                return;
            }
            console.log("Number of records inserted: " + result.affectedRows);
        });
    });
}

// const updateDb = async () => {
//     try {
//         const values = await readSpreedsheet();
//         const sql = "REPLACE INTO Test(datetime, temperature, ph, tds, orp) VALUES ?";
//         const [result] = await pool.promise().query(sql, [values]);
//         console.log("Number of records inserted: " + result.affectedRows);
//     } catch (err) {
//         console.error("Error during DB update:", err);
//     }
// };

module.exports = { updateDb }