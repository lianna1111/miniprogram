<template>
		<view>
			<view class="user-header" >
				<view class="gui-margin user-center  gui-flex gui-space-between" style="margin-bottom: 0;">
					<view class="user-face"  @tap="login">
						<gui-image :src="src" :width="130" :height="130"></gui-image>
						<text class=" gui-color-black gui-h6 " >{{nickname}}</text>
					</view>
					<!--  -->
					<view class=""></view>
					<view class="gui-flex gui-column gui-justify-content-center float-right">
						<picker mode="selector"  v-if="gradename=='家长'||gradename=='学生'" :range="grade"
						 class="float-right gui-margin gui-color-gray" @change="pickerChangegrade">
							<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
								<text class="gui-text">{{grade[gradeIndex]}}</text>
								<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
							</view>
						</picker>
						<text class=" gui-margin gui-color-gray" >用户身份：{{gradename}} </text>
					</view>
					
				</view>
			</view>
			<view style="height: 200rpx;"></view>
			
			<view class="">
				<view class="gui-margin">温馨提示：<text class="gui-color-gray gui-h6">(请截图扫码)</text></view>
				<view class="card">
					<gui-swiper :swiperItems="swiperItems" :indicatorType='none'
								:width="750" :height="250"></gui-swiper>
				</view>
			</view>
			<!-- <view class="gui-margin gui-margin-top">
				<pui-item-list :items="itemList"></pui-item-list>
			</view> -->
		<!-- <view style="margin-top:80rpx;"  v-if='gradename=="游客"'>
			<button type="default" @tap="opentop" class="gui-margin border-orange gui-bg-white" formType="submit" 
			style="border-radius:20rpx; ">
				<text class="gui-color-orange1 gui-button-text">{{text}}</text>
			</button>
		</view> -->
			
			<!-- 弹框 居中弹出 -->
			<!-- <gui-modal ref="guimodal1" 
					title="提交分数">
						<view slot="content" class="gui-padding gui-bg-gray">
							<text class="gui-block-text gui-text-center gui-text gui-color-gray" 
							style="line-height:100rpx; padding:10rpx;">确定切换身份？</text>
						</view>
						<view slot="btns" class="gui-flex gui-row gui-space-between">
							<view class="modal-btns gui-flex gui-margin" style="margin-right:80rpx;">
								<text class="modal-btns gui-color-gray" @tap="closetop">取消</text>
							</view>
							<view class="modal-btns gui-flex gui-margin" style="margin-left:80rpx;">
								<text class="modal-btns gui-color-red" @tap="confirmtop">确认</text>
							</view>
						</view>
					</gui-modal>	 -->
		</view>
</template>

<script>
	export default{
		data(){
			return{
				src:'../../static/user/user.png',
				headerStyle     : 'background:#ffcb52', // 头部导航样式
				statusBarStyle  : 'background:#ffcb52', // 状态栏样式
				gradename:'',
				user			: {},
				nickname:"",
				grade:['切换家长/学生','家长','学生'],
				gradeIndex:'0',
				text:'认证用户身份',
				itemList		: [],
					swiperItems : [
								{
									img : 'https://img.yiwenyw.com/contest/20220801114612_942.png',
									url : '',
								},
								{
									img : 'https://img.yiwenyw.com/contest/20220801114616_652.png',
									url : 'https://www.cida168.com',
									opentype : 'navigate'
								},
								
								 
								
							],
			}
		},
		onLoad: function() {
			console.log("onload")
			// var that=this
		
				//  uni.getStorageSync('unionid');
			    if (!uni.getStorageSync('uid')) {
					uni.redirectTo({
						url:"../login/reg"
					})
					}
		
			// if(!uni.getStorageSync('utype')){
			// 	uni.redirectTo({
			// 		url:"../id/idcard"
			// 	})
			// }
			// 用户类型
			try {
			    const uType = uni.getStorageSync('utype');
				this.nickname = uni.getStorageSync('nickname');
				this.src = uni.getStorageSync('face');
				// this.type=''
				
			    if(uType==0){
			    	//机构
					this.gradename='机构'
						this.itemList= [
							{id:1,title:'校区',src:'',desc:'',url:'../institution/campus'},
							{id:2,title:'考试报名系统',src:'',desc:'',url:'../institution/exam'},
							{id:2,title:'考官签约',src:'',desc:'',url:'../examiner/examiner'},
							{id:3,title:'财务统计',src:'',desc:'',url:'../institution/finance'}
						]
			    }else if(uType==1){//考官
				this.gradename='考官'
			    	this.itemList= [
			    		{id:1,title:'考级项目',src:'',desc:'',url:'../examiner/exam'},
						{id:2,title:'考试通知',src:'',desc:'',url:'#'}
			    	]
			    }else if(uType==2){//教师
				this.gradename='教师'
			    	this.itemList= [
						{id:1,title:'朋友圈',src:'/static/index/enroll.png',desc:'',url:'../teacher/pyq'},
						{id:2,title:'学员管理',src:'/static/index/enroll.png',desc:'',url:'../student/student?campusID='+this.id},
						{id:3,title:'课程管理',src:'/static/index/enroll.png',desc:'',url:'../class/class?campusID='+this.id},
						{id:4,title:'班级管理',src:'/static/index/enroll.png',desc:'',url:'../classes/index?campusID='+this.id},
						{id:5,title:'家长互动',src:'/static/index/yijian.png',desc:'',url:'../teacher/contact'},
					
			    	]
			    }else if(uType==3){//家长、学生
				this.gradename='家长'
					this.itemList= [	
			    		{id:1,title:'个人中心',src:'/static/index/yijian.png',desc:'',url:'#'},
			    		{id:1,title:'作业提醒',src:'/static/index/upload.png',desc:'',url:'#'},
			    		{id:2,title:'课表提醒',src:'/static/index/yijian.png',desc:'',url:'#'},
			    		{id:2,title:'签到提醒',src:'/static/index/yijian.png',desc:'',url:'#'},//
			    		{id:2,title:'好友圈',src:'/static/index/upload.png',desc:'',url:'#'},
			    		{id:2,title:'交易系统',src:'/static/index/enroll.png',desc:'',url:'#'},//
			    		{id:2,title:'积分',src:'/static/index/enroll.png',desc:'',url:'#'},
			    	]
				}else if(uType==4){
					this.gradename='学生'
					this.itemList= [
						{id:1,title:'个人中心',src:'/static/index/yijian.png',desc:'',url:'#'},
						{id:1,title:'作业提醒',src:'/static/index/upload.png',desc:'',url:'#'},
						{id:2,title:'课表提醒',src:'/static/index/yijian.png',desc:'',url:'#'},
					]
			    }
				else if(uType==5){//游客
				this.gradename='游客'
					this.itemList= [
						 // {id:1,title:'证书查询',src:'',desc:'',url:'../visitor/cert'},
						 {id:1,title:'疫情信息统计',src:'/static/index/enroll.png',desc:'',url:'../index/health'},
					]
				}
				else if(uType==6){//游客
				this.gradename='摄影师'
					this.itemList= [
						 {id:1,title:'疫情信息统计',src:'/static/index/enroll.png',desc:'',url:'../index/health'},
						 {id:2,title:'精彩瞬间',src:'/static/index/enroll.png',desc:'',url:'../photograph/index'},
					]
				}
			} catch (e) {
			    // error
			};
		
			//this.user = this.checkLogin();
		},
		methods:{
			pickerChangegrade : function (e) {
				console.log(e);
				this.gradeIndex    = e.detail.value;
				// this.grade1 = this.grade[this.gradeIndex];
				if(this.grade[this.gradeIndex]=='家长') {
					uni.setStorageSync('utype','3');
					this.gradename='家长'
				}else if(this.grade[this.gradeIndex]=='学生'){
					uni.setStorageSync('utype', '4');
					this.gradename='学生'
				}
				
				
			
			},	
			opentop : function () {
					this.$refs.guimodal1.open();
				},
				closetop : function () {
					this.$refs.guimodal1.close();
				},
				confirmtop : function () {
					// 客户点击确认按钮后的逻辑请在此处实现
					// this.$refs.guimodal1.close();
					uni.redirectTo({
						url:'../id/idcard'
					})
				},
			
			login(){
				if(!utype){
					uni.navigateTo({url:'../login/login'});
				}
			},
			logout(){
				
			}
		}
	}
</script>

<style>
	.user-header{overflow: visible;padding-top: 20rpx;background-color:#ffcb52 ;height: 200rpx;}
	.user-center{	 box-shadow:5rpx 2rpx 40rpx #e6e6e6;position: relative;width:630rpx;height:300rpx;margin-top:50rpx;padding-left: 30rpx;padding-right:30rpx;background-color: #FFF;border-radius: 15rpx;}
	.user-face{position: absolute;top: -50rpx;left: 50rpx;padding-left: 30rpx;padding-right:30rpx;border-bottom-left-radius: 15rpx;border-bottom-right-radius: 15rpx;}
	.user-hand{width:630rpx;padding: 0 30rpx 30rpx 30rpx;background-color: #FFF;border-bottom-left-radius: 15rpx;border-bottom-right-radius: 15rpx;border-left: 1px solid #fff4d6;border-right: 1px solid #fff4d6;border-bottom: 1px solid #fff4d6;}
	.user-hand-item{border-top: 1px solid #fff4d6;padding-top: 30rpx;}
	</style>
