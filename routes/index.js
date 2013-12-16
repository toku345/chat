
/*
 * GET home page.
 */

exports.index = function(req, res) {
  var User = require('../models/user'),
      user = new User({name: 'test'});
  var name = "",
      room = "defualt";

  user.save();
  if (req.session.user) {
    name = req.session.user.name;
  }
  if (req.params.room_id) {
    room = req.params.room_id;
  }

  console.dir("name: " + name);
  console.dir("room: " + room);

  res.render('index', { name: name, room: room });
};
