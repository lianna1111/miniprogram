<template>
	<!-- <gui-page :customHeader="true" :headerStyle="headerStyle" :statusBarStyle="statusBarStyle"> -->
		
		
		<view slot="gBody">
			<view class=" margin-top-100 text-center" >
				<image src="/static/logo.png" style="width: 150rpx;height: 150rpx;"></image>
			</view>
			
			<view class="gui-margin gui-flex gui-rows gui-nowrap gui-justify-content-center"
			style="width:80%;">
				<!-- <text class="gui-primary-color gui-h6 " @tap="quickLogin">一键登录</text> -->
				<text class="gui-primary-color gui-icons gui-h6  gui-color-gray gui-margin"  @tap="reg">
					<!-- <text class="gui-icons">&#xe629;</text> -->
					验证码登录</text>
					<text class="gui-primary-color gui-h6 gui-margin" style='border-bottom: #ffcb52 10rpx solid;'>账号密码登录</text>
				<!-- <text class="gui-lr-margin">|</text> -->
				
			</view>
			<view class="gui-margin gui-margin-top">
				<form @submit="submit" class="gui-margin">
					<view class="gui-form-item gui-margin form-input">
						<text class="gui-icons">&#xe6fe;</text>
						<view class="gui-form-body">
							<input type="text" class="gui-form-input" v-model="formData.username" name="username" placeholder="用户名/手机/邮箱" />
						</view>
					</view>
					<view class="gui-form-item gui-margin form-input">
						<text class="gui-icons">&#xe69e;</text>
						<view class="gui-form-body">
							<input type="text" class="gui-form-input" v-model="formData.password" name="password" placeholder="登录密码" />
						</view>
					</view>
					<view class="gui-margin gui-flex gui-rows gui-nowrap gui-align-items-center">
						<checkbox color="#008AFF" value="1" v-model="remember" :checked="remember" style="transform: scale(0.6);margin-top: -5rpx;"></checkbox>
						<text class="gui-primary-color gui-h6 gui-flex1 gui-color-gray" @tap="remember = !remember">记住登录状态</text>
						<text class="gui-primary-color gui-h6 gui-color-yellow" @tap="forget">忘记密码</text>
					</view>
					<view class="gui-margin margin-top-50">
						<button type="default" class="gui-button gui-bg-orange1 gui-noborder border-radius-50 " formType="submit">
							<text class="gui-color-white gui-button-text">登 录</text>
						</button>
					</view>
					
					
				</form>
			</view>
			
			<view style="100rpx"></view>
		</view>
	<!-- </gui-page> -->
</template>

<script>
	var graceChecker = require("@/GraceUI5/js/checker.js");
	export default{
		data(){
			return{
				title			: '用户登录',
				remember		: false,
				formData		: {username:'',password:'',numcode:''},
				backpage		: '../index/index'
			}
		},
		onLoad:function(options){
			// if(options.backpage){
			// 	this.backpage = options.backpage;
			// }
			// console.log(domain,'domain')
			console.log(this.domain,'this.domain')
		},
		methods:{
			quickLogin(){
				uni.navigateTo({url:'./index'});
			},
			forget(){
				uni.navigateTo({url:'./forget'});
			},
			reg() {
				// console.log("触发")
				// uni.getUserProfile({
				// 	desc: "获取你的昵称、头像",
				// 	success: (res) => {
				// 		console.log("所有",res)
				// 		uni.navigateTo({url:'./reg?nickName='+res.userInfo.nickName+'&avatarUrl='+res.userInfo.avatarUrl});
				// 	},
				// 	fail() {
						
				// 	}
				// })
				uni.navigateTo({url:'./reg'});
			},
			submit(e){
				var rule = [
					{name:"username", checkType : "string", checkRule:"1,", errorMsg:"请输入用户名"},
					{name:"password", checkType : "string", checkRule:"1,", errorMsg:"靖输入密码"}
				];
				var checkRes = graceChecker.check(this.formData, rule);
				if(checkRes){
					var that = this;
					uni.request({
						url: that.domain+'login',
						data: that.formData,
						method: 'POST',
						header:{token:that.token,'content-type': 'application/x-www-form-urlencoded'},
						success:function(res){
							console.log(res)
							if(res.data.errno === 0){
								// console.log(this.domain + 'login');									
									uni.setStorageSync('uid',res.data.msg.uid);
									// uni.setStorageSync('gid',res.data.msg.gid);
									// uni.setStorageSync('sid',res.data.msg.sid);
									// uni.setStorageSync('username',res.data.msg.username);
									// uni.setStorageSync('realname',res.data.msg.realname);
									// uni.setStorageSync('nickname',res.data.msg.nickname);
									// uni.setStorageSync('gradename',res.data.msg.gradename);
									// uni.setStorageSync('face',res.data.msg.face);
									// uni.setStorageSync('pic',res.data.msg.pic);
									// uni.setStorageSync('code',res.data.msg.code);
									// uni.setStorageSync('sign',res.data.msg.sign);
									// uni.setStorageSync('token',res.data.msg.token);
								
									uni.showToast({
										title:"登录成功!",
										icon:"none",
										success:function(){
											// uni.navigateTo({
											// url:'../id/idcard',
											// });//原版
											// uni.switchTab({
											// url:'../index/index',//健康码版
											// });
											// uni.setStorageSync('utype','5')//健康码版
											//摄影师版本
											uni.reLaunch({
												url:'../index/index?sign='+res.data.msg.sign
												});
											
										}
									});
							}else{
								uni.showToast({ title: res.data.msg, icon: "none" });
								return false;
							}
						},
						fail:function(res){
							uni.showToast({title:"网络通讯错误!", icon:"none"});
							return false;
						}
					})
				}else{
					uni.showToast({ title: graceChecker.error, icon: "none" });
					return false;
				}
			}
		}
	}
</script>

<style>
	.form-input{
		border: 1rpx solid #BEBEBE;
		border-radius: 20rpx;
		margin-bottom: 30rpx;
		background-color: #FCFCFC;
	}
	.form-input > text.gui-icons{
		margin-left: 25rpx;
	}
</style>
