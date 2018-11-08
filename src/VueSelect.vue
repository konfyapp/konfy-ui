<template lang='pug'>
.m2-select(
	:active="active"
	:filled="filled"
	:error="!valid"
	:searching="!!searchVal.length"
	:class="{multiple: multiple}"
	)
	input(type="hidden" :name="name" :value="inputValue")
	#result( @click.self="focusSearch()" )
		span#tag(
			v-for="(value, index) in values"
			@click="remove(index)"
			) {{value.label}}
		span#value(
			v-if="!multiple && filled"
			@click="focusSearch()"
			) {{value.label}}
		input(
			ref="input"
			type="search"
			v-model="searchVal"
			:readonly="!searchable"
			@focus="active = true"
			@blur="onBlur()"
			@input="onInputChange()"
			@keyup.enter="choose()"
			@keydown.esc="onEscape()"
			@keydown.delete="onDelete()"
			@keydown.up="highlightPrev()"
			@keydown.down="highlightNext()"
			)

	label {{label}}

	#dropdown(v-if="active")
		ul#options( ref="list", :style="dropStyle")
			li.option(
				v-for="(option, index) in filteredOptions"
				:selected="value.value === option.value"
				:highlight="highlightVal === index"
				@mousedown.prevent="choose()"
				@mouseover="highlight(index)"
				) {{option.label}}
	#info
		.error(v-if="!valid") {{errorMessage}}
		.info(v-if="info") {{infoMessage}}
</template>

<script>
export default {
	name: 'm2-select',
	props: {
		name: String,
		options: {
			type: Array,
			default() { return [] }
		},
		// Default option value
		default: {
			default: ''
		},
		// Default options values, if multiple
		defaults: {
			type: Array,
			default() { return [] }
		},
		// Allow multiple values
		multiple: {
			type: Boolean,
			default: false
		},
		// Maximum number of multiple values
		maxValues: {
			type: Number
		},
		// Prevent duplicate multiple values
		set: {
			type: Boolean,
			default: false
		},
		// Can add own new values
		mutable: {
			type: Boolean,
			default: false
		},
		required: {
			type: Boolean,
			default: false
		},
		searchable: {
			type: Boolean,
			default: true
		},
		// maxHeight of dropdown
		maxHeight: {
			type: String,
			default: '13rem'
		},
		label: {
			type: String,
			default: 'Choose option'
		},
		errorMessage: {
			type: String,
			default: 'This field is required.'
		},
		infoMessage: {
			type: String,
			default: ''
		}
	},

	data(){
		return {
			active: false,
			info: false,
			valid: true,
			searchVal: '',
			highlightVal: -1,
			mutableOptions: [],
			value: {},
			values: []
		}
	},

	computed: {
		inputValue(){
			if (this.values.length) return JSON.stringify(this.values)
			else return JSON.stringify(this.value)
		},

		filled() {
			return (!!this.value.label || this.values.length > 0)
		},

		normalizedOptions() {
			const propOptions = this.options.map( option => {
				if ( typeof option === 'string' ) return { value: option, label: option }
				if ( typeof option === 'number' ) return { value: option, label: `${option}` }
				if ( typeof option === 'object' ) return option
				else throw Error('vue-select options must be: STRING, NUMBER or OBJECT')
			})
			return [...propOptions, ...this.mutableOptions]
		},

		filteredOptions() {
			return this.normalizedOptions.filter(
				option => {
					return option.label.toLowerCase().includes( this.searchVal.toLowerCase() )
				}
			)
		},

		dropStyle() {
			return {
				maxHeight: this.maxHeight
			}
		}
	},
	methods: {
		getDefault() {
			const defs = this.normalizedOptions.filter( option => {
				return option.value === this.default
			})
			const def = defs[0] || {}
			return def
		},

		getDefaults() {
			if (!this.defaults || !this.defaults.length) return []
			return this.normalizedOptions.filter( option => {
				return this.defaults.indexOf(option.value) !== -1
			})
		},

		validate() {
			this.valid = (!this.required || this.value.value || this.values.length > 0)
			this.$emit('validate', this.valid)
			return this.valid
		},

		onBlur() {
			this.active = false
			this.validate()
			this.searchVal = ''
			this.$emit( 'search:blur' )
		},

		focusSearch() {
			this.active = true
			this.$refs.input.focus()
		},

		blurSearch() {
			this.active = false
			this.$refs.input.blur()
		},

		onInputChange(){
			this.searchVal = this.$refs.input.value
			this.highlight(0)
			this.$refs.input.style.width = '20px'
			const scrollWidth = this.$refs.input.scrollWidth
			this.$refs.input.style.width = scrollWidth + 'px'
		},

		onDelete() {
			if (this.searchVal.length) return
			this.highlight(0)
			if (!this.multiple){
				this.$emit('remove', this.value)
				this.value = {}
			}
			else {
				this.$emit('remove', this.values[this.values.length - 1])
				this.values.pop()
			}
		},

		onEscape() {
			if (this.searchVal.length) return
			this.highlight(0)
			this.$refs.input.blur()
			this.active = false
		},

		highlightNext() {
			this.active = true
			if ( this.highlightVal + 1 < this.filteredOptions.length ) this.highlightVal += 1
		},

		highlightPrev() {
			this.active = true
			if ( this.highlightVal >= 0 ) this.highlightVal -= 1
		},

		highlight(index) {
			this.active = true
			this.highlightVal = index
		},

		choose(index) {
			let i = index || this.highlightVal
			if (i === -1 || !this.filteredOptions.length) {
				if (this.mutable) {
					this.createMutable(this.searchVal)
				}
				else {
					this.searchVal = ''
					return
				}
			}
			// if i is -1, then add the last option from filteredOptions
			i = i > -1 ? i : this.filteredOptions.length - 1
			if (this.multiple && this.filteredOptions[i].value) this.add(i)
			else this.select(i)
			this.searchVal = ''
			this.active = false
		},

		select(index) {
			this.value = this.filteredOptions[index]
			this.$emit('select', this.value)
			this.$refs.input.blur()
		},

		add(index) {
			if ( this.maxValues && this.values.length >= this.maxValues ) return
			const valueToAdd = this.filteredOptions[index]
			if (!this.set) this.values.push( valueToAdd )
			else {
				const exists = this.values.find( v => v.value === valueToAdd.value )
				if (!exists) this.values.push( valueToAdd )
			}
			this.$emit('add', valueToAdd)
		},

		remove(index) {
			this.$emit('remove', this.values[index])
			this.values.splice(index, 1)
		},

		reset(){
			this.value = this.getDefault()
			this.values = this.getDefaults()
		},

		createMutable(val) {
			const option = { value: val, label: val }
			const set = new Set(this.mutableOptions).add(option)
			this.mutableOptions = Array.from(set)
			this.$emit('create:mutable', option)
		},

		pointerPosition(){
			const index = this.highlightVal
			const items = this.$refs.list.children
			if (index < 0 || !items[index]) return 0
			return {
				top: items[index].offsetTop,
				bottom: items[index].offsetTop + items[index].offsetHeight
			}
		},

		viewportPosition() {
			return {
				top: this.$refs.list.scrollTop,
				bottom: this.$refs.list.offsetHeight + this.$refs.list.scrollTop
			}
		}
	},

	mounted() {
		this.reset()
	},

	watch: {
		highlightVal(val, old){
			if (val < 0) return

			if (!this.$refs.list) return

			if (this.pointerPosition().top < this.viewportPosition().top) {
				this.$refs.list.scrollTop = this.pointerPosition().top
			}
			if (this.pointerPosition().bottom > this.viewportPosition().bottom) {
				this.$refs.list.scrollTop = this.viewportPosition().top + this.$refs.list.children[val].offsetHeight
			}
		},

		value(val, old){
			this.$emit('value:change', val)
		},

		values(vals, old){
			this.$emit('values:change', vals)
		}
	}
}
</script>

<style scoped lang='stylus'>

.m2-select
	--vue-input-text-color: black
	--vue-input-error-color: red

	--vue-input-font-family: system-ui, sans-serif
	--vue-input-label-font-family: system-ui, sans-serif
	--vue-input-border-color: rgba(black, .2)
	--vue-input-select-color: blue
	--vue-input-blur-color: rgba(black, .8)

	--vue-option-hover-color: white
	--vue-option-hover-bg: blue
	--vue-option-selected-bg: rgba(black, .1)
	--vue-option-selected-color: var(--vue-input-text-color)

	--vue-tag-text-color: rgba(black, .8)
	--vue-tag-text-color-hover: red
	--vue-tag-text-color-active:  rgba(black, .8)

	--vue-tag-border-color: white
	--vue-tag-border-color-hover: white
	--vue-tag-border-color-active: white

	--vue-tag-bg: white
	--vue-tag-bg-hover: white
	--vue-tag-bg-active: white

	--vue-tag-shadow: 0 1px 2px 0 rgba(black, .4)

.m2-select
	display: block
	position: relative
	width: 100%
	padding: 1em 0
	font-size: 1em
	color: var(--vue-input-blur-color)

#result
	display: block
	cursor: text
	position: relative
	border-bottom: 1px solid var(--vue-input-border-color)
	padding-right: 2em
	line-height 1.5em
	&:after
		position: absolute
		right: 0
		bottom 0
		content: '▼'
		font-size: .6em
		color: var(--vue-input-blur-color)
#tag
	transition: all .2s ease
	display: inline-block
	user-select: none
	line-height: calc(1.6em - 2px)
	font-size: 1em
	cursor: pointer
	text-overflow: ellipsis
	white-space: nowrap
	margin-right .3em
	color: var(--vue-tag-text-color)
	&:after
		content: ','
	&:last-of-type:after
		content: ''
	&:hover
		color: var(--vue-tag-text-color-hover)
		text-decoration: line-through
#value
	display: inline-block
	user-select: none
	line-height: 2em
	text-overflow: ellipsis
	white-space: nowrap
	cursor: pointer
	color: var(--vue-input-text-color)
	margin-right: 3px

input
	appearance: none
	padding: 0
	display: inline-block
	font-size: 1em
	height: calc(2em - 1px)
	line-height: calc(2em - 1px)
	width: 20px
	max-width: 100%
	font-family: var(--vue-input-font-family)
	background: none
	border: none
	outline: none
input[type="search"]::-webkit-search-decoration
	display: none

label
	position: absolute
	top: 0
	z-index: 0
	pointer-events: none
	line-height: 1em
	padding-top: 1.5em
	transition: all 0.2s ease
	font-family: var(--vue-input-label-font-family)

#dropdown
	display: block
	position: relative

#options
	animation: slideUp .1s
	display: block
	margin-top: 1em
	position: absolute
	z-index: 99
	max-height: 10em
	width: 100%
	margin: 0
	list-style-type: none
	padding: 0
	overflow-y: scroll
	background-color: white
	box-shadow: 0px 4px 12px rgba( black, 0.3 )
	line-height: 2em
.option
	display: block
	font-size: 1em
	padding: 0 5px
	cursor: pointer
	text-overflow: ellipsis
	white-space: nowrap
	overflow-x: hidden
	color: var( --vue-input-text-color )
	opacity: .8
	&[selected]
		font-weight: 700
	&[selected]:before
		content: '✓'
		margin-right: .25em
	&:hover, &[highlight]
		color: var(--vue-option-hover-color)
		background-color: var(--vue-option-hover-bg)

#info
	display: block
	position: absolute
	bottom: 0
	height: 1em
	width: 100%
	font-size: 0.75em
	line-height: 1.2em
	text-align: right
	.error
		color: var(--vue-input-error-color)
	.info
		color: var(--vue-input-blur-color)


.m2-select[error]
	#result
		border-bottom: 1px solid var(--vue-input-error-color)
.m2-select[active]
	color: var(--vue-input-select-color)
	#result
		border-bottom: 1px solid var(--vue-input-select-color)
		color: var(--vue-input-select-color)
	#tag
		color: var(--vue-tag-text-color-active)
		&:hover
			color: var(--vue-tag-text-color-hover)
			background-color: var(--vue-tag-bg-hover)
			text-decoration: line-through

.m2-select:not([active])
	input
		width: 0

.m2-select[active], .m2-select[filled], .m2-select[searching]
	label
		padding-top: 0
		font-size: .8em

.m2-select[active]
	#result:after
		color: var(--vue-input-select-color)

@keyframes slideUp
	0%
		opacity: 0
		transform: translateY(1em)
	100%
		opacity: 1
		transform: translateY(0)
</style>
