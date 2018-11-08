<template lang='pug'>
.vue-button-group
	input(type="hidden", :name="name", :value="inputValue")
	.info {{info}}
	.options(v-if="options.length")
		.buttons(:class="{equal: equal}")
			button.button(
				v-for="option of computedOptions",
				@click="select(option.value)",
				:selected="value === option.value || values.includes(option.value)" ) {{option.label}}
	.notice
		span(v-if="!valid") {{error}}
</template>

<script>
export default {
	name: 'vue-button-group',
	data() {
		return {
			value: null,
			values: [],
			label: null,
			valid: true
		}
	},
	props: {
		name: String,
		info: String,
		options: {type: Array, default() {return []}},
		equal: {type: Boolean, default: false},
		required: { type: Boolean, default: false },
		clearButton: {type: Boolean, default: false},
		default: {default: null},
		clearLabel: {default: '×'},
		error: {default: 'Choose one option'},
		multiple: Boolean
	},
	computed: {
		inputValue(){
			if (this.values.length) return JSON.stringify(this.values)
			else return JSON.stringify(this.value)
		},

		computedOptions() {
			return this.options.map( o => {
				if (typeof o !== 'object') return {value: o, label: o}
				else return o
			})
		},
	},
	methods: {
		select(option) {
			// prevent selecting non existing option
			const exists = this.computedOptions.find( o => o.value === option )
			if (!exists) return
			if (!this.multiple) {
				if (this.value === option && !this.required) this.value = null
				else this.value = option
			}
			else {
				// is already selected
				const index = this.values.indexOf(option)
				if (index !== -1) this.values.splice(index, 1)
				else this.values.push(option)
			}
			this.validate()
			this.$emit('value:change', option)
		},
		clear() {
			this.value = null
			this.values = []
			this.$emit('value:change', this.value)
		},
		validate() {
			const hasValue = (this.value !== null && this.value !== undefined)
			const hasValues = this.values.length !== 0
			if (this.required && !hasValue && !hasValues) this.valid = false
			else this.valid = true
			return this.valid
		}
	},
	mounted() {
		this.select(this.default)
	}
}
</script>

<style scoped lang='stylus'>
	.vue-button-group
		// color
		--vue-button-group-text-off: rgba(black, .7)
		--vue-button-group-text-hover: black
		--vue-button-group-text-on: white
		// border
		--vue-button-group-border-color: rgba(black, .2)
		--vue-button-group-border-color-hover: rgba(black, .2)
		--vue-button-group-border-color-active: rgba(black, .2)
		--vue-button-group-border-radius: 3px
		// background
		--vue-button-group-bg: white
		--vue-button-group-bg-hover: transparent
		--vue-button-group-bg-active: rgba(black, .2)
		--vue-button-group-selected: #007AFF
		// shadow
		--vue-button-group-shadow: 0 1px 5px 0 rgba(black, .3)
		--m2-error-color: #EC4B68

		font-size: 1em
		width 100%

	.info, .notice
		font-size .8em
		line-height 1.25em
		min-height 1.25em
		width 100%
		font-style italic
	.notice
		color var(--m2-error-color)
	.options
		width 100%
		display flex
		align-items center
	.buttons
		display flex
		border-radius var(--vue-button-group-border-radius)
		background var(--vue-button-group-bg)
		box-shadow var(--vue-button-group-shadow)
		&.equal
			width calc(100% - 1px)
			.button
				flex 1
	.button
		cursor pointer
		user-select none
		outline none
		display flex
		min-height 2.22222em
		min-width 3em
		text-align center
		justify-content center
		align-items center
		font-size .9em
		line-height 1.11111em
		color var(--vue-button-group-text-off)
		border 1px solid transparent
		border-left 1px solid var(--vue-button-group-border-color)
		background-color var(--vue-button-group-bg)
		&:first-of-type
			margin-left 0
			border-left 1px solid transparent
			border-top-left-radius: var(--vue-button-group-border-radius)
			border-bottom-left-radius: var(--vue-button-group-border-radius)
		&:last-of-type
			border-top-right-radius: var(--vue-button-group-border-radius)
			border-bottom-right-radius: var(--vue-button-group-border-radius)
			margin-right 0
		&:hover, &:focus
			color var(--vue-button-group-text-hover)
			background-color var(--vue-button-group-bg-hover)
		&[selected]
			color var(--vue-button-group-text-on)
			background-color var(--vue-button-group-selected)
			border-left 1px solid var(--vue-button-group-border-color-active)
			border-right 1px solid var(--vue-button-group-border-color-active)
		&[selected] + .button
			border-left 1px solid transparent
</style>
