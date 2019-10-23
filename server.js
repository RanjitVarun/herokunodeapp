var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();
var cors=require('cors');

const {Pool}=require('pg');

var http = require('http');
var server = http.Server(app);

app.use(express.static('client'));
app.use(cors);

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

