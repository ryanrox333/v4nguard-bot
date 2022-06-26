let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('destiny.db');

module.exports = {
    db
}