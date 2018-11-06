<template lang="pug">
.vp-holder
	Badge(:text="text" type="warn")
	.comps
		slot
</template>

<script>
export default {
	name: 'vp-holder',

	props: {
		text: {type: String, default: 'EXAMPLES'}
	}
}
</script>

<style lang="stylus" scoped>
.vp-holder
	padding 3rem 0
	margin 1rem auto
	position relative
.comps
	margin-top 2rem
</style>
