var async = require('async')
  , express = require('express')
  , lingua  = require('lingua')
  , path    = require('path')
  , fs      = require('fs')
  , http    = require('http')
  , https   = require('https')
;
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Lingua configuration
app.use(lingua(app, {
  defaultLocale: 'en',
  path: __dirname + '/public/locale',
  storageKey: 'lang', 
  cookieOptions: {
  //  domain: '.domain.tld',    // to allow subdomains access to the same cookie, for instance
  //  path: '/blog',            // to restrict the language cookie to a path
    httpOnly: false,          // if you need access to this cookie from javascript on the client
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000)  // expire in 1 day instead of 1 year
//    secure: true              // for serving over https
  }
}));

app.use(express.bodyParser());
app.use(express.methodOverride());

app.set('port', process.env.PORT || 8080);
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.logger("dev"));
app.use(app.router);

// Render homepage
app.get('/', function(request, response) {

   var sell_en="", sell_es="", sell_ru="", langg="en";

   if (typeof(request.query['lang']) != 'undefined') {
     langg = request.query['lang'];
     switch (langg) {
       case "en": sell_en = " selected "; break;
       case "es": sell_es = " selected "; break;
       case "ru": sell_ru = " selected "; break;
     }
   }
   else{
       sell_en = " selected ";
//       request.query['lang'] = 'en';
   }
   response.render("homepage", {
	title: "From the body toward the light. Translation into Russian",
        sel_en: sell_en,
        sel_es: sell_es,
        sel_ru: sell_ru
        , language: langg
    });
});

/*
app.get('/', function(request, response) {
  var fs = require('fs');

  var buf = new Buffer(fs.readFileSync('index.html'), 'utf8');

  response.send(buf.toString('utf8'));
});
*/

// Render homepage (note trailing slash): example.com/
//app.get('/', function(request, response) {
//  var data = fs.readFileSync('index.html').toString();
//  response.send(data);
//});


// language/es
/*app.get('/?lang=es', function(request, response) {
// response.render("homepage", {
    //    title: "From the body toward the light. Translation into Russian",
      //  lang: 'es'
    //});
   //response.redirect("/");
//});*/


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
