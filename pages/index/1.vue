
<template>
	<view>
		<view class="">
			<gui-swiper :swiperItems="swiperItems" borderRadius="0 0 30rpx 30rpx" 
			:width="750" :height="330"  :spacing="0" :padding="0" 
			indicatorType="number" indicatorBarBgColor="rgba(0,0,0, 0)"></gui-swiper>
		</view>
		<view class="">
			<pui-index-item-list :items="itemList"></pui-index-item-list>
		</view>
			
		
	</view>

</template>

<script>
	
	var graceChecker = require("@/GraceUI5/js/checker.js");
	
	export default{
		data() {
			return {
				itemList		: [
					{id:1,title:'校区',src:'/static/index/biaoge.png',desc:'',url:'../institution/campus'},
					
					{id:8,title:'考试报名系统',src:'/static/index/yijian.png',desc:'',url:'../institution/exam'},
					{id:8,title:'考官签约',src:'/static/index/yijian.png',desc:'',url:'../examiner/examiner'},
					{id:9,title:'财务统计',src:'/static/index/yijian.png',desc:'',url:'../institution/finance'}
				],
				swiperItems : [//轮播图
					{
						img : '/static/index/chro.png',
						url : '',
						title:"测试标题 001",
						opentype : 'navigate'
					},
					{
						img : '/static/index/chro.png',
						url : '',
						title:"测试标题 002",
						opentype : 'navigate'
					},
					{
						img : '/static/index/chro.png',
						url : '',
						title:"测试标题 003",
						opentype : 'navigate'
					},
				],
				user : {}
					}
				},
		onLoad: function() {
			
			console.log("onload")
		
			    //  uni.getStorageSync('unionid');
			if (!uni.getStorageSync('uid')) {
					uni.redirectTo({
						url:"../login/reg"
					})
					}
					
			if(!uni.getStorageSync('utype')){
				uni.redirectTo({
					url:"../id/idcard"
				})
			}
			// 用户类型
			try {
			    const uType = uni.getStorageSync('utype');
			
			    if(uType==0){
			    	//机构
			    }else if(uType==1){
			    	this.itemList= [
			    	{id:1,title:'考级项目',src:'/static/index/enroll.png',desc:'',url:'../examiner/exam'},
			    	{id:2,title:'考试通知',src:'/static/index/enroll.png',desc:'',url:'#'}
			    	]
			    }
				else if(uType==2){//教师机构id？
					this.itemList= [
						{id:1,title:'朋友圈',src:'/static/index/enroll.png',desc:'',url:'../teacher/pyq'},
						{id:2,title:'学员管理',src:'/static/index/enroll.png',desc:'',url:'../student/student?campusID='+this.id},
						{id:3,title:'课程管理',src:'/static/index/enroll.png',desc:'',url:'../class/class?campusID='+this.id},
						{id:4,title:'班级管理',src:'/static/index/enroll.png',desc:'',url:'../classes/index?campusID='+this.id},
						{id:5,title:'家长互动',src:'/static/index/yijian.png',desc:'',url:'../teacher/contact'},
					]
				}else if(uType==3){//家长
					this.itemList= [
							{id:1,title:'个人中心',src:'/static/index/yijian.png',desc:'',url:'#'},
							{id:1,title:'作业提醒',src:'/static/index/upload.png',desc:'',url:'#'},
							{id:2,title:'课表提醒',src:'/static/index/yijian.png',desc:'',url:'#'},
							{id:2,title:'签到提醒',src:'/static/index/yijian.png',desc:'',url:'#'},//
							{id:2,title:'好友圈',src:'/static/index/upload.png',desc:'',url:'#'},
							{id:2,title:'交易系统',src:'/static/index/enroll.png',desc:'',url:'#'},//
							{id:2,title:'积分',src:'/static/index/enroll.png',desc:'',url:'#'},
						]
					}else if(uType==4){//学生
						this.itemList= [
							{id:1,title:'个人中心',src:'/static/index/yijian.png',desc:'',url:'#'},
							{id:1,title:'作业提醒',src:'/static/index/upload.png',desc:'',url:'#'},
							{id:2,title:'课表提醒',src:'/static/index/yijian.png',desc:'',url:'#'},
						]
				}
				else if(uType==5){//游客
					this.itemList= [
						 // {id:1,title:'证书查询',src:'/static/index/enroll.png',desc:'',url:'../visitor/cert'},
						 {id:1,title:'疫情信息统计',src:'/static/index/enroll.png',desc:'',url:'./health'},
						 {id:1,title:'test',src:'/static/index/enroll.png',desc:'',url:'./test'},
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
		
			// this.user = this.checkLogin();
		},
		
		methods: {
		//轮播图
		swiperchange : function(e){
			console.log(e);
		}
		}
	}
</script>

<style lang="scss">

</style>
