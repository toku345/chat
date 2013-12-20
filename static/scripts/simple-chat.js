
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

  socket.emit('message_to', data);

  $('#comment').val("");
  $('#comment').focus();
}

function update(data) {
  var obj = $(document.createElement('li'));
  obj.addClass("message");
  obj.text(data);
  $('#messages').append(obj);
}
