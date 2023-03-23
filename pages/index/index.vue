<template>
	<!-- https://test.yiwenyw.com/-》身份证健康码 -->
	<gui-page 
	:customHeader="true" 
	headerStyle="background-color:rgba(255,255,255,0);" 
	statusBarStyle="background-color:rgba(255,255,255,0);" 
	:isHeaderSized="false">
		<!-- 自定义头部导航 -->
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center gui-padding">
				<!-- 返回按钮 -->
				<!-- <gui-header-leading 
				:onlyBack="true" 
				buttonStyle="color:#FFFFFF;"></gui-header-leading> -->
			</view>
		</view>
		<!-- 页面主体 -->
		<view slot="gBody">
			
			<!-- 一个占位 view 目标是让页面产生滚动条 -->
			<!-- <view class="scrollHeightView"></view> -->
			<view class="">
				<pui-swiper :swiperItems="swiperItems"
				:width="750" :height="850"  :spacing="0" :padding="0" indicatorActiveClass='[gui-bg-orange]'
				></pui-swiper>
			</view>
			<!-- 主体 -->
			<view class="mian">
				<view class="gui-flex gui-space-between gui-lr-padding gui-h6" @tap="nav">
					<!-- @tap="address"多一个过度界面 -->
					<view class="gui-icons">  &#xe63f;  衡阳市体育中心体育馆</view>
					<view class="gui-icons gui-color-gray">导航去&#xe601;</view>
				</view>
				<pui-chayan :items="itemList"></pui-chayan>
			</view>
			<!--  -->
		</view>
		
	</gui-page>
</template>
<script>
export default {
	data() {
		return {
			webid:1,//轮播图：yyyw网站id
			signwd:'',//用户身份
			// 主体区域 top 值单位 px
			mainBodyTop         : 200,
			// 底部占位view高度 [ 系统会自动运算 ]
			warpHeight          : 1000,
			// 底部图层高度 [ 系统会自动运算 ]
			mainBodyHeight      : 800,
			swiperItems : [//轮播图
				{
					img : 'https://img.yiwenyw.com/contest/20220801114344_548.png',
					url : '',
					title:"舞蹈大赛",
					opentype : 'navigate'
				},
				{
					img : 'https://img.yiwenyw.com/contest/20220802132934_227.png',
					url : '',
					title:"测试标题 002",
					opentype : 'navigate'
				},
				{
					img : 'https://img.yiwenyw.com/contest/20220802132712_773.png',
					url : '',
					title:"测试标题 002",
					opentype : 'navigate'
				}
			
			],
			itemList		: [
				// {id:0,title:'照片墙',src:'/static/index/5.png',desc:'精彩照片',url:'../contest/photos'},
				{id:1,title:'赛程',src:'/static/index/1.png',desc:'比赛赛程',url:'../contest/contest'},
				{id:2,title:'日程',src:'/static/index/2.png',desc:'比赛日程安排',url:'../contest/daytime'},
				{id:3,title:'健康信息',src:'/static/index/3.png',desc:'提前准备好健康码行程码截图',url:'../contest/health'},
				{id:4,title:'交通指南',src:'/static/index/4.png',desc:'会场地点交通引导',url:'../contest/car'},
				{id:5,title:'秩序册',src:'/static/index/6.png',desc:'本次大赛秩序册',url:'../contest/book'},
				{id:6,title:'联系我们',src:'/static/index/7.png',desc:'欢迎联系我们',url:'../contest/contact'},
			],
		}
	},
	onLoad:function(option){
		console.log(option,'op')
		if(option){
			uni.setStorage('sign',option.sign)
			this.signwd=option.sign
		}else{
			this.signwd=uni.getStorageSync('sign')
		}
		const uid=uni.getStorageSync('uid')
		if (!uid) {
			uni.redirectTo({
				url:"../login/reg"
			})
			}
		//****
			if(uid=='109981'){
				this.itemList=[{id:1,title:'赛程',src:'/static/index/1.png',desc:'比赛赛程',url:'../contest/contest'},
				{id:2,title:'日程',src:'/static/index/2.png',desc:'比赛日程安排',url:'../contest/daytime'},]
			}
		// 获取页面高度
		var system = uni.getSystemInfoSync();
		this.mainBodyHeight = system.windowHeight - (this.mainBodyTop / 2);
		this.warpHeight     = system.windowHeight + (this.mainBodyTop / 2);
		this.sign()
		this.getcarousel()
	},
	
	methods:{
		getcarousel(){
			var that=this
			uni.request({
				url: that.domain + 'carousel?webid='+that.webid,
				method: 'get',
				success:function(res){
					if(res.data.errno==0){
					that.swiperItems = res.data.msg;
					console.log(res,'carousel');
					}
				},
				fail:function(res){
					console.log(res);
				}
			})
		},
		sign(){
			if(this.signwd=='photograph'){
				this.itemList=[
					{id:1,title:'精彩照片',src:'/static/index/5.png',desc:'上传比赛中的精彩照片',url:'../photograph/index'},
					{id:2,title:'健康信息',src:'/static/index/3.png',desc:'提前准备好健康码行程码截图',url:'../contest/health'}
				]
			}
		},
		nav() {
		    wx.openLocation({
		      latitude:26.885206,	//维度
		      longitude: 112.679614, //经度
		      name: "衡阳市体育中心",	//目的地定位名称
		      scale: 15,	//缩放比例
		      address: "湖南省衡阳市珠晖区衡阳师范学院东校区衡阳市体育中心"	//导航详细地址
		    })
		},
		scrolling : function (e) {
			if(e.detail.scrollTop <= this.mainBodyTop / 2){
				uni.pageScrollTo({
					duration  : 0,
					scrollTop : e.detail.scrollTop,
				});
			}
		},
		//地址
		adress(){
			uni.navigateTo({url:'../contest/adress'})
			//
		}
	}
}
</script>
<style scoped>
.scrollHeightView{}
.mian{position:relative; left:0; top:-15rpx; z-index:1; border-radius:15rpx 15rpx 0 0;background-color:#fffefa;padding-top:50rpx; }

</style>