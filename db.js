const sqlite3 = require("sqlite3").verbose();

const dbFile = "db.sqlite";

// se connecter a la base de donnee
let db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    }else {
        console.log("connexion a la base sqlite...")
        const sql= `CREATE TABLE article (
            id INTEGER PRIMARY KEY AUTOINCREMENT,

            Titre text,

            Résumé text,

            Contenu text,
            
            Auteur text,
            
            DateDeCreation text,
            
            DateDeMJ text
)` ;
         
    
db.run(sql, (err) => {
    if (err) {
        console.log("Table deja creer");
        }

    });
       }
});

module.exports = db;