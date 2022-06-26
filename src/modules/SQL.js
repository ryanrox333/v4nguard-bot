let mysql = require('mysql');
let connection = mysql.createConnection({
    host: '34.68.134.90',
    user: 'zavala',
    password: '!TDdrifter4',
    database: 'destiny'
});

async function startup() {
    await connection.connect();
    console.log('Connected to database.');
}

async function shutdown() {
    await connection.end()
    console.log('Disconnected from database.');
}

async function query(q) {

    await connection.query(q, (error, result, fields) => {
        if (error) throw error;
        if (q.includes('SELECT')) {
            //console.log('Sending fields instead of result.')
            //console.log(fields);
            return fields;
        }
        console.log(result)
        return result;
    })
}

module.exports = {
    query: query,
    startup: startup,
    connection: connection,
    shutdown: shutdown
}