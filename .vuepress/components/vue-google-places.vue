<template lang='pug'>
.vue-google-places(:selected="selected", :filled="filled", :error="required && !valid")
	input(
		ref="autocomplete"
		type="text"
		v-model="value"
		placeholder=""
		@focus="onFocus"
		@blur="onBlur"
		@change="onChange"
		@keypress.native="onKeyPress"
		)
	label {{label}}
	.message
		.error(v-if="!valid") {{errorMessage}}
		.info(v-if="valid") {{infoMessage}}
</template>

<script>
/* eslint-disable no-undef */
export default {
	name: 'vue-google-places',

	props: {
		val: {
			type: String,
			default: ''
		},
		label: {
			type: String,
			default: 'Enter location'
		},
		types: {
			type: String,
			default: 'geocode'
		},
		country: {
			type: String,
			default: null
		},
		enableGeolocation: {
			type: Boolean,
			default: false
		},
		errorMessage: {
			type: String,
			default: 'Location is required'
		},
		infoMessage: {
			type: String,
			default: ''
		},
		required: Boolean,
		placeRequired: Boolean // even when has value, place may still be null
	},

	data() {
		return {
			selected: false,
			valid: true,
			autocomplete: null,
			value: null,
			formattedPlace: null,
			place: null,
		}
	},

	computed: {
		filled(){
			return !!this.value
		}
	},

	methods: {

		validateValue(){
			return !this.required || !!this.value
		},

		validatePlace(){
			return !this.requiredPlace || !!this.place
		},

		validate() {
			this.valid = this.validateValue() && this.validatePlace()
			return this.valid
		},

		onFocus() {
			this.geolocate()
			this.$emit('focus')
		},

		onBlur() {
			this.selected = false
			this.validate()
			this.$emit('blur')
		},

		onChange() {
			this.$emit('change', this.value)
		},

		onKeyPress(event) {
		},

		clear() {
			this.value = ''
		},

		focus() {
			this.$refs.autocomplete.focus()
		},

		blur() {
			this.$refs.autocomplete.blur()
		},

		// Bias the autocomplete object to the user's geographical location,
		// as supplied by the browser's 'navigator.geolocation' object.
		geolocate() {
			if (this.enableGeolocation) {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(position => {
						let geolocation = {
							lat: position.coords.latitude,
							lng: position.coords.longitude
						}
						let circle = new google.maps.Circle({
							center: geolocation,
							radius: position.coords.accuracy
						})
						this.autocomplete.setBounds(circle.getBounds())
					})
				}
			}
		}
	},

	beforeMount() {
		this.value = this.val
	},

	mounted() {
		const options = {
			types: [this.types]
		}

		if (this.country) {
			options.componentRestrictions = {
				country: this.country
			}
		}

		this.autocomplete = new google.maps.places.Autocomplete(
			this.$refs.autocomplete, options
		)

		this.autocomplete.addListener('place_changed', () => {
			let place = this.autocomplete.getPlace()

			if (!place.geometry) {
				// User entered the name of a Place that was not suggested and
				// pressed the Enter key, or the Place Details request failed.
				this.$emit('not-found', place)
				return
			}

			let addressComponents = {
				street_number: 'short_name',
				route: 'long_name',
				locality: 'long_name',
				administrative_area_level_1: 'short_name',
				country: 'long_name',
				postal_code: 'short_name'
			}

			let formattedPlace = {}

			if (place.address_components !== undefined) {
				// Get each component of the address from the place details
				for (let component of place.address_components) {
					let addressType = component.types[0]

					if (addressComponents[addressType]) {
						formattedPlace[addressType] = component[addressComponents[addressType]]
					} else {
						formattedPlace[addressType] = ''
					}
				}

				formattedPlace['lat'] = place.geometry.location.lat()
				formattedPlace['lng'] = place.geometry.location.lng()
				formattedPlace['formatted_address'] = place.formatted_address
				formattedPlace['place_id'] = place.place_id

				this.place = place
				this.formattedPlace = formattedPlace
				this.value = this.$refs.autocomplete.value
				this.validate()
				this.$emit('place:changed', formattedPlace, place)
			}
		})
	}
}
</script>


<style scoped lang="stylus">
.vue-google-places
	--vue-input-text-color: black
	--vue-input-error-color: red
	--vue-input-select-color: blue
	--vue-input-font-family: system-ui, sans-serif
	--vue-input-label-font-family: system-ui, sans-serif
	--vue-input-border-color: rgba(black, .2)
	--vue-input-blur-color: rgba(black, .8)

	z-index: 1
	display: block
	position: relative
	width: 100%
	font-size: 1em
	padding: 1em 0
input
	display: block
	width: 100%
	height: 2em
	background: none
	border: none
	border-bottom: 1px solid rgba(black, .2)
	outline: none
	font-family: var(--vue-input-font-family)
	color: var(--vue-input-text-color)
	font-size: 1em
	&:focus
		border-bottom: 1px solid $vue-accent
		color: $vue-accent

label
	position: absolute
	top: 0
	z-index: -1
	line-height: 1em
	padding-top: 1.5em
	transition: all .2s ease
	font-family: var(--vue-input-label-font-family)

.vue-google-places[selected]
	color: var(--vue-input-select-color)
	input
		border-bottom: 1px solid var(--vue-input-select-color)
		color: var(--vue-input-select-color)

.vue-google-places[error]
	input
		border-bottom: 1px solid var(--vue-input-error-color)
		color: var(--vue-input-error-color)
	&[selected], &[filled]
		label
			color: var(--vue-input-error-color)

.vue-google-places[selected], .vue-google-places[filled]
	label
		padding-top: 0
		font-size: .8em

.message
	display: block
	position: absolute
	bottom: 0
	height: 1em
	width: 100%
	font-size: 0.75em
	line-height: 1.2em
	text-align: right
.counter
	color: rgba(black, .5)
.error
	color: var(--vue-input-error-color)
.info
	color: var(--vue-input-blur-color)
</style>
<style lang="stylus">
// Google Places widget
.pac-item
	font-family system-ui
</style>
