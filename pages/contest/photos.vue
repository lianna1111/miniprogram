<template>
	<view>
		<image :src="pageHead.Filename" class="pageHead" mode=""></image>
		
		<view class="gui-margin">
			<view class="gui-h3">2022中国湖南国际标准舞公开赛</view>
			<view class="gui-h6" style="margin: 20rpx 0;">已有<text class="gui-color-blue">1343</text>人次浏览了该相册</view>
			<view class="gui-text-small gui-icons" style="margin: 10rpx 0;">&#xe607;  2022.08.16</view>
			<view class="gui-text-small gui-icons" style="margin: 10rpx 0;">&#xe61c;  湖南长沙</view>
		</view>
		
		<view class="gui-flex gui-space-between gui-tb-margin">
			<view class="gui-flex">
				<view class="gui-margin active">图片直播</view>
				<view class="gui-margin">热门</view>
			</view>
			<view class="gui-flex">
				<!-- 二维码 -->
				<view class=" gui-icons  gui-tb-margin" @tap="showCode">&#xe631;</view>
				<gui-popup ref="guipopup1">
					<view class="gui-relative gui-box-shadow gui-img-in">
						<gui-image :src="pageHead.Filename" :width="580"></gui-image>
						<view class="gui-padding gui-bg-white">
							<view class="gui-h3 gui-bold">2022中国湖南国际标准舞公开赛</view>
							<view class="gui-text-small gui-color-gray" style="margin: 10rpx 0;">2022.08.16</view>
							<view class="gui-text-small  gui-color-gray" style="margin: 10rpx 0;">湖南长沙</view>
								<gui-image src="https://img2.baidu.com/it/u=1989038259,1842360401&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500"
							 :width="300" :height="300" style='position: relative;left: 100rpx;}'></gui-image>	
						</view>
						<!-- 二维码关闭按钮 -->
						<text class="gui-block-text demo-close gui-icons gui-color-white "
						@tap.stop="closeCode">&#xe78a;</text>
					</view>
				</gui-popup>	
				<!-- 菜单 -->
				<text class="gui-icons gui-margin" @tap="showMenu" style="font-size:38rpx;">&#xe614;</text>
				<view>
					<gui-popup-menu @hideMenu="hideMenu" ref="gracePopupMenu" arrowDirection="right" top='60rpx'>
						<view class="gui-bg-white" style="border-radius:8rpx; padding:15rpx;">
							<text class="menus gui-block-text" @tap.stop="tap" data-id="1">瀑布流</text>
							<text class="menus gui-block-text" @tap.stop="tap" data-id="2">宫格式</text>
							<text class="menus gui-block-text" @tap.stop="tap" data-id="3">时间线</text>
						</view>
					</gui-popup-menu>
				</view>
			</view>
		</view>
		<view class="gui-flex gui-row gui-wrap">
			<view v-for="item in photos">
				<image :src="item.Filename" class="imglist" mode=""></image>
			</view>
		</view>
		
		
	<gui-iphone-bottom></gui-iphone-bottom>
	</view>
</template>

<script>
var graceJS = require('@/GraceUI5/js/grace.js');
	export default {
		data() {
			return {
				photos:[],
				pageHead:''
			}
		},
		onLoad() {
			
			this.getPhoto()
		},
		methods: {
		showCode  : function () {this.$refs.guipopup1.open();},
		closeCode : function () {this.$refs.guipopup1.close();},
			showMenu : function(){
				this.$refs.gracePopupMenu.open();
			},
			hideMenu : function(){
				this.$refs.gracePopupMenu.close();
			},
			tap : function(e){
				var id = e.currentTarget.dataset.id;
				uni.showToast({ title:'您点击了菜单 : ' + id, icon:"none"});
				this.$refs.gracePopupMenu.close();
			},
		 getPhoto(){
			 uni.request({
			     url:  this.domain+'photo', //提交表单
			 	method:'post',
			     data: {cid:'9'},
			       header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
			     success: (res) => {
			 		console.log(res,"res")
			 		if(res.data.errno=='0'){
			 			console.log(res.data.msg,'msg')
						
						res.data.msg.forEach((item,index)=>{
							if(item.Title=='封面'){
								this.pageHead=item
							}else{
								this.photos.push(item)
							}
						})
						console.log(this.pageHead,'1')
						console.log(this.photos,'2')
			 		}
			     },
			 	fail() {
			 		
			 	}
			 });
		 }
		}
	}
	
</script>

<style lang='scss' scoped>
.pageHead{width: 100%;}
.imglist{width: 240rpx;height: 240rpx;margin: 0 5rpx;border-radius: 10rpx;}
.active{color:#ffcb52;position: relative;}
.active:after{content: '';position: absolute;left: 50%;transform: translateX(-50%);bottom: -20rpx;height: 10rpx;width: 30rpx;border-radius: 5rpx;background-color:#ffcb52;}	
.demo-close{width:100rpx; height:100rpx;position: relative;top: 15rpx;left: 220rpx;line-height:100rpx; opacity:0.88; text-align:center; font-size:80rpx;}
.menus{line-height:88rpx; font-size:28rpx; margin-left:30rpx; text-align:left;}
.grace-popup-menu{top:60rpx;}
</style>
