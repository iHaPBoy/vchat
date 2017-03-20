<template>
	<div class="sendbox">
		<transition name="fade">
			<form class="msg-form"
			      v-if="!tips"
			      @submit.prevent="sendMsg">
				<input class="msg-input msg-sender"
				       type="text"
				       placeholder="昵称"
				       ref="senderInput"
				       v-model="sender" />
				<div class="line"></div>
				<textarea class="msg-input msg-message"
				          maxlength="300"
				          v-auto-height
				          v-model="message"
				          placeholder="在此输入信息"
				          @keydown.enter.prevent.stop="sendMsg"
				          ref="messageInput"></textarea>
				<button class="msg-send">发送</button>
			</form>
			<div v-else
			     class="tips">
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
	directives: {
		autoHeight: function (el) {
			setTimeout(function () {
				el.style.height = '30px';
				el.style.height = el.scrollHeight + 'px';
			}, 0);
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
	height: auto;
	width: 100%;
	background: #fff;
	padding: 8px;
	border-top: 1px solid rgba(184, 197, 214, .2);
	min-height: 47px;
}

.msg-form {
	width: 100%;
	display: flex;
	align-items: flex-end;
}

.msg-input {
	color: #5f5f5f;
	border: 0;
	padding: 6px 8px;
	font-size: 12px;
	outline: none;
	border-radius: 3px;
	margin: 0 6px;
	line-height: 18px;
	height: 30px;
}

.msg-input:hover,
.msg-input:focus {
	background-color: rgba(184, 197, 214, .1);
}

.msg-sender {
	width: 65px;
	margin-left: 0;
	font-weight: 500;
	color: #555;
	text-align: center;
}

.line {
	display: block;
	width: 1px;
	height: 26px;
	margin: 2px 0;
	background: rgba(184, 197, 214, .2);
}

.msg-message {
	flex-grow: 1;
	resize: none;
	overflow: hidden;
	word-break: break-word;
}

.msg-send {
	width: 60px;
	color: #313131;
	padding: 0;
	outline: none;
	background: #fff;
	border: 1px solid #eaeaea;
	border-radius: 16px;
	line-height: 30px;
	height: 30px;
}

.msg-send:hover {
	border: 1px solid #0f88eb;
	color: #0f88eb;
}

.tips {
	color: #5f5f5f;
	height: 47px;
	width: 100%;
	left: 0;
	text-align: center;
	line-height: 47px;
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