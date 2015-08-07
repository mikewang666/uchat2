var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

// preserve all clients in an array
var clients = [];

app.get('/index.html', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.ws('/chat', function(ws, res) {
  // push new WebSocket client to client list
  clients.push(ws);
  
  ws.on('message', function(msg) {
    clients.forEach(function(client) {
      if (client != ws) {
        client.send(msg);
      }
    });
  });
  ws.on('close', function() {
    console.log('Connection closed');
    // remove it
    var idx = clients.indexOf(ws);
    if (idx !== -1) {
      clients.splice(idx, 1);
    }
  });
  ws.on('error', function() {
    console.log('Connection error');
    ws.close();
    // remove it
    var idx = clients.indexOf(ws);
    if (idx !== -1) {
      clients.splice(idx, 1);
    }
  });
});

var server = app.listen(3000, 'localhost', function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});