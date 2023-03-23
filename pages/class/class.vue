<template>
	<view>
		<view class="gui-form-item gui-border-b gui-flex gui-space-between" @tap="additem">
			<view class="gui-margin gui-h4">添加课程</view>
			<view class="gui-margin gui-h2">+</view>
		</view> 
		<!-- <view class="gui-margin-top gui-padding">
			<text class="gui-h6 gui-color-gray">商品列表演示</text>
		</view> -->
		<view class="gui-margin-top">
			<gui-product-list 
			:products="course" 
			@gotoInfo="gotoInfo" v-if="course.length"></gui-product-list>
			<pui-base-img :item="nullItem" :width="650" :height="190" v-else></pui-base-img>
			</view>
		
		
	</view>
</template>

<script>
	
	var graceJS = require('@/GraceUI5/js/grace.js');
	export default {
		data() {
			return {
				course:'',
				nullItem:{title:'新增课程',src:'/static/base/null.png',url:"./addclass?campusID="+this.campusID},
				formData: {
					},
			}
		},
		components:{
			productList:'productList'
		},
		onLoad: function(option) {
			if(option.campusID){
				this.campusID = option.campusID;
			}
			
		},
		onShow:function(){
			this.getCourse();
		},
		methods:{
			getCourse(){
				var that = this;
				uni.request({
					url: that.domain+'campus/course/cid/'+that.campusID,
					method: 'get',
					success:function(res){
						that.course = res.data.msg;
						console.log(res,'course');
					},
					fail:function(res){
						console.log(res);
					}
				})
			},
			gotoInfo : function(idx, item){
				console.log('商品索引 : ' + idx);
				console.log('商品数据 : ');
				console.log(item);
			},
		
			additem(){
			uni.navigateTo({
				url:"./addclass?campusID="+this.campusID
			})
			}
		}
		}
</script>

<style>
.center-btn{text-align:center; line-height:66rpx; width:690rpx; font-size:28rpx; margin-top:20rpx;}
</style>
