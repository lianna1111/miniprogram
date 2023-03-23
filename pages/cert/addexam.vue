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
				<text class="gui-form-label"><text class="gui-color-red">*</text>报名项目</text>
				<view class="gui-form-body">
					<picker mode="selector" :range="Project" range-key="Title" @change="pickerChangePro">
						<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
							<!-- <text class="gui-text">{{Project[ProjectIndex]}}</text> -->
							<text class="gui-text">{{Project[ProjectIndex].Title}}</text>
							<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
						</view>
					</picker>
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
			areas   : '',//省市区
			IsPublic : [ '是', '否'],//piker：性别
			IsPublicIndex : 0,//pickerindex
			Project : [],//piker：开设那些项目
			ProjectIndex : 0,//pickerindex
				// 表单数据记录
				formData: {
					
					
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
	this.getExam(),
	this.getCert()
	
	},
	onShow:function(){

	},
	methods: {
		getCert(){
		var that =this
			uni.request({
				url: that.domain+'campus/item',
				method: 'post',
				data: {
					cid:that.formData.CampusID
				},
				  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
				
				success:function(res){
					that.certList = res.data.msg;
					console.log(res.data.msg,'报名过的项目');
					let arr=[];
					if(!res.data.msg.length){
						that.Project.unshift({ID:'',Title:'请选择报名的项目'});
						console.log(that.Project,'1')
					}else{
						console.log(that.certList,'2')
						for(let i in that.certList){
							for(let j in that.Project){
							 console.log(j,'item',that.certList[i].ItemID,'item.ItemID')
								if(that.Project[j].ID!=that.certList[i].ItemID){
									// that.Project[j]=''
									arr.push(that.Project[j]);//去掉报过名的
									console.log(arr,'arr',that.Project,'that.Project1');
								}
							}
						}
						arr.unshift({ID:'',Title:'请选择报名的项目'});
						that.Project=arr;
						if(that.Project.length=='1'){
							that.Project.push({Title:'暂无可报名项目！'})
						}
					}
					
					console.log(arr,'arr',that.Project,'that.Project2');
					//{ID:'',Title:'请选择报名的项目'}
				},
				fail:function(res){
					console.log(res);
				}
			})
		},
		getExam(){
		var that =this
			uni.request({
				url: that.domain+'exam',
				method: 'post',
			
				  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
				
				success:function(res){
					that.exam = res.data.msg;//考级项目
					console.log(res.data.msg,'exam');
					for(let i=0;i<that.exam.length;i++){
					 if(that.exam[i].Status=='1'){
						 that.Project.push(that.exam[i])
						 console.log(that.Project,'that.Project3');
					}
					}
					},
				fail:function(res){
					console.log(res);
				}
			})
		},
		
		// picker 切换：开设项目
				pickerChangePro : function (e) {
					this.ProjectIndex    = e.detail.value;
					 this.formData.ItemID = this.Project[this.ProjectIndex].ID;
					 this.Status=this.Project[this.ProjectIndex].Status
					 // for(let item in this.certList){
						//  // console.log(item,'item',this.certList[item].ItemID,'item.ItemID')
					 // if(this.Project[this.ProjectIndex].ID==this.certList[item].ItemID){
					 // 	uni.showToast({title:"该项目已报名！", icon:"none"});
					 // 	return}
						// }
					 
				},	
		
		
		// 提交
		submit:function () {
			// if(this.Status!='1') 
			// {uni.showToast({title:"该项目不可报名，请确认项目状态", icon:"none"});
			// return}
			// else{
				
			console.log(this.formData,"submit");
			uni.request({
			    url: this.domain + 'campus/add_item', //提交表单
				method:'post',
			    data: this.formData,
			      header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
			    success: (res) => {
					uni.showToast({ title: '提交成功!', icon : "none"});
					console.log(res,"res")
				uni.redirectTo({
					
			     url: './index'
				});
			    },
				fail() {
					uni.showToast({ title: '提交失败!', icon : "none"});
				}
			});
			// }
			
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