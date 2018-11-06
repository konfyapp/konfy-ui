<template lang="pug">
	.test.events
		.msg {{msg}}
		input(
			type="text"
			@input="onInput"
		)
</template>

<script>
export default {
	name: 'test-events',

	data() {
		return {
			msg: 'hello'
		}
	},

	methods: {
		onInput(e){
			this.msg = e.data
			console.log(e)
		}
	}
}
</script>
