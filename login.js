// テスト用データ
var User = require('./models/user');

module.exports = function(req, res, next) {
  var method = req.method.toLowerCase(); // メソッド名をキャッシュしておく
  var user   = req.body.user;
  var logout = (method === 'delete');
  var login  = (method === 'post' && user);

  routes = req.app.routes[method];

  if (!routes) { next(); return; }
  if (login || logout) {
    routes.forEach(function(route) {
      if (!(req.url.match(route.regexp))) {
        req.method = 'GET';
      }
    });
  }
  if (logout) {
    delete req.session.user;
    res.redirect('/');
  }
  if (login) {
    validate(user, function(err) {
      // console.log("in validete() - err: " + err);
      if (!err) {
        req.session.user = {
          name: user.name
          // pwd:  user.pwd
        };
      }else {
        req.flash('error', err.msg);
        req.url = '/';
      }
      next();
    });
  }else {
    if (!req.session.user) { req.url = '/'; }
    next();
  }
};

function validate(user, cb) {
  User.findOne({ name: user.name, password: user.pwd }, function(err, user) {
    var valid = false;
    if (err) { /* TODO handle err */ }
    if (user) {
      console.log("user: " + user);
      valid = true;
    }else {
      // console.log("no user!");
    }
    cb((!valid && { msg: 'ログイン情報に誤りがあります。' }));
  });
}
