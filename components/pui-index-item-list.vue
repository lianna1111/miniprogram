<template>
	<view>
		<view class="bodies gui-margin-top-large gui-flex gui-wrap gui-flex-center">
			<navigator  v-for="item in items" :url="item.url" class="each-btn">
				<image :src="item.src"></image><text>{{item.title}}</text>
			</navigator>
			
		</view>
	</view>
</template>

<script>
	export default{
		name  : "index-item-list",
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

<style lang="scss">
	.bodies {
		image{
		  width: 100rpx;
		  height: 100rpx;
		  margin: 20rpx 80rpx 0rpx;
		}
	    text{
			margin: 20rpx 0;
			font-size: 32rpx;
			font-weight: 600;
			color: #fff;
			text-shadow:5rpx 2rpx 2rpx #666;
	    }
	}
	.each-btn{
	  display: flex;
	  flex-direction: column;
	 align-items: center;
	 background-color: #8e92a5;
	 border-radius: 20rpx;
	 margin: 30rpx 55rpx;
	 box-shadow:5rpx 2rpx 5rpx #ccc;
	 &:nth-child(2n){
	   background-color: #ffbe0a;
	 }
	}
</style>
