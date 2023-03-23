<template>
	<view class="gui-padding">
		<!-- exam->list -->
		<view  v-for="item in exam"  @tap="jump(item.ID)" class="gui-form-item gui-border-b gui-flex gui-space-between">
			<view class="gui-margin gui-h4" >{{item.Title}}</view>
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
				exam:'',//all data
				list:'',//show data
				formData: {
					},
			}
		},
		onLoad() {
			this.getExam();
		},
		methods:{
			jump(id){
				uni.navigateTo({
					url:"./campus?eid="+id
				})
			},
			getExam(){
				var that =this
				uni.request({
					url: that.domain+'exam',
					method: 'get',
					header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
					success:function(res){
						if(res.data.errno==0){
						that.exam = res.data.msg;//考级项目
						console.log(res.data.msg,'exam');
						for(let i=0;i<that.exam.length;i++){
						 if(that.exam[i].Status=='2'){
							that.list.push(that.exam[i])
						}	
						}
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
