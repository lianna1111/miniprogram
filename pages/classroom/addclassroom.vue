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
				<text class="gui-form-label"><text class="gui-color-red">*</text>教室名称</text>
				<view class="gui-form-body">
					<input type="text" class="gui-form-input" 
					v-model="formData.RoomName" name="RoomName" placeholder="请输入教室名称" />
				</view>
			</view>
			
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label"><text class="gui-color-red">*</text>学生容量</text>
				<view class="gui-form-body">
					<input type="number" class="gui-form-input" 
					v-model="formData.Maxcount" name="Maxcount" placeholder="请输入最大学生容量" />
				</view>
			</view>
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label"><text class="gui-color-red">*</text>可设考场</text>
				<view class="gui-form-body">
					<picker mode="selector" :range="IsExam" range-key="value" @change="pickerChangeIsExam">
						<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
							<text class="gui-text">{{IsExam[IsExamIndex].value}}</text>
							<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
						</view>
					</picker>
				<!-- 	<input type="number" class="gui-form-input" 
					v-model="formData.IsExam" name="IsExam" placeholder="请输入可设考场数" /> -->
				</view>
			</view>
			<view class="gui-form-item gui-border-b" :class="[isShow==true?'':'unshow']">
				<text class="gui-form-label"><text class="gui-color-red">*</text>考生容量</text>
				<view class="gui-form-body">
					<input type="number" class="gui-form-input" 
					v-model="formData.MaxExamcount" name="MaxExamcount" placeholder="请输入最大考生容量" />
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
			IsExam : [{ID:'0',value:'不可设为考场'},{ID:'1',value:'可设为考场'}],//piker
			IsExamIndex : 0,//pickerindex
			isShow:false,//是否展示考生数
				// 表单数据记录
				formData: {
					// GradeID:'',?
					RoomName     :"",
					Maxcount     :"0",
					MaxExamcount :"0",
					IsExam       :"",
						},
		}
	},
	onLoad: function() {
	
	try {
	    const InstituteID = uni.getStorageSync('iid');
		const CampusID = uni.getStorageSync('cid');
		const UserID = uni.getStorageSync('uid');
	   console.log(UserID)
			this.formData.InstituteID=InstituteID;
			this.formData.UserID=UserID;
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

	},
	methods: {
		pickerChangeIsExam : function (e) {
			console.log(e);
			this.IsExamIndex    = e.detail.value;
			this.formData.IsExam = this.IsExam[this.IsExamIndex].ID;
			if(this.IsExam[this.IsExamIndex].ID=='1'){this.isShow=true;}
			else{this.isShow=false}
		},	
		// 提交
		submit:function () {
			if(!this.formData.RoomName||this.formData.Maxcount=='0') 
			{uni.showToast({title:"必填项请填写完整", icon:"none"});
			return}
			else if(this.isShow==true&&this.formData.MaxExamcount=='0')
				{uni.showToast({title:"必填项请填写完整", icon:"none"});
				return}
			else{
				if(!this.formData.IsExam){this.formData.IsExam='0'}//未设置则为空为0
			console.log(this.formData,"submit");
			uni.request({
			    url: this.domain+'campus/add_classroom', //提交表单
				method:'post',
			    data: this.formData,
			      header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
			    success: (res) => {
					if(res.data.errno==0){
					uni.showToast({ title: '提交成功!', icon : "none"});
					console.log(res,"res")
				uni.redirectTo({
					
			     url: './classroom?campusID='+this.formData.CampusID
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
.unshow{display: none;}
</style>