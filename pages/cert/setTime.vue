<template>
	<view>
		<view class="gui-margin gui-margin-top gui-flex gui-space-between">
			<text class="gui-h5 gui-color-gray gui-bold">考次设置</text>
			<text class="gui-h3 gui-color-orange1 " @tap="additem">+</text>
		</view>
		<view class="my-list">
			<navigator class="gui-list-items" v-for="(item,index) in Times"  v-if="Times.length">
				<text class="gui-list-icon gui-icons gui-color-red">&#xe6cf;</text>
				<view class="gui-list-body gui-border-b">
					<view class="gui-list-title">
						<text class="gui-list-title-text gui-primary-color">{{item.Title}}</text>
						<text class="gui-list-title-desc gui-color-gray">{{item.StartTime}}~{{item.EndTime}}</text>
					</view>
					<!-- <text class="gui-list-body-desc gui-color-gray">考官：{{item.ExaminerID}}</text> -->
				</view>
				<!-- <text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text> -->
			</navigator>
			<view class="" v-if="Times.length"></view>
			<pui-base-img :item="nullItem" :width="650" :height="190" v-else></pui-base-img>
			
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				Times:'',//考次
				nullItem:{title:'新增考次',src:'/static/base/null.png',url:'./addtime?ExamID='+this.ExamID+'&ExamroomID='+this.ExamroomID},
		
			}
		},
		onLoad(option) {
			if(option){
				this.ExamID=option.ExamID
				this.ExamroomID=option.ID
			}
			this.getTime()
		},
		methods: {
			additem(){uni.navigateTo({url:'./addtime?ExamID='+this.ExamID+'&ExamroomID='+this.ExamroomID})},
			// setStudent(ExamtimeID){console.log(ExamtimeID)
			// 	uni.navigateTo({url:'./setStudent?ExamID='+this.ExamID+'&ExamroomID='+this.ExamroomID+'&ExamtimeID='+ExamtimeID})},
			getTime(){
				var that =this;
				uni.request({
					url: that.domain + 'exam/examtime',
					method: 'post',
					data:{roomid:that.ExamroomID},
					  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
					success:function(res){
						that.Times = res.data.msg;
						console.log(that.Times,'展示考次');
						
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