// TODO: create config file
var mongoose = require('mongoose');
var dbName = 'chat';

var db = mongoose.connect('mongodb://localhost:27017/' + dbName);
db.connection.on('connected', function() {
  console.log('MongoDB connected');
});


module.exports = db;
