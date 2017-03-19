<template>
	<div id="msg-box"
	     class="msg-box"
	     v-auto-bottom>
		<div class="msg-item"
		     v-bind:class="{ 'msg-item-active': msg.self }"
		     v-for="msg in msgs"
		     track-by="$index">
			<div class="msg-item-content-wrap">
				<div class="msg-item-content">
					<span class="msg-item-sender">{{ msg.sender }}: </span> {{ msg.content }}
					<div :is="msg.extension.component"
					     :data="msg.extension.data"
					     v-if="msg.extension"></div>
				</div>
			</div>
			<div class="msg-item-datetime">{{ msg.datetime | moment('HH:mm') }}</div>
		</div>
	</div>
</template>

<script>
import MusicPlayer from './MusicPlayer.vue'

export default {
	props: ['msgs'],
	components: {
		MusicPlayer
	}
}
</script>

<style scoped>
.msg-box {
	list-style-type: none;
	margin: 0;
	flex: 1;
	padding: 10px;
	overflow: auto;
}

.msg-item {
	padding: 10px 10px;
	border-radius: 4px;
	color: #313131;
	line-height: 1.4em;
	border: 1px solid rgba(184, 197, 214, .1);
}

.msg-item+.msg-item {
	margin-top: 10px;
}

.msg-item:after {
	display: block;
	content: "";
	clear: both;
}

.msg-item-active {
	background: rgba(184, 197, 214, .1);
	border: none;
}

.msg-item-sender {
	font-weight: 600;
	color: #555;
}

.msg-item-content-wrap {
	float: left;
	margin-right: -50px;
	width: 100%;
}

.msg-item-content {
	word-break: break-all;
	text-align: justify;
	margin-right: 50px;
}

.msg-item-datetime {
	width: 40px;
	float: right;
	color: #5f5f5f;
}
</style>