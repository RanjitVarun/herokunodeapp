var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();
var sql=require('mssql');
// let tedious = require('tedious');
// let Connection = tedious.Connection;

const {Pool}=require('pg');

var http = require('http');
var server = http.Server(app);
// app.use(function (req, res, next) {  
//   res.header("Access-Control-Allow-Origin", "*");  
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");  
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");  
//   next();  
// });
app.use(express.static('client'));
// var config = {
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//    server: 'localhost', 
//   database: 'testdb',

// };
//server: process.env.HOSTNAME, 
//database: process.env.DB 

var config = {

  user: 'SA',
  password: 'Dexter@112',
  server: 'localhost', 
  database: 'testdb',
  host:5000

 
};

server.listen(PORT, function() {
  console.log('server running');
});


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
   ssl: true
});


app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM salesforce.student_detail__c');
    //const results = { 'results': (result) ? result.rows : null};
    var total=result.rows.length;
// res.send(total);
    //var query = "INSERT INTO student_list (id, programname, year, budget, forecast, actual, createdon, createdby ) VALUES ()";
   res.send(result);

  } catch (err) {
    console.error(err);
  res.send("Error " + err);
  }
 
});


app.get("/users", function(req , res){
  var query = "INSERT INTO inventory (id, name, quantity) VALUES (3,'apple',323)";
  sql.close();
  sql.connect(config, function (err) {
      if (err) {   
                  console.log("Error while connecting database :- " + err);
                 console.log(err);
               }
               else {
                   
                      var request = new sql.Request();
                      request.query(query, function (err, res) {
                        if (err) {
                                   console.log("Error while querying database :- " + err);
                                   console.log(err);
                                   
                                  
                                  }
                                  else {
                                    console.log(res);
                                         }
                            });
                    }
   });
 
});


// app.get("/user", function(req , res){
//   var query = "select * from inventory";

  
//   sql.close();
//   sql.connect(config, function (err) {
//       if (err) {   
//                   console.log("Error while connecting database :- " + err);
//                   console.log('db error block');
//                  console.log(err);
//                  printres(err);
//                }
//                else {
                   
//                       var request = new sql.Request();
//                       request.query(query, function (err, res) {
//                         if (err) {
//                                    console.log("Error while querying database :- " + err);
//                                    console.log('error block')
//                                    console.log(err);
                                   
//                                    printres(err)
//                                   }
//                                   else {
//                                     console.log('hello');
//                                     console.log(res);
                            
//                                    printres(res);
//                                          }
//                             });
//                     }
//    });

//    function printres(result){
//      res.send(result);
//    }

 
  
// });










