<template lang='pug'>
button.vue-button-alt(:class="type" @click="$emit('click')")
	slot
</template>

<script>
export default {
	name: 'vue-button-alt',

	props: {
		type: {
			type: String,
			default: 'float'
		}
	}
}
</script>

<style scoped lang='stylus'>

.vue-button-alt
	--vue-button-alt-color: blue

	display: inline-block
	vertical-align middle
	user-select none
.float
	font-size: .8rem
	line-height: 1rem
	padding: .5rem
	border: 1px solid transparent
	box-shadow: 0 2px 6px 0 rgba(black, .3)
	background: white
	color: var(--vue-button-alt-color)
	cursor: pointer
	font-family: inherit
	outline: none
	&:hover
		background-color: var(--vue-button-alt-color)
		color: white
.sink
	transition: all .2s ease
	font-size: .8em
	line-height: 1em
	padding: .5em
	border-radius: 3px
	border: 1px solid var(--vue-button-alt-color)
	background: transparent
	color: var(--vue-button-alt-color)
	cursor: pointer
	font-family: inherit
	outline: none
	&:hover
		background-color: white
		color: var(--vue-button-alt-color)
		border: 1px solid white
		box-shadow: 0 1px 3px 0 rgba(black, .3)
</style>
