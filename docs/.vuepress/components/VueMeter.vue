<template lang='pug'>
svg.vue-meter(
	shape-rendering='geometricPrecision'
	version='1.1' xmlns='http://www.w3.org/2000/svg'
	:width="2 * parseInt(r) + parseInt(s)"
	:height="2 * parseInt(r) + parseInt(s)"
	:viewport="`0 0 ${r} ${r}`"
	)
	circle.bg(
		:r="r"
		:cx="parseInt(r) + parseInt(s)/2"
		:cy="parseInt(r) + parseInt(s)/2"
		fill='transparent'
		:stroke="bg"
		:stroke-width="s"
		:stroke-dasharray="l"
		stroke-dashoffset="0"
		)
	circle.bar(
		:r="r"
		:cx="parseInt(r) + parseInt(s)/2"
		:cy="parseInt(r) + parseInt(s)/2"
		fill='transparent'
		:stroke="color"
		:stroke-width="s"
		:stroke-dasharray='l'
		:style="{strokeDashoffset: portion + 'px'}"
		)
	text(v-if="num" x="50%" y="50%" text-anchor="middle") {{percent + '%'}}
	text(v-else x="50%" y="50%" text-anchor="middle")
		slot
</template>

<script>
export default {
	name: 'vue-meter',

	props: {
		num: {
			type: Boolean,
			default: false
		},
		percent: {
			type: Number,
			default: 0
		},
		r: {
			type: Number,
			default: 20
		},
		s: {
			type: Number,
			default: 5
		},
		bg: {
			type: String,
			default: 'rgba(0, 0, 0, 0.1)'
		},
		color: {
			type: String,
			default: 'blue'
		},
	},

	computed: {
		l(){ return Math.PI * (this.r * 2) },
		portion(){ return ( ( 100 - this.percent ) / 100 ) * this.l },
	}
}
</script>

<style scoped lang='stylus'>
circle.bg
	stroke-dashoffset: 0
circle.bar
	transition stroke-dashoffset .3s ease
	transform rotate(-90deg)
	transform-origin center
text
	font-size .75rem
	line-height 1em
	transform translateY(.25em)
</style>
