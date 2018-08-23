<template>
	<div class="home">
		<file-tray></file-tray>
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import FileTray from '@/components/vue-file-tray'

export default {
	name: 'home',
	components: {
		HelloWorld, FileTray
	}
}
</script>
