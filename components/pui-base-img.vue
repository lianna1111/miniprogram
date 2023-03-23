<template>
	<view class="gui-flex gui-rows gui-nowrap">
		<view class="gui-text-block gui-color-gray text-center" style="width:100%;margin-top: 200rpx;" @tap="jump">
			<image :src="item.src" :style="style"></image>
			<view class="gui-text-block gui-h5 gui-color-gray text-center margin-top-15">
				{{item.title}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name  : "pui-base-img",
		props : {
			item				: { type : Object, default(){return {}}},
			width				: { type : Number, default(){return 0}},
			height				: { type : Number, default(){return 0}},
			marginTop			: { type : Number, default(){return 0}}
		},
		data() {
			return {
				style:''
			}
		},
		created() {
			this.setStyle();
		},
		methods:{
			setStyle:function(){
				if(this.width > 0){
					this.style += 'width:'+this.width+'rpx;';
				}
				if(this.height > 0){
					this.style += 'height:'+this.height+'rpx;';
				}
				if(this.marginTop > 0){
					this.style += 'margin-top:'+this.marginTop+'rpx;';
				}
			},
			jump:function(){
				var url = this.item.url;
				uni.navigateTo({
					url:url,
					fail:function(){
						uni.switchTab({url:url});
					}
				});
			}
		}
	}
</script>

<style>
</style>
