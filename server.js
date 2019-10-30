var PORT = process.env.PORT || 4000;
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
  database: 'testdb'
 
};

server.listen(PORT, function() {
  console.log('server running');
});
//connectionString:"postgres://jzqwhxigxmlvke:45d22080aa781284b74a3009f90ad84cfdf35ccb54d4c556265e4a87afa3f375@ec2-174-129-252-211.compute-1.amazonaws.com:5432/d9j23hqbjo3rea",
//connectionString: process.env.DATABASE_URL,
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
   ssl: true
});


app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM salesforce.student_detail__c');
    var total=result.rows.length;
    for(var i=0;i<total;i++)
    {
      var query = "INSERT INTO student_list VALUES (result.rows[i].id, result.rows[i].name, result.rows[i].year__c, result.rows[i].budget__c, result.rows[i].forecast__c, result.rows[i].actual__c, result.rows[i].createddate, result.rows[i].createdby__c)";

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

  }

 res.send(result);


  } catch (err) {
    console.error(err);
  res.send("Error " + err);
  }
 
});


 app.get("/user", function(req , res){
   var query = "INSERT INTO student_list (id, programname, year, budget, forecast, actual, createdon, createdby )VALUES (1,'NEU-MBA',	2019,25.00,23.00,13,'2019-10-25T06:08:54.000Z',1)";
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
    res.send('Insertion successfull');
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










