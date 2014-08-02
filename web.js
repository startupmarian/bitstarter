var async = require('async')
  , express = require('express')
  , path    = require('path')
  , fs      = require('fs')
  , http    = require('http')
  , https   = require('https')
  , i18n    = require('i18n-abide')
;

//var app = express.createServer(express.logger());

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8080);
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'locale')));

app.use(express.logger("dev"));

app.use(i18n.abide({
  supported_languages: ['en', 'es', 'ru'],
  default_lang: 'en',
  translation_directory: 'public/locale'
}));

// Render homepage
app.get('/', function(request, response) {
   request.setLocale('es');
   response.render("homepage", {
	title: request.gettext("From the body toward the light. Translation into Russian"),
        lang: 'es'
    });
});

/*
app.get('/', function(request, response) {
  var fs = require('fs');

  var buf = new Buffer(fs.readFileSync('index.html'), 'utf8');

  response.send(buf.toString('utf8'));
});
*/

//gettext.loadLanguageFile('./locale/es/messages.po', 'es');
//gettext.loadLanguageFile('./locale/ru/messages.po', 'ru');
//gettext.loadLocaleDirectory('./locale/');


// Render homepage (note trailing slash): example.com/
//app.get('/', function(request, response) {
//  var data = fs.readFileSync('index.html').toString();
//  response.send(data);
//});


// language/es
app.get('/language/es', function(request, response) {
   //gettext.setlocale('LC_ALL', 'es');
   //lang = 'es';
   //response.redirect("/");
   request.setLocale('es');

   response.render("homepage", {
        title: request.gettext("From the body toward the light. Translation into Russian"),
        lang: 'es'
    });
   //response.redirect("/");

});


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
