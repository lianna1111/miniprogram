<template>
	<!-- <gui-page :customHeader="true" :headerStyle="headerStyle" :statusBarStyle="statusBarStyle"> -->
		
		
		<view slot="gBody">
			<view class="gui-padding">
				<view class="gui-margin-top-large gui-flex gui-rows">
					<text class="gui-text lineH60 gui-primary-color" 
					style="margin-right:10rpx;">验证码已经发送到您的手机</text>
					<text class="gui-text gui-bold gui-color-blue lineH60">{{tel}}</text>
				</view>
				<view class="gui-margin-top gui-flex gui-rows gui-justify-content-center">
					<text class="gui-number-input gui-block-text"  @tap.stop="showKbd">{{vcode[0]}}</text>
					<text class="gui-number-input gui-block-text" @tap.stop="showKbd">{{vcode[1]}}</text>
					<text class="gui-number-input gui-block-text" @tap.stop="showKbd">{{vcode[2]}}</text>
					<text class="gui-number-input gui-block-text" @tap.stop="showKbd">{{vcode[3]}}</text>
					<text class="gui-number-input gui-block-text" @tap.stop="showKbd">{{vcode[4]}}</text>
					<text class="gui-number-input gui-block-text" @tap.stop="showKbd">{{vcode[5]}}</text>
					</view>
				<view class="gui-margin-top gui-nowrap gui-flex-center">
					<text class="gui-text gui-color-gray">请填写6位数字验证码</text>
					<text @tap="getVCode" class="gui-text" style="margin-left:10px; color:#3688FF;">{{vcodeBtnName}}</text>
				</view>
				 <gui-number-keyboard ref="guinumberkeyboard" :isPoint="false" 
				@keyboardDone="keyboardDone" 
				@keyboardInput="keyboardInput" 
				@keyboardDelete="keyboardDelete"></gui-number-keyboard> 
			</view>
			
			
			
			<view style="100rpx"></view>
		</view>
	<!-- </gui-page> -->
</template>

<script>
var graceJS = require('@/GraceUI5/js/grace.js');
export default {
    data() {
		return {
			title			: '验证码',
			remember		: false,
			formData		: {},
			backpage		: '../index/index',
			vcode          : ['','','','','',''],
			vcodeBtnName   : "获取验证码",
			countNum       : 60,
			countDownTimer : null,
			tel:"",//展示手机号
			smscode:"",//验证码
			
			
		};
    }, 
	onLoad: function (option) { 
		try {
		    const unionId = uni.getStorageSync('unionId');
		    const openId = uni.getStorageSync('openId');
			const mobile = uni.getStorageSync('mobile');	
			const uid = uni.getStorageSync('uid');
			const wechatname = uni.getStorageSync('wechatname');
			const face = uni.getStorageSync('face');
		this.formData.type='wx'//传参类型
		this.formData.mobile=mobile
		this.formData.openid=openId
		this.formData.unionid=unionId
		this.formData.avatar=option.avatarUrl
		this.formData.nickname=wechatname
		this.formData.address=''
		this.formData.gender='0'
		} catch (e) {
		    // error
		};
		// console.log(this.formData,'参数')
		this.tel = this.formData.mobile.slice(0,3)+'****'+this.formData.mobile.slice(7,11);
     },
	
	onReady:function(){
		graceJS.getRefs('guinumberkeyboard', this, 0, (ref)=>{
			// ref.open();
		});
	},
	methods:{
		showKbd : function(){ 
			this.$refs.guinumberkeyboard.open();
		},
		// 自动提交
		submitCode : function(){
			console.log('code: '+this.smscode)
			console.log('tel: '+this.formData.mobile)
			// 关闭键盘
			this.$refs.guinumberkeyboard.close();
			// 验证码保存在数组 vcode 中this.vcode.join('')
			this.smscode=this.vcode.join('')
			uni.showLoading({title:"提交..."});
			var that =this
			setTimeout(function(){uni.hideLoading(
			uni.request({
			    url: that.domain+'sms/check', //确认验证码接口
				method:'post',
			    data: {
			        smscode:that.smscode,
					mobile:that.formData.mobile
			    },
			      header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
			  
			     success: (res) => {
					console.log(res);
					
					if(res.data.errno === 0){
						var uid = uni.getStorageSync('uid');
						if(!uid){
							uni.request({
								url:that.domain+'user/add' ,
								method:'POST',
								data:that.formData,
								header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
								success(res) {
									if(res.data.errno === 0){
											 uni.setStorageSync('uid', res.data.msg.AccountID);
											 //默认
											 // uni.setStorageSync('gid', 'undefined');
											 // uni.setStorageSync('sid', 'undefined');
											 // uni.setStorageSync('realname', 'undefined');
											 // uni.setStorageSync('sign', 'v0');
									
										
										//uni.navigateTo({url:'../id/idcard',});//原版
										uni.reLaunch({
											url:'../index/index?sign='+res.data.msg.sign
											}) //健康码版
										//uni.setStorageSync('utype','5')//健康码版
										//uni.switchTab({url:'../index/index'});
									
									}
								}
							})
						}
					}else{
						uni.showToast({ title: es.data.msg, icon : "none"});
						return false
					}
					
					// if(res.data.msg=='验证码不正确'){
					// 	console.log(that.smscode)
					// 	uni.showToast({ title: '验证码不正确!', icon : "none"});
					// }
					// else if(res.data.msg=='ok'){
					// 	uni.showToast({ title: '验证码正确！', icon : "none"});
					// 	try {
					// 		var uid = uni.getStorageSync('uid');
					// 	} catch (e) {
					// 	    // error
					// 	};
					// 	// if(!uid){
					// 		console.log(that.formData,'formdata')
					// 	uni.request({
					// 		url:that.domain+'user/add' ,
					// 		method:'POST',
					// 		data:that.formData,
					// 		header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
					// 		success(res) {
					// 				if(res.data.errno === 0){
					// 			console.log(res,"真实用户注册")
					// 			console.log(res.data.msg.AccountID,"uid")
					// 		try {
					// 			 uni.setStorageSync('uid', res.data.msg.AccountID);
					// 			 //默认
					// 			 uni.setStorageSync('gid', 'undefined');
					// 			 uni.setStorageSync('sid', 'undefined');
					// 			 uni.setStorageSync('realname', 'undefined');
					// 			 uni.setStorageSync('sign', 'v0');
					// 		} catch (e) {
					// 		    // error
					// 		}
					// 		// uni.navigateTo({
					// 		// url:'../id/idcard',
					// 		// });//原版
					// 		// uni.switchTab({
					// 		// url:'../index/index',//健康码版
					// 		// });
					// 		// uni.setStorageSync('utype','5')//健康码版
					// 		uni.switchTab({
					// 			url:'../index/index',
					// 			});
					// 			if(res.data.msg.sign=='photographer'){
					// 			uni.setStorageSync('utype','6')
					// 		}else{
					// 			uni.setStorageSync('utype','5')
					// 		}
					// 	}
					// 	}
					// })
							
					// }else{
					// 		// uni.navigateTo({
					// 		// url:'../id/idcard',
					// 		// });
					// 	}
						
						
					// }
			    },
			}),
			);}, 2000);
		},
		// 监听输入
		keyboardInput : function(e){
			if(e == '.'){return ;}
			var code       =  this.vcode;
			var codeLength = 0;
			for(let i = 0; i < code.length; i++){
				codeLength = i + 1;
				if(code[i] === ''){code.splice(i, 1, e); break;}
			}
			this.vcode = code;
			if(codeLength >= 6){
				// 验证码提交
				this.submitCode();
				
			}
		},
		// 监听删除
		keyboardDelete : function(){
			for(let i = this.vcode.length - 1; i >= 0; i--){
				if(this.vcode[i] !== ''){
					this.vcode.splice(i,1, '');
					break;
				}
			}
		},
		// 完成事件
		keyboardDone : function(){
			this.$refs.guinumberkeyboard.close();
		},
		// 发送验证码
		getVCode : function(){
			if (this.vcodeBtnName != '获取验证码' && this.vcodeBtnName != '重新发送'){return ;}
			this.vcodeBtnName =  "发送中...";
			this.countNum     = 60;
			uni.request({
			    url: this.domain+'sms/send', //发送验证码接口
				method:'post',
			    data: {
			        mobile:this.formData.mobile
			    },
			      header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
			  
			    success: (res) => {
					console.log(res);
					if(res.data.msg=='手机号码格式不正确'){
						uni.showToast({ title: '手机号码格式不正确!', icon : "none"});
					}
					else if(res.data.errno=='0'){
						uni.showToast({ title: '短信已发送，请注意查收', icon : "none"});
					}
			    },
			});
			
			// 倒计时
			this.countDownTimer = setInterval(()=>{this.countDown();}, 1000);
		},
		countDown : function(){
			if (this.countNum <= 1){
			  clearInterval(this.countDownTimer);
			  this.vcodeBtnName = "重新发送";
			  return ;
			}
			this.countNum--;
			this.vcodeBtnName =  this.countNum + '秒后重新发送';
		}
	}
}
</script>
<style>
.lineH60{line-height:60rpx;}
.gui-number-input{width:80rpx; height:80rpx; line-height:80rpx; font-size:32rpx; font-weight:700; color:#A5A7B2; text-align:center; margin:10rpx 20rpx;  background-color:#FFFFFF;
border-bottom:1px solid #D5D6D8;}
</style>