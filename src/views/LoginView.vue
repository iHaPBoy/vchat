<template>
    <div id="login"
         class="container">
        昵称：
        <input type="text"
               v-model="userName">
        <button @click="login">登录</button>
    </div>
</template>

<script type="text/javascript">
import {
    mapActions
} from 'vuex'

export default {
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
    align-items: center;
    justify-content: center;
}
</style>
