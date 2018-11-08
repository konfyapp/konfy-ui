<template lang='pug'>
button.vue-button(
	tabindex="0"
	:state="state"
	:class="state"
	@click="onClick()"
	@keyup.enter="onClick()"
	)
	slot
</template>

<script>
export default {
	name: 'vue-button',
	props: {
		state: String // disabled, processing, done, failed.
	},
	methods: {
		onClick(){
			this.$emit('click', `${this.state}`)
		}
	}
}
</script>

<style scoped lang='stylus'>
.vue-button
	--vue-button-bg-grad: linear-gradient(180deg, rgba(white, 0.25) 0%, transparent 100%)
	--vue-button-color: #007AFF
	--vue-button-color-disabled: #DDD
	--vue-button-color-processing: rgba(#007AFF, .7)
	--vue-button-color-done: #2DE185
	--vue-button-color-failed: #EC4B68
	--vue-button-text-color: white
	user-select none
	font-size: .8em
	text-transform: uppercase
	font-weight: 700
	color: var(--vue-button-text-color)
	background: var(--vue-button-bg-grad), var(--vue-button-color)
	border: 1px solid var(--vue-button-color)
	box-sizing: border-box
	box-shadow: 0px 1px 4px rgba(black, .4)
	border-radius: 5px
	text-align: center
	padding: .75em
	line-height: 1.2em
	transition: all .2s ease
	cursor: pointer
	outline: none
	transition .2s all ease
	&:hover, &:focus
		box-shadow: 0 5px 12px rgba(black, .3)
	&[state=processing], &:active
		box-shadow: none
		background: var(--vue-button-color-processing)
		border: 1px solid transparent
		cursor: auto
	&[state=done]
		box-shadow: none
		background: var(--vue-button-color-done)
		border: 1px solid var(--vue-button-color-done)
		cursor: auto
	&[state=failed]
		box-shadow: none
		background: var(--vue-button-color-failed)
		border: 1px solid var(--vue-button-color-failed)
		cursor: auto
	&[state=disabled]
		box-shadow: none
		background: var(--vue-button-color-disabled)
		border: 1px solid var(--vue-button-color-disabled)
		cursor: not-allowed
		color: rgba(black, .3)
</style>
