
var socket = io.connect('/');

console.dir(socket);

function chat(room, name) {
  socket.on('connected', function() {
    socket.json.emit('init', { room: room, name: name });
  });

  socket.on('message', function(data) {
    // if (data.commen) {
    //   update(data.comment);
    // }
    if (data) {
      update(data);
    }
  });
}

function send(room, name) {
  var data = $('#comment').val();

  // socket.json.send({ 'room': room, 'data': name + ": " + data });
  socket.emit('message_to', data);
  // socket.broadcast.to(room).emit('message_to', data);
  // update(name + ": " + data);

  $('#comment').val("");
  $('#comment').focus();
}

function update(data) {
  var obj = $(document.createElement('div'));
  obj.html(data);
  $('#view').append(obj);
}

// for AngularJS
function ChatCtrl($scope) {
  $scope.hoge = "this is a hoge messeage!";
};
