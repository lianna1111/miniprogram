(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"2c52":function(e,t,n){"use strict";n.r(t);var r=n("7a23"),o=n.n(r);for(var u in r)"default"!==u&&function(e){n.d(t,e,(function(){return r[e]}))}(u);t["default"]=o.a},4816:function(e,t,n){"use strict";(function(e){n("9557");var t=u(n("66fd")),r=u(n("724d")),o=u(n("65ec"));function u(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}wx.__webpack_require_UNI_MP_PLUGIN__=n,t.default.prototype.mainTitle="",t.default.prototype.domain="https://api.yiwenyw.com/",t.default.prototype.picurl="https://admin.yiwenyw.com/upload/",t.default.prototype.token="saksl",t.default.mixin(o.default),t.default.config.productionTip=!1,r.default.mpType="app";var f=new t.default(i({},r.default));e(f).$mount()}).call(this,n("543d")["createApp"])},"5fdf":function(e,t,n){"use strict";var r=n("bbd0"),o=n.n(r);o.a},"724d":function(e,t,n){"use strict";n.r(t);var r=n("2c52");for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);n("5fdf");var u,a,i,c,f=n("f0c5"),p=Object(f["a"])(r["default"],u,a,!1,null,null,null,!1,i,c);t["default"]=p.exports},"7a23":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={onLaunch:function(){this.overshare()},onShow:function(){},onHide:function(){},methods:{overshare:function(){wx.onAppRoute((function(e){var t,n=getCurrentPages(),r=n[n.length-1];r&&(t=r.data,t.isOverShare||(t.isOverShare=!0,r.onShareAppMessage=function(){return{title:"奕文艺舞",desc:"",imageUrl:"https://img.yiwenyw.com/contest/20220729185908_172.png",path:"/pages/index/index"}}))}))}}};t.default=r},bbd0:function(e,t,n){}},[["4816","common/runtime","common/vendor"]]]);