const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'esqprovee'
});

connection.connect(function (err) {
    if (err) {
        console.error("Error al conectar a Data Base ::", err.stack);
        return;
    }
    console.log("Conectado a Data Base con Id. :: ", connection.threadId)
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
    llave: "nokey"
}

module.exports = Conn