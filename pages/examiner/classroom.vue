<template>
	<view class="gui-padding">
		
		<view class="gui-form-item gui-border-b gui-flex gui-space-between" v-for="item in Classroom" @tap="jump(item.ClassroomID)">
			<text class="gui-margin gui-h4">{{item.RoomType=='1'?item.Title:item.RoomName }}</text>
			<text class="gui-icons gui-form-icon gui-color-gray gui-text-right">&#xe601;</text>
		</view>
	
		
		<!-- <button type="default " class="gui-bg-orange1 gui-color-white border-radius-15 border-none gui-margin-top-large" @tap="tomap">导航去</button> -->
		
	</view>
</template>

<script>
	
	var graceJS = require('@/GraceUI5/js/grace.js');
	export default {
		data() {
			return {
				eid:'',//examid
				campus:'',//all campus
				Classroom:[],//show
				formData: {
					},
			}
		},
		onLoad(option) {
			console.log(option,'op')
			this.eid=option.eid
			this.cid=option.cid
			this.getClassroom()
		},
		methods:{
			tomap(){
				uni.navigateTo({
				url:'./map'
			})
			},
			jump(ClassroomID){
				uni.navigateTo({
					url:'./score2?roomid='+ClassroomID+'&eid='+this.eid+'&cid='+this.cid
				})
			},
			
			getClassroom(){
				var that =this;
				uni.request({
					url: that.domain + 'exam/examroom',
					method: 'post',
					data:{eid:that.eid,cid:that.cid},
					  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
					success:function(res){
						if(res.data.errno==0){
						that.Classroom = res.data.msg;
						console.log(that.Classroom,'Classroom')
						}
					},
					fail:function(res){
						console.log(res);
					}
				})
			},
			
		}
		}
</script>

<style>
	

</style>
