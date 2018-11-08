<template lang='pug'>
.vue-input(:selected="selected", :filled="filled", :error="!valid", :class="type", :required="required", :disabled="disabled", :readonly="readonly")
	textarea(
		v-if="type === 'textarea'"
		ref="input"
		v-model="value"
		:placeholder="placeholder"
		:name="name"
		:disabled="disabled"
		:readonly="readonly"
		:required="required"
		@focus="selected = true"
		@blur="blurred"
		@input="changed"
		@keyup.esc="blur"
		rows="1"
		:style="{minHeight: minHeight, maxHeight: maxHeight}")
	input(
		v-if="type !== 'textarea'"
		ref="input"
		v-model="value"
		:min="min"
		:max="max"
		:placeholder="placeholder"
		:name="name"
		:autocomplete="autocomplete"
		:spellcheck="spellcheck"
		:disabled="disabled"
		:readonly="readonly"
		:required="required"
		:pattern="pattern"
		:class="{ nolabel: !label }"
		@focus="selected = true"
		@blur="blurred"
		@input="changed"
		@keyup.enter="enter"
		@keyup.esc="blur"
		)
	label {{label}}
	#info
		.info(v-if="infoMessage") {{infoMessage}}
		.errors(v-if="!valid") {{errorMessage}}
		.counter(v-if="counter") &nbsp;| {{value ? value.length : 0}}
</template>

<script>
export default {
	name: 'vue-input',
	props: {
		val: {default(){ return '' }},
		type: {type: String, default(){ return 'text' }},
		label: String,
		placeholder: String,
		name: String,
		required: Boolean,
		pattern: String,
		autocomplete: { type: String, default(){ return 'on' } },
		spellcheck: Boolean,
		disabled: Boolean,
		readonly: Boolean,

		autogrow: { type: Boolean, default(){ return true } },
		minHeight: {type: String, default(){ return '2rem' }},
		maxHeight: String,
		counter: Boolean,

		validateOn: { type: String, default: 'blur' }, // blur | change
		equals: String,	// value equals to another field (by ref). Should have the same parent.
		min: Number,
		max: Number,
		validators: Array,	// Array of validators to use

		errorMin: {
			type: String,
			default(){ return `Minimum number of characters: ${this.min}` }
		},
		errorMax: {
			type: String,
			default() { return `Max number of characters reached.` }
		},
		errorEquals: {
			type: String,
			default() { return 'fields do not match' }
		},
		errorCustom: String
	},
	data(){
		return {
			selected: false,
			valid: true,
			errorMessage: '',
			infoMessage: '',
			value: '',
			testers: {
				email: {
					exp: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
					errorMessage: 'Invalid email address'
				},
				url: {
					exp: /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
					errorMessage: 'Invalid url'
				},
				alphanum: {
					exp: /^[a-zA-Z0-9_]*$/,
					errorMessage: 'Only alphanumeric characters allowed'
				},
				digits: {
					exp: /^[0-9]*$/,
					errorMessage: 'Only digits allowed'
				}
			}
		}
	},
	computed: {
		filled(){
			return !!this.value
		}
	},
	methods: {
		blurred() {
			this.selected = false
			this.$emit('blur')
			if (this.validateOn === 'blur') this.validate()
		},
		changed(){
			this.$emit('change')
			if (this.validateOn === 'change') this.validate()
		},
		grow() {
			let textarea = this.$refs.input
			textarea.style.height = 0
			let newHeight = textarea.scrollHeight
			textarea.style.height = newHeight + 'px'
		},
		enter() {
			this.$emit('enter')
		},
		blur(){
			this.$refs.input.blur()
		},
		validateBrowser() {
			// Override for 'readonly' and 'disabled'. Browser will always pass it.
			if ( (this.readonly || this.disabled) && this.required && !this.value) {
				this.errorMessage = this.errorCustom || 'This field is required.'
				return false
			}
			// Check what the browser thinks.
			if (this.$refs.input) return this.$refs.input.checkValidity()
			return true
		},
		validateMin() {
			// Dont' check if it's type: number or date, min means sth else then.
			if (this.type === 'number' || this.type === 'date' || this.type === 'datetime-local') return true
			// Check for minimum chars
			let valid = true
			if ( this.min && this.value && this.value.length < this.min) {
				valid = false
				this.errorMessage = this.errorMin
			} else {
				valid = true
			}
			return valid
		},
		validateMax() {
			// Dont' check if it's type: number or date, max means sth else then.
			if (this.type === 'number' || this.type === 'date' || this.type === 'datetime-local') return true
			// Check for maximum chars
			if ( this.max && this.value && this.value.length === parseInt(this.max) ) {
				this.infoMessage = this.errorMax
			}
			if ( this.max && this.value && this.value.length > this.max ){
				this.value = this.value.substring(0, this.max )
			}
			if ( this.max && this.value && this.value.length < this.max ){
				this.infoMessage = ''
			}
			return true
		},
		validateEquals() {
			// Check if value should match another input
			if (!this.equals) {
				return true
			}
			const equalField = this.$parent.$refs[this.equals]
			if (!equalField) {
				console.error(`There is no sibling ref "${this.equals}" – required for input equals match.`)
				return false
			}
			// check for equality
			if (equalField.value !== this.value) {
				this.errorMessage = this.errorEquals
				return false
			}
			return true
		},
		validateRegex() {
			// Validate against mixin regex validators
			if ( !this.validators || !this.validators.length ) {
				return true
			}
			for ( let validator of this.validators ) {
				if (!this.testers[validator]) {
					console.error(`there is no built-in validator for "${validator}". Supported validators:`, this.testers)
					return true
				}
				let valid = this.testers[validator].exp.test(this.value)
				if (!valid) {
					this.errorMessage = this.errorCustom
						? this.errorCustom
						: this.testers[validator].errorMessage
				}
				return valid
			}
		},
		validate() {
			this.valid = (
				this.validateBrowser() &&
				this.validateMin() &&
				this.validateMax() &&
				this.validateEquals() &&
				this.validateRegex()
			)
			if (this.type === 'textarea') this.grow()
			this.$emit('validate', this.valid)
			return this.valid
		},
		browserInvalidListener(e){
			// Pass browser validation errors to errorMessage
			if (e.target === this.$refs.input){
				this.errorMessage = this.errorCustom
					? this.errorCustom
					: e.target.validationMessage
			}
		}
	},
	watch: {
		value() {
			if (this.validateOn === 'change') this.validate()
			if (this.autogrow && this.type === 'textarea') this.grow()
		}
	},
	mounted() {
		if (this.auto && this.val) this.validate()
		this.$refs.input.setAttribute('type', this.type)
		if (this.autogrow && this.type === 'textarea') this.$refs.input.innerHTML = this.val
		this.value = this.val
		window.addEventListener('invalid', this.browserInvalidListener, true)
	},
	destroyed() {
		window.removeEventListener( 'invalid', this.browserInvalidListener )
	}
}
</script>

<style scoped lang='stylus'>
.vue-input
	--vue-input-error-color: red
	--vue-input-text-color: black
	--vue-input-select-color: rgba(black, .8)
	--vue-input-blur-color: rgba(black, .8)
	--vue-input-font-family: system-ui, sans-serif
	--vue-input-label-font-family: system-ui, sans-serif
	--vue-input-border-color: rgba(black, .2)
	--vue-input-border-color-active: rgba(black, .8)
	--vue-input-border-color-error: red
	z-index: 1
	display: block
	position: relative
	width: 100%
	font-size: 1em
	padding-top: 1em
	margin-bottom: calc(1em - 1px)
	color: var(--vue-input-blur-color)
	border-bottom: 1px solid var(--vue-input-border-color)
	input, textarea
		appearance: none
		display: block
		width: 100%
		height: 2em
		font-family: var(--vue-input-font-family)
		color: var(--vue-input-text-color)
		background: none
		border: none
		outline: none
		font-size: 1em
		line-height: 1.5em
		padding: 0
	textarea
		resize: none
		min-height: 2em
		overflow-y: hidden
	input[type="search"]::-webkit-search-decoration
		display: none
	input[type="color"]
		border: none
	label
		position: absolute
		top: 0
		z-index: -1
		line-height: 1em
		padding-top: 1.5em
		transition: all .2s ease
		font-family: var(--vue-input-label-font-family)

	input::placeholder
		tansition all .2s ease
		opacity 0
	input.nolabel::placeholder
		opacity 1

.vue-input[selected]
	color: var(--vue-input-select-color)
	border-bottom: 1px solid var(--vue-input-border-color-active)
	input::placeholder
		opacity 1
	input, textarea
		color: var(--vue-input-select-color)
	&.color
		input
			border: none

.vue-input[error]
	border-bottom: 1px solid var(--vue-input-error-color)
	input, textarea
		color: var(--vue-input-error-color)
	&.color
		border: none
	&[selected], &[filled]
		label
			color: var(--vue-input-error-color)

.vue-input[selected], .vue-input[filled], .vue-input.date, .vue-input.datetime-local, .vue-input.time, .vue-input.week, .vue-input.month, .vue-input.color
	label
		padding-top: 0
		font-size: .8em

#info
	display: block
	position: absolute
	bottom: -1em
	height: 1em
	width: 100%
	font-size: 0.8em
	margin-top .2em
	text-align: right
.counter
	color: rgba(black, .5)
.errors
	color: var(--vue-input-error-color)
.info
	color: var(--vue-input-blur-color)

</style>
