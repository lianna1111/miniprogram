(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/index"],{"154d":function(o,e,n){"use strict";(function(o){n("9557");t(n("66fd"));var e=t(n("889d"));function t(o){return o&&o.__esModule?o:{default:o}}wx.__webpack_require_UNI_MP_PLUGIN__=n,o(e.default)}).call(this,n("543d")["createPage"])},"1ddf":function(o,e,n){"use strict";(function(o,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={data:function(){return{title:"一键登录"}},onLoad:function(o){},onShow:function(){this.login()},methods:{login:function(){o.preLogin({provider:"univerify",success:function(e){console.log(e),o.login({provider:"univerify",univerifyStyle:{fullScreen:!0,backgroundColor:"#ffffff",backgroundImage:"",icon:{path:"/static/logo.png"},phoneNum:{color:"#202020"},slogan:{color:"#BBBBBB"},authButton:{normalColor:"#ffbe0b",highlightColor:"#c69100",disabledColor:"#b9b9b8",textColor:"#ffffff",title:"本机号码一键登录",borderRadius:"24px"},otherLoginButton:{visible:!0,normalColor:"",highlightColor:"",textColor:"#656565",title:"其他登录方式",borderColor:"",borderRadius:"0px"},privacyTerms:{defaultCheckBoxState:!0,uncheckedImage:"",checkedImage:"",checkBoxSize:12,textColor:"#BBBBBB",termsColor:"#5496E3",prefix:"我已阅读并同意",suffix:"并使用本机号码登录",privacyItems:[{url:"https://api.yiwenyw.com/agree",title:"用户服务协议"}]},buttons:{iconWidth:"45px",list:[{provider:"apple",iconPath:"/static/apple.png"},{provider:"weixin",iconPath:"/static/weixin.png"}]}},success:function(e){var t=e.authResult;console.log(t),n.callFunction({name:"getPhoneNumber",data:{access_token:t.access_token,openid:t.openid}}).then((function(e){console.log(e),o.closeAuthView()})).catch((function(o){}))},fail:function(e){o.showToast({title:e.errMsg,icon:"none"}),o.closeAuthView()},complete:function(){o.closeAuthView()}})},fail:function(e){o.showToast({title:"预登录失败或非移动终端",icon:"none"})}})},switchLogin:function(){console.log("switchLogin")},changeLogin:function(){o.navigateTo({url:"./login"})},changeAgree:function(){this.isAgree=!this.isAgree}}};e.default=t}).call(this,n("543d")["default"],n("a9ff")["default"])},"30cf":function(o,e,n){"use strict";n.r(e);var t=n("1ddf"),i=n.n(t);for(var c in t)"default"!==c&&function(o){n.d(e,o,(function(){return t[o]}))}(c);e["default"]=i.a},"889d":function(o,e,n){"use strict";n.r(e);var t=n("bcea"),i=n("30cf");for(var c in i)"default"!==c&&function(o){n.d(e,o,(function(){return i[o]}))}(c);var r,u=n("f0c5"),l=Object(u["a"])(i["default"],t["b"],t["c"],!1,null,null,null,!1,t["a"],r);e["default"]=l.exports},bcea:function(o,e,n){"use strict";var t;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return t}));var i=function(){var o=this,e=o.$createElement;o._self._c},c=[]}},[["154d","common/runtime","common/vendor"]]]);