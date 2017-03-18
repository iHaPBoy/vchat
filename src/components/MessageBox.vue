<template>
	<div id="msg-box"
	     class="msg-box"
	     v-auto-bottom>
		<div class="msg-item"
		     v-for="msg in msgs"
		     track-by="$index">{{ msg.author }}: {{ msg.content }}</div>
	</div>
</template>

<script>
export default {
	props: ['msgs']
}
</script>

<style scoped>
.msg-box {
	list-style-type: none;
	margin: 0;
	height: 100%;
	padding: 60px 10px;
	overflow: auto;
}

.msg-box .msg-item {
	padding: 10px 10px;
	border-radius: 4px;
	color: #5f5f5f;
}

.msg-box .msg-item:nth-child(odd) {
	background: rgba(184, 197, 214, .1);
}
</style>