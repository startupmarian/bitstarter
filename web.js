#!/usr/bin/env node
var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  var fs = require('fs');
  var buf = new Buffer(fs.readFileSync('index.html'), 'utf8');

  response.send(buf.ToString('utf8'));
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
