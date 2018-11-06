<template>
	<div class="home">
		<h1 @click="$emit('test', 10)">Emmiter</h1>
		<file-tray></file-tray>
	</div>
</template>

<script>
// @ is an alias to /src
import FileTray from '@/components/vue-file-tray'

export default {
	name: 'home',
	components: {
		FileTray
	}
}
</script>
