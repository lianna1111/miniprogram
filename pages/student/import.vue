<template>
<view class="gui-margin gui-margin-top gui-flex gui-rows gui-nowrap">
				<view class="gui-text-small gui-h5 gui-primary-color">{{excel}}</view>
				<view class="gui-text-small gui-h5 gui-primary-color gui-flex1">
					<text class="gui-margin gui-text" @tap="upload">{{upText}}</text>
					<text class="gui-text gui-text-small gui-color-blue" @tap="download">下载数据模板</text>
				</view>
			</view>
</template>

<script>
	export default{
		data(){
			return{
				title:'学生导入',
				excel:'',
				upText:'点击上传数据表单',
				formData:{
					type:'student',
					file:''
				}
			}
		},
		onLoad() {
			try {
			    const InstituteID = uni.getStorageSync('iid');
				const CampusID = uni.getStorageSync('cid');
			   console.log(CampusID)
					this.formData.InstituteID=InstituteID;
					this.formData.CampusID=CampusID
			  
			} catch (e) {
			    // error
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
							url : this.domain+'upload/path/student/type/file',
							filePath: tempFilePaths[0],
							name: 'file',
							success: function (uploadFileRes) {
								var data = JSON.parse(uploadFileRes.data);
								if(data.errno === 0){
									that.formData.file = data.msg;
									that.upText = '重新上传';
									uni.showToast({title:'上传成功',icon:'none'});
									// console.log(data);
									that.imports()
								}else{
									uni.showToast({title:data.msg,icon:'none'});
									return false;
								}
							}
						});
					}
				});
			},
			imports(){
				uni.request({
				    url: this.domain+'campus/imports', //提交表单
					method:'post',
				    data: this.formData,
				      header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
				    success: (res) => {
						uni.showToast({ title: '提交成功!', icon : "none"});
						console.log(this.formData,"formdata")
						console.log(res,"res")
						// if(res.)
					// uni.redirectTo({
				 //     url: './student'
					// });
				    },
					fail() {
						uni.showToast({ title: '提交失败!', icon : "none"});
					}
				});
			},
			download(){
				uni.downloadFile({
					url: 'https://img.yiwenyw.com/student/20220217120742_100.xlsx',//下载地址接口返回
					success: (data) => {
						if (data.statusCode === 200) {
							//文件保存到本地
							uni.saveFile({
								tempFilePath: data.tempFilePath, //临时路径
								success: function(res) {
									uni.showToast({
										icon: 'none',
										mask: true,
										title: '文件已保存：' + res.savedFilePath, //保存路径
										duration: 3000,
									});
									setTimeout(() => {
										//打开文档查看
										uni.openDocument({
											filePath: res.savedFilePath,
											success: function(res) {
												// console.log('打开文档成功');
											}
										});
									}, 3000)
								}
							});
						}
					},
					fail: (err) => {
						console.log(err);
						uni.showToast({
							icon: 'none',
							mask: true,
							title: '失败请重新下载',
						});
					},
				});
			

			}
		}
	}
</script>

<style>
</style>
