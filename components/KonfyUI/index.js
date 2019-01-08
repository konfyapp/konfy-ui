import VueButton from '@konfy/vue-button'
import VueButtonAlt from '@konfy/vue-button-alt'
import VueButtonGroup from '@konfy/vue-button-group'
import VueFileTray from '@konfy/vue-file-tray'
import VueGoogleMap from '@konfy/vue-google-map'
import VueGooglePlaces from '@konfy/vue-google-places'
import VueInput from '@konfy/vue-input'
import VueInputDate from '@konfy/vue-input-date'
import VueMeter from '@konfy/vue-meter'
import VueSelect from '@konfy/vue-select'
import VueSwitch from '@konfy/vue-switch'

export default {
	install(Vue) {
		Vue.component('vue-button', VueButton)
		Vue.component('vue-button-alt', VueButtonAlt)
		Vue.component('vue-button-group', VueButtonGroup)
		Vue.component('vue-file-tray', VueFileTray)
		Vue.component('vue-google-map', VueGoogleMap)
		Vue.component('vue-google-places', VueGooglePlaces)
		Vue.component('vue-input', VueInput)
		Vue.component('vue-input-date', VueInputDate)
		Vue.component('vue-meter', VueMeter)
		Vue.component('vue-select', VueSelect)
		Vue.component('vue-switch', VueSwitch)
	}
}

