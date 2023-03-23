<template>
	<view class="gui-padding">
		<view class="gui-margin-top-large gui-flex gui-rows gui-space-between">
			<text class="gui-h6 gui-color-gray gui-bold">精彩瞬间</text>
			<text class="gui-bg-blue gui-color-white demo-sub-btn gui-block-text" @tap="submit">{{subtxt}}</text>
		</view>
		<view class="gui-form-item gui-border-b">
						<text class="gui-form-label">分类</text>
						<view class="gui-form-body">
							<input type="text" class="gui-form-input" 
							v-model="momentTitle" name="momentTitle" placeholder="请选择分类" disabled/>
						</view>
					</view>
					<view class="gui-form-item gui-border-b">
									<text class="gui-form-label"><text class="gui-color-red">*</text>标题</text>
									<view class="gui-form-body">
										<input type="text" class="gui-form-input" 
										v-model="formData.Title" name="title" placeholder="请填写标题" />
									</view>
								</view>
		<view class="gui-form-item gui-border-b">
						<text class="gui-form-label">描述</text>
						<view class="gui-form-body">
							<input type="text" class="gui-form-input" 
							v-model="formData.Description" name="Description" placeholder="请填写描述" />
						</view>
					</view>
		<view class="gui-margin-top">
			<text class="gui-form-label">图片</text>
			<pui-upload-images @change="change" ref="uploadimgcom" @uploaded="uploaded" 
			:uploadServerUrl="url"></pui-upload-images>
		</view>
		<!-- <view class="gui-margin-top">
			<text class="gui-h6 gui-color-gray gui-bold">标题</text>
		</view>
		<view class="gui-bg-gray gui-margin-top">
			<input v-model="title" class="" placeholder="请输入精彩瞬间标题" />
		</view> -->
	</view>
</template>
<script>
export default {
	data() {
		return {
			// 记录需要上传的图片数据
			uploadedImgs : [],
			// 文本框输入内容记录
			momentTitle      : '2022年11月衡阳',
			// 上传按钮名称
			subtxt           : "+ 发布",
			url:this.domain+'upload/path/moments',
			formData:{
				WebID:'6',CategoryID:'10',Title:'',Description:'',picture:''
			}
		}
	},
	onLoad:function(){
		// 模拟 api 加载默认图片
		// 不需要默认值删除此函数即可
		setTimeout(()=>{
			this.$refs.uploadimgcom.setItems(
			[
				// 'https://cmsuse.oss-cn-beijing.aliyuncs.com/g5/29.png',
				// 'https://cmsuse.oss-cn-beijing.aliyuncs.com/g5/30.png',
				// 'https://cmsuse.oss-cn-beijing.aliyuncs.com/g5/31.png'
			]);
		}, 1000);
	},
	methods: {
		// 记录选择图片时的待提交数据
		change : function (e) {
			this.uploadedImgs = e;
			console.log(e,'e')
		},
		// 提交动态
		// 过程说明 : 
		// 点击提交按钮 > 首先执行组件的上传函数 > 上传成功后获得已经上传的图片数据 > 提交给后端 api 记录整个内容 
		submit : function () {
			// 阻止重复提交
			if(this.subtxt != '+ 发布'){return ;}
			// 判断图片选择数量
			if(this.uploadedImgs.length < 1){
				uni.showToast({title:"请选择图片", icon:"none"}); 
				return ;
			}
			if(!this.formData.Title){
				uni.showToast({title:"请填写标题", icon:"none"}); 
				return ;
			}
			this.subtxt = '提交中，请稍候 ...';
			let str=''
			this.uploadedImgs.forEach((item,index)=>{
				str=str+item.Filename+','
			})
			this.formData.picture=str.substr(0, str.length - 1);
			console.log(this.formData.picture)
			var sendData = {
				imgs    : this.uploadedImgs,
				// 其他表单数据
				content : this.momentTitle
			};
			// const arr=JSON.stringify(this.uploadedImgs)
			
			uni.request({
			    url: this.domain+'photo/multi', 
				method:'post',
			    data: this.formData,
			      header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
			    success: (res) => {
					console.log(res,"res")
					if(res.data.errno==0){
						uni.showToast({ title: '提交成功!', icon : "none"});
						this.subtxt = '提交成功';
					}
			    },
				fail() {
					uni.showToast({ title: '提交失败!', icon : "none"});
				}
			});
			//	// this.$refs.uploadimgcom.upload();
			// 代码执行到这里，组件开始执行上传工作
			// uni-app 上传api 一次上传一个图片
			// 组件会一个一个循环上传
			// 上传完毕后会触发组件的 uploaded 事件
			// uploaded 事件意味着上传工作完毕
			// 事件会携带上传完成的图片数据 [数组格式] 
		},
		// 图片上传完毕执行 uploaded 函数
		uploaded : function (uploadedImgs) {
			//	// console.log('图片上传完毕，开始提交数据');
			console.log(uploadedImgs);
			// 组合数据给后端 api 提交
			var sendData = {
				imgs    : uploadedImgs,
				// 其他表单数据
				content : this.momentTitle
			};
			console.log('全部数据 :');
			console.log(sendData);
			// 至此数据以及收集完毕
			// 请自己完成数据提交工作
		}
	}
}
</script>
<style>
.gui-text-area{font-size:26rpx; color:#2B2E3D; height:150rpx; padding:20rpx;}
.demo-sub-btn{padding:10rpx 25rpx; line-height:30rpx; font-size:24rpx; border-radius:6rpx;}
</style>