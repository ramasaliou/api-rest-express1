const  express=require("express");
const db = require("./db.js");
const app = express();
//middleware
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

const PORT = 3000;

app.get("/", function(req, res){
    res.json({ message:"L'API marche" });
});

// lister les articles
app.get("/api/articles", (req, res) =>{
  const sql = "SELECT * FROM article"

  db.all(sql, (err, rows) => {
    if (err){
        res.status(400).json({error:err.message});
        return ;
    }
    res.json({message: "liste des articles", data: rows});

});

});
// affichet un article avec son id
app.get("/api/articles/:id", (req, res) => {
    const {id:articleID} = req.params
    const sql = "SELECT * FROM article WHERE id = ?" ;
    const params = [articleID]
  
    db.get(sql, params, (err, row) => {
      if (err) {
          res.status(400).json({error:err.message});
          return ;
      }
      res.json({ message: `afficher l'article ${articleID}`, data: row});
  
  });
  
  });
//modier un articles
app.put("/api/articles/:id", (req, res) => {
    const { id: articleID } = req.params;

    const {Titre, Résumé, Contenu, Auteur, DateDeCreation, DateDeMJ } = req.body
    
    if(!Titre ||!Résumé || !Contenu || !Auteur || !DateDeCreation || !DateDeMJ){
        res.status(400).json({ error:" Merci de donner tous les informations"});
        return ;
    }
    const article = {Titre, Résumé, Contenu, Auteur, DateDeCreation, DateDeMJ };
     
    const sql = 'UPDATE  article SET Titre = ?, Résumé = ?, Contenu = ?, Auteur = ?, DateDeCreation = ?, DateDeMJ = ? WHERE id = ?';
    const params = [article.Titre, article.Résumé, article.Contenu, article.Auteur,article.DateDeCreation, article.DateDeMJ , articleID];
    db.run(sql, params, function(err,result){
        if (err){
            res.status(400).json({error:err.message});
            return 
        }
    })

    res.status(201).json({ message:`article ${ articleID } modifier avec succes`, data: article });

    }) 






// creer un nouveau article
app.post("/api/articles", (req, res) => {


    const {Titre, Résumé, Contenu, Auteur, DateDeCreation, DateDeMJ } = req.body
    
    if(!Titre ||!Résumé || !Contenu || !Auteur || !DateDeCreation || !DateDeMJ){
        res.status(400).json({ error:" Merci de donner tous les informations"});
        return ;
    }
    const article = {Titre, Résumé, Contenu, Auteur, DateDeCreation, DateDeMJ };
     
    const sql = 'INSERT INTO article (Titre, Résumé, Contenu, Auteur, DateDeCreation, DateDeMJ) VALUES (?,?,?,?,?,?)'
    const params = [article.Titre, article.Résumé, article.Contenu, article.Auteur,article.DateDeCreation, article.DateDeMJ]
    db.run(sql, params, function(err,result){
        if (err){
            res.status(400).json({error:err.message});
            return 
        }
    })

    res.status(201).json({ message:"article creer avec succes", data: article});

    }) 
  
//   demarrer le serveur

app.listen(PORT , function(){
console.log("L'application est demarrer au port:"+PORT);


})


