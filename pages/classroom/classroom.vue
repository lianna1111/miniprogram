<template>
	<view class="gui-padding">
	
			<view class="gui-form-item gui-border-b gui-flex gui-space-between" @tap="additem">
				<view class="gui-margin gui-h4">添加教室</view>
				<view class="gui-margin gui-h2">+</view>
			</view> 
			<view class="gui-margin gui-margin-top" v-if="classroom.length">
				<view class="gui-list-items" v-for="item in classroom">
				<!-- 	<view class="gui-list-image gui-relative">
						<image class="gui-list-image" :src="item.Headimg"></image>
						 <view class="gui-badge-point"></view>
					</view> -->
					<view class="gui-list-body gui-border-b">
						<view class="gui-list-title">
							<text class="gui-list-title-text gui-primary-color">{{item.RoomName}}</text>
							<!-- <text class="gui-list-title-desc gui-color-gray">{{item.StudentCode}}</text> -->
						</view>
						<text class="gui-list-body-desc gui-color-gray">学生容量：{{item.Maxcount}}</text>
					</view>
					<text class="  gui-color-gray-light">{{item.IsExam=='1'?'考场':'非考场'}}</text>
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
				classroom:'',
				nullItem:{title:'新增教室',src:'/static/base/null.png',url:"./addclassroom?campusID="+this.campusID},
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
			this.getClassroom();
		},
		methods:{
			getClassroom(){
				var that = this;
				uni.request({
					url: that.domain+'campus/classroom/cid/'+that.campusID,
					method: 'get',
					success:function(res){
						if(res.data.errno==0){
						that.classroom = res.data.msg;
						console.log(res,'classroom');
						}
					},
					fail:function(res){
						console.log(res);
					}
				})
			},
		
			additem(){
			uni.navigateTo({
				url:"./addclassroom?campusID="+this.campusID
			})
			}
		}
		}
</script>

<style>
.center-btn{text-align:center; line-height:66rpx; width:690rpx; font-size:28rpx; margin-top:20rpx;}
</style>
