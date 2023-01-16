const mysql = require('mysql')
const moment = require('moment')

module.exports = async () => {
    
    let db = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "witbot"
    }) 
    
    moment.locale('fr')
    db.query(`INSERT INTO demarrage (lancement) VALUES ('${moment().utcOffset("+01:00").format('lll')}')`)
    
    return db;
}