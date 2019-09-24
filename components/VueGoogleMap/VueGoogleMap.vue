<template lang='pug'>
.google-map
	.map(ref="map")
</template>

<script>

// TODO map objects
// TODO map polygons
// TODO marker clusters
// TODO polygon area

/* eslint-disable no-undef */

export default {
	name: 'google-map',
	props: {
		lat: { type: Number, default: 51 },
		lng: { type: Number, default: 0 },
		zoom: { type: Number, default: 14 },
		disableZoom: Boolean,
		minZoom: Number,
		maxZoom: Number,
		mapTypeId: { type: String, default: 'terrain' },
		draggable: Boolean,
		noAutoTilt: Boolean,
		disableDefaultUi: Boolean,
		mapTypeControl: Boolean,
		streetViewControl: Boolean,
		fitToMarkers: {type: Boolean, default: true},
		singleInfoWindow: Boolean,
		mouseEvents: Boolean,
		dragEvents: Boolean,
		clickEvents: Boolean,
		styles: { type: Array, default(){ return [] } },
		markers: { type: Array, default(){ return [] } },
		objects: { type: Array, default(){ return [] } }
	},
	data() {
		return {
			map: {},
			mapMarkers: []
		}
	},
	computed: {
		mapOptions(){
			return {
				lat: Number(this.lat),
				lng: Number(this.lng),
				draggable: this.draggable,
				zoom: this.zoom,
				maxZoom: Number(this.maxZoom),
				minZoom: Number(this.minZoom),
				tilt: this.noAutoTilt ? 0 : 45,
				mapTypeId: this.mapTypeId,
				disableDefaultUI: this.disableDefaultUi,
				mapTypeControl: !this.disableDefaultUi && this.mapTypeControl,
				streetViewControl: !this.disableDefaultUi && this.streetViewControl,
				disableDoubleClickZoom: this.disableZoom,
				scrollwheel: !this.disableZoom,
				styles: this.styles
			}
		},
		mapCenter() {
			return {lat: Number(this.lat), lng: Number(this.lng)}
		}
	},
	methods: {
		renderMap() {
			this.map = new google.maps.Map(this.$refs.map, this.mapOptions)
			this.map.setCenter(this.mapCenter)
			this.$emit('map:render')
		},
		updateMapCenter() {
			const oldCenter = this.map.getCenter()
			const newCenter = new google.maps.LatLng(this.lat, this.lng)
			if (!oldCenter) {
				this.map.setCenter(newCenter)
			} else {
				this.map.panTo(newCenter)
			}
			this.$emit('map:center', newCenter)
		},
		clearMarkers(){
			if (!this.mapMarkers) {return}
			this.mapMarkers.forEach( mapMarker => { mapMarker.setMap(null) })
			this.mapMarkers = []
		},
		placeMarkers() {
			if (!this.markers || !this.markers.length) { return }
			let mapMarkers = []
			for (let marker of this.markers) {
				const info = marker.info
				const computedMarkerOptions = {
					map: this.map,
					animation: google.maps.Animation[marker.animation],
					icon: marker.icon
				}
				const markerOptions = {...marker, ...computedMarkerOptions}

				let newMarker = new google.maps.Marker(markerOptions)
				if (info) {
					const infowindow = new google.maps.InfoWindow({content: info})
					newMarker.addListener('click', () => {
						infowindow.open(this.map, newMarker)
					})
				}
				mapMarkers.push( newMarker )
			}
			this.mapMarkers = mapMarkers
		},
		fitMapToMarkers() {
			if (!this.fitToMarkers || this.mapMarkers.length === 0) { return }
			const latLngBounds = new google.maps.LatLngBounds()
			for (let m of this.mapMarkers) {
				latLngBounds.extend( new google.maps.LatLng(m.position.lat(), m.position.lng()) )
			}
			if (this.mapMarkers.length > 1) {
				this.map.fitBounds(latLngBounds)
			} else {
				this.map.setZoom(this.zoom)
			}
			this.map.setCenter(latLngBounds.getCenter())
		}
	},
	mounted() {
		this.renderMap()
	},
	watch: {
		map(){
			this.placeMarkers()
		},
		markers(){
			this.clearMarkers()
			this.placeMarkers()
			this.$emit('markers:change', this.mapMarkers)
		},
		mapMarkers(){
			this.fitMapToMarkers()
		}
	}
}
</script>

<style scoped lang='stylus'>
.google-map
	width: 100%
	height 40vh
	position: relative
	.map
		width: 100%
		height: 100%
</style>

<style lang="stylus">
.gm-style-cc
	display: none !important
</style>
