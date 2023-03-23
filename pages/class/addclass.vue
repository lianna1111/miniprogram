<template>
	<gui-page :fullPage="true" :isLoading="pageLoading" 
	ref="guiPage" :customFooter="true">
		<view slot="gBody" class="gui-flex1 gui-flex gui-columns">
			<!-- 顶部步骤提示 -->
			
			
			<!-- 表单元素核心区域 -->
			<scroll-view :scroll-y="true" :show-scrollbar="false" 
			:style="{height:mainHeight+'px'}">
				<!-- 第1步 -->
				<view class="gui-padding" v-if="step == 1">
					
				
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label"><text class="gui-color-red">*</text>课程名称</text>
				<view class="gui-form-body">
					<input type="text" class="gui-form-input" 
					v-model="formData.CourseTitle" name="CourseTitle" placeholder="请输入课程名称" />
				</view>
			</view>
			
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label"><text class="gui-color-red">*</text>课程图片</text>
				<view class="gui-form-body" @tap="upPic">
					<view class="gui-flex gui-rows gui-nowrap">
						<view class="gui-text-small gui-color-gray" v-if="formData.Pic">
							<gui-image :src="formData.Pic" :width="100" :height="100"></gui-image>
						</view>
						<view class="gui-margin gui-text-small gui-color-gray gui-flex1">
							<text class="gui-text gui-h5 gui-color-blue">{{uploadText}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>课程类别</text>
					<view class="gui-form-body">
						<picker mode="selector" :range="Category" range-key="Title" @change="pickerChangePro">
							<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
								<!-- <text class="gui-text">{{genderPro[genderProIndex]}}</text> -->
								<text class="gui-text">{{Category[CategoryIndex].Title}}</text>
								<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
							</view>
						</picker>
					</view>				
				</view>
			 <view class="gui-form-item gui-border-b">
			 	<text class="gui-form-label"><text class="gui-color-red">*</text>学员类型</text>
			 	<view class="gui-form-body">
			 		<picker mode="selector" :range="StudentType" @change="pickerChangeType">
			 			<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
			 				<text class="gui-text">{{StudentType[StudentTypeIndex]}}</text>
			 				<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
			 			</view>
			 		</picker>
			 	</view>				
			 </view>
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label"><text class="gui-color-red">*</text>招收性别</text>
				<view class="gui-form-body">
					<picker mode="selector" :range="IsGender" @change="pickerChangeGender">
						<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
							<text class="gui-text">{{IsGender[IsGenderIndex]}}</text>
							<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
						</view>
					</picker>
				</view>				
			</view>
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label"><text class="gui-color-red">*</text>最小年龄</text>
				<view class="gui-form-body">
					<input type="number" class="gui-form-input" 
					v-model="formData.Minage" name="Minage" placeholder="请输入课程适用开始年龄" />
				</view>
			</view>
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label"><text class="gui-color-red">*</text>最大年龄</text>
				<view class="gui-form-body">
					<input type="number" class="gui-form-input" 
					v-model="formData.Maxage" name="Maxage" placeholder="请输入课程适用结束年龄" />
				</view>
			</view>
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label"><text class="gui-color-red">*</text>总课时</text>
				<view class="gui-form-body">
					<input type="number" class="gui-form-input" 
					v-model="formData.Count" name="Count" placeholder="请输入课程总课时" />
				</view>
			</view>
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label"><text class="gui-color-red">*</text>学费</text>
				<view class="gui-form-body">
					<input type="number" class="gui-form-input" 
					v-model="formData.Fee" name="Fee" placeholder="请输入课程学费" />
				</view>
			</view>
			
			<view class="gui-margin-top">
				<text class="gui-form-label"><text class="gui-color-red">*</text>课程介绍</text>			</view>
			<view>
				<textarea v-model="formData.Content" name="Content" value="" placeholder="说点什么..." 
				class="gui-textarea gui-bg-gray gui-border-box" style="width:690rpx;" />
			</view>
			
				
					
					
				</view>
				
			</scroll-view>
		</view>
		<!-- 底部按钮 -->
		<view slot="gFooter">
			<view class="form-add-footer gui-border-b gui-flex gui-rows gui-space-between" 
			v-if="step == 1" hover-class="gui-tap">
				<text class="form-add-footer-btns"></text>
				<text class="form-add-footer-btns" @tap="submit()">提交</text>
			</view>
			
		</view>
	</gui-page>
</template>
<script>
var graceJS = require('@/GraceUI5/js/grace.js');
export default {
	data() {
		return {
			uploadText:'点击上传',
			pageLoading: true,// 全屏 loading
			mainHeight: 200,// 核心区域高度 
			step: 1,// 步骤
			IsGender : ['不限', '只招女', '只招男'],//piker：性别
				IsGenderIndex : 0,//pickerindex
			// Category
			Category : ['开设哪些项目', '1', '2', '3', '4'],//piker：开设那些项目
			CategoryIndex : 0,//pickerindex
			StudentType : ['不限', '幼小', '少年', '青年', '成年'],//piker：学生类型
			StudentTypeIndex : 0,//pickerindex
				// 表单数据记录
				formData: {
					// GradeID:'',?
					CourseTitle       :"",
					Pic        :"",
					StudentType         :"",
					CategoryID:'',
					IsGender         :"",
					StudentType:'',
					Minage            :"0",
					Maxage            :"0",
					Count:"0",
					Fee:"0.00",
					Content:"",
						},
		}
	},
	onLoad: function() {
	
	try {
	    const InstituteID = uni.getStorageSync('iid');
		const CampusID = uni.getStorageSync('cid');
		const UserID = uni.getStorageSync('uid');
			this.formData.InstituteID=InstituteID;
			// this.formData.UserID=UserID;
			this.formData.CampusID=CampusID
	  
	} catch (e) {
	    // error
	}
		
		// 01. 获取页面主体高度
	graceJS.getRefs('guiPage', this, 0, (ref)=>{
		ref.getDomSize('guiPageBody', (e)=>{
			// 02. 导航的高度
			// 可以 使用 graceJS.select() 函数动态获取， 也可以使用 uni.upx2px 转换已知高度
			// 轮播主体高度 = 页面高度 - 导航高度
			this.mainHeight  = e.height - uni.upx2px(100);
			this.pageLoading = false;
		});
	});	
	
	},
	onShow:function(){
		this.getCategory();
	},
	methods: {
		getCategory(){
			uni.request({
				url: this.domain+'cate', //获取艺术类别
				method:'post',
				data: {
				},
				  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
				success: (res) => {
					this.Category=res.data.msg
					this.Category.unshift({
					ID:0,
					Title:'请选择艺术类别'
					})
					
				},
			})	
		},
		// picker 切换：开设项目
		pickerChangePro : function (e) {
			this.CategoryIndex    = e.detail.value;
			 this.formData.CategoryID = this.Category[this.CategoryIndex].ID;
		},			
		// picker 切换：性别
		pickerChangeGender : function (e) {
			console.log(e);
			this.IsGenderIndex    = e.detail.value;
			this.formData.IsGender = this.IsGender[this.IsGenderIndex];
		},								
		//学生类型
			pickerChangeType: function (e) {
				console.log(e);
				this.StudentTypeIndex    = e.detail.value;
				this.formData.StudentType = this.StudentType[this.StudentTypeIndex];
			},					
		upPic(){
			var that = this;
			uni.chooseImage({
				count:1,
				success: (chooseImageRes) => {
					// console.log(chooseImageRes);
					const tempFilePaths = chooseImageRes.tempFilePaths;
					//图片上传
					const uploadTask = uni.uploadFile({
						url : that.domain+'upload/path/course',
						filePath: tempFilePaths[0],
						name: 'file',
						success: function (uploadFileRes) {
							var data = JSON.parse(uploadFileRes.data);
							if(data.errno === 0){
								that.formData.Pic = data.msg;
								that.uploadText = '重新上传';
								uni.showToast({title:'上传成功',icon:'none'});
							}else{
								uni.showToast({title:data.msg,icon:'none'});
								return false;
							}
						}
					});
				}
			});
		},
		
		// 提交
		submit:function () {
			if(!this.formData.CourseTitle||!this.Category||!this.formData.Pic
			||!this.StudentType||!this.formData.Minage||!this.formData.Maxage
			||!this.IsGender||!this.formData.Count||!this.formData.Fee||!this.formData.Content
			) 
			 {uni.showToast({title:"必填项请填写完整", icon:"none"});
			return}
			else if(this.formData.Minage>=this.formData.Maxage)
			{uni.showToast({title:"最小年龄需要小于最大年龄", icon:"none"});
			return}
			else{
				if(this.formData.StudentType==''||this.formData.StudentType=='不限')this.formData.StudentType='0'
				else if(this.formData.StudentType=='幼小')this.formData.StudentType='1'
				else if(this.formData.StudentType=='少年')this.formData.StudentType='2'
				else if(this.formData.StudentType=='青年')this.formData.StudentType='3'
				else if(this.formData.StudentType=='成年')this.formData.StudentType='4'
				if(this.formData.IsGender==''||this.formData.IsGender=='不限')this.formData.IsGender='0'
				else if(this.formData.IsGender=='只招男')this.formData.IsGender='1'
				else if(this.formData.IsGender=='只招女')this.formData.IsGender='2'
			console.log(this.formData,"submit");
			uni.request({
			    url: this.domain+'campus/add_course', //提交表单
				method:'post',
			    data: this.formData,
			      header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
			    success: (res) => {
					console.log(this.formData.CampusID,"this.formData.CampusID")
					uni.showToast({ title: '提交成功!', icon : "none"});
					console.log(res,"res")
				uni.redirectTo({
					
			     url: './class?campusID='+this.formData.CampusID
				});
			    },
				fail() {
					uni.showToast({ title: '提交失败!', icon : "none"});
				}
			});
			}
			
		}
	}
}
</script>
<style>
.gui-step-item{padding:10rpx 20rpx; width:88rpx; display:flex; flex-direction:column; align-items:center; flex-shrink:0;}
.gui-step-icon{width:50rpx; font-size:22rpx; height:50rpx; text-align:center; line-height:50rpx; margin:10rpx; border-radius:100%; background-color:#F1F2F3; color:#999999;}
.gui-step-text{text-align:center; line-height:50rpx; font-size:24rpx; color: gray;}
.gui-step-line{width:100rpx; height:1px; background-color:#F1F2F3; margin-bottom:50rpx; flex:1;}
.gui-step-line-active{background-color:#ffcb52;}
.form-add-footer-btns{padding:0 38rpx; color:#ffcb52; font-size:30rpx; line-height:100rpx;}
</style>