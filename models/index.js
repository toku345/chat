// TODO: create config file
var db = require('mongoose'),
  dbName = 'chat';

db.connect('mongodb://localhost/' + dbName);

module.exports = db;
