
/*
 * GET home page.
 */

exports.index = function(req, res) {
  var User = require('../models/user'),
      user = new User({name: 'test'});

  user.save();
  res.render('index', {});
};

