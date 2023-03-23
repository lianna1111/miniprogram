<template>
	<view class="gui-padding">
		<view class="text-center gui-color-green gui-margin-top-large">
			<view class="gui-icons gui-h1 ">&#xe7f8;</view>
			<view class="gui-h3">已提交成功</view>
		</view> 	
		<!-- -->
		<view class="gui-margin-top-large gui-flex gui-rows gui-justify-content-center">
			<canvas canvas-id="canvas" id="canvas" 
			style="width:360rpx; height:360rpx;" @longpress="saveQrcode"></canvas>
		</view>
		<view class="gui-margin-top gui-text-center">
					<text class="gui-text-small gui-color-gray gui-italic">身份验证二维码，请长按二维码或截图保存</text>
				</view>
		
		<view class="gui-margin-top gui-text-center gui-flex gui-column">
			<text class="" >姓名：{{realname}}</text>
			<text class="" >{{time}}</text>
			<text class=" gui-color-green gui-italic" :style='hcolor'>健康码：{{HealthColor}}</text>
			<text class="  gui-italic" :style='tcolor'>行程码：{{TravelColor}}</text>
		</view>
	</view>
</template>
<script>
var QRCode = require('@/GraceUI5/js/qrcode.js');
export default {
	data() {
		return {
			// 二维码绘制对象
			qrcode        : null,
			// 二维码尺寸，单位 rpx
			qrcodeSize    : 360,
			// 二维码数据
			qrcodeContent : '',
			// 二维码背景颜色 [ 黑色兼容性更好 ]
			qrcodeBgColor : '#000000',
			// 二维码颜色
			qrcodeColor   : '#FFFFFF',
			// 画布 id
			qrcodeId      : 'canvas',
			HealthColor:'',
			TravelColor:'',
			realname:'',
			time:'',
			hcolor:'',
			tcolor:''
		}
	},
	
	onReady: function (options) {
		this.uid=uni.getStorageSync('uid')
		uni.request({
		    url:  this.domain+'health', //提交表单
			method:'post',
		    data: {uid:this.uid},
		      header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
		    success: (res) => {
				console.log(res,"res")
				if(res.data.errno=='0'){
					this.HealthColor=res.data.msg[0].HealthColor
					this.TravelColor=res.data.msg[0].TravelColor
					this.realname=res.data.msg[0].RealName
					this.time=res.data.msg[0].HealthTime
					this.hcolor=this.color(this.HealthColor)
					this.tcolor=this.color(this.TravelColor)
					console.log(this.HealthColor,this.tcolor)
					const str='姓名:'+res.data.msg[0].RealName+',身份证号:'+res.data.msg[0].IDNumber+',时间:'+res.data.msg[0].HealthTime
					this.qrcodeContent=str
					console.log(this.qrcodeContent,'this.qrcodeContent')
				}else{
					uni.showToast({ title: res.data.msg, icon : "none"});
				}
			
		    },
			fail() {
				uni.showToast({ title: '提交失败!', icon : "none"});
			}
		});
	
		uni.showLoading({
			mask:true,
			title:'loading ...'
		});
		setTimeout(()=>{
			this.qrcode = new QRCode(this.qrcodeId, {
				text         : this.qrcodeContent,
				width        : uni.upx2px(this.qrcodeSize),
				height       : uni.upx2px(this.qrcodeSize),
				colorDark    : this.qrcodeColor,
				colorLight   : this.qrcodeBgColor,
				correctLevel : QRCode.CorrectLevel.H
			});
			uni.hideLoading();
		},1000);
	},
	methods: {
		color(i){
			let style
			if(i=='绿色'){
				style='color:green'
			}else if(i=='黄色'){
				style='color:yellow'
			}else if(i=='红色'){
				style='color:red'
			}
			return style
		},
		saveQrcode : function () {
			uni.canvasToTempFilePath({
			    x          : 0,
			    y          : 0,
			    width      : uni.upx2px(this.qrcodeSize),
			    height     : uni.upx2px(this.qrcodeSize),
			    destWidth  : uni.upx2px(this.qrcodeSize),
			    destHeight : uni.upx2px(this.qrcodeSize),
			    canvasId   : this.qrcodeId,
			    success: (res) => {
					uni.saveImageToPhotosAlbum({
						filePath : res.tempFilePath,
						fail     : function (e) {
							console.log(e);
						},
						success:()=>{
							uni.showToast({
								title:"图片已经保存到您的相册~"
							})
						}
					});
			    }
			});
		}
	}
}
</script>
<style>
</style>
