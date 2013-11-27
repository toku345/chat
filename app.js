
/**
 * Module dependencies.
 */

var express = require('express'),
  path = require('path'),
  http = require('http'),
  app = createApp(),
  server = http.createServer(app);

function createApp() {
  var app = express();

  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'swig');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'static')));

  // development only
  if ('development' === app.get('env')) {
    app.use(express.errorHandler());
  }

  return app;
};

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
