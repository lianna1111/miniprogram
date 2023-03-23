<template>
	<view>
		<view class="  gui-flex gui-wrap gui-flex-center gui-padding">
			<navigator  v-for="(item,index) in items" :key="index" :url="item.url" class="each-btn">
				<view class="gui-color-orange" style="font-size: 40rpx;font-family:‘Courier New’, Courier, monospace">{{item.title}}</view>
				<view class="gui-color-gray   gui-text-small">{{item.desc}}</view>
				<image :src="item.src" ></image>
			</navigator>
			
		</view>
	</view> 
</template>

<script>
	export default{
		name  : "chayan",
		props : {
			items    		: { type : Array,  default : []}
		},
		data() {
			return {
				
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	
	.each-btn{
		width: 43vw;
		height: 250rpx;
		box-sizing: border-box;
		position: relative;
	 /* display: flex;
	  flex-direction: column; */
	 /* align-items: center; */
	 background-color: #fff;
	 border-radius: 20rpx;
	 margin: 20rpx 10rpx;
	 padding: 20rpx;
	 box-shadow:5rpx 2rpx 40rpx #e6e6e6;
	}
	image{
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		bottom: 20rpx;
		right: 25rpx;
	}
</style>
