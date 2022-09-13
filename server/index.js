const express = require('express');
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors")

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));


/**creating a database connection */
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs'
})


/**checking if connection to the database was successful */
db.getConnection((err) => {
    if (err) {
      console.log("Database Connection Failed !!!", err);
    } else {
      console.log("connected to Database");
    }
});





/** getting all users */
app.get("/api/get", (req, res) => {
  sqlGet = "SELECT * FROM users"
  db.query(sqlGet, (err, result) => {
    if(err){
      console.log("Error!!!", err)
    }
    res.send(result)
  })
})


/** getting only one user */
app.get("/api/get/:id", (req, res) => {
  const {id} = req.params
  sqlGetUser = "SELECT * FROM users WHERE user_id = ?"
  db.query(sqlGetUser, [id], (err, result) => {
    if(err){
      console.log("Error!!!", err)
    }
    res.send(result)
  })
})


/**updating a user */
app.put("/api/update/:id", (req, res) => {
  const {id} = req.params
  const {username, bio} = req.body
  sqlUpdate = "UPDATE users SET username = ?, bio = ? WHERE user_id = ?"
  db.query(sqlUpdate, [username, bio, id], (err, result) => {
    if(err){
      console.log("Error!!!", err)
    }
    res.send(result)
  })
})


/** adding one user */
app.post("/api/insert", (req, res) => {
  const {username, bio} = req.body;
  sqlInsert = "INSERT INTO users (username, bio) VALUES (?, ?)";
  db.query(sqlInsert, [username, bio], (error, result) => {
    if(error){
      console.log(error)
    }
    res.send(result)
  })

})

/** deleting one user */
app.delete("/api/delete/:id", (req, res) => {
  const {id} = req.params;
  sqlDelete = "DELETE FROM users WHERE user_id = ?";
  db.query(sqlDelete, [id], (error, result) => {
    if(error){
      console.log(error)
    }
    // res.send(result)
  })

})



//just defining home route or whatever
app.get('/', (req, res) => {
  res.send("Hiii ")
})


app.listen(3001, ()=> {
    console.log("listening on port 3001...")
})