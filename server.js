let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let userSessions = [];

function sendMsg(socket, sendType, msgType, msgSender, msgContent) {
  let msgObj = {
    msgHeader: {
      sendType,
      msgType
    },
    msgBody: {
      msgSender,
      msgContent,
      msgDatetime: new Date()
    }
  };
  socket.emit('chatMsg', msgObj);
}

function findSessionBySocketId(socketId) {
  for (let i = 0; i < userSessions.length; i++) {
    if (userSessions[i].socketId === socketId) {
      return userSessions[i];
    }
  }
  return undefined;
}

function findSessionByName(name) {
  for (let i = 0; i < userSessions.length; i++) {
    if (userSessions[i].name === name) {
      return userSessions[i];
    }
  }
  return undefined;
}

function removeSessionBySocketId(socketId) {
  for (let i = 0; i < userSessions.length; i++) {
    if (userSessions[i].socketId === socketId) {
      userSessions.splice(i, 1);
    }
  }
}

app.get('/', function (req, res) {
  res.send('<h1>vChat</h1>');
});

io.on('connection', function (socket) {
  // 设置昵称 setName
  socket.on('setName', function (name) {
    console.log('[SESSION] setName: ' + socket.id + ', ' + name);
    let session = findSessionByName(name);
    if (session && session.socketId !== socket.id) {
      socket.emit('setName', {success: 0, msg: '昵称已经被使用'});
    } else {
      findSessionBySocketId(socket.id).name = name;
      socket.emit('setName', {success: 1, msg: '昵称设置成功'});
    }
  });

  // 私聊 sayTo
  socket.on('sayTo', function (data) {
    // sender is exists
    if (findSessionByName(data.sender)) {
      let toSession;
      if (toSession = findSessionByName(data.to)) {
        let toSocket;
        if (toSocket = io.sockets.sockets[toSession.socketId]) {
          sendMsg(toSocket, 'private', 'message', data.sender, data.content);
          console.log('[MSG] PRIVATE: [' + data.sender + '] to [' + data.to + '] : ' + data.content);
        }
      }
    }
  });

  // 广播聊天消息 chatMsg
  socket.on('chatMsg', function (data) {
    // sender is exists
    if (findSessionByName(data.sender)) {
      // 广播: 聊天消息
      sendMsg(io, 'broadcast', 'message', data.sender, data.content);
      console.log('[MSG] BROADCAST: [' + data.sender + '] : ' + data.content);
    }
  });

  // 有用户上线 - 广播在线人数
  io.clients(function (error, clients) {
    if (error) throw error;
    userSessions.push({socketId: socket.id});
    console.log('[SESSION] ADD SESSION: ' + socket.id);
    sendMsg(io, 'broadcast', 'status', 'onlineUsersCount', clients.length);
    console.log('[STATUS] BROADCAST: [onlineUsersCount] : ' + clients.length);
  });

  // 用户下线 - 广播在线人数
  socket.on('disconnect', function () {
    io.clients(function (error, clients) {
      if (error) throw error;
      removeSessionBySocketId(socket.id);
      console.log('[SESSION] REMOVE SESSION: ' + socket.id);
      sendMsg(io, 'broadcast', 'status', 'onlineUsersCount', clients.length);
      console.log('[STATUS] BROADCAST: [onlineUsersCount] : ' + clients.length);
    });
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});