---
title: vue-file-tray 
version: 1.0.0
---
# vue-file-tray 
![npm](https://img.shields.io/npm/v/@konfy/vue-file-tray.svg)

Component for adding files to the browser.

## Installation

```bash
yarn add @konfy/vue-file-tray
```

::: warning
**IMPORTANT**: This component uses JavaScript [canvas.toBlob](http://www.w3.org/TR/html5/scripting-1.html#dom-canvas-toblob) method. This method is not supported by mobile browsers. To work properly in mobile browsers, you need a polyfill. You can add [blueimp-canvas-to-blob](https://github.com/blueimp/JavaScript-Canvas-to-Blob) to your project.
:::

- lightweight
- "renderless"
- no external library
- generate thumbs and process images

`vue-file-tray` is a component for adding and processing files. Most common use case is of course uploading files to server, but `file-tray` does not do any uploading on it's own. Instead, it stores the files objects in accessible `files` data property, so you can process them however you like.

`vue-file-tray` is a modern web component – it uses `canvas` for processing thumbnails and crunching images, and it uses `DataEvent` for transferring file data to browser. it **does not** provide fallback support for old IE browsers.

Front end users can add files to `vue-file-tray` by dropping them over it, or using standard browser dialog. The latter option will then also work on mobile.

`vue-file-tray` can take care of validation, will generate data for thumbnails or resized images. How to further upload or process the files is up to you.

::: tip
`vue-file-tray` is a **single element component** – it's just a plain `<div>` and has no default styling. This makes `vue-file-tray` a very flexible component. Remember to add some styling when you render it, otherwise it will not be visible. It also has a default slot, so it can contain any HTML. This is useful for e.g. rendering thumbnails.
:::
---
<vp-holder>
- Basic example with very minimal styling.
- Drop files, or click to open file dialog.
- Display thumbs. Only images and pdfs accepted.
<vp-file-tray-wrap/>

_Template:_

```html
<vue-file-tray ref="tray" @files:changed="updateTrayFiles" :accepted="['image/*','application/pdf']">
    <div class="file" v-for="file in trayFiles">
        <img :src="file.thumbURL" />
        <span> {{file.file.type}} </span>
    </div>
</vue-file-tray>
```
_Script:_
```js
export default {
    //...
	data(){
		return { trayFiles: null }
	},
	methods: {
		updateTrayFiles(){
			this.trayFiles = this.$refs.tray.files
		}
	}
}
```
</vp-holder>

## props

| property        | type    | default       | comment                                  |
| --------------- | ------- | ------------- | ---------------------------------------- |
| `maxFileSize`   | Number  | `10`          | Max file size in MB.                     |
| `maxFiles`      | Number  | `10`          | Max number of files you can add.         |
| `accepted`      | Array   | `['image/*']` | Accepted mime types.                     |
| `dragAdd`       | Boolean | `true`        | Allow for adding files by drag and drop. |
| `clickAdd`      | Boolean | `true`        | Open file dialog on click                |
| `thumbs`        | Boolean | `true`        | Should genereate thumbnails              |
| `thumbSizes`    | Array   | `[300,300]`   | `[width, height]` in px                  |
| `processImages` | Boolean | `false`       | Should generate processed images         |
| `maxEdge`       | Number  | `1200`        | Processed images largest dimenssion (px) |
| `quality`       | Number  | `0.92`        | JPEG processing quality 0-1              |

## data

| property | comment                                  |
| -------- | ---------------------------------------- |
| `files`  | Array of files in the file-tray. Also contains thumb Blob, thumb url, processed Blob and processed url. |
| `over`   | Boolean – whether files are dragged over. |

## methods

| method         | args | comment           |
| -------------- | ---- | ----------------- |
| `openFinder()` | —    | Open file dialog. |

## events

| name                | payload                                       | comment                         |
| ------------------- | --------------------------------------------- | ------------------------------- |
| `error:accepted`    | Object: `{accepted: <Array>, file: <String>}` | Rejected mime type.             |
| `error:maxFileSize` | Object: `{max: <Number>, file: <Number>}`     | File too large.                 |
| `error:maxFiles`    | Max files limit: `Number`                     | Too many files.                 |
| `file:added`        | file.id: `Number`                             | File added. Payload is file ID. |
| `files:changed`     | –                                             | Any changes to `files` property |

