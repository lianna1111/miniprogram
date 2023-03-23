<template>
	<!-- <gui-page :customHeader="true" :headerStyle="headerStyle" :statusBarStyle="statusBarStyle"> -->
		
		
		<view slot="gBody">
			<view class=" margin-top-100 text-center">
				<image src="/static/logo.png" style="width: 150rpx;height: 150rpx;"></image>
			</view>
			<view class="gui-margin gui-flex gui-rows gui-nowrap gui-justify-content-center"
			style="width:80%;">
				<!-- <text class="gui-primary-color gui-h6 " @tap="quickLogin">一键登录</text> -->
				
					<text class="gui-primary-color gui-h6 gui-margin" style='border-bottom: #ffcb52 10rpx solid;' >验证码登录</text>
				<text class="gui-primary-color gui-icons gui-h6  gui-color-gray gui-margin"  @tap="login">
					<!-- <text class="gui-icons">&#xe629;</text> -->
					账号密码登录</text>
					<!-- <text class="gui-lr-margin">|</text> -->
				
			</view>
			
			<view class="gui-margin gui-margin-top">
				<form @submit="submit" class="gui-margin">
				
					<view class="gui-form-item gui-margin form-input">
						<text class="gui-icons">&#xe629;</text>
						<view class="gui-form-body">
							<input type="text" class="gui-form-input" v-model="formData.username" name="username" placeholder="手机号" />
						</view>
					</view>
					
					<view class="gui-margin gui-flex gui-rows gui-nowrap gui-align-items-center">
						<checkbox color="#008AFF" value="1" v-model="remember" :checked="remember" style="transform: scale(0.6);margin-top: -5rpx;"></checkbox>
						<text class="gui-primary-color gui-h6 gui-flex1 gui-color-gray" @tap="remember = !remember">记住登录状态</text>
						<text class="gui-primary-color gui-h6 gui-color-gray" >未注册手机号将自动注册</text>
					</view>
					<view class="gui-margin margin-top-50">
						<button type="default" class="gui-button gui-bg-orange1 gui-noborder border-radius-50" formType="submit">
							<text class="gui-color-white gui-button-text" >获取验证码</text>
						</button>
					</view>
					<!-- <view class="gui-margin gui-flex gui-rows gui-nowrap gui-justify-content-center"
					style="width:80%;position: absolute;bottom: 20rpx;">
						<text class="gui-primary-color gui-h6 " @tap="quickLogin">一键登录</text>
						<text class="gui-lr-margin">|</text>
						<text class="gui-primary-color gui-icons gui-h6"  @tap="login">账号密码登录</text>
					</view> -->
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
				nickname:'',
				formData		: {username:'',numcode:''},
				backpage		: './reg'
			}
		},
		onLoad:function(options){
			// if(options.backpage){
			// 	this.backpage = options.backpage;
			// }
			// this.avatarUrl=options.avatarUrl
			// this.nickName=options.nickName
			
		// this.onlogin()
		// this.userInfo()	
			    
		},
		methods:{
			onlogin(){
				var that =this;
				
				//unionid sessionid
				uni.login({
				  success (res) {
				    if (res.code) {
				      //发起网络请求
				     uni.request({
						 url: that.domain+'wechat/session',
						 method: 'post',
						 data: {
						 	code:res.code
						 },
				     	
				     	  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
				     	success: (res) => {
				     		console.log(res,'res')
							uni.setStorageSync('unionId', res.data.unionid);
							uni.setStorageSync('openId', res.data.openid);
						
				     	},
				     })	
				    } else {
				      console.log('登录失败！' ,res.errMsg)
				    }
				  }
				})
				//昵称头像
				uni.getUserProfile({
					desc: "获取你的昵称、头像",
					success: (res) => {
						console.log("所有",res)
						// this.avatarUrl=res.userInfo.nickName
						// this.nickName=res.userInfo.avatarUrl
						uni.setStorageSync('wechatname', res.userInfo.nickName);
						uni.setStorageSync('face',res.userInfo.avatarUrl);
						uni.navigateTo({ url: './pin'})
					},
					fail() {
						
					}
				})
			},
			
			login(){
				uni.navigateTo({url:'./login'});
			},
			quickLogin(){
				uni.navigateTo({url:'./index'});
			},
			submit : function(e){
			
				var rule = [
					{name:"username", checkType : "string", checkRule:"10,11", errorMsg:"请输入正确的手机号"},
				];
				var checkRes = graceChecker.check(this.formData, rule);
				if(checkRes){
					uni.showToast({title:"验证通过!", icon:"none"});
					
					    uni.setStorageSync('mobile', this.formData.username);
						this.onlogin()
					// setTimeout(()=>{
					// uni.navigateTo({ url: './pin',})	
					// })
					
			}else{
				uni.showToast({title:"验证失败!请重新输入！", icon:"none"});
			}
		}
	},
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
