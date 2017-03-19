<template>
	<div class="sendbox">
		<transition name="fade">
			<form class="msg-form"
			      v-show="!tips"
			      @submit.prevent="sendMsg">
				<input class="msg-input msg-sender"
				       type="text"
				       placeholder="昵称"
				       ref="senderInput"
				       v-model="sender" />
				<i class="line"></i>
				<input class="msg-input msg-message"
				       v-model="message"
				       placeholder="在此输入信息"
				       ref="messageInput" />
				<button class="msg-send">发送</button>
			</form>
		</transition>
		<transition name="fade">
			<div class="tips"
			     v-show="tips">
				{{ tips }}
			</div>
		</transition>
	</div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
	data: function () {
		return {
			sender: '',
			message: '',
			tips: ''
		}
	},
	methods: {
		...mapActions([
			'setCurrentUser'
		]),
		sendMsg: function () {
			if (this.sender == '') {
				this.tips = '请输入昵称';
				setTimeout(() => { this.tips = '' }, 1000);
			} else if (this.message == '') {
				this.tips = '请输入内容';
				setTimeout(() => { this.tips = '' }, 1000);
			} else {

				// send socket
				var msg = {
					sender: this.sender,
					content: this.message
				}
				this.$socket.emit('chat-msg', msg);

				// clear msg input
				this.message = '';
			}
		}
	},
	mounted() {
		// getCurrentUser
		if (localStorage.getItem('currentUser')) {
			this.sender = JSON.parse(localStorage.getItem('currentUser')).userName;
		}

		// Focus
		if (this.sender == '') {
			this.$refs.senderInput.focus();
		} else {
			this.$refs.messageInput.focus();
		}
	},
	watch: {
		sender(to, from) {
			// setCurrentUser
			this.setCurrentUser({ user: { userName: to } });
		}
	}
}
</script>
<style scoped>
.sendbox {
	height: 50px;
	width: 100%;
	background: #fff;
	padding: 8px;
	border-top: 1px solid rgba(184, 197, 214, .2);
}

.msg-form {
	width: 100%;
	display: flex;
}

.msg-input {
	color: #5f5f5f;
	border: 0;
	padding: 0 8px;
	font-size: 12px;
	outline: none;
	text-align: center;
	line-height: 32px;
	border-radius: 3px;
	margin: 0 6px;
}

.msg-input:hover,
.msg-input:focus {
	background-color: rgba(184, 197, 214, .1);
}

.msg-sender {
	width: 70px;
	margin-left: 0;
	font-weight: 500;
	color: #555;
}

.line {
	display: block;
	border-right: 1px solid rgba(184, 197, 214, .2);
}

.msg-message {
	flex-grow: 1;
}

.msg-send {
	width: 60px;
	color: #313131;
	padding: 0;
	outline: none;
	background: #fff;
	border: 1px solid #eaeaea;
	border-radius: 16px;
	line-height: 32px;
}

.msg-send:hover {
	border: 1px solid #0f88eb;
	color: #0f88eb;
}

.tips {
	color: #5f5f5f;
	height: 50px;
	width: 100%;
	left: 0;
	text-align: center;
	line-height: 50px;
	position: absolute;
	bottom: 0;
	background-color: rgba(184, 197, 214, .1);
	z-index: 999;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity .5s
}

.fade-enter,
.fade-leave-active {
	opacity: 0
}
</style>