<template>
  <div id="login" class="container">
    <chat-header :showCount="false"></chat-header>
    <div id="login-form">
      <div class="title">
        <h2>登录</h2>
      </div>
      <div class="form-wrap">
        <div class="form-group">
          <label>
            帐号 <input type="text" v-model="userName" class="form-control">
          </label>
        </div>
        <div class="form-group">
          <label>
            密码 <input type="password" v-model="password" class="form-control">
          </label>
        </div>
        <div class="button-group">
          <button @click="login" class="btn">登录</button>
        </div>
      </div>
      <div class="link">
        <router-link to="/reg">还没有帐号？</router-link>
      </div>
    </div>
  </div>
</template>

<script>
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
        userName: '',
        password: ''
      }
    },
    computed: {
      user() {
        return {
          userName: this.userName.trim(),
          password: atob(this.password)
        }
      }
    },
    methods: {
      ...mapActions([
        'setCurrentUser'
      ]),
      login: function () {
        if (this.userName === '') {
          alert('请输入帐号');
          return;
        }
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

  @media screen and (max-width: 640px) {
    #login {
      width: 100%;
      height: 100%;
      margin: 0;
    }
  }

  #login-form {
    margin: 0;
    flex: 1;
    padding: 10px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #login-form .title h2 {
    text-align: center;
    font-weight: 200;
    color: #313131;
    font-size: 24px;
    line-height: 48px;
    margin-bottom: 10px;
  }

  .form-group label {
    display: block;
    color: #5f5f5f;
    font-size: 12px;
    text-align: right;
    padding: 2px;
  }

  .form-control {
    color: #5f5f5f;
    border: 0;
    padding: 6px 8px;
    font-size: 12px;
    outline: none;
    border-radius: 3px;
    margin: 6px;
    margin-right: 0;
    line-height: 18px;
    height: 30px;
    background-color: rgba(184, 197, 214, .1);
  }

  .form-control:hover,
  .form-control:focus {
    background-color: rgba(184, 197, 214, .1);
  }

  .button-group {
    margin-top: 16px;
  }

  .link {
    margin: 32px 0 16px;
  }
</style>
