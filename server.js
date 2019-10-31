var PORT = process.env.PORT || 4000;
var express = require('express');
var app = express();
var sql = require('mssql');
var config = require('./config/config');

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
  connectionString: "postgres://kujywnbzxawals:7aba159539b9345d0bb7dc92257aa0e6c1f1a5391f54fc965ae7a2a4d40489fe@ec2-54-83-55-122.compute-1.amazonaws.com:5432/d848jirpgs8ls",
  ssl: true,
});


app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM student_detail');
    //var total = result.rows.length;
    var record = result.rows;

    //sql.close();
    sql.connect(config, function (err) {
      if (err) {
        console.log("Error while connecting database :- " + err);
        console.log(err);
      }
      else {
        for (let row of record) {
          var query = 'Insert into studentlist values(' + "'" + row.id + "'" + ',' + "'" + row.program_name + "'" + ',' + row.year + ',' + row.budget + ',' + row.forcast + ',' + row.actual + ',' + row.created_by + ')';
          console.log(query);
          var request = new sql.Request();
          request.query(query, function (err, res) {
            if (err) {
              console.log(err);
            }
            else {
              console.log(res);
            }
          });
        }
      }
    });
    res.send(result.rows);
  }

  catch (err) {
    console.error(err);
    res.send("Error " + err);
  }

});


// app.get("/user", function (req, res) {
//   var query = "INSERT INTO student_list (id, programname, budget, forcast, actual, createdby )VALUES ('1yuyuyu','NEU-MBA',25.00,23.00,13,1)";
//   sql.close();
//   sql.connect(config, function (err) {
//     if (err) {
//       console.log("Error while connecting database :- " + err);
//       console.log(err);
//     }
//     else {

//       var request = new sql.Request();
//       request.query(query, function (err, res) {
//         if (err) {
//           console.log("Error while querying database :- " + err);
//           console.log(err);
//         }
//         else {
//           console.log(res);
//         }
//       });
//     }
//   });
//   res.send('Insertion successfull');
// });
















