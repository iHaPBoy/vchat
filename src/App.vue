<template>
  <div id="app">
    <div id="chat">
      <chat-header :onlineUsersCount="onlineUsersCount"></chat-header>
      <message-box :msgs="messages"></message-box>
      <send-box></send-box>
    </div>
  </div>
</template>

<script>
import ChatHeader from './components/ChatHeader.vue'
import MessageBox from './components/MessageBox.vue'
import SendBox from './components/SendBox.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    ChatHeader, MessageBox, SendBox
  },
  data() {
    return {
      messages: [
        { sender: '>.<', content: 'Welcome to vChat!', datetime: new Date() }
      ],
      onlineUsersCount: 0
    }
  },
  methods: {
    neteaseMusicFilter(msg) {
      // 判断是否包含网易云音乐网址
      if (/music\.163\.com\/.*song\?id=\d+/.test(msg.content)) {
        // 提取音乐 id
        var musicId = msg.content.match(/id=\d+/)[0].replace('id=', '');

        // 更新消息体
        msg.content = '分享了一首音乐';
        msg.extension = {
          component: 'music-player',
          data: {
            musicId
          }
        }
      }
      return msg;
    }
  },
  sockets: {
    'chat-msg': function (msg) {
      // 验证消息类型
      if (msg.msgHeader.msgType == 'message' || msg.msgHeader.msgType == 'system') {
        // 解析数据
        var message = {};
        message.self = this.currentUser && this.currentUser.userName == msg.msgBody.msgSender ? true : false;
        message.sender = msg.msgBody.msgSender;
        message.content = msg.msgBody.msgContent;
        message.datetime = msg.msgBody.msgDatetime;

        // 网易云音乐解析
        message = this.neteaseMusicFilter(message);

        // 加入消息数组
        this.messages.push(message);

        // 发送聊天消息通知
        if (msg.msgHeader.msgType == 'message') {
          if (!message.self) {
            var notification = new Notification("您有新的消息", {
              body: message.sender + ': ' + message.content
            });
            notification.onshow = function () {
              setTimeout(notification.close.bind(notification), 3000);
            }
          }
        }
      } else if (msg.msgHeader.msgType == 'status') {
        // 解析数据
        if (msg.msgBody.msgSender == 'onlineUsersCount') {
          // 更新在线人数
          this.onlineUsersCount = msg.msgBody.msgContent;
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

body {
  font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
}

#chat {
  width: 440px;
  height: 500px;
  position: relative;
  border: 1px solid rgba(184, 197, 214, .2);
  box-shadow: 0 1px 4px rgba(0, 0, 0, .04);
  background: #fff;
  border-radius: 4px;
  margin: 20px auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 640px) {
  body {
    display: block;
  }
  #app {
    height: 100%;
  }
  #chat {
    width: 100%;
    height: 100%;
    margin: 0;
  }
}
</style>
