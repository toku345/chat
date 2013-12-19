var db = require('./index'),
  User = db.model('Users',   {
    name: { type: String, unique: true },
    password: String
  });

User.find(function(err, users) {
  if (err) { /* TODO handle err */ }
  if (users.length == 0) {
    // 初期データを突っ込む
    // まとめて１回で保存したいが、いい方法がわからないのでだれか実装して！
    var default_user = new User({ name: "sugar", password: "free" });
    default_user.save(function(err) {
      if (err) { /* TODO handle err */ }
      console.log("set defualt user");
    });

    default_user = new User({ name: "guest1", password: "guest1" });
    default_user.save(function(err) {
      if (err) { /* TODO handle err */ }
      console.log("set defualt user");
    });

    default_user = new User({ name: "guest2", password: "guest2" });
    default_user.save(function(err) {
      if (err) { /* TODO handle err */ }
      console.log("set defualt user");
    });

    default_user = new User({ name: "guest3", password: "guest3" });
    default_user.save(function(err) {
      if (err) { /* TODO handle err */ }
      console.log("set defualt user");
    });
  }
});

User.find(function(err, users) {
  console.log("users" + users);
});

module.exports = User;
