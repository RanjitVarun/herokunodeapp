var PORT = process.env.PORT || 4000;
var express = require('express');
var app = express();
var sql = require('mssql');
var config=require('./config/config');

const { Pool } = require('pg');

var http = require('http');
var server = http.Server(app);

app.use(express.static('client'));

// var config = {
//   user: 'SA',
//   password: 'Dexter@112',
//   server: 'localhost',
//   database: 'testdb'

// };

var config = {
  user: config.user,
  password: config.password,
  server: config.server,
  database: config.database

};

server.listen(PORT, function () {
  console.log('server running');
});


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});


app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM student_detail');
    var total = result.rows.length;
    for (var i = 0; i < total; i++) {
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


app.get("/user", function (req, res) {
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
















