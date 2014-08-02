var express = require('express');

var app = express.createServer(express.logger());


  app.get('/', function(request, response) {
  var fs = require('fs');

  var buf = new Buffer(fs.readFileSync('index.html'), 'utf8');

  response.send(buf.toString('utf8'));
});


/*
var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
*/

//var gettext = require('gettext');
//    _ = gettext.gettext;

//gettext.loadLanguageFile('./locale/es/messages.po', 'es');
//gettext.loadLanguageFile('./locale/ru/messages.po', 'ru');

//gettext.loadLocaleDirectory('./locale/');

// Render homepage (note trailing slash): example.com/
app.get('/', function(request, response) {
  var data = fs.readFileSync('index.html').toString();
  response.send(data);
});


// language/es
//app.get('/language/es', function(request, response) {
//   gettext.setlocale('LC_ALL', 'es');
//   response.redirect("/");
//});


// Render example.com/orders
//app.get('/orders', function(request, response) {
  
//});

// Hit this URL while on example.com/orders to refresh
//app.get('/refresh_orders', function(request, response) {
  
//            response.redirect("/orders");
//});

// sync the database and start the server
/*
db.sequelize.sync().complete(function(err) {
  if (err) {
    throw err;
  } else {
    http.createServer(app).listen(app.get('port'), function() {
      console.log("Listening on " + app.get('port'));
    });
  }
});
*/

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
