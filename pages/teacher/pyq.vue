<template>
<view class="gui-margin gui-margin-top gui-flex gui-rows gui-nowrap">
				<text class="gui-text  gui-color-orange1">上传风采照片</text>
				<view class="gui-text-small gui-h5 gui-primary-color gui-flex1">
					<text class="gui-margin gui-text " @tap="upload">{{upText}}</text>
				</view>
			</view>
</template>

<script>
	export default{
		data(){
			return{
				title:'教师导入',
				excel:'',
				upText:'点此上传'
			}
		},
		methods:{
			upload(){
				var that = this;
				uni.chooseImage({
					count:1,
					success: (chooseImageRes) => {
						// console.log(chooseImageRes);
						const tempFilePaths = chooseImageRes.tempFilePaths;
						//图片上传
						const uploadTask = uni.uploadFile({
							url : this.domain+'upload/path/???',
							filePath: tempFilePaths[0],
							name: 'file',
							success: function (uploadFileRes) {
								var data = JSON.parse(uploadFileRes.data);
								if(data.errno === 0){
									that.formData.excel = data.msg;
									that.upText = '重新上传';
									uni.showToast({title:'上传成功',icon:'none'});
								}else{
									uni.showToast({title:data.msg,icon:'none'});
									return false;
								}
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
