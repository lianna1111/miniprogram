(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/index"],{"25db":function(t,e,i){"use strict";i.r(e);var n=i("f5bb"),s=i.n(n);for(var c in n)"default"!==c&&function(t){i.d(e,t,(function(){return n[t]}))}(c);e["default"]=s.a},6647:function(t,e,i){"use strict";var n=i("6bfb"),s=i.n(n);s.a},"6bfb":function(t,e,i){},8645:function(t,e,i){"use strict";i.r(e);var n=i("f2a5"),s=i("25db");for(var c in s)"default"!==c&&function(t){i.d(e,t,(function(){return s[t]}))}(c);i("6647");var r,a=i("f0c5"),d=Object(a["a"])(s["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);e["default"]=d.exports},c1ad:function(t,e,i){"use strict";(function(t){i("9557");n(i("66fd"));var e=n(i("8645"));function n(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=i,t(e.default)}).call(this,i("543d")["createPage"])},f2a5:function(t,e,i){"use strict";i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return c})),i.d(e,"a",(function(){return n}));var n={guiImage:function(){return i.e("GraceUI5/components/gui-image").then(i.bind(null,"e8e3"))},guiSwiper:function(){return i.e("GraceUI5/components/gui-swiper").then(i.bind(null,"b301"))}},s=function(){var t=this,e=t.$createElement;t._self._c},c=[]},f5bb:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{src:"../../static/user/user.png",headerStyle:"background:#ffcb52",statusBarStyle:"background:#ffcb52",gradename:"",user:{},nickname:"",grade:["切换家长/学生","家长","学生"],gradeIndex:"0",text:"认证用户身份",itemList:[],swiperItems:[{img:"https://img.yiwenyw.com/contest/20220801114612_942.png",url:""},{img:"https://img.yiwenyw.com/contest/20220801114616_652.png",url:"https://www.cida168.com",opentype:"navigate"}]}},onLoad:function(){console.log("onload"),t.getStorageSync("uid")||t.redirectTo({url:"../login/reg"});try{var e=t.getStorageSync("utype");this.nickname=t.getStorageSync("nickname"),this.src=t.getStorageSync("face"),0==e?(this.gradename="机构",this.itemList=[{id:1,title:"校区",src:"",desc:"",url:"../institution/campus"},{id:2,title:"考试报名系统",src:"",desc:"",url:"../institution/exam"},{id:2,title:"考官签约",src:"",desc:"",url:"../examiner/examiner"},{id:3,title:"财务统计",src:"",desc:"",url:"../institution/finance"}]):1==e?(this.gradename="考官",this.itemList=[{id:1,title:"考级项目",src:"",desc:"",url:"../examiner/exam"},{id:2,title:"考试通知",src:"",desc:"",url:"#"}]):2==e?(this.gradename="教师",this.itemList=[{id:1,title:"朋友圈",src:"/static/index/enroll.png",desc:"",url:"../teacher/pyq"},{id:2,title:"学员管理",src:"/static/index/enroll.png",desc:"",url:"../student/student?campusID="+this.id},{id:3,title:"课程管理",src:"/static/index/enroll.png",desc:"",url:"../class/class?campusID="+this.id},{id:4,title:"班级管理",src:"/static/index/enroll.png",desc:"",url:"../classes/index?campusID="+this.id},{id:5,title:"家长互动",src:"/static/index/yijian.png",desc:"",url:"../teacher/contact"}]):3==e?(this.gradename="家长",this.itemList=[{id:1,title:"个人中心",src:"/static/index/yijian.png",desc:"",url:"#"},{id:1,title:"作业提醒",src:"/static/index/upload.png",desc:"",url:"#"},{id:2,title:"课表提醒",src:"/static/index/yijian.png",desc:"",url:"#"},{id:2,title:"签到提醒",src:"/static/index/yijian.png",desc:"",url:"#"},{id:2,title:"好友圈",src:"/static/index/upload.png",desc:"",url:"#"},{id:2,title:"交易系统",src:"/static/index/enroll.png",desc:"",url:"#"},{id:2,title:"积分",src:"/static/index/enroll.png",desc:"",url:"#"}]):4==e?(this.gradename="学生",this.itemList=[{id:1,title:"个人中心",src:"/static/index/yijian.png",desc:"",url:"#"},{id:1,title:"作业提醒",src:"/static/index/upload.png",desc:"",url:"#"},{id:2,title:"课表提醒",src:"/static/index/yijian.png",desc:"",url:"#"}]):5==e?(this.gradename="游客",this.itemList=[{id:1,title:"疫情信息统计",src:"/static/index/enroll.png",desc:"",url:"../index/health"}]):6==e&&(this.gradename="摄影师",this.itemList=[{id:1,title:"疫情信息统计",src:"/static/index/enroll.png",desc:"",url:"../index/health"},{id:2,title:"精彩瞬间",src:"/static/index/enroll.png",desc:"",url:"../photograph/index"}])}catch(i){}},methods:{pickerChangegrade:function(e){console.log(e),this.gradeIndex=e.detail.value,"家长"==this.grade[this.gradeIndex]?(t.setStorageSync("utype","3"),this.gradename="家长"):"学生"==this.grade[this.gradeIndex]&&(t.setStorageSync("utype","4"),this.gradename="学生")},opentop:function(){this.$refs.guimodal1.open()},closetop:function(){this.$refs.guimodal1.close()},confirmtop:function(){t.redirectTo({url:"../id/idcard"})},login:function(){utype||t.navigateTo({url:"../login/login"})},logout:function(){}}};e.default=i}).call(this,i("543d")["default"])}},[["c1ad","common/runtime","common/vendor"]]]);