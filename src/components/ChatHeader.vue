<template>
	<div class="chat-header">
		<h1>vChat</h1>
	</div>
</template>

<style scoped>
.chat-header {
	height: 50px;
	width: 100%;
	border-bottom: 1px solid rgba(184, 197, 214, .2);
	background: #fff;
}

h1 {
	text-align: center;
	font-weight: 200;
	color: #313131;
	font-size: 24px;
	line-height: 50px;
}

@media screen and (max-width: 640px) {
	h1 {
		font-size: 20px;
	}
}
</style>