<template>
    <div id="login"
         class="container">
        <chat-header :onlineUsersCount="onlineUsersCount"></chat-header>
        <div class="form-wrap">
            <div id="login-form" class="form-group">
                <label>昵称</label>
                <input type="text"
                       v-model="userName"
                       class="msg-input msg-sender">
                <button @click="login"
                        class="msg-send">登录</button>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import ChatHeader from '../components/ChatHeader.vue'
import {
    mapActions
} from 'vuex'

export default {
    name: 'LoginView',
    components: {
        ChatHeader
    },
    data() {
        return {
            userName: ''
        }
    },
    methods: {
        ...mapActions([
            'setCurrentUser'
        ]),
        login: function () {
            this.$socket.emit('setName', this.userName);
        }
    },
    sockets: {
        'setName': function (data) {
            if (data.success) {
                this.setCurrentUser({
                    user: {
                        userName: this.userName
                    }
                });
                if (this.$route.query.redirect) {
                    this.$router.push({
                        path: this.$route.query.redirect
                    });
                } else {
                    this.$router.push({
                        path: '/'
                    });
                }
            } else {
                alert(data.msg);
            }
        }
    }
}
</script>

<style>
#login {
    display: flex;
    flex-direction: column;
}

#login-form {
	margin: 0;
	flex: 1;
	padding: 10px;
	overflow: auto;
}
</style>
