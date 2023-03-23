<template>
	<view class="gui-padding">
	
			<view class="gui-form-item gui-border-b gui-flex gui-space-between" @tap="additem">
				<view class="gui-margin gui-h4">添加班级</view>
				<view class="gui-margin gui-h2">+</view>
			</view> 
			<view class="gui-margin gui-margin-top" v-if="clase.length">
				<view class="gui-list-items" v-for="item in clase">
					<!-- <view class="gui-list-image gui-relative">
						<image class="gui-list-image" :src="item.Headimg"></image>
						<view class="gui-badge-point"></view>
					</view> -->
					<view class="gui-list-body gui-border-b">
						<view class="gui-list-title">
							<text class="gui-list-title-text gui-primary-color">{{item.ClassName}}</text>
							<!-- <text class="gui-list-title-desc gui-color-gray">{{item.StudentCode}}</text> -->
						</view>
						<text class="gui-list-body-desc gui-color-gray">{{item.Starttime}}-{{item.Endtime}}</text>
					</view>
					<!-- <text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text> -->
				</view>
			</view>
	<pui-base-img :item="nullItem" :width="650" :height="190" v-else></pui-base-img>
	
	
		
	</view>
</template>

<script>
	
	var graceJS = require('@/GraceUI5/js/grace.js');
	export default {
		data() {
			return {
				clase:'',
				nullItem:{title:'新增班级',src:'/static/base/null.png',url:"./classesReg?campusID="+this.campusID},
				formData: {
					},
			}
		},
		
		onLoad: function(option) {
			if(option.campusID){
				this.campusID = option.campusID;
			}
		},
		onShow:function(){
			this.getclase();
		},
		methods:{
			getclase(){
				var that = this;
				uni.request({
					url: that.domain + 'campus/clase/cid/'+that.campusID,
					method: 'get',
					success:function(res){
						if(res.data.errno==0){
						that.clase = res.data.msg;
						console.log(res,'claselist');
						}
					},
					fail:function(res){
						console.log(res);
					}
				})
			},
		addimport(){//表格
		uni.navigateTo({
			url:"./import"
		})
		},
			additem(){
			uni.navigateTo({
				url:"./classesReg?campusID="+this.campusID
			})
			}
		}
		}
</script>

<style>
.center-btn{text-align:center; line-height:66rpx; width:690rpx; font-size:28rpx; margin-top:20rpx;}
</style>
