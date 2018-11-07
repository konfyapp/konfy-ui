<template lang='pug'>
.vue-input-date(:selected="selected", :error="!valid", :required="required", :disabled="disabled")
	input(type="hidden" :name="name" :value="value")
	.inputs
		template(v-for="(val, name) in elements.fields")
			slot(:name="name")

			.field.separator(
				v-if="Object.keys(elements.separators).includes(name)"
				:class="name"
				:style=" Number.isInteger(elements.separators[name]) ? {width: elements.separators[name] + 'px'} : null"
			) {{Number.isInteger(elements.separators[name]) ? null : elements.separators[name]}}

			.field.weekday(v-if="name === 'weekday'") {{input.weekday}}

			input.field(
				v-if="['day','month','year','hour', 'minute', 'second'].includes(name)"
				type="tel"
				:ref="name"
				:class="[name, {ff: isFF}]"
				:disabled="disabled"
				tabindex="0"
				:size="input[name] ? input[name].length : placeholders[name].length"
				@focus="onInputFocus(name)"
				@blur="onInputBlur(name)"
				@input="supportsEventData ? lookup(name, $event) : null"
				@keyup="supportsEventData ? null : lookup(name, $event)"
				@keydown.enter="focusNext(name, 1)"
				@keydown.up="dateAdd(name, 1)"
				@keydown.down="dateAdd(name, -1)"
				@keydown.left="focusNext(name, -1)"
				@keydown.right="focusNext(name, 1)"
				@keyup.delete="clearInput(name)"
				@keyup.esc="blur(name)"
				:placeholder="placeholders[name]"
				:value="input[name]"
				)
			a.field.am-switch(
				v-if="hour12 && name === 'am'"
				ref="am"
				@focus="selected = true"
				@click="switchAM(!input.am)"
				tabindex="0"
				@keydown.up.prevent="switchAM(!input.am)"
				@keydown.down.prevent="switchAM(!input.am)"
				@keydown.left="focusNext(name, -1)"
				@keydown.right="focusNext(name, 1)"
			) {{ input.am ? 'AM' : 'PM' }}
			.field.timezone( v-if="name === 'timezone'" ) {{ tzLabel }}
	a.clear(v-if="clearButton && !disabled" @click="value = null" aria-label="clear input") ×
	label {{label}}
	#info
		.errors(v-if="error") {{errors[error]}}
</template>

<script>
export default {
	name: 'vue-input-date',
	props: {
		date: {default(){ return new Date() }},
		format: {
			type: String,
			default: 'y/mm/d 20 hh:ii'
		},
		placeholders: {
			type: Object,
			default(){
				return {
					day: 'Day',
					month: 'Month',
					year: 'Year',
					hour: 'H',
					minute: 'm',
					second: 's'
				}
			}
		},		
		hour12: {
			type: Boolean,
			default: false
		},
		locale: {
			type: String,
			default: 'en-EN'
		},
		validator: {
			type: Function,
			default(d){ return true }
		},
		errors: {
			type: Object,
			default(){
				return {
					invalid: 'Invalid date.',
					required: 'Date is required.',
					custom: 'This date is not allowed.'
				}
			}
		},
		tz: String,
		label: String,
		name: String,
		required: Boolean,
		disabled: Boolean,
		clearButton: Boolean
	},
	data(){
		return {
			selected: false,
			valid: true,
			value: null,
			error: null,
			phrase: '',
			clearLookup: null,
			input: {
				weekday: null,
				day: null,
				month: null,
				year: null,
				hour: null,
				minute: null,
				second: null,
				am: null
			},
			formatMap: {
				yy: { year: '2-digit' },
				y: { year: 'numeric' },
				mm: { month: '2-digit' },
				m: { month: 'numeric' },
				MMM: { month: 'long' },
				MM: { month: 'short' },
				M: { month: 'narrow' },
				dd: { day: '2-digit' },
				d: { day: 'numeric' },
				WWW: { weekday: 'long' },
				WW: { weekday: 'short' },
				W: { weekday: 'narrow' },
				hh: { hour: '2-digit' },
				h: { hour: 'numeric' },
				ii: { minute: '2-digit' },
				i: { minute: 'numeric' },
				ss: { second: '2-digit' },
				s: { second: 'numeric' },
				a: { am: true },
				z: { timezone: true }
			}
		}
	},
	computed: {

		elements() {

			let fields = {}

			let separators = {}

			let rest = this.format

			let sep = ''

			while (rest.length > 0) {
				let isKey = false
				for (const key in this.formatMap) {
					if (rest.startsWith(key)) {
						const field = Object.keys(this.formatMap[key])[0]
						fields = { ...fields, ...this.formatMap[key] }
						sep = parseInt(sep) || sep
						if (sep) separators = { ...separators, ...{ [field]: sep } }
						sep = ''
						rest = rest.replace(RegExp(`^${key}`), '')
						isKey = true
						break
					}
				}
				if (!isKey) {
					sep = sep + rest[0]
					rest = rest.substr(1)
				}
			}
			return {fields, separators}
		},

		months(){
			const d = new Date()
			return Array.apply(0, Array(12)).map( (k,i) => {
				d.setMonth(i)
				return d.toLocaleString(this.locale, {month: this.formats.month})
			})
		},
		dateParts(){
			const m = new Date(this.value).getMonth()
			const y = new Date(this.value).getFullYear()
			return {
				y: y,
				m: m,
				d: new Date(this.value).getDate(),
				h: new Date(this.value).getHours(),
				min: new Date(this.value).getMinutes(),
				s: new Date(this.value).getSeconds(),
				maxDay: new Date(y, m + 1, 0).getDate()
			}
		},
		tzOffset() {
			if (!this.tz) return 0
			const hrsTZ = new Date().toLocaleString('en-US', {hour: 'numeric', hour12: false, timeZone: this.tz})
			const hrsLOC = new Date().toLocaleString('en-US', {hour: 'numeric', hour12: false})
			return parseInt(hrsLOC) - parseInt(hrsTZ)
		},
		tzLabel() {
			if (!this.tz){
				const tzOffset = new Date(this.value).getTimezoneOffset()
				const tzCode = tzOffset > 0 ? 'GMT' + tzOffset / -60 : 'GMT+' + tzOffset / -60
				return tzCode
			}
			else return this.tz.replace('_', ' ')
		},
		inputVals(){
			let hour = parseInt(this.input.hour) + this.tzOffset || 0
			if (this.hour12){
				if (this.input.hour < 12 && !this.input.am) hour += 12
				if (hour === 12 && this.input.am) hour = 0
				if (hour === 0 && !this.input.am) hour = 12
			}
			let month = this.months.indexOf(this.input.month)
			if (month === -1) month = null
			return {
				y: parseFloat(this.input.year) || null,
				m: month,
				d: parseInt(this.input.day) || null,
				h: hour,
				min: parseInt(this.input.minute) || 0,
				s: parseInt(this.input.second) || 0
			}
		},
		formats(){
			const defaults = {
				weekday: 'short',
				day: 'numeric',
				month: 'numeric',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			}
			return {...defaults, ...this.elements.fields}
		},
		supportsEventData(){
			const EventData = new InputEvent('a')
			return EventData.data !== undefined
		},
		isFF(){
			return 'MozAppearance' in document.documentElement.style
		}
	},
	methods: {
		expandInput(name){
			if (!this.$refs[name] || name === 'am') return
			const field = this.$refs[name][0]
			field.value = this.input[name]
			if (field.value.length === 0) return field.style.width = null
			field.style.width = '1px'
			const scrollWidth = field.scrollWidth
			field.style.width = scrollWidth + 'px'
		},

		lookup(type, e){
			console.log(e.type)
			const input = e.data || e.key
			clearTimeout(this.clearLookup)
			this.expandInput(type)
			if (!input){
				this.phrase = ''
				return
			}
			if (['numeric', '2-digit'].includes(this.formats[type]) && this.phrase.length >= 2 && type !== 'year') this.phrase = ''
			if (['narrow', 'short'].includes(this.formats[type]) && this.phrase.length >= 3) this.phrase = ''
			this.phrase = (this.phrase + input.slice(-1)).toLowerCase()
			this.clearLookup = setTimeout( () => {
				this.phrase = ''
				this.valueFromInputs()
			}, 1000)
			if (type === 'second') this.lookupSec()
			if (type === 'minute') this.lookupMinute()
			if (type === 'hour') this.lookupHour()
			if (type === 'day') this.lookupDay()
			if (type === 'month') this.lookupMonth()
			if (type === 'year') this.lookupYear()
		},
		lookupSec(){
			let second = Math.max(0, Math.min(59, parseInt(this.phrase) ) )
			if (isNaN(second)) return
			second = second.toString()
			if (second.length < 2 && this.formats.second === '2-digit') second = '0' + second
			this.input.second = second
		},
		lookupMinute(){
			let minute = Math.max(0, Math.min(59, parseInt(this.phrase) ) )
			if (isNaN(minute)) return
			minute = minute.toString()
			if (minute.length < 2 && this.formats.minute === '2-digit') minute = '0' + minute
			this.input.minute = minute
		},
		lookupHour(){
			let hour = Math.max(0, Math.min(23, parseInt(this.phrase) ) )
			if (isNaN(hour)) return
			if (this.hour12 && hour > 12){
				hour -= 12
				this.input.am = false
			}
			hour = hour.toString()
			if (hour.length < 2 && this.formats.hour === '2-digit') hour = '0' + hour
			this.input.hour = hour
		},
		lookupDay(){
			let day = Math.max(1, Math.min(31, parseInt(this.phrase) ) )
			if (isNaN(day)) return
			day = day.toString()
			if (day.length < 2 && this.formats.day === '2-digit') day = '0' + day
			this.input.day = day
		},
		lookupMonth(){
			const num = Math.max(1, Math.min(12, parseInt(this.phrase)))
			let month
			if (!isNaN(num)) month = this.months[num - 1]
			else month = this.months.filter(m => m.toLowerCase().startsWith(this.phrase))[0]
			if (!month) return
			this.input.month = month
		},
		lookupYear(){
			const year = Math.trunc(parseFloat(this.phrase)).toString()
			if (isNaN(year)) return
			this.input.year = year
		},
		dateAdd(key, val) {
			if (!this.value) this.value = new Date()
			if (key === 'second') {
				let second = this.dateParts.s + val
				if (second < 0) second = 59
				if (second > 59) second = 0
				this.value = new Date(this.value).setSeconds(second)
			}
			if (key === 'minute') {
				let minute = this.dateParts.min + val
				if (minute < 0) minute = 59
				if (minute > 59) minute = 0
				this.value = new Date(this.value).setMinutes(minute)
			}
			if (key === 'hour') {
				let hour = this.dateParts.h + val
				if (hour < 0) hour = 23
				if (hour > 23) hour = 0
				this.value = new Date(this.value).setHours(hour)
			}
			if (key === 'day') {
				const max = this.dateParts.maxDay
				let day = this.dateParts.d + val
				if (day < 1) day = max
				if (day > max) day = 1
				this.value = new Date(this.value).setDate(day)
			}
			if (key === 'month') {
				let month = this.dateParts.m + val
				if (month < 0) month = 11
				if (month > 11) month = 0
				this.value = new Date(this.value).setMonth(month)
			}
			if (key === 'year') {
				let year = this.dateParts.y + val
				this.value = new Date(this.value).setYear(year)
			}
		},
		switchAM(v){
			this.input.am = v
			this.valueFromInputs()
		},
		clearInput(name){
			this.input[name] = null
		},
		inputFromValue(k){
			if (!this.value) return this.input[k] = null
			const options = {[k]: this.formats[k], hour12: this.hour12, timeZone: this.tz}
			this.input[k] = new Date(this.value).toLocaleString( this.locale, options )

			if (k === 'am'){
				this.input.am = new Date(this.value).getHours() < 12
			}
			if (this.hour12){
				// get rid of AM from hour
				this.input.hour = parseInt(this.input.hour).toString()
				if (this.formats.hour === '2-digit' && this.input.hour.length < 2) this.input.hour = '0' + this.input.hour
			}
			if ( this.formats[k] === '2-digit' && this.input[k].length < 2){
				this.input[k] = '0' + this.input[k]
			}
		},
		valueFromInputs(){
			const v = this.inputVals
			console.log(v.y, v.m, v.d)
			if (!v.y && !v.m && !v.d) return this.value = null
			if (!v.y) v.y = new Date().getFullYear()
			if ([null, undefined].includes(v.m)) v.m = new Date().getMonth()
			if (!v.d) v.d = new Date().getDate()
			this.value = new Date(v.y, v.m, v.d, v.h, v.min, v.s)
		},
		onInputFocus(name) {
			this.selected = true
			// this.$refs[name][0].select()
			this.$emit('input:focus', name)
		},
		onInputBlur(name) {
			this.selected = false
			this.phrase = ''
			this.valueFromInputs()
			this.$emit('input:blur', name)
		},
		blur(ref){
			this.$refs[ref][0].blur()
		},
		focus(ref){
			this.$refs[ref][0].focus()
		},
		focusNext(ref, val){
			const refs = Object.keys(this.$refs)
			const nextRef = refs[refs.indexOf(ref) + val]
			if (nextRef) this.$refs[nextRef][0].focus()
			else this.$refs[refs[0]][0].focus()
		},
		clear(){
			this.value = false
		},
		validate(){
			const valid = new Date(this.value) instanceof Date && !isNaN(this.value)
			const allowed = this.validator(this.value)
			if (this.required && !this.value){
				this.error = 'required'
				this.valid = false
				return false
			}
			if (!valid){
				this.error = 'invalid'
				this.valid = false
				return false
			}
			if (!allowed){
				this.error = 'custom'
				this.valid = false
				return false
			}
			this.error = null
			this.valid = true
			return true
		}
	},
	watch: {
		selected(){
			this.$emit('selected', this.selected)
		},
		value(){
			this.validate()
			for (const k in this.input) this.inputFromValue(k)
			this.$emit('change', this.value)
			this.phrase = ''
		},
		input: {
			handler(){
				for (let k in this.elements.fields) this.expandInput(k)
			},
			deep: true
		},
		error(){
			if (this.error) this.$emit('error', this.error)
		},
		valid(){
			if (this.valid) this.$emit('valid', true)
			else  this.$emit('valid', false)
		}
	},
	mounted(){
		for (let k in this.elements.fields) this.expandInput(k)
		if (!this.value && this.date) this.value = this.date
	}
}
</script>

<style scoped lang='stylus'>
*
	box-sizing content-box
.vue-input-date
	--vue-input-error-color: red
	--vue-input-text-color: black
	--vue-input-select-color: blue
	--vue-input-blur-color: rgba(black, .8)
	--vue-input-font-family: system-ui, sans-serif
	--vue-input-label-font-family: system-ui, sans-serif
	--vue-input-background-color: transparent
	--vue-input-hover-background-color: rgba(black, .05)
	--vue-input-focus-background-color: rgba(black, .1)
	--vue-input-border-color:  rgba(black, .5)
	--vue-input-border-color-active: var(--vue-input-select-color)
	--vue-input-border-color-error: var(--vue-input-error-color)
	z-index 1
	display block
	position relative
	width 100%
	font-size 1em
	padding-top 1em
	margin-bottom 1em
	color var(--vue-input-blur-color)
	border-bottom 1px solid var(--vue-input-border-color)
.inputs
	display flex
	align-content center
	align-items center
	line-height 1em
.field
	height 2em
	font-size 1em
	line-height 2em
	padding 0
	color var(--vue-input-text-color)
.vue-input-date[disabled]
	.field
		opacity .6
		cursor text
		&:hover
			background none
input.field
	appearance none
	vertical-align middle
	text-align center
	cursor pointer
	padding 0 1px
	color var(--vue-input-text-color)
	font-family var(--vue-input-font-family)
	font-size 1em
	border none
	outline none
	caret-color: transparent 
	&.ff
		padding-top 3px
		height calc(2em - 3px)
a.am-switch
	cursor pointer
	outline none
	border none
	width auto
	padding 0 1px
	font-weight initial
	&:hover
		text-decoration none
input.field, .am-switch
	background var(--vue-input-background-color)
	&:hover
		background var(--vue-input-hover-background-color)
	&:focus
		background var(--vue-input-focus-background-color)
		color var(--vue-input-select-color)
.separator
	padding 0
label
	position absolute
	top 0
	z-index -1
	line-height 1em
	padding-top 0
	font-size .8em
	transition all .2s ease
	font-family var(--vue-input-label-font-family)
a.clear
	display none
	appearance none
	outline none
	position absolute
	cursor pointer
	right 0
	bottom .5em
	width 16px
	height 16px
	border-radius 50%
	border 1px solid rgba(black .6)
	padding 0
	background-color transparent
	font-size 14px
	line-height 14px
	text-align center
	vertical-align middle
	color rgba(black, .6)
	&:hover
		background-color rgba(black .5)
		border 1px solid transparent
		color white
		text-decoration none
.vue-input-date:hover, .vue-input-date[selected]
	.clear
		display block

.vue-input-date[selected]
	border-bottom 1px solid var(--vue-input-border-color-active)

.vue-input-date[error]
	border-bottom 1px solid var(--vue-input-error-color)
	.field
		color var(--vue-input-error-color)
	&[selected], &[filled]
		label
			color var(--vue-input-error-color)
#info
	display: block
	position: absolute
	bottom: -1em
	height: 1em
	width: 100%
	font-size: 0.75em
	line-height: 1.2em
	text-align: right
.counter
	color: rgba(black, .5)
.errors
	color: var(--vue-input-error-color)
.info
	color: var(--vue-input-blur-color)

</style>