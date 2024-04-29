let express = require('express');
let app = express()
const cors = require('cors')
const bodyParser = require("body-parser")
const port = 8080
let connect = require('./connection')

app
.use(cors({ origin: "*"}))
.use(bodyParser.urlencoded({extended: false}))
.use(bodyParser.json())

app.post('/liste', (req, res) => {
  const data = req.body;
  
  const reqe = "INSERT INTO aet (matricule, name, namepromotion, dateEntree) VALUES (?, ?, ?, ?)";
  
  // Exécuter la requête SQL
  connect.query(reqe, [data.matricule, data.name, data.namepromotion,data.dateEntree], (err, resultats) => {
      if (err) {
          console.log(err);
          return res.status(500).send("Une erreur s'est produite lors de l'insertion des données.");
      } else {
          console.log(resultats);
          return res.status(200).send("Données insérées avec succès.");
      }
  });
});

app.get('/liste', (req, res) => {
    const reqe= "SELECT * FROM aet ORDER BY matricule ASC"
    connect.query(reqe,(err,resultats)=>{
     if(err){
         console.log(err)
     }
     else{
        console.log(resultats)
        res.send(resultats)
     }
    })
});

app.post('/liste/search', (req, res) => {
    const searchTerm = req.body.param;
    if(searchTerm !='')
    {
        const query = `SELECT * FROM aet WHERE matricule LIKE '%${searchTerm}%' OR name LIKE '%${searchTerm}%' OR namepromotion LIKE '%${searchTerm}%' ORDER BY matricule ASC `;
        connect.query(query, (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send('Error retrieving data');
          } else {
            res.send(results); // Send search results as JSON
          }
        });
    }
    else
    {
        res.send('vide')
    }
  });

  app.post('/liste/recherche', (req, res) => {
    const searchTerm = req.body.param;
    if(searchTerm !='')
    {
        const query = `SELECT * FROM aet WHERE matricule LIKE '%${searchTerm}%' OR name LIKE '%${searchTerm}%' OR namepromotion LIKE '%${searchTerm}%' ORDER BY matricule ASC `;
        connect.query(query, (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send('Error retrieving data');
          } else {
            res.send(results); // Send search results as JSON
          }
        });
    }
    else
    {
        res.send([])
    }
  });

app.listen(port,()=>{
    console.log("Server runing on port : "+ port)
   
})