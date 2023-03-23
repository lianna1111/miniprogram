(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/pui-upload-images"],{3189:function(t,i,e){},"64f2":function(t,i,e){"use strict";var s=e("3189"),r=e.n(s);r.a},8987:function(t,i,e){"use strict";(function(t,s){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var r=e("53e5"),a={name:"gui-upload-images",props:{maxFileNumber:{type:Number,default:9},btnName:{type:String,default:"添加照片"},items:{type:Array,default:function(){return[]}},removeBtnColor:{type:String,default:"rgba(0, 0, 0, 0.8)"},sourceType:{type:Array,default:function(){return["album","camera"]}},borderRadius:{type:String,default:"10rpx"},uploadServerUrl:{type:String,default:""},progressSize:{type:Number,default:2},progressColor:{type:String,default:"#27BD81"},progressBGColor:{type:String,default:"#F8F8F8"},fileName:{type:String,default:"img"},formData:{type:Object,default:function(){return{}}},imgMode:{type:String,default:"aspectFill"},header:{type:Object,default:function(){return{}}},save2uniCloud:{type:Boolean,default:!1}},data:function(){return{imgLists:[],updatting:!1,uploadUrl:""}},created:function(){this.initImgs()},watch:{items:function(){this.initImgs()}},methods:{initImgs:function(){for(var t=[],i=0;i<this.items.length;i++)t.push({Filename:this.items[i]});this.imgLists=t},addImg:function(){var i=this,e=this.maxFileNumber-this.imgLists.length;if(e<1)return!1;t.chooseImage({count:e,sizeType:["compressed"],sourceType:this.sourceType,success:function(e){if(!(i.imgLists.length>=i.maxFileNumber)){for(var s=0;s<e.tempFilePaths.length;s++){if(i.imgLists.length>=i.maxFileNumber)break;var r=i;t.uploadFile({url:r.domain+"upload/path/moments",filePath:e.tempFilePaths[s],name:"file",success:function(i){var e=JSON.parse(i.data);if(0!==e.errno)return t.showToast({title:e.msg,icon:"none"}),!1;r.imgLists.push({Filename:e.msg}),t.showToast({title:"上传成功",icon:"none"})}})}i.$emit("change",i.imgLists,i.uploadUrl)}},complete:function(){}})},removeImg:function(t){var i=t.currentTarget.id.replace("gui-items-img-",""),e=this.imgLists.splice(i,1);this.$emit("removeImg",e[0]),this.$emit("change",this.imgLists)},showImgs:function(i){for(var e=i.currentTarget.dataset.imgurl,s=[],r=0;r<this.imgLists.length;r++)s.push(this.imgLists[r].url);t.previewImage({urls:s,current:e})},setItems:function(t){this.imgLists=[];for(var i=0;i<t.length;i++)this.imgLists.push({url:t[i],progress:100});this.$emit("change",this.imgLists)},clearAllImgs:function(){this.imgLists=[]},retry:function(t){var i=t.currentTarget.dataset.index;this.upload(i)},upload:function(i){this.updatting||(this.updatting=!0,i||(i=0),t.showLoading({title:"图片上传中",mask:!0}),this.save2uniCloud?this.upload2cloud(i):this.uploadBase(i))},uploadBase:function(i){var e=this;if(i>this.imgLists.length-1)return t.hideLoading(),this.updatting=!1,void this.$emit("uploaded",this.imgLists);if(""!=this.uploadServerUrl)if(this.imgLists[i].progress>=1)this.uploadBase(i+1);else{this.imgLists[i].error=!1;var s=t.uploadFile({url:this.uploadServerUrl,filePath:this.imgLists[i].url,name:this.fileName,formData:this.formData,header:this.header,success:function(s){try{s=JSON.parse(s.data),"ok"!=s.status?(t.showToast({title:"上传失败 : "+s.data,icon:"none"}),e.error(i)):(e.imgLists[i].progress=100,e.imgLists[i].url=s.data,e.imgLists[i].result=s,e.uploadBase(i+1))}catch(r){e.error(i)}},fail:function(s){t.showToast({title:"上传失败，请点击图片重试",icon:"none"}),e.error(i)}});s.onProgressUpdate((function(t){t.progress>0&&(e.imgLists[i].progress=t.progress,e.imgLists.splice(i,1,e.imgLists[i]))}))}else t.showToast({title:"请设置上传服务器地址",icon:"none"})},error:function(i){var e=this;t.hideLoading(),this.updatting=!1,setTimeout((function(){e.imgLists[i].progress=0,e.imgLists[i].error=!0,e.imgLists.splice(i,1,e.imgLists[i]),e.$emit("uploaderror")}),500)},upload2cloud:function(i){var e=this;if(i>this.imgLists.length-1)return t.hideLoading(),this.updatting=!1,void this.$emit("uploaded",this.imgLists);this.imgLists[i].progress>=1?this.upload2cloud(i+1):(this.imgLists[i].error=!1,s.uploadFile({filePath:this.imgLists[i].url,cloudPath:r.uuid()+".png",onUploadProgress:function(t){var s=Math.round(100*t.loaded/t.total);e.imgLists[i].progress=s,e.imgLists.splice(i,1,e.imgLists[i])},success:function(t){e.imgLists[i].progress=100,e.imgLists[i].url=t.fileID,e.imgLists[i].result=t,e.imgLists.splice(i,1,e.imgLists[i]),e.upload2cloud(i+1)},fail:function(){t.showToast({title:"上传失败",icon:"none"}),e.error(i)}}))}}};i.default=a}).call(this,e("543d")["default"],e("a9ff")["default"])},9196:function(t,i,e){"use strict";e.r(i);var s=e("8987"),r=e.n(s);for(var a in s)"default"!==a&&function(t){e.d(i,t,(function(){return s[t]}))}(a);i["default"]=r.a},c25c:function(t,i,e){"use strict";e.r(i);var s=e("cf69"),r=e("9196");for(var a in r)"default"!==a&&function(t){e.d(i,t,(function(){return r[t]}))}(a);e("64f2");var n,o=e("f0c5"),u=Object(o["a"])(r["default"],s["b"],s["c"],!1,null,"9fc0ec86",null,!1,s["a"],n);i["default"]=u.exports},cf69:function(t,i,e){"use strict";var s;e.d(i,"b",(function(){return r})),e.d(i,"c",(function(){return a})),e.d(i,"a",(function(){return s}));var r=function(){var t=this,i=t.$createElement;t._self._c},a=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/pui-upload-images-create-component',
    {
        'components/pui-upload-images-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c25c"))
        })
    },
    [['components/pui-upload-images-create-component']]
]);