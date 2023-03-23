<template>
	<view>
		<view class="gui-margin gui-margin-top gui-flex gui-space-between">
			<text class="gui-h5 gui-color-gray gui-bold">该场考生</text>
			<text class="gui-h3 gui-color-orange1 " @tap="additem">+</text>
		</view>
		
		<view class="my-list">
			<navigator class="gui-list-items" v-for="(item,index) in Students" v-if="Students.length">
				<text class="gui-list-icon gui-icons gui-color-red">&#xe6fe;</text>
				<view class="gui-list-body gui-border-b">
					<view class="gui-list-title">
						<text class="gui-list-title-text gui-primary-color">考生id：{{item.StudentID}}</text>
						<!-- <text class="gui-list-title-desc gui-color-gray">{{item.StartTime}}~{{item.EndTime}}</text> -->
					</view>
					<text class="gui-list-body-desc gui-color-gray">出场顺序：{{item.Sort}}</text>
				</view>
				<!-- <text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text> -->
			</navigator>
			<view class="" v-if="Students.length"></view>
		<pui-base-img :item="nullItem" :width="650" :height="190" v-else></pui-base-img>
	
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				nullItem:{title:'新增学生',src:'/static/base/null.png',url:'./addStudent?ExamID='+this.ExamID+'&ExamroomID='+this.ExamroomID+'&ExamtimeID='+this.ExamtimeID},
				Students:'',//考次
			}
		},
		onLoad(option) {
			if(option){
				this.ExamID=option.ExamID
				this.ExamroomID=option.ExamroomID
				this.ExamtimeID=option.ExamtimeID
			}
			this.getTime()
		},
		methods: {
			additem(ExamtimeID){
				console.log(ExamtimeID);uni.navigateTo({url:'./addStudent?ExamID='+this.ExamID+'&ExamroomID='+this.ExamroomID+'&ExamtimeID='+this.ExamtimeID})},
			getTime(){
				var that =this;
				uni.request({
					url: that.domain + 'exam/examtime_student',
					method: 'post',
					data:{timeid:that.ExamtimeID},
					  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
					success:function(res){
						that.Students = res.data.msg;
						console.log(that.Students,'展示该考次学生');
						
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
.my-list{margin:30rpx 0; padding:0 30rpx;}
</style>