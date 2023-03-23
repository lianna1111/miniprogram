<template>
	<gui-page :fullPage="true" :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody" class="gui-flex1 gui-flex gui-columns">
			<!-- 局部选项卡 使用 切换导航 + swiper 实现 -->
			<view class="demo-nav">
				<gui-switch-navigation  :items="tabs" :size="150" :currentIndex="currentIndex" @change="navchange"></gui-switch-navigation>
			</view>
			<swiper :current="currentIndex" @change="swiperChange" 
			:style="{height:mainHeight+'px', width:'750rpx'}">
				<!-- 轮播项目数量对应 上面的选项标签 -->
				<swiper-item>
					<!-- 使用滚动区域来实现主体内容区域 -->
					<scroll-view :scroll-y="true" class="gui-bg-gray" :style="{height:mainHeight+'px'}">
						
						<!-- 具体信息 -->							
						<view class="my-list">
							<navigator class="gui-list-items">
								<view class="gui-list-file:///D:/work/小程序/mini-program/pages/schoolReg/schoolReg.vuee gui-relative">
									<image class="gui-list-image" 
									src="https://cmsuse.oss-cn-beijing.aliyuncs.com/g5/15.png"></image>
									<view class="gui-badge-point"></view>
								</view>
								<view class="gui-list-body gui-border-b">
									<view class="gui-list-title">
										<text class="gui-list-title-text gui-primary-color">标题信息</text>
										<text class="gui-list-title-desc gui-color-gray">08/18/2020</text>
									</view>
									<text class="gui-list-body-desc gui-color-gray">描述信息</text>
								</view>
								<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
							</navigator>
							<navigator class="gui-list-items">
								<text class="gui-list-icon gui-icons gui-color-red">&#xe6cf;</text>
								<view class="gui-list-body gui-border-b">
									<view class="gui-list-title">
										<text class="gui-list-title-text gui-primary-color">标题信息</text>
										<text class="gui-list-title-desc gui-color-gray">08/18/2020</text>
									</view>
									<text class="gui-list-body-desc gui-color-gray">描述信息</text>
								</view>
								<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
							</navigator>
							<navigator class="gui-list-items">
								<text class="gui-list-icon gui-icons gui-color-green">&#xe666;</text>
								<view class="gui-list-body gui-border-b">
									<view class="gui-list-title">
										<text class="gui-list-title-text gui-list-one-line gui-primary-color">单行模式</text>
										<text class="gui-list-title-desc gui-color-gray">08/18/2020</text>
									</view>
								</view>
								<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
							</navigator>
							<navigator class="gui-list-items">
								<text class="gui-list-icon gui-icons gui-color-blue">&#xe61f;</text>
								<view class="gui-list-body gui-border-b">
									<view class="gui-list-title">
										<text class="gui-list-title-text gui-primary-color gui-list-one-line gui-ellipsis" 
										style="width:320rpx; height:60rpx;">标题文本文字很多，溢出省略</text>
									</view>
								</view>
								<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
							</navigator>
						</view>
													
						<!-- <text class="gui-block-text gui-text gui-color-gray gui-text-center demo-text">
							123
						</text> -->
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<!-- 使用滚动区域来实现主体内容区域 -->
					<scroll-view :scroll-y="true" class="gui-bg-blue" :style="{height:mainHeight+'px'}">
						<text class="gui-block-text gui-text gui-color-gray gui-text-center demo-text">two</text>
					</scroll-view>
				</swiper-item>
				
			</swiper>
		</view>
	</gui-page>
</template>
<script>
var graceJS = require('@/GraceUI5/js/grace.js');
export default {
	data() {
		return {
			// 全屏 loading
			pageLoading : true,
			// 选项卡标签
			tabs : [{id:1,name:'成功'},{id:2,name:'失败'}],
			// 选中选项的 索引
			currentIndex : 0,
			// 核心区域高度 
			mainHeight   : 200
		}
	},
	onLoad:function(){
		// 01. 获取页面主体高度
		graceJS.getRefs('guiPage', this, 0, (ref)=>{
			ref.getDomSize('guiPageBody', (e)=>{
				console.log(e);
				// 02. 导航的高度
				// 可以 使用 graceJS.select() 函数动态获取， 也可以使用 uni.upx2px 转换已知高度
				// 轮播主体高度 = 页面高度 - 导航高度
				this.mainHeight  = e.height - uni.upx2px(100);
				this.pageLoading = false;
			});
		});
	},
	methods: {
		navchange:function(index){
			this.currentIndex = index;
		},
		swiperChange : function(e){
			var index = e.detail.current;
			this.currentIndex = index;
		}
	}
}
</script>
<style lang="scss">
.demo-nav{padding:15rpx 30rpx;text-align: center;
.gui-flex{
	margin: auto;
}}
.nav-active-line{
	background-color: #ffcb52!important;
	background-image: none!important;
	
	
}
.my-list{margin:30rpx 0; padding:0 30rpx;}
</style>