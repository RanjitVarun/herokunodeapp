var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();
var sql=require('mssql');

const {Pool}=require('pg');

var http = require('http');
var server = http.Server(app);

app.use(express.static('client'));
var config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.HOSTNAME, 
  database: process.env.DB 
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
    const result = await client.query('SELECT * FROM Student_Detail');
   
    const results = { 'results': (result) ? result.rows : null};
   res.send(results);

  } catch (err) {
    console.error(err);
  res.send("Error " + err);
  }
})

var  executeQuery = function(res, query){             
  sql.connect(config, function (err) {
      if (err) {   
                  console.log("Error while connecting database :- " + err);
                  res.send(err);
               }
               else {
                   
                      var request = new sql.Request();
                      request.query(query, function (err, res) {
                        if (err) {
                                   console.log("Error while querying database :- " + err);
                                   res.send(err);
                                  }
                                  else {
                                    res.send(res);
                                         }
                            });
                    }
   });           
}

app.get("/user", function(req , res){
  var query = "select * from inventory";
  executeQuery (res, query);
});




