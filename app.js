
/**
 * Module dependencies.
 */

var express = require('express'),
  path = require('path'),
  http = require('http'),
  app = createApp(),
  server = http.createServer(app),
  routes = require('./routes');


function createApp() {
  var app = express(),
    swig = require('swig'),
    flash = require('connect-flash');

  app.set('port', process.env.PORT || 3000);
  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  app.set('views', path.join(__dirname, 'templates'));

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());

  app.use(express.cookieParser('koobkooCedoN')); // 適当な値
  app.use(express.session());

  app.use(flash());
  app.use(require('./login'));
  app.use(function(req, res, next) {
    res.locals.user  = req.session.user;
    res.locals.flash = req.flash();
    next();
  });

  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'static')));

  // development only
  if ('development' === app.get('env')) {
    app.use(express.errorHandler());
  }

  return app;
};

app.get('/', routes.index);
app.post('/', routes.index);
app.del('/', routes.index);
app.get('/:page', routes.index);

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
