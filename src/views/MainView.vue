<template>
    <div id="chat"
         class="container">
        <chat-header :onlineUsersCount="onlineUsersCount"></chat-header>
        <message-box :msgs="messages"></message-box>
        <send-box></send-box>
    </div>
</template>

<script>
import ChatHeader from '../components/ChatHeader.vue'
import MessageBox from '../components/MessageBox.vue'
import SendBox from '../components/SendBox.vue'
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
    name: 'MainView',
    components: {
        ChatHeader,
        MessageBox,
        SendBox
    },
    data() {
        return {
            // messages: [{
            //     sender: '>.<',
            //     content: 'Welcome to vChat!',
            //     datetime: new Date()
            // }],
            onlineUsersCount: 0
        }
    },
    methods: {
        ...mapActions([
            'addMessage'
        ]),
        neteaseMusicFilter(msg) {
            // 判断是否包含网易云音乐网址
            if (/music\.163\.com\/.*song\?id=\d+/.test(msg.content)) {
                // 提取音乐 id
                const musicId = msg.content.match(/id=\d+/)[0].replace('id=', '');

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
        'chatMsg': function (msg) {
            // 验证消息类型
            if (msg.msgHeader.msgType === 'message' || msg.msgHeader.msgType === 'system') {

                // 如果是自己发送的消息，返回
                if (this.currentUser && this.currentUser.userName === msg.msgBody.msgSender) {
                    return;
                }

                // 解析数据
                let message = {};
                message.sender = msg.msgBody.msgSender;
                message.content = msg.msgBody.msgContent;
                message.datetime = msg.msgBody.msgDatetime;

                // 网易云音乐解析
                message = this.neteaseMusicFilter(message);

                // 加入消息数组
                this.addMessage({
                    message
                });

                // 发送聊天消息通知
                if (msg.msgHeader.msgType === 'message') {
                    const notification = new Notification("您有新的消息", {
                        body: message.sender + ': ' + message.content
                    });
                    notification.onshow = function () {
                        setTimeout(notification.close.bind(notification), 3000);
                    }
                }
            } else if (msg.msgHeader.msgType === 'status') {
                // 解析数据
                if (msg.msgBody.msgSender === 'onlineUsersCount') {
                    // 更新在线人数
                    this.onlineUsersCount = msg.msgBody.msgContent;
                }
            }
        }
    },
    computed: {
        ...mapGetters([
            'currentUser',
            'messages'
        ])
    }
}
</script>

<style>
#chat {
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
