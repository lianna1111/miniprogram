<template>
	<view class="gui-relative">
		<view class="full-screen">
			<map class="full-screen"
			:scale="16" @markertap="markertap"
			:latitude="latitude" :longitude="longitude" 
			:markers="covers"></map>
		</view>
		<view class="card gui-padding ">
			<view class="gui-h3 title">明城国际大酒店</view>
			<view class="gui-color-gray gui-h6 gui-icons">&#xe63f;湖南省长沙市长沙县漓湘西路19号</view>
			<view class="gui-icons gui-margin-top " @tap='nav'>&#xe639;导航</view>
		</view>
		
		
	</view>
</template>
<script>
var graceJS = require('@/GraceUI5/js/grace.js');
export default {
	data() {
		return {
			latitude  : 28.224865, // 纬度
			longitude : 113.077881 ,//经度,
			covers    : [{
				id        : 1, 
				latitude  : 28.224865,
				longitude : 113.077881,
				iconPath  : '/static/location1.png',
				width     : 38,
				height    : 38
			}],
		
		}
	},
	methods:{
		nav() {  
		    wx.openLocation({
		      latitude:28.224865,	//维度
		      longitude: 113.077881, //经度
		      name: "明城国际大酒店",	//目的地定位名称
		      scale: 15,	//缩放比例
		      address: "湖南省长沙市长沙县漓湘西路19号"	//导航详细地址
		    })
		},
	}
}
</script>
<style scoped>
	page{
		width: 100vw;
		height: 100vh;
	}
	.card{
		position:absolute;
		bottom: 60rpx;
		left: 20rpx;
		width: 650rpx;
		height: 200rpx;
		background-color: #fff;
	}
	.title{
		width: 380rpx;
		height: 80rpx;
		background-color: #ffcc64;
		border-radius: 55rpx;
		padding: 20rpx 0 0 50rpx;
	}

</style>