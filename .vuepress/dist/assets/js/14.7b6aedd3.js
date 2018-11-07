(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{152:function(e,t,n){},197:function(e,t,n){"use strict";var r=n(152);n.n(r).a},242:function(e,t,n){"use strict";n.r(t);n(194),n(195);var r=n(196),i=(n(122),n(123),n(22),n(127),n(120),{name:"vue-file-tray",props:{maxFileSize:{type:Number,default:10},maxFiles:{type:Number,default:10},accepted:{type:Array,default:function(){return["image/*"]}},dragAdd:{type:Boolean,default:!0},clickAdd:{type:Boolean,default:!0},thumbs:{type:Boolean,default:!0},thumbSizes:{type:Array,default:function(){return[300,300]}},processImages:{type:Boolean,default:!1},maxEdge:{type:Number,default:1200},quality:{type:Number,default:.92}},data:function(){return{files:[],over:!1}},computed:{},methods:{mimeBase:function(e){return e.replace(/\/.*$/,"")},openFinder:function(){this.$refs.input.click()},openFinderSelf:function(){this.clickAdd&&this.openFinder()},handleDragOver:function(e){this.over=!0,e.dataTransfer.dropEffect="copy"},handleDrop:function(e){this.over=!1;var t=e.dataTransfer.files;this.handleFiles(t)},handleInput:function(e){var t=e.target.files;this.handleFiles(t)},handleFiles:function(e){for(var t=0;t<e.length;t++){var n=this.testAccepted(e[t].type),r=1e6*this.maxFileSize>e[t].size,i=this.files.length<this.maxFiles&&parseInt(t)<this.maxFiles;if(n||this.$emit("error:accepted",{accepted:this.accepted,file:e[t].type}),r||this.$emit("error:maxFileSize",{max:this.maxFileSize,file:e[t].size}),i||this.$emit("error:maxFiles",this.maxFiles),n&&r&&i&&this.loadFile(e[t]),!i)break}},testAccepted:function(e){var t=!1,n=!0,r=!1,i=void 0;try{for(var a,o=this.accepted[Symbol.iterator]();!(n=(a=o.next()).done);n=!0){var s=a.value;if(/\/\*$/.test(s)&&this.mimeBase(e)===this.mimeBase(s)){t=!0;break}if(e===s){t=!0;break}}}catch(e){r=!0,i=e}finally{try{n||null==o.return||o.return()}finally{if(r)throw i}}return t},loadFile:function(){var e=Object(r.a)(regeneratorRuntime.mark(function e(t){var n,r,i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getDataURL(t).catch(function(e){return console.log(e)});case 2:if(n=e.sent,r="image"===this.mimeBase(t.type),i={id:Date.now(),status:"pending",progress:0,file:t},r&&!this.thumbs&&(i.dataURL=n),!r||!this.thumbs){e.next=11;break}return e.next=9,this.getThumbBlob(n,this.thumbSizes).catch(function(e){return console.log(e)});case 9:i.thumbBlob=e.sent,i.thumbURL=URL.createObjectURL(i.thumbBlob);case 11:if(!r||!this.processImages){e.next=16;break}return e.next=14,this.getProcessedBlob(n,this.maxEdge,t.type,this.quality).catch(function(e){return console.log(e)});case 14:i.processedBlob=e.sent,i.processedURL=URL.createObjectURL(i.processedBlob);case 16:this.files.push(i),this.$emit("file:added",i.id);case 18:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),getDataURL:function(e){return new Promise(function(t,n){var r=new FileReader;r.readAsDataURL(e),r.onload=function(e){return t(e.target.result)},r.onerror=function(e){return n(e)}})},getProcessedBlob:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"image/jpg",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:.92;return new Promise(function(i,a){var o=document.createElement("img");o.src=e,o.onload=function(){var e=o.width>o.height,a=t;e&&t<o.width&&(a=o.width),!e&&t<o.height&&(a=o.height);var s=document.createElement("canvas"),u=s.getContext("2d");s.width=e?a:o.width*a/o.height,s.height=e?o.height*a/o.width:a,u.drawImage(o,0,0,s.width,s.height),s.toBlob(function(e){return i(e)},n,r)},o.onerror=function(e){return a(e)}})},getThumbBlob:function(e,t){var n=t[0],r=t[1];return new Promise(function(t,i){var a=document.createElement("img");a.src=e,a.onload=function(){var e=a.width>a.height,i=document.createElement("canvas"),o=i.getContext("2d");i.width=n,i.height=r;var s=e?a.width/a.height*r:n,u=e?r:a.height/a.width*n,c=e?(s-n)/-2:0,l=e?0:(u-r)/-4;o.drawImage(a,c,l,s,u),i.toBlob(function(e){return t(e)},"image/webp")},a.onerror=function(e){return i(e)}})}},watch:{files:function(e,t){this.$emit("files:changed")}}}),a=(n(197),n(6)),o=Object(a.a)(i,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vue-file-tray",class:{over:e.over},on:{dragover:function(t){return t.stopPropagation(),t.preventDefault(),e.handleDragOver(t)},dragleave:function(t){t.stopPropagation(),t.preventDefault(),e.over=!1},drop:function(t){return t.stopPropagation(),t.preventDefault(),e.handleDrop(t)},click:function(t){return t.target!==t.currentTarget?null:e.openFinderSelf(t)}}},[n("input",{ref:"input",attrs:{id:"input",type:"file",name:"files[]",multiple:""},on:{change:e.handleInput}}),e._t("default")],2)},[],!1,null,"140d73a1",null);o.options.__file="vue-file-tray.vue";t.default=o.exports}}]);