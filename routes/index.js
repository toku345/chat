
/*
 * GET home page.
 */

exports.index = function(req, res) {
  var User = require('../models/user'),
      user = new User({name: 'test'});
  var name = "";

  user.save();
  if (req.session.user) {
    name = req.session.user.name;
  }
  console.dir(req.session.user);
  res.render('index', { name: name });
};
