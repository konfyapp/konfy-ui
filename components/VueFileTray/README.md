# vue-file-tray 

Component for adding files to the browser.

**IMPORTANT**: This component uses JavaScript [canvas.toBlob](http://www.w3.org/TR/html5/scripting-1.html#dom-canvas-toblob) method. This method is not supported by mobile browsers. To work properly in mobile browsers, you need a polyfill. You can add [blueimp-canvas-to-blob](https://github.com/blueimp/JavaScript-Canvas-to-Blob) to your project.

- lightweight
- "renderless"
- no external library
- generate thumbs and process images

`vue-file-tray` is a component for adding and processing files. Most common use case is of course uploading files to server, but `file-tray` does not do any uploading on it's own. Instead, it stores the files objects in accessible `files` data property, so you can process them however you like.

`vue-file-tray` is a modern web component – it uses `canvas` for processing thumbnails and crunching images, and it uses `DataEvent` for transferring file data to browser. it **does not** provide fallback support for old IE browsers.

Front end users can add files to `vue-file-tray` by dropping them over it, or using standard browser dialog. The latter option will then also work on mobile.

`vue-file-tray` can take care of validation, will generate data for thumbnails or resized images. How to further upload or process the files is up to you.

`vue-file-tray` is a **single element component** – it's just a plain `<div>` and has no default styling. This makes `vue-file-tray` a very flexible component. Remember to add some styling when you render it, otherwise it will not be visible. It also has a default slot, so it can contain any HTML. This is useful for e.g. rendering thumbnails.

**[Full documentation](https://konfy-ui.netlify.com/vue-file-tray.html)**