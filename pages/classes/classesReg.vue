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
					<text class="gui-form-label"><text class="gui-color-red">*</text>班级名称</text>
					<view class="gui-form-body">
						<input type="text" class="gui-form-input" 
						v-model="formData.ClassName" name="StudentName" placeholder="请输入班级名称" />
					</view>
				</view>
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>班级编号</text>
					
					<view class="gui-form-body">
						<input type="text" class="gui-form-input" 
						v-model="formData.ClassCode" name="Headimg" placeholder="请输入班级代码" />
					</view>
				</view>
				 <view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>开始日期</text>
					<view class="gui-form-body">
						<input type="text" class="gui-form-input" 
						v-model="formData.StartDate" name="StartDate" placeholder="请输入课程开始日期" />
					</view>
				</view> 
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>结束日期</text>
					<view class="gui-form-body">
						<input type="text" class="gui-form-input" 
						v-model="formData.EndDate" name="EndDate" placeholder="请输入课程结束日期" />
					</view>
				</view>
				
				
				
				
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>上课日</text>
					<view class="gui-form-body">
						<input type="text" class="gui-form-input" 
						v-model="formData.Weeks" name="Weeks" placeholder="请输入课程上课日" />
					</view>
				</view>
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>开始时间</text>
					<view class="gui-form-body">
						<input type="text" class="gui-form-input" 
						v-model="formData.Starttime" name="Starttime" placeholder="请输入课程开始时间" />
					</view>
				</view>
				
				
									
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>结束时间</text>
					<view class="gui-form-body">
						<input type="text" class="gui-form-input"
						v-model="formData.Endtime" name="Endtime" placeholder="请输入课程结束时间" />
					</view>
				</view>
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>教室</text>
					<view class="gui-form-body">
						<picker mode="selector" :range="Classroom" range-key="RoomName" @change="pickerChangeClassroom">
							<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
								<text class="gui-text">{{Classroom[ClassroomIndex].RoomName}}</text>
								<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
							</view>
						</picker>
					</view>				
				</view>
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>课程</text>
					<view class="gui-form-body">
						<picker mode="selector" :range="Course" range-key="CourseTitle" @change="pickerChangeCourse">
							<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
								<text class="gui-text">{{Course[CourseIndex].CourseTitle}}</text>
								<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
							</view>
						</picker>
					</view>				
				</view>
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>主讲老师</text>
					<view class="gui-form-body">
						<picker mode="selector" :range="Teacher" range-key="TeacherName" @change="pickerChangeTeacher">
							<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
								<text class="gui-text">{{Teacher[TeacherIndex].TeacherName}}</text>
								<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
							</view>
						</picker>
					</view>				
				</view>
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>助理老师</text>
					<view class="gui-form-body">
						<picker mode="selector" :range="Assistant" range-key="TeacherName"  @change="pickerChangeAssistant">
							<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
								<text class="gui-text">{{Assistant[AssistantIndex].TeacherName}}</text>
								<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
							</view>
						</picker>
					</view>				
				</view>
			<!-- 	<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>主讲老师</text>
					<view class="gui-form-body">
						<input type="number" class="gui-form-input"
						v-model="formData.TeacherID" name="TeacherID" placeholder="请输入主讲老师编号" />
					</view>
				</view>
				
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>助理老师</text>
					<view class="gui-form-body">
						<input type="number" class="gui-form-input"
						v-model="formData.AssistantID" name="AssistantID" placeholder="请输入助理老师编号" />
					</view>
				</view> -->
				
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>班级人数</text>
					<view class="gui-form-body">
						<input type="number" class="gui-form-input"
						v-model="formData.StudentCount" name="StudentCount" placeholder="请输入班级人数" />
					</view>
				</view>
				<view class="gui-margin-top">
					<text class="gui-form-label">班级介绍</text></view>
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
			areas   : '',//省市区
			areas1   : '',//省市区
			uploadText:'点击上传',
			pageLoading: true,// 全屏 loading
			mainHeight: 200,// 核心区域高度 
			step: 1,// 步骤
			Classroom : [{ID:'0',RoomName:'请选择授课教室'}],//piker
			ClassroomIndex : 0,//pickerindex
			Teacher : [{ID:'0',TeacherName:'请选择授课教师'}],//piker
			TeacherIndex : 0,//pickerindex
			Assistant : [{ID:'0',TeacherName:'请选择授课助教'}],//piker
			AssistantIndex : 0,//pickerindex
			 Course : [{ID:'0',CourseTitle:'请选择授课课程'}],//piker
			 CourseIndex : 0,//pickerindex
			// 表单数据记录
			formData: {
				ClassName	:"",
				ClassCode:"",
				StartDate:"",
				EndDate:"",
				Weeks:"",
				Starttime	:"",
				Endtime:"",
				ClassroomID	:"",
				TeacherID:"",
				AssistantID:"",
				CourseID:'',
				StudentCount:'0',
				Content:""
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
				this.mainHeight  = e.height - uni.upx2px(70);
				this.pageLoading = false;
			});
		});
		this.getClassroom();
		this.getTeacher();
		this.getCourse()
	},
	methods: {
		// picker 切换：教室
		pickerChangeClassroom : function (e) {
			console.log(e);
			this.ClassroomIndex    = e.detail.value;
			this.formData.ClassroomID = this.Classroom[this.ClassroomIndex].ID;
		},		
		// picker 切换：主讲
		pickerChangeTeacher : function (e) {
			console.log(e);
			this.TeacherIndex    = e.detail.value;
			this.formData.TeacherID = this.Teacher[this.TeacherIndex].ID;
			console.log(this.Teacher[this.TeacherIndex])
		},		
		// picker 切换：助教
		pickerChangeAssistant : function (e) {
			console.log(e);
			this.AssistantIndex    = e.detail.value;
			this.formData.AssistantID = this.Assistant[this.AssistantIndex].ID;
		},	
		// picker 切换：课程
		pickerChangeCourse : function (e) {
			console.log(e);
			this.CourseIndex    = e.detail.value;
			this.formData.CourseID = this.Course[this.CourseIndex].ID;
		},	
		getClassroom(){//教室
			var that = this;
			uni.request({
				url: that.domain+'campus/classroom/cid/'+that.formData.CampusID,
				method: 'get',
				success:function(res){
					if(res.data.errno==0){
					// that.classroom = res.data.msg;
					for(let item in res.data.msg){
						that.Classroom.push(res.data.msg[item]);
					}
					console.log(that.Classroom,'classroom');
					}
				},
				fail:function(res){
					console.log(res);
				}
			})
		},	
		getTeacher(){//教室
			var that = this;
			uni.request({
				url: that.domain + 'campus/teacher/cid/'+that.formData.CampusID,
				method: 'get',
				success:function(res){
					if(res.data.errno==0){
					// that.Teacher = res.data.msg;
					for(let item in res.data.msg){
						that.Teacher.push(res.data.msg[item]);
						that.Assistant.push(res.data.msg[item]);
					}
					console.log(that.Teacher,'Teacher');
					console.log(that.Assistant,'Teacher');
					}
				},
				fail:function(res){
					console.log(res);
				}
			})
		},
		getCourse(){
			var that = this;
			uni.request({
				url: that.domain+'campus/course/cid/'+that.formData.CampusID,
				method: 'get',
				success:function(res){
					if(res.data.errno==0){
					for(let item in res.data.msg){
						that.Course.push(res.data.msg[item]);
					}
					console.log(that.Course,'course');
					}
				},
				fail:function(res){
					console.log(res);
				}
			})
		},
		// 提交
		submit:function () {
			// 数据保持在 this.form data 内
			// 请根据实际需求进行数据校验及提交
			if(!this.formData.ClassName||!this.formData.ClassCode||!this.formData.StartDate||!this.formData.EndDate||!this.formData.Weeks||!this.formData.Starttime	
			||!this.formData.Endtime||!this.formData.ClassroomID||!this.formData.CourseID||!this.formData.TeacherID||!this.formData.AssistantID||!this.formData.StudentCount
			||this.formData.ClassroomID=='0'||this.formData.CourseID=='0'||this.formData.TeacherID=='0'||this.formData.AssistantID=='0')
			{
				uni.showToast({title:'必填项请填写完全',icon:'none'})
				return
			}else{
			console.log(this.formData,"submit");
			uni.request({
			    url: this.domain+'campus/add_clase', //提交表单
				method:'post',
			    data: this.formData,
			      header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
			    success: (res) => {
					if(res.data.errno==0){
					uni.showToast({ title: '提交成功!', icon : "none"});
					console.log(res,"res")
				uni.redirectTo({
					
			     url: './index?campusID='+this.formData.CampusID
				});
				}
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