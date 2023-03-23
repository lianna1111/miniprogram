<template>
	<view class="gui-padding">
	
			<view class="gui-form-item gui-border-b gui-flex gui-space-between" @tap="additem">
				<!-- <view class="gui-margin gui-h4">添加</view> -->
				<text style="color: transparent;">1234</text>
					<text class=" gui-block-text gui-icons gui-color-orange1 " 
					@tap="additem">&#xe6c7; 添加</text>
					<text class="gui-h6 gui-tb-padding gui-block-text gui-icons gui-color-orange1"
					@tap="addimport">&#xe625; 快捷添加</text>
			</view> 
			<view class="gui-margin gui-margin-top" v-if="teacher.length">
				<view class="gui-list-items" v-for="item in teacher">
					<view class="gui-list-image gui-relative">
						<image class="gui-list-image" :src="item.Headimg"></image>
						<!-- <view class="gui-badge-point"></view> -->
					</view>
					<view class="gui-list-body gui-border-b">
						<view class="gui-list-title">
							<text class="gui-list-title-text gui-primary-color">{{item.TeacherName}}</text>
							<!-- <text class="gui-list-title-desc gui-color-gray">{{item.StudentCode}}</text> -->
						</view>
						<text class="gui-list-body-desc gui-color-gray">编号：{{item.TeacherCode}}</text>
					</view>
					<!-- <text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text> -->
				</view>
			</view>
	<pui-base-img :item="nullItem" :width="650" :height="190" v-else></pui-base-img>
	
		<!-- 添加按钮 -->
		<!-- <view>
			<text class="center-btn gui-block-text gui-icons gui-color-orange1" 
			@tap="additem">&#xe6c7; 添加教师</text>
			<text class="center-btn gui-block-text gui-icons gui-color-orange1"
			@tap="addimport">&#xe6c7; 快捷添加</text>
		</view> -->
		
	</view>
</template>

<script>
	
	var graceJS = require('@/GraceUI5/js/grace.js');
	export default {
		data() {
			return {
				teacher:'',
				nullItem:{title:'新增教师',src:'/static/base/null.png',url:"./teacherclass?campusID="+this.campusID},
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
			this.getTeacher();
		},
		methods:{
			getTeacher(){
				var that = this;
				uni.request({
					url: that.domain + 'campus/teacher/cid/'+that.campusID,
					method: 'get',
					success:function(res){
						if(res.data.errno==0){
						that.teacher = res.data.msg;
						console.log(res,'teacherlist');
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
				url:"./teacherReg?campusID="+this.campusID
			})
			}
		}
		}
</script>

<style>
.center-btn{text-align:center; line-height:66rpx; width:690rpx; font-size:28rpx; margin-top:20rpx;}
</style>
