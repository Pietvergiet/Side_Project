//Lets require/import the HTTP module
var http = require('http');
var dispatcher = require('httpdispatcher');
var pg = require('pg');
//Lets define a port we want to listen to
//const PORT=1337; 

//We need a function which handles requests and send response
/*function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url);
}
*/
//Create a server
var server = http.createServer(handleRequest);
var port = process.env.PORT || 1337;
var conString = process.env.ELEPHANTSQL_URL || "postgres://upgrttzu:C3tQeW5md3dcsQoxaFhr513dxCzYXxsc@fizzy-cherry.db.elephantsql.com:5432/upgrttzu";
//var conString = process.env.ELEPHANTSQL_URL || "postgres://postgres:Runner1!@localhost:5432/postgres";
var client = new pg.Client(conString);
//Lets start our server
server.listen(port, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", port);
});
var names = [];
/*http.createServer(function (req, res) {
  var html = buildHtml(req);

  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': html.length,
    'Expires': new Date().toUTCString()
  });
  res.end(html);
}).listen(port);

function buildHtml(req) {
  var header = '';
  var body = '<a href="localhost:1337/page1"> KLIKKEN! </a>';

  // concatenate header string
  // concatenate body string

  return '<!DOCTYPE html>'
       + '<html><header>' + header + '</header><body>' + body + '</body></html>';
};*/

function handleRequest(req, res){
    try {
        //log the request on console
        console.log(req.url.substring(1));
        
        //Disptach
        dispatcher.dispatch(req, res);
    } catch(err) {
        console.log(err);
    }
}
function getComment(name) {
  var rComment;
  var rQuery = 'SELECT "Comment" AS comment FROM test WHERE "Name" = \''+name+'\'';
  console.log(rQuery);
    client.connect(function(err) {
    if(err) {
      console.error('could not connect to postgres', err)
      return 'Niet beschikbaar';
    }
    /*var query = client.query('SELECT "Name" FROM test WHERE id=1');
    query.on('row', function(err, row) {
      if(err) {
          return console.error('error running query', err);
      }
      console.log('Name: %s', row);
    });*/
    //var rQuery = 'SELECT "Comment" AS comment FROM test WHERE "Name" = \'' + req.url.substring(1)+ '\'';
    
    client.query(rQuery , function(err, result) {
      if(err) {
          return console.error('error running query', err);
      }
      rComment = result.rows[0].comment;
      console.log(rComment);
      //res.write('The comment of ' + req.url.substring(1) + ' is: ' + rComment);
      //res.end("DONE");
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
      });
    });
  return rComment;
}
dispatcher.onGet("/Frank", function(req, res) {
  res.write('<!DOCTYPE html><html><head><title>TESTJONGUH</title><meta charset="utf-8" /></head><body>');
  var comment = getComment('Frank');
  res.write('<p>The comment of Frank is: ' + comment+'</p>');
  res.end('</body></html>');
});
dispatcher.onGet("/Pietvergiet", function(req, res) {
  res.write('<!DOCTYPE html><html><head><title>TESTJONGUH</title><meta charset="utf-8" /></head><body>');
  var comment = getComment('Pietvergiet');
  res.write('<p>The comment of Pietvergiet is: ' + comment+'</p>');
  res.end('</body></html>');
});
dispatcher.onGet("/Joert", function(req, res) {
  res.write('<!DOCTYPE html><html><head><title>TESTJONGUH</title><meta charset="utf-8" /></head><body>');
  var comment = getComment('Joert');
  res.write('<p>The comment of Joert is: ' + comment+'</p>');
  res.end('</body></html>');
});
dispatcher.onGet("/Æde", function(req, res) {
  res.write('<!DOCTYPE html><html><head><title>TESTJONGUH</title><meta charset="utf-8" /></head><body>');
  var comment = getComment('Æde');
  res.write('<p>The comment of Æde is: ' + comment+'</p>');
  res.end('</body></html>');
});
dispatcher.onGet("/Karel", function(req, res) {
  res.write('<!DOCTYPE html><html><head><title>TESTJONGUH</title><meta charset="utf-8" /></head><body>');
  var comment = getComment('Karel');
  res.write('<p>The comment of Karel is: ' + comment+'</p>');
  res.end('</body></html>');
});
//A sample GET request    
dispatcher.onGet("/page1", function(req, res) {
	res.write('<!DOCTYPE html><html><head><title>TESTJONGUH</title><meta charset="utf-8" /></head><body>');
  //res.writeHead(200, {'Content-Type': 'text/plain'});
	client.connect(function(err) {
  		if(err) {
    		return console.error('could not connect to postgres', err);
  		}
      /*var query = client.query('SELECT "Name" FROM test WHERE id=1');
      query.on('row', function(err, row) {
        if(err) {
            return console.error('error running query', err);
        }
        console.log('Name: %s', row);
      });*/
  		client.query('SELECT "Name" AS names FROM test', function(err, result) {
	    	if(err) {
	      		return console.error('error running query', err);
	    	}
        var rLength = result.rows.length;
		    console.log(result.rows[0]);
        var qResults = [];
        for(var i = 0; i < rLength; i++) {
          qResults.push(result.rows[i].names);
        }
        for(var i = 0; i < rLength; i++) {
          console.log(qResults[i]);
          res.write('<a href="/' + qResults[i]+'">');
          res.write('Naam ' + i + ': ' +qResults[i]);
          res.write('</a><br/>');
        }
        res.end('</body></html>');
		    //res.end("DONE");
		    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
	    client.end();
  		});
	});
    
});    

//A sample POST request
dispatcher.onPost("/post1", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Got Post Data');
});


