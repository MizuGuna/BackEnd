const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'nodejs_user',
    password: 'Internship@2025',
    database: 'GoogleSheets',
});

conn.connect((err) => {
    if (err) {
        console.error('Error Connecting:', err);
        return;
    }
    console.log("Connection successfull!");
    var sql = 'select * from Test'
    var result = conn.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(result);
    });
    // console.log(`Results ${result}`)
    conn.end()
    console.log("Connection Ended!")
});

