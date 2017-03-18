var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

function sendBroadcastMsg(msgType, msgSender, msgContent) {
  var msgObj = {
    msgHeader: {
      sendType: 'broadcast',
      msgType
    },
    msgBody: {
      msgSender,
      msgContent,
      msgDatetime: new Date()
    }
  }
  io.emit('chat-msg', msgObj);
}

app.get('/', function (req, res) {
  res.send('<h1>vChat</h1>');
});

io.on('connection', function (socket) {
  console.log('a user connected');
  // 广播: 有用户上线
  sendBroadcastMsg('system', 'vChat', '有用户上线啦!');
  io.clients(function (error, clients) {
    if (error) throw error;
    console.log('online user count: ' + clients.length);
    // 广播: 在线人数
    sendBroadcastMsg('status', 'onlineUsersCount', clients.length);
  });

  // 聊天消息
  socket.on('chat-msg', function (msg) {
    console.log('new message: ' + msg.sender + ' / ' + msg.content);
    // 广播: 聊天消息
    sendBroadcastMsg('message', msg.sender, msg.content);
  });

  // 用户下线
  socket.on('disconnect', function () {
    console.log('a user disconnected');
    // 广播: 有用户下线
    sendBroadcastMsg('system', 'vChat', '有用户下线啦!');
    io.clients(function (error, clients) {
      if (error) throw error;
      console.log('online user count: ' + clients.length);
      // 广播: 在线人数
      sendBroadcastMsg('status', 'onlineUsersCount', clients.length);
    });
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});