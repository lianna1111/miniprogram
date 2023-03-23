<template>
	<view class="gui-padding" 
	style="min-height:100vh; background-color:#F8F8F8;">
	<view style="height:30rpx;"></view>
		<view class="gui-flex gui-space-between">
			<text class="gui-h5 gui-color-orange1 gui-block-text" @tap="additem">新增考场</text>
			<text class="gui-h2 gui-color-orange1 gui-block-text" @tap="additem">+</text>
		</view>
		<view class="gui-card-view gui-margin-top gui-box-shadow" v-for="(item,index) in School" v-if="School.length">
			<view class="gui-card-body gui-border-b gui-flex gui-rows gui-nowrap">
				<!-- <image src="https://graceui.oss-cn-beijing.aliyuncs.com/faces/2.png" class="gui-card-img"></image> -->
				<view class="gui-card-desc">
					<view class="gui-flex gui-rows gui-nowrap gui-align-items-center">
						<!-- <text class="gui-card-name">编号：{{item.ID}}</text> -->
						<text class="gui-card-name">{{Title}}</text>
					</view>
					<text class="gui-card-text gui-block-text" style="margin-top:10rpx;">教室名称：{{item.RoomType=='1'?item.Title:item.RoomName }}</text>
					<text class="gui-card-text gui-block-text" >教室类型：{{item.RoomType=='1'?'校区教室':'其他'}}</text>
				<view class="gui-card-footer gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
					<!-- <text class="gui-icons gui-card-footer-item gui-border-r"  @tap="additem">&#xe613; 新增考场</text> -->
					<text class="gui-icons gui-card-footer-item" @tap="setTime(item.ClassroomID)">&#xe61e; 考次设置</text>
					<!-- <text class="gui-icons gui-card-footer-item gui-border-r"  @tap="selectStudent(item.ID)">&#xe613; 分配学生</text> -->
				</view>
				</view>
				
			</view>
			
		</view>
		<view class="" v-if="School.length"></view>
		<pui-base-img :item="nullItem" :width="650" :height="190" v-else></pui-base-img>
		
	</view>
</template>
<script>
export default {
	data() {
		return {
			School:[],//校区列表
			classroom:[],//教室
			nullItem:{title:'新增考场',src:'/static/base/null.png',url:'./addSchool?ExamID='+this.ExamID+'&Title='+this.Title},
			ExamID:'',
			CampusID:'',
			Title:''//exam title
		}
	},
	onLoad(option) {
		if(option){
			this.ExamID=option.ID
			this.Title=option.Title
		}
			this.CampusID=uni.getStorageSync('cid');
	
		this.getSchool();
	},
	methods:{
		additem(){
			uni.navigateTo({ url:'./addSchool?ExamID='+this.ExamID+'&Title='+this.Title})
		},
		setTime(ClassroomID){
			uni.navigateTo({ url:'./setTime?ExamID='+this.ExamID+'&ID='+ClassroomID})
		},
		// setStudent(){
		// 	uni.navigateTo({ url:'./setStudent'})
		// },
		selectStudent(ID){uni.navigateTo({url:'./selectStudent?ExamID='+this.ExamID+'&ID='+ID})},
		
		getSchool(){
			var that =this;
			uni.request({
				url: that.domain + 'exam/examroom',
				method: 'post',
				data:{eid:that.ExamID,cid:that.CampusID},
				  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
				success:function(res){
					that.School = res.data.msg;
					console.log(that.School,'展示校区');
					
				},
				fail:function(res){
					console.log(res);
				}
			})
		}
	}
}
</script>
<style> 
/* 卡片视图 */
.gui-card-view{background-color:#FFFFFF; padding:25rpx;}
.gui-card-body{padding-bottom:25rpx;}
.gui-card-img{width:100rpx; height:100rpx; border-radius:80rpx;}
.gui-card-desc{width:400rpx; margin-left:25rpx; flex:1;}
.gui-card-name{font-size:28rpx; color:#333333; line-height:40rpx; margin-right:20rpx;}
.gui-card-text{line-height:40rpx; font-size:24rpx; color:#888888;}
.gui-card-footer{ margin-top:25rpx;}
.gui-card-footer-item{width:100rpx; text-align:center; flex:1; line-height:38rpx; font-size:26rpx; color:#666666;}
/* #ifndef APP-NVUE */
.gui-card-footer-item{display:block;}
.gui-box-shadow{box-shadow:0px 0px 3rpx #999999;}
/* #endif */
</style>