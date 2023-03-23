(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["GraceUI5/components/gui-iphone-bottom"],{"19a8":function(e,t,n){"use strict";n.r(t);var o=n("cec4"),a=n("aa03");for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);var c,r=n("f0c5"),u=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,"0f1e2002",null,!1,o["a"],c);t["default"]=u.exports},"30c8":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={name:"gui-iphone-bottom",props:{height:{type:String,default:"50rpx"},isSwitchPage:{type:Boolean,default:!1}},data:function(){return{need:!1}},created:function(){this.setBottom()},methods:{setBottom:function(){if(!this.isSwitchPage){var t=e.getSystemInfoSync();t.model=t.model.replace(" ",""),t.model=t.model.toLowerCase();var n=t.model.indexOf("iphonex");n>5&&(n=-1);var o=t.model.indexOf("iphone1");o>5&&(o=-1),-1==n&&-1==o||(this.need=!0)}}}};t.default=n}).call(this,n("543d")["default"])},aa03:function(e,t,n){"use strict";n.r(t);var o=n("30c8"),a=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=a.a},cec4:function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o}));var a=function(){var e=this,t=e.$createElement;e._self._c},i=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'GraceUI5/components/gui-iphone-bottom-create-component',
    {
        'GraceUI5/components/gui-iphone-bottom-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("19a8"))
        })
    },
    [['GraceUI5/components/gui-iphone-bottom-create-component']]
]);
