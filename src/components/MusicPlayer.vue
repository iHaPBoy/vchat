<template>
	<div class="music-player">
		<span v-if="error">{{ tips }}</span>
		<vue-aplayer :music="song"
		             :showlrc="showlrc"
		             v-if="!loading && !error"></vue-aplayer>
	</div>
</template>

<script>
import axios from 'axios'
import VueAplayer from 'vue-aplayer'
import { NETEASE_MUSIC_API_ROOT } from '../config.js'

export default {
	props: [
		'data'
	],
	components: {
		VueAplayer
	},
	data() {
		return {
			loading: true,
			error: false,
			tips: '音乐不存在',
			song: {
				title: '',
				author: '',
				url: '',
				pic: '',
				lrc: ''
			},
			showlrc: 0
		}
	},
	mounted() {
		// 查询音乐信息
		this.getMusicInfo();
	},
	methods: {
		getMusicInfo() {
			var self = this;
			axios.get(NETEASE_MUSIC_API_ROOT + '?types=musicInfo&id=' + self.data.musicId).then((response) => {
				if (response.data.songs.length > 0 && typeof (response.data.songs[0].mp3Url) !== undefined) {
					self.song.title = response.data.songs[0].name;
					self.song.author = response.data.songs[0].artists[0].name;
					self.song.url = response.data.songs[0].mp3Url.replace("http:\/\/m", "http://p");
					self.song.pic = response.data.songs[0].album.picUrl.replace("http:\/\/m", "http://p");
					self.loading = false;
					// axios.get(NETEASE_MUSIC_API_ROOT + '?types=lyric&id=' + self.data.musicId).then((response) => {
					// 	if (!response.data.uncollected && typeof (response.data.lrc.lyric) !== undefined) {
					// 		self.song.lrc = response.data.lrc.lyric;
					// 		self.showlrc = 1;
					// 		self.loading = false;
					// 	} else {
					// 		self.error = true;
					// 	}
					// })
				} else {
					self.error = true;
				}
			})
		}
	}
}
</script>

<style>
.aplayer-info {
	background-color: #fff;
}
</style>