(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["GraceUI5/components/gui-swiper"],{"1f72":function(t,e,i){"use strict";var n=i("7868"),r=i.n(n);r.a},"71fe":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"gui-swiper",props:{width:{type:Number,default:750},height:{type:Number,default:300},swiperItems:{type:Array,default:function(){return new Array}},borderRadius:{type:String,default:"10rpx"},indicatorBarHeight:{type:Number,default:68},indicatorBarBgColor:{type:String,default:"rgba(0,0,0,0)"},indicatorWidth:{type:Number,default:18},indicatorActiveWidth:{type:Number,default:18},indicatorHeight:{type:Number,default:18},indicatorRadius:{type:Number,default:18},indicatorColor:{type:String,default:"rgba(255, 255, 255, 0.6)"},indicatorActiveColor:{type:String,default:"#2B2E3D"},indicatorType:{type:String,default:"dot"},indicatorPosition:{type:String,default:"absolute"},indicatorDirection:{type:String,default:"center"},spacing:{type:Number,default:50},padding:{type:Number,default:26},interval:{type:Number,default:5e3},autoplay:{type:Boolean,default:!0},currentIndex:{type:Number,default:0},opacity:{type:Number,default:.66},titleColor:{type:String,default:"#FFFFFF"},titleSize:{type:String,default:"28rpx"}},data:function(){return{current:0,isReady:!1,widthIn:750,heightIn:300,widthInSamll:700,heightInSmall:280,paddingY:0}},watch:{currentIndex:function(t){this.current=t}},created:function(){this.current=this.currentIndex,this.init()},methods:{init:function(){this.widthIn=this.width-2*this.spacing,this.heightIn=this.height/this.width*this.widthIn,this.paddingY=this.padding*this.height/this.width,this.widthInSamll=this.widthIn-2*this.padding,this.heightInSmall=this.heightIn-2*this.paddingY},swiperchange:function(t){var e=t.detail.current;this.current=e,this.$emit("swiperchange",e)},taped:function(t){this.$emit("taped",t.currentTarget.dataset.index)}}};e.default=n},7868:function(t,e,i){},"93e2":function(t,e,i){"use strict";i.r(e);var n=i("71fe"),r=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=r.a},b301:function(t,e,i){"use strict";i.r(e);var n=i("d161"),r=i("93e2");for(var a in r)"default"!==a&&function(t){i.d(e,t,(function(){return r[t]}))}(a);i("1f72");var u,d=i("f0c5"),c=Object(d["a"])(r["default"],n["b"],n["c"],!1,null,"e0cde880",null,!1,n["a"],u);e["default"]=c.exports},d161:function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var r=function(){var t=this,e=t.$createElement;t._self._c},a=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'GraceUI5/components/gui-swiper-create-component',
    {
        'GraceUI5/components/gui-swiper-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("b301"))
        })
    },
    [['GraceUI5/components/gui-swiper-create-component']]
]);