
/*
 * GET home page.
 */

exports.index = function(req, res) {
  // var User = require('../models/user'),
  //     user = new User({name: 'test'});

  res.render('index', {});
};

exports.chat = function(req, res) {
  var name = "",
      room = "defualt";

  if (req.session.user) {
    name = req.session.user.name;
  }
  if (req.params.room_id) {
    room = req.params.room_id;
  }

  console.dir("name: " + name);
  console.dir("room: " + room);

  res.render('chat', { name: name, room: room });
  // res.render('jobseed_chat', { name: name, room: room });

};
