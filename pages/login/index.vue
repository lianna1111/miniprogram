<template>
	<!-- <gui-page :customHeader="true" :headerStyle="headerStyle" :statusBarStyle="statusBarStyle"> -->
		
		
		<view slot="gBody">
			
		</view>
	<!-- </gui-page> -->
</template>

<script>
	export default{
		data(){
			return{
				title			: '一键登录',
			}
		},
		onLoad:function(options){
			
		},
		onShow:function(){
			this.login();
		},
		methods:{
			login(){
				uni.preLogin({
					provider: 'univerify',
					success:(res)=>{
						console.log(res);
						uni.login({
							provider: 'univerify',
							univerifyStyle: { // 自定义登录框样式
								"fullScreen": true, // 是否全屏显示，默认值： false
								"backgroundColor": "#ffffff",  // 授权页面背景颜色，默认值：#ffffff
								"backgroundImage": "", // 全屏显示的背景图片，默认值："" （仅支持本地图片，只有全屏显示时支持）  
								"icon": {  
									"path": "/static/logo.png" // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo   
								},  
								"phoneNum": {  
									"color": "#202020"  // 手机号文字颜色 默认值：#202020  
								},  
								"slogan": {  
									"color": "#BBBBBB"  //  slogan 字体颜色 默认值：#BBBBBB  
								},  
								"authButton": {  
									"normalColor": "#ffbe0b", // 授权按钮正常状态背景颜色 默认值：#ffbe0b  
									"highlightColor": "#c69100",  // 授权按钮按下状态背景颜色 默认值：#c69100（仅ios支持）  
									"disabledColor": "#b9b9b8",  // 授权按钮不可点击时背景颜色 默认值：#b9b9b8（仅ios支持）  
									"textColor": "#ffffff",  // 授权按钮文字颜色 默认值：#ffffff  
									"title": "本机号码一键登录", // 授权按钮文案 默认值：“本机号码一键登录”  
									"borderRadius": "24px"    // 授权按钮圆角 默认值："24px" （按钮高度的一半）
								},  
								"otherLoginButton": {  
									"visible": true, // 是否显示其他登录按钮，默认值：true  
									"normalColor": "", // 其他登录按钮正常状态背景颜色 默认值：透明 
									"highlightColor": "", // 其他登录按钮按下状态背景颜色 默认值：透明 
									"textColor": "#656565", // 其他登录按钮文字颜色 默认值：#656565  
									"title": "其他登录方式", // 其他登录方式按钮文字 默认值：“其他登录方式”  
									"borderColor": "",  //边框颜色 默认值：透明（仅iOS支持）  
									"borderRadius": "0px" // 其他登录按钮圆角 默认值："24px" （按钮高度的一半）
								},  
								"privacyTerms": {  
									"defaultCheckBoxState":true, // 条款勾选框初始状态 默认值： true
									"uncheckedImage":"", // 可选 条款勾选框未选中状态图片（仅支持本地图片 建议尺寸 24x24px）(3.2.0+ 版本支持)   
									"checkedImage":"", // 可选 条款勾选框选中状态图片（仅支持本地图片 建议尺寸24x24px）(3.2.0+ 版本支持)   
									"checkBoxSize":12, // 可选 条款勾选框大小，仅android支持
									"textColor": "#BBBBBB", // 文字颜色 默认值：#BBBBBB  
									"termsColor": "#5496E3", //  协议文字颜色 默认值： #5496E3  
									"prefix": "我已阅读并同意", // 条款前的文案 默认值：“我已阅读并同意”  
									"suffix": "并使用本机号码登录", // 条款后的文案 默认值：“并使用本机号码登录”  
									"privacyItems": [  // 自定义协议条款，最大支持2个，需要同时设置url和title. 否则不生效  
										{  
											"url": "https://api.yiwenyw.com/agree", // 点击跳转的协议详情页面  
											"title": "用户服务协议" // 协议名称  
										}  
									]  
								},
								"buttons": {  // 自定义页面下方按钮仅全屏模式生效（3.1.14+ 版本支持）
									"iconWidth": "45px", // 图标宽度（高度等比例缩放） 默认值：45px
									"list": [
										{
											"provider": "apple",
											"iconPath": "/static/apple.png" // 图标路径仅支持本地图片
										}, 
										{
											"provider": "weixin",
											"iconPath": "/static/weixin.png" // 图标路径仅支持本地图片
										}
									]
								}
							},
							success:(res)=>{ // 登录成功
								let loginRes = res.authResult
								console.log(loginRes)
								uniCloud.callFunction({
								  name: 'getPhoneNumber', // 你的云函数名称
								  data: {
								    'access_token': loginRes.access_token, // 客户端一键登录接口返回的access_token
								    'openid': loginRes.openid // 客户端一键登录接口返回的openid
								  }
								}).then(res => {
									console.log(res)
								  // res.result = {
								  //   code: '',
								  //   message: ''
								  // }
								  // 登录成功，可以关闭一键登录授权界面了
								  uni.closeAuthView()
								}).catch(err=>{
								  // 处理错误
								})
							},
							fail(res){  // 登录失败
								uni.showToast({title:res.errMsg,icon:'none'});
								uni.closeAuthView()//关闭一键登录弹出窗口
							},
							complete: () => {
								uni.closeAuthView()
							}
						})
					},
					fail(res){  
						uni.showToast({title:'预登录失败或非移动终端',icon:'none'});
					}
				})
			},
			switchLogin(){
				console.log('switchLogin')
			},
			changeLogin(){
				uni.navigateTo({url:'./login'});
			},
			changeAgree(){
				this.isAgree = !this.isAgree;
			}
		}
	}
</script>

<style>
</style>
