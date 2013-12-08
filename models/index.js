// TODO: create config file
var db = require('mongoose'),
  dbName = 'chat';

db.connect('mongodb://localhost/' + dbName);
db.connection.on('connected', function() {
  console.log('MongoDB connected');
});


module.exports = db;
