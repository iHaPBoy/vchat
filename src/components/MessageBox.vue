<template>
	<div id="msg-box"
	     class="msg-box"
	     v-auto-bottom>
		<div class="msg-item"
		     v-bind:class="{ 'msg-item-active': msg.self }"
		     v-for="msg in getMsgs"
		     track-by="$index">
			<div class="msg-item-content">
				<span class="msg-item-sender">{{ msg.sender }}: </span> {{ msg.content }}
				<div v-html="msg.extension"
				     v-show="msg.extension"></div>
			</div>
			<div class="msg-item-datetime">{{ msg.datetime | moment('HH:mm') }}</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['msgs'],
	computed: {
		getMsgs() {
			var self = this;
			this.msgs.forEach(function (item, index, array) {
				// 判断是否包含网易云音乐网址
				if (/music\.163\.com\/\#\/song\?id=\d+/.test(item.content)) {

					// 提取音乐 id
					var musicId = item.content.match(/id=\d+/)[0].replace('id=', '');

					// 显示音乐
					self.msgs[index].content = '分享了一首音乐';
					self.msgs[index].extension = '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=298 height=52 src="//music.163.com/outchain/player?type=2&id=' + musicId + '&auto=0&height=32"></iframe>';
				}
			})
			return this.msgs;
		}
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

.msg-item-content {
	float: left;
	word-break: break-all;
	text-align: justify;
}

.msg-item-datetime {
	width: 40px;
	float: right;
	color: #5f5f5f;
}
</style>