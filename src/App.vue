<template>
  <div id="app">
    <div id="chat">
      <chat-header></chat-header>
      <message-box :msgs="messages"></message-box>
      <send-box></send-box>
    </div>
  </div>
</template>

<script>
import ChatHeader from './components/ChatHeader.vue'
import MessageBox from './components/MessageBox.vue'
import SendBox from './components/SendBox.vue'

export default {
  name: 'app',
  components: {
    ChatHeader, MessageBox, SendBox
  },
  data() {
    return {
      messages: [
        { author: '>.<', content: 'Welcome to vChat!' }
      ]
    }
  },
  sockets: {
    'chat-msg': function (msg) {
      this.messages.push(msg);
    }
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
