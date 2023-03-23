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
				<text class="gui-form-label"><text class="gui-color-red">*</text>考级名称</text>
				<view class="gui-form-body">
					<input type="text" class="gui-form-input" 
					v-model="examName" name="examName" placeholder="校区教室" disabled />
				</view>
			</view>
			
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label"><text class="gui-color-red">*</text>考场类型</text>
				<view class="gui-form-body">
					<input type="text" class="gui-form-input" value='校区教室'
					 name="RoomType" placeholder="" disabled />
				<!-- 可选择的教室名
					<picker mode="selector" :range="RoomType" range-key="RoomType" @change="pickerChangetype">
						<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
							<text class="gui-text">{{RoomType[RoomTypeIndex].RoomType}}</text>
							<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
						</view>
					</picker> -->
				</view>	
				
			</view>
			<view class="gui-form-item gui-border-b"  v-if="formData.RoomType=='1'">
				<text class="gui-form-label"><text class="gui-color-red">*</text>选择教室</text>
				<view class="gui-form-body">
					<picker mode="selector" :range="classroom" range-key="RoomName" @change="pickerChangeroom">
						<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
							<text class="gui-text">{{classroom[classroomIndex].RoomName}}</text>
							<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
						</view>
					</picker>
				</view>
			</view>
			<view class="gui-form-item gui-border-b" v-if="formData.RoomType=='0'">
				<text class="gui-form-label">其他地方</text>
				<view class="gui-form-body">
					<input type="number" class="gui-form-input" 
					v-model="formData.RoomName" name="RoomName" placeholder="若考场设在其他地方,请输入名称" />
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
			RoomType : [{ID:'',RoomType:'请选择教室类型'},{ID:'1',RoomType:'校区教室'},{ID:'0',RoomType:'其他'}],//piker：开设那些项目
			RoomTypeIndex : 0,//pickerindex
			classroom:[{ID:'',RoomName:'请选择教室'}],//picker教室
			classroomIndex:0,
			examName:'',// 表单数据记录
				formData: {
						ExamID:'',//   考级ID  
					    Title:'',//  考场名称
					    RoomType:'1',//  考场类型(1: 校区教室，0: 其它)
					    ClassroomID:'',//   教室ID
					    RoomName:'',//   其它地方
						},
		}
	},
	onLoad: function(option) {
	if(option){
		this.formData.ExamID=option.ExamID
		this.examName=option.Title
		console.log(this.formData.ExamID,'examid',this.formData.Title,'Title')
	}
	try {
	    const InstituteID = uni.getStorageSync('iid');
		const CampusID = uni.getStorageSync('cid');
			this.formData.InstituteID=InstituteID;
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
		this.getClassroom()
	},
	methods: {
		getClassroom(){//教室
			var that = this;
			uni.request({
				url: that.domain+'campus/classroom/cid/'+that.formData.CampusID,
				method: 'get',
				success:function(res){
					for (let item in res.data.msg){
						if(res.data.msg[item].IsExam=='1'){
							that.classroom.push(res.data.msg[item]) ;
						}
					}
					console.log(that.classroom,'classroom');
				},
				fail:function(res){
					console.log(res);
				}
			})
		},
		// picker 切换：类型
				pickerChangetype : function (e) {
					this.RoomTypeIndex    = e.detail.value;
					 this.formData.RoomType = this.RoomType[this.RoomTypeIndex].ID;
				},	
		// picker 切换：教室
				pickerChangeroom : function (e) {
					this.classroomIndex     = e.detail.value;
					 this.formData.ClassroomID = this.classroom[this.classroomIndex].ID;
					 this.formData.Title = this.classroom[this.classroomIndex].RoomName;
				},			
		// 提交
		submit:function () {
			// console.log(this.formData,"submit");
			if(this.formData.RoomType=='0'&&this.formData.RoomName){
				this.formData.ClassroomID='';
				this.formData.Title='';
				this.apply()
			}
			else if(this.formData.RoomType=='1'&&this.formData.ClassroomID) 
			{
				this.formData.RoomName='';
				this.apply()
			}
			else{
				uni.showToast({title:"必填项请填写完整", icon:"none"});
			// console.log(this.formData,"submit");
			}
			
		},
		apply(){
			uni.request({
			    url: this.domain + 'exam/add_examroom', //提交表单
				method:'post',
			    data: this.formData,
			      header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
			    success: (res) => {
					uni.showToast({ title: '提交成功!', icon : "none"});
					console.log(res,"res")
				uni.redirectTo({
			     url: './setSchool?ID='+this.formData.ExamID
				});
			    },
				fail() {
					uni.showToast({ title: '提交失败!', icon : "none"});
				}
			});
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