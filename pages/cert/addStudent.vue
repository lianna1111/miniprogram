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
				<text class="gui-form-label"><text class="gui-color-red">*</text>考生ID</text>
				<view class="gui-form-body">
					<input type="number" class="gui-form-input" 
					v-model="formData.StudentID" name="StudentID" placeholder="请输入考生ID" />
				</view>
			</view>
			
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label"><text class="gui-color-red">*</text>出场顺序</text>
				<view class="gui-form-body">
					<input type="number" class="gui-form-input" 
					v-model="formData.Sort" name="Sort" placeholder="请输入学生出场顺序" />
				</view>
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
				formData: {
						    
							ExamID:'',//  考级ID  
							    ExamroomID:'',//  考场ID
							    ExamtimeID:'',//  考次ID
							    StudentID:'',// 考生ID
							    Sort:'',// 出场顺序
						},
		}
	},
	onLoad(option) {
		if(option){
			this.formData.ExamID=option.ExamID
			this.formData.ExamroomID=option.ExamroomID
			this.formData.ExamtimeID=option.ExamtimeID
			console.log(option)
			
		}
	try {
	    const InstituteID = uni.getStorageSync('iid');
		const CampusID = uni.getStorageSync('cid');
			this.InstituteID=InstituteID;
			this.CampusID=CampusID
	  
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
	},
	methods: {
	
			
		// 提交
		submit:function () { 
			if(!this.formData.StudentID||!this.formData.Sort) 
			{uni.showToast({title:"必填项请填写完整", icon:"none"});
			return}
			else{
			console.log(this.formData,"submit");
			uni.request({
			    url: this.domain + 'exam/add_examtime_student', //提交表单
				method:'post',
			    data: this.formData,
			      header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
			    success: (res) => {
					uni.showToast({ title: '提交成功!', icon : "none"});
					console.log(res,"res")
				uni.redirectTo({
			     url: './setStudent'
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