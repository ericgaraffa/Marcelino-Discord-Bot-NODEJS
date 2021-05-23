var mysql = require('mysql');

config = {
    host: "localhost",
    user : "root",
    password : "",
    database : "Marcelino",
}
//connection a la base de données.
var connection =mysql.createConnection(config); 
connection.connect(function(err){
  if (err){
    console.log('error connecting:' + err.stack);
  }
  console.log('connected successfully to DB.');
});
//exportation de la connexion.
module.exports ={
     connection : mysql.createConnection(config) 
} 