<template lang="pug">
.vue-switch(:class="[{on: val}, {disabled: disabled}, {loading: loading}, size]" tabindex='0' @click='toggle' @keydown.space='toggle' @keydown.enter='toggle')
	input(type='hidden' :name='name' :value='val')
	.label(:class="{on: val}")
		slot(name='on' v-if='val')
		slot(name='off' v-if='!val')
</template>

<script>
export default {
	name: 'vue-switch',

	props: {
		on: {type: Boolean, default: false},
		name: String,
		size: {type: String, default: 'm'},
		disabled: Boolean,
		loading: Boolean
	},

	data() {
		return {
			value: null
		}
	},

	computed: {
		val(){
			if (this.value === null) return this.on
			else return this.value
		}
	},

	methods: {
		toggle(){
			if (this.disabled || this.loading) return
			else this.value = !this.val
			this.$emit('toggle', this.val)
		}
	}
}
</script>

<style lang="stylus" scoped>
$size-m = 18px
$size-s = 14px

.vue-switch
	--switch-color-on #2181FF
	--switch-color-off #BBB
	--switch-color-disabled #F3F3F3
  	box-sizing content-box
	display inline-block
	vertical-align middle
	position relative
	cursor pointer
	user-select none
	transition all .3s ease
	background-color var(--switch-color-off)
	border 1px solid var(--switch-color-off)
	margin 4px
	width $size-m * 2 + 2px
	height $size-m + 2px
	line-height $size-m + 2px
	border-radius $size-m + 2px
	&:after
		transition left .2s ease, width .2s ease
		width $size-m
		height $size-m
		border-radius $size-m
		content ''
		background-color white
		position absolute
		left 1px
		top 1px
		cursor pointer
	&:active:after
		width $size-m + 8px
	&.on:active:after
		left $size-m - 8px
	&.on:after
		left $size-m + 1px
	&:focus
		box-shadow 0 0 0 2px rgba(black .1)
		outline 0
	&:focus:hover
		box-shadow none
	&.on
		background-color var(--switch-color-on)
		border 1px solid var(--switch-color-on)
	&.disabled
		background-color var(--switch-color-disabled)
		border 1px solid var(--switch-color-disabled)
	&.disabled:after
		background-color var(--switch-color-off)
	&.loading
		&:before
			content ''
			position absolute
			z-index 9
			width $size-m - 8px
			height $size-m - 8px
			top 4px
			left 4px
			animation rotate 1s linear infinite
			border-radius 50%
			border-top 1px solid var(--switch-color-off)
			border-right 1px solid var(--switch-color-off)
			border-bottom 1px solid transparent
			border-left 1px solid transparent
		&.on:before
			border-color var(--switch-color-on) var(--switch-color-on) transparent transparent
			left $size-m + 4px
	.label
		width $size-m - 1px
	&.s
		width $size-s * 2 + 2px
		height $size-s + 2px
		line-height $size-s + 2px
		border-radius $size-s + 2px
		&:after
			width $size-s
			height $size-s
			border-radius $size-s
		&:active:after
			width $size-s + 8px
		&.on:active:after
			left $size-s - 8px
		&.on:after
			left $size-s + 1px
		&.loading:before
			width $size-s - 8px
			height $size-s - 8px
		&.loading.on:before
			left $size-s + 4px
		.label
			width $size-s - 1px
	&.l
		width $size-m * 2 + 16px
		height $size-m + 2px
		line-height $size-m + 2px
		border-radius $size-m + 2px
		&:after
			width $size-m
			height $size-m
			border-radius $size-m
		&:active:after
			width $size-m + 8px
		&.on:active:after
			left $size-m + 2px
		&.on:after
			left $size-m + 15px
		&.loading.on:before
			left $size-m + 16px
		.label
			width $size-m + 11px

.label
		color white
		font-size $size-m * 0.5
		position absolute
		right 1px
		left auto
		text-align center
		overflow hidden
		&.on
			right auto
			left 1px

@keyframes rotate
	0%
		transform rotate(0)
	100%
		transform rotate(360deg)
</style>
