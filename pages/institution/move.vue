
<template>
	<view>
		
		<view class="">
			<pui-index-item-list :items="itemList"></pui-index-item-list>
		</view>
			
		
	</view>

</template>

<script>
	
	var graceChecker = require("@/GraceUI5/js/checker.js");
	
	export default{
		data() {
			return {
				itemList		: [
					{id:1,title:'学员上传',src:'/static/index/enroll.png',desc:'',url:'#'},
					{id:2,title:'课程上传',src:'/static/index/enroll.png',desc:'',url:'#'},
					{id:3,title:'教室上传',src:'/static/index/enroll.png',desc:'',url:'#'},
					{id:4,title:'教师上传',src:'/static/index/enroll.png',desc:'',url:'#'},
					
				],
				
				user : {}
					}
				},
		onLoad: function() {
			
		},
		
		methods: {
		
		}
	}
</script>

<style lang="scss">

</style>
