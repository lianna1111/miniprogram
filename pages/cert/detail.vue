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
				<text class="gui-form-label"><text class="gui-color-red">*</text>学生编号</text>
				<view class="gui-form-body">
					<input type="text" class="gui-form-input" 
					v-model="formData.StudentCode" name="StudentCode" disabled placeholder="请输入学生编号" />
				</view>
			</view>
			
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label"><text class="gui-color-red">*</text>学生姓名</text>
				<view class="gui-form-body">
					<input type="text" class="gui-form-input" 
					v-model="StudentName" name="StudentName" disabled placeholder="请输入学生姓名" />
				</view>
			</view>
			
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label"><text class="gui-color-red">*</text>报考等级</text>
				<view class="gui-form-body">
					<picker mode="selector" :range="LevelID" @change="pickerChangePublic">
						<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
							<text class="gui-text">{{LevelID[LevelIDIndex]}}</text>
							<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
						</view>
					</picker>
				</view>				
			</view>
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label"><text class="gui-color-red">*</text>报名项目</text>
						
				<view class="gui-form-body">
					<input type="text" class="gui-form-input" 
					v-model="project" name="project" placeholder="" disabled/>
				</view>
			</view>
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label"><text class="gui-color-red">*</text>报考费用</text>
				<view class="gui-form-body">
					<input type="text" class="gui-form-input" 
					v-model="formData.Fee" name="Fee" placeholder="请输入报考费用" />
				</view>
			</view>
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label"><text class="gui-color-red">*</text>教师编号</text>
				<view class="gui-form-body">
					<input type="text" class="gui-form-input" 
					v-model="formData.TeacherCode" name="TeacherCode" placeholder="请输入教师编号" />
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
			LevelID : ['请选择报考等级' ,'1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],//piker：级别
			LevelIDIndex : 0,//pickerindex
			project:'',//项目名	
			StudentName:'',//学生名
				// 表单数据记录
				formData: {
					Status:'2',//报名成功后status变为2
					StudentCode:'',
					ItemID:'',
					LevelID:'',
					Fee:'',
					TeacherCode:'',
				
						},
		}
	},
	onLoad: function(option) {
	if(option){
		console.log(option)
		this.formData.StudentCode=option.StudentCode
		this.StudentName=option.StudentName
		this.formData.ItemID=option.ItemID
	}
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
	this.getExam()
	
	},
	onShow:function(){

	},
	methods: {
		getExam(){
		var that =this
		uni.request({
			url: that.domain+'exam',
			method: 'post',
			
			  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
			
			success:function(res){
				that.exam = res.data.msg;
				console.log(res.data.msg,'所有的项目');
					for(let i=0;i<that.exam.length;i++){
					 if(that.exam[i].ID==that.formData.ItemID){
						 that.project=that.exam[i].Title
						 console.log(that.project,'project')
					}
					};
			},
			fail:function(res){
				console.log(res);
			}
		})
		},
		// picker 切换：等级
		pickerChangePublic : function (e) {
			console.log(e);
			this.LevelIDIndex    = e.detail.value;
			this.formData.LevelID = this.LevelID[this.LevelIDIndex];
		},	
			
	
		// 提交
		submit:function () {
			console.log(this.formData,"submit");
			if(!this.formData.LevelID||!this.formData.Fee||!this.formData.TeacherCode||this.formData.LevelID=='0') 
			{uni.showToast({title:"必填项请填写完整", icon:"none"});
			return}
			else{
			console.log(this.formData,"submit");
			uni.request({
			    // url: this.domain + 'campus/add_exam', //提交表单
				url: this.domain + 'campus/campus/exam', //提交表单
				method:'post',
			    data: this.formData,
			      header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
			    success: (res) => {
					uni.showToast({ title: '提交成功!', icon : "none"});
					console.log(res,"res")
					
				// uni.redirectTo({
					
			 //     url: './appy'
				// });
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