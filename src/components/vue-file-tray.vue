<template lang='pug'>
.vue-file-tray(
	:class="{over: over}"
	@dragover.stop.prevent="handleDragOver"
	@dragleave.stop.prevent="over = false"
	@drop.stop.prevent="handleDrop"
	@click.self="openFinderSelf"
	)
	input#input(
		ref="input"
		type="file"
		name="files[]"
		multiple
		@change="handleInput"
		)
	slot
</template>

<script>
export default {
	name: 'vue-file-tray',
	props: {
		maxFileSize: {
			type: Number,
			default: 10 // MB
		},
		maxFiles: {
			type: Number,
			default: 10 // Maximum number of files in the tray
		},
		accepted: {
			type: Array,
			default: () => ['image/*'] // Array of accepted mime types
		},
		dragAdd: {
			type: Boolean,
			default: true // Open finder on click
		},
		clickAdd: {
			type: Boolean,
			default: true // Open finder on click
		},
		thumbs: {
			type: Boolean,
			default: true // Should genereate thumbnails
		},
		thumbSizes: {
			type: Array,
			default: () => [300,300] // [width, height] in px
		},
		processImages: {
			type: Boolean,
			default: false // Should generate processed images
		},
		maxEdge: {
			type: Number,
			default: 1200 // Processed images largest dimenssion (px)
		},
		quality: {
			type: Number,
			default: 0.92 // JPEG processing quality 0-1
		}
	},
	data() {
		return {
			files: [],
			over: false
		}
	},
	computed: {},
	methods: {

		mimeBase(mime) {
			return mime.replace(/\/.*$/, '')
		},

		openFinder() {
			this.$refs.input.click()
		},

		openFinderSelf() {
			if (this.clickAdd) this.openFinder()
		},

		handleDragOver(event) {
			this.over = true
			event.dataTransfer.dropEffect = 'copy'
		},

		handleDrop(event) {
			this.over = false
			const files = event.dataTransfer.files
			this.handleFiles(files)
		},

		handleInput(event){
			const files = event.target.files
			this.handleFiles(files)
		},

		handleFiles(files) {
			for ( let i = 0; i < files.length; i++ ) {
				// test file SIZE, TYPE, TOTAL
				const typeOK = this.testAccepted( files[i].type)
				const sizeOK = this.maxFileSize * 1000000 > files[i].size
				const totalOK = this.files.length < this.maxFiles && parseInt(i) < this.maxFiles
				if ( !typeOK ) this.$emit( 'error:accepted', {accepted: this.accepted, file: files[i].type} )
				if ( !sizeOK ) this.$emit( 'error:maxFileSize', {max: this.maxFileSize, file: files[i].size} )
				if ( !totalOK ) this.$emit( 'error:maxFiles', this.maxFiles )
				// IF all good, load file to tray
				if ( typeOK && sizeOK && totalOK ) {
					this.loadFile( files[i] )
				}
				if (!totalOK) break
			}
		},

		testAccepted(type) {
			let result = false
			for (let accepted of this.accepted) {
				// if accepted is glob, e.g. 'image/*'
				if ( /\/\*$/.test(accepted) && this.mimeBase(type) === this.mimeBase(accepted) ){
					result = true
					break
				}
				if ( type === accepted ) {
					result = true
					break
				}
			}
			return result
		},

		async loadFile(file) {
			const dataURL = await this.getDataURL(file)
				.catch(
					err => console.log(err)
				)
			const isImage = this.mimeBase(file.type) === 'image'
			const fileData = {
				id: Date.now(), // sth. unique, to access file by id.
				status: 'pending',
				progress: 0,
				file: file
			}

			if (isImage && !this.thumbs) {
				fileData.dataURL = dataURL
			}

			// GENERATE THUMBS IF NEEDED
			if (isImage && this.thumbs) {
				fileData.thumbBlob = await this.getThumbBlob( dataURL, this.thumbSizes )
					.catch(
						err => console.log(err)
					)
				fileData.thumbURL = URL.createObjectURL(fileData.thumbBlob)
			}

			// GENERATE PROCESSED VERSION IF NEEDED
			if (isImage && this.processImages) {
				fileData.processedBlob = await this.getProcessedBlob( dataURL, this.maxEdge, file.type, this.quality )
					.catch(
						err => console.log(err)
					)
				fileData.processedURL = URL.createObjectURL(fileData.processedBlob)
			}

			this.files.push( fileData )
			this.$emit('file:added', fileData.id)
		},

		getDataURL(file){
			return new Promise( (resolve, reject) => {
				const reader = new FileReader()
				reader.readAsDataURL(file)
				reader.onload = (event) => resolve(event.target.result)
				reader.onerror = (err) => reject(err)
			})
		},

		getProcessedBlob(dataURL, edge, type = 'image/jpg', quality = 0.92){
			return new Promise( (resolve, reject) => {
				const img = document.createElement('img')
				img.src = dataURL
				img.onload = () => {
					const landscape = img.width > img.height
					// trueEdge prevents upscaling
					let trueEdge = edge
					if (landscape && edge < img.width) trueEdge = img.width
					if (!landscape && edge < img.height) trueEdge = img.height
					const canvas = document.createElement('canvas')
					const ctx = canvas.getContext('2d')
					canvas.width = landscape ? trueEdge : img.width * trueEdge / img.height
					canvas.height = landscape ? img.height * trueEdge / img.width : trueEdge

					ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
					canvas.toBlob( blob => resolve(blob), type, quality)
				}
				img.onerror = (err) => reject(err)
			})
		},

		getThumbBlob( dataURL, sizes ) {
			const w = sizes[0]
			const h = sizes[1]
			return new Promise( (resolve, reject) => {
				const img = document.createElement('img')
				img.src = dataURL
				img.onload = () => {
					const landscape = img.width > img.height
					const canvas = document.createElement('canvas')
					const ctx = canvas.getContext('2d')
					canvas.width = w
					canvas.height = h
					const sw = landscape ? img.width / img.height * h : w
					const sh = landscape ? h : img.height / img.width * w
					const sx = landscape ? (sw - w) / -2 : 0
					const sy = landscape ? 0 : (sh - h) / -4 // Not center (/-2), more to the top

					ctx.drawImage(img, sx, sy, sw, sh)
					canvas.toBlob( blob => resolve(blob), 'image/webp')
				}
				img.onerror = (err) => reject(err)
			})
		},

	},

	watch: {
		files( val, old ){
			this.$emit('files:changed')
		}
	}
}
</script>

<style scoped lang='stylus'>
#input
	display: none
</style>
