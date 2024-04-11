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

app.listen(port,()=>{
    console.log("Server runing on port : "+ port)
   
})