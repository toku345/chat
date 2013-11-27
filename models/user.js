var db = require('./index'),
  User = db.model('Users',   {
    name: String
  });

module.exports = User;
