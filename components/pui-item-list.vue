<template>
	<view>
		<!-- <view class="gui-flex gui-rows gui-nowrap gui-align-items-center list-item gui-border-b" v-for="item in items"> -->
			<navigator class="gui-flex gui-rows gui-nowrap gui-align-items-center list-item gui-border-b" v-for="item in items" :url="item.url">
			<text class="gui-icons gui-title-icon gui-color-blue gui-bold">&#xe624;</text>
			<text class="gui-primary-color gui-h5 gui-flex1">{{item.title}}</text>
			<text class="gui-icons gui-h4 gui-color-gray padding-right-15">{{item.desc}} &#xe601;</text>
			</navigator>
		<!-- </view> -->
	</view>
</template>

<script>
	export default{
		name  : "item-list",
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

<style>
	.list-item{padding-top: 30rpx;padding-bottom: 30rpx;}
	.list-item:last-child{border-bottom: unset;}
</style>
