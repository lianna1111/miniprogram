<template>
	<view>
		<view class="gui-padding bg-main gui-relative padding-bottom-120 margin-bottom-120">
			<view class="gui-margin gui-list-items">
				<view class="gui-list-image gui-relative">
					<image class="gui-list-image" :src="user.uid ? user.face : '/static/user/user.png'" style="width: 100rpx;height: 100rpx;"></image>
					<view class="gui-badge-point"></view>
				</view>
				<view class="gui-list-body margin-left-50" @tap="login">
					<view class="gui-list-title">
						<text class="gui-list-title-text gui-h5 gui-primary-color margin-top-5">{{user.uid ? user.nickname : '登录注册'}}</text>
					</view>
					<text class="gui-list-body-desc gui-color-gray">{{user.uid ? user.gradename : '用户角色'}}</text>
				</view>
				<text class="gui-list-arrow-right gui-icons gui-color-gray gui-h5">&#xe613;</text>
			</view>
			<view class="gui-grids gui-flex gui-rows gui-wrap gui-margin-top gui-bg-white gui-absolute-lb gui-box-shadow padding-tb-30 border-radius-15" style="left:30rpx;bottom: -90rpx;">
				<view class="gui-grids-items gui-flex gui-columns gui-align-items-center gui-grids4" v-for="item in listItem" v-if="item.sign == user.sign" @tap="jump(item.url)">
					<image class="gui-grids-icon-img" :src="item.src"></image>
					<text class="gui-grids-text gui-icons gui-primary-color">{{item.title}}</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		name  : "dui-header",
		props : {
			user       		: { type : Object, default : {}},
			listItem       	: { type : Array, default : []}
			
		},
		data() {
			return {
				userList		: [
					{id:1,title:'评论',value:'0',url:''},
					{id:2,title:'关注',value:'0',url:''},
					{id:3,title:'粉丝',value:'0',url:''},
					{id:4,title:'余额',value:'0',url:''}
				]
			}
		},
		methods:{
			login(){
				if(this.user.uid){
					uni.navigateTo({url:'../login/login'});
				}else{
					return false;
				}
			},
			jump(url){
				if(url.indexOf('/') != -1){
					uni.navigateTo({
						url:url,
						fail:function(){
							uni.switchTab({url:url});
						}
					});
				}else{
					switch(url){
						case '':
							break;
						default:
							
					}
				}
			}
		}
	}
</script>

<style scoped>
	.user-header{overflow: visible;padding-top: 20rpx;}
	.user-center{position: relative;width:630rpx;height:150rpx;margin-top:50rpx;padding-left: 30rpx;padding-right:30rpx;background-color: #FFF;border-top-left-radius: 15rpx;border-top-right-radius: 15rpx;}
	.user-face{position: absolute;top: -50rpx;left: 50rpx;padding-left: 30rpx;padding-right:30rpx;border-bottom-left-radius: 15rpx;border-bottom-right-radius: 15rpx;}
	.user-hand{width:630rpx;padding: 0 30rpx 30rpx 30rpx;background-color: #FFF;border-bottom-left-radius: 15rpx;border-bottom-right-radius: 15rpx;border-left: 1px solid #fff4d6;border-right: 1px solid #fff4d6;border-bottom: 1px solid #fff4d6;}
	.user-hand-item{border-top: 1px solid #fff4d6;padding-top: 30rpx;}
	
	.gui-box-shadow{box-shadow:0px 0px 5rpx #c8c7c7;}
	
	.gui-grids4{width: 172.5rpx;}
</style>
