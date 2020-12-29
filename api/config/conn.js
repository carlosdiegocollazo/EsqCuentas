const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'ls-c793b1e226886e3fad5c95e189bba252847c7ae6.c0d8wzdbck0g.us-east-1.rds.amazonaws.com',
    user: 'dbmasteruser',
    password: 'GZsuBQ7Yr}lru[&d6YzIn;.C)TJ(j;E8',
    database: 'esqprovee'
    /*host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'esqprovee' */
});

connection.connect(function (err) {
    if (err) {
        console.error("Error al conectar a Data Base ::", err.stack);
        return;
    }
    //console.log("Conectado a Data Base con Id. :: ", connection.threadId)
});

let query = (sql) => {
    return new Promise((resolve, reject) => {
        connection.query(`${sql}`, function (error, results, fields) {
            if (error) {
                resolve(JSON.parse(JSON.stringify(error)));
            } else {
                resolve(results);
            }
        });
    })
}

let Conn = {
    query: query,
    llave: "NoKey"
}

module.exports = Conn