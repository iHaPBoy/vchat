var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.send('<h1>vChat</h1>');
});

io.on('connection', function (socket) {
  console.log('a user connected');
  io.emit('chat-msg', {
    author: 'vChat',
    content: '有用户上线了!'
  });

  socket.on('chat-msg', function (msg) {
    io.emit('chat-msg', msg);
    console.log('message: ' + msg);
  });

  socket.on('disconnect', function () {
    console.log('a user disconnected');
    io.emit('chat-msg', {
      author: 'vChat',
      content: '有用户下线了!'
    });
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});