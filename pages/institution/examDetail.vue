<template>
	<view>
		<!-- 轮播图  -->
		<view>
			<gui-swiper :swiperItems="swiperItems" 
			:spacing="0" :padding="0" borderRadius="0rpx" 
			:width="750" :height="330"></gui-swiper>
		</view>
		<!-- 商品标题 分享按钮 -->
		<view class="gui-padding gui-margin-top gui-flex gui-rows gui-space-between gui-align-items-center">
			<text class="gui-h5 gui-block-text product-name gui-block-text">{{product.Title}}</text>
			<view class="">
				<text class=" gui-icons gui-color-orange">&#xe60c;{{product.Telphone}}</text>
			</view>
		</view>
		<view class="gui-common-line gui-margin-top"></view>

		<!-- 切换导航 -->
		<view class="gui-padding gui-margin-top">
			<gui-switch-navigation :items="navItems" lineHeight="80rpx" :isCenter="true" 
			:size="200" activeLineBg="linear-gradient(to right, #FF7900, #FF7900)" textAlign="center"
			activeColor="#FF7900" activeLineWidth="200rpx" activeLineHeight="2rpx" 
			:margin="10" @change="navChange"></gui-switch-navigation>
		</view>
		<!-- 详情 请根据项目情况自行改进 可以使用 富文本-->
		<view class="gui-padding gui-margin-top">
			<!-- <image style="width:690rpx;"
			:src="item" mode="widthFix" v-for="(item,index) in product.Pic" :key="index"></image> -->
			<p class='gui-h4 gui-color-gray gui-margin'>联系人:</p>
			<p>{{product.Contact}}:{{product.Telphone}}</p>
			<p class='gui-h4 gui-color-gray gui-margin'>报名时间：</p>
			<p>{{product.RegistrationStartTime}}~{{product.RegistrationEndTime}}</p>
			<p class='gui-h4 gui-color-gray gui-margin'>比赛时间:</p>
			<p>{{product.StartTime}}~{{product.EndTime}}</p>
			<!-- <p class='gui-h4 gui-color-gray gui-margin'>更多:</p>
			{{product.Content}} -->
		
			
			
		</view>
		
		<!-- 底部 -->
		<view class="product-footer gui-bg-white gui-border-t">
			<!-- 属性选择 -->
						<scroll-view class="product-attr" 
						:scroll-y="true" v-if="attrShow">
							
							<view class="gui-margin-top">
								<text class="gui-text gui-color-gray">请选择报名校区</text>
								<view class="gui-form-item gui-border-b text-center">
													<picker mode="selector" :range="campus" range-key="title" @change="pickerChange">
														<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
															<text class="gui-text">{{campus[campusIndex].title}}</text>
															<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
														</view>
													</picker>
											</view>
							</view>
							
						</scroll-view>
			<!-- 底部按钮栏 -->
			<view class="gui-flex gui-rows gui-space-between gui-align-items-center gui-border-t">
				<!-- 2个底部按钮 -->
								<view class="gui-footer-icon-buttons" style="margin-left:30rpx;" hover-class="gui-tap" @tap="goHome">
									<text class="gui-footer-icon-buttons-icon gui-block-text gui-icons gui-primary-color">&#xe63b;</text>
									<text class="gui-footer-icon-buttons-text gui-block-text gui-icons gui-primary-color">首页</text>
								</view>
								
				<!-- 2个大按钮 -->
				<!-- <view class="gui-flex1 gui-footer-large-buttons gui-margin-top gui-flex gui-rows gui-nowrap gui-justify-content-end"> -->
					
					<view class="gui-footer-large-button gui-text-center" @tap="buynow" 
					style="border-radius:50rpx; margin-right: 20rpx;" hover-class="gui-tap" :class="[disabledBtn?'gui-bg-buy':'gui-bg-black-opacity3,disabled-btn']">
						<text class="gui-text gui-color-white gui-footer-large-button-text gui-block-text gui-text-center">{{goto}}</text>
					</view>
				<!-- </view> -->
			</view>
			<gui-iphone-bottom></gui-iphone-bottom>
		</view>
		<!-- 底部占位 -->
		<view style="height:120rpx;"></view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			// picker 
						campus : ['请选择性别', '男', '女'],
						campusIndex : 0,
			// 轮播图 
			swiperItems : [
			{
				img : 'https://cmsuse.oss-cn-beijing.aliyuncs.com/g5/1.png',
				url : '',
				opentype : 'navigate'
			}
			],
			// 商品信息
			product : {},
			// 切换导航
			navItems : [{id:0, name:'详情'}],
			// 切换索引
			active   : 0,
			//禁用按键
			disabledBtn:false,
			goto:'暂未开启',
			// 属性选择
			attrShow : false,
			colors   : [ 
				{id:1,text:"红色",checked:false},
				{id:2,text:"黑色",checked:false},
				{id:3,text:"蓝色",checked:false}
			],
			sizes   : [
				{id:1,text:"10 cm",checked:false},
				{id:2,text:"20 cm",checked:false},
				{id:3,text:"40 cm",checked:false}
			],
			// 属性记录
			attrRes : {color:null, size:null, number:1},
			formData:{
				CampusID:''//校区id
			}
		}
	},
	onLoad: function(option) {
			this.formData.ItemID=option.id
			try {
			    const value = uni.getStorageSync('iid');
			    if (value) {
					this.formData.InstituteID=value
			    }else{
				}
			} catch (e) {
			    // error
			};
			this.getClist()
		
		},
		onShow:function(){
			this.getExam();
		},
	methods: {
		
		getClist(){
			uni.request({
				url: this.domain+'campus', //获取校区列表
				method:'post',
				data: {
				iid: this.formData.InstituteID
				},
				  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
				success: (res) => {
					if(res.data.errno==0){
					this.campus=res.data.msg;
					this.campus.unshift({id:'0',title:'请点击选择'});
					console.log(this.campus,"this.campus")
					
					// console.log(this.formData.iid,"this.iid")
					}
				},
			})
		},
		
			// picker 切换
				pickerChange : function (e) {
					// console.log(e);
					this.campusIndex    = e.detail.value;
					this.formData.CampusID = this.campus[this.campusIndex].url.split('./detail?id=').join('');
					this.getCert()
					},
					//报名过的项目
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
					if(res.data.errno==0){
					that.certList = res.data.msg;
					console.log(res.data.msg,'报名过的项目');
					for (let item in that.certList){
						if(that.formData.ItemID==that.certList[item].ItemID){
							console.log('重复报名')
							that.disabledBtn=true
							that.goto='跳转中'
							uni.showToast({
								title:'该项目已报名过，2秒后跳转到校区-我的考级'
							});
							setTimeout(()=>{
							uni.navigateTo({
								url:'../cert/index'
							})	
							},2000)
							
						}
					}
					}
				},
				fail:function(res){
					console.log(res);
				}
			})
		},	
		getExam(){
				var that =this
					uni.request({//获取报名项目
						url: that.domain+'exam',
						method: 'post',
						data: {
							id:that.formData.ItemID
						},
						  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
						
						success:function(res){
							if(res.data.errno==0){
							that.product = res.data.msg;
							that.swiperItems[0].img=res.data.msg.Pic;
							if(res.data.msg.Status=='0'){
								that.Status='待审核'
							}else if(res.data.msg.Status=='1'){
								that.Status='报名中'
								that.disabledBtn='ture'
								that.goto='立即报名'
							}else if(res.data.msg.Status=='2'){
								that.Status='正在考级'
							}else if(res.data.msg.Status=='3'){
								that.Status='暂停中'
							}else if(res.data.msg.Status=='4'){
								that.Status='已结束'
							}
		// （0:待审核，1:报名中，2:正在考级，3:暂停中，4:已结束）
							console.log(res.data.msg,'exam');
							}
						},
						fail:function(res){
							console.log(res);
						}
					})
				},
		// 分享
		// share: function(){uni.showToast({title:'请自行完善分享代码', icon: "none"});},
		// 导航切换
		navChange : function(e){ this.active = e; },
		// 返回首页
		goHome : function () {uni.switchTab({ url:"../index/index" });},
		// 返回首页
		
		// 购买 
		buynow : function () {
			// 选择属性
			this.selectAttr();
		},
		// 属性选择
		selectAttr : function () {
			// 未选择属性弹出选择
			if(!this.attrShow){
				this.attrShow = true;
				return ;
			}
			// 已选择属性进行订单提交
			// 属性在 attrRes 变量内保存
			console.log(this.formData)
			if(!this.formData.CampusID){
				uni.showToast({icon:"none", title:"请选择报名校区"});
			}
			else{
				that.appy()
			}
		},
		// 报名
		appy(){
			uni.request({
			    url: this.domain + 'campus/add_item', //提交表单
				method:'post',
			    data: this.formData,
			      header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
			    success: (res) => {
					if(res.data.errno==0){
					uni.showToast({ title: '提交成功!', icon : "none"});
					console.log(res,"res")
				uni.redirectTo({ url: './index'});
				}
			    },
				fail() {
					uni.showToast({ title: '提交失败!', icon : "none"});
				}
			});
		},
		
		closeAttr : function () {
			this.attrShow = false;
		}
	}
}
</script>
<style scoped>
.product-name{width:560rpx; line-height:50rpx;}
.product-share{width:80rpx; height:80rpx; text-align:center; font-size:50rpx; color:#FF7900; line-height:80rpx;}
.product-price{color:#FF7900; line-height:60rpx; font-size:30rpx; font-weight:bold;}
.gui-common-line{height:18rpx;}
.product-footer{position:fixed; z-index:99; left:0; bottom:0; width:750rpx;}
.product-attr{width:700rpx; margin:25rpx; height:580rpx;}
</style>