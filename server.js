var http = require('http')
var pg = require('pg');
var port = process.env.PORT || 1337;
//var conString = process.env.ELEPHANTSQL_URL || "postgres://upgrttzu:C3tQeW5md3dcsQoxaFhr513dxCzYXxsc@fizzy-cherry.db.elephantsql.com:5432/upgrttzu";
http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('UnBrickable biatches! WOOP WOOP lolcats\n');
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Meer tekst\n');	
}).listen(port);


/*
var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

var conString = process.env.ELEPHANTSQL_URL || "postgres://postgres:5432@localhost/postgres";

var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
    client.end();
  });
});*/