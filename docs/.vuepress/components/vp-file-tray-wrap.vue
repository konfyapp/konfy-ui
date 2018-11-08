<template lang='pug'>
vue-file-tray(ref="tray" @files:changed="updateTrayFiles" :accepted="['image/*','application/pdf']")
	.file(v-for="file in trayFiles")
		img(:src="file.thumbURL")
		.title {{file.file.type}}
</template>

<script>
export default {
	name: 'vp-file-tray-wrap',

	data(){
		return {
			trayFiles: null
		}
	},

	methods: {
		updateTrayFiles(){
			this.trayFiles = this.$refs.tray.files
		}
	}
}
</script>

<style scoped lang='stylus'>
.vue-file-tray
	background-color: rgba(black, .05)
	border: 1px solid  rgba(black, .2)
	width: 100%
	min-height: 200px
	cursor: pointer
	*
		pointer-events: none
	.file
		display: inline-block
		padding 10px
	img
		width: 80px
		height: auto
</style>
