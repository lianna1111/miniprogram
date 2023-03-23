
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
				itemList		: [ ],
				id:'',//校区id
				user : {}
					}
				},
		onLoad: function(option) {
			if(option){
				this.id = option.id;
				this.title = option.title;
				try {
					uni.setStorageSync('cid',option.id)
				  
				} catch (e) {
				    // error
				};
			}
			this.setCateItem()
		},
		
		methods: {
			setCateItem(){
				this.itemList = [
					{id:1,title:'学员管理',src:'/static/index/enroll.png',desc:'',url:'../student/student?campusID='+this.id+'&title='+this.title},
					{id:2,title:'课程管理',src:'/static/index/enroll.png',desc:'',url:'../class/class?campusID='+this.id},
					{id:3,title:'教室管理',src:'/static/index/enroll.png',desc:'',url:'../classroom/classroom?campusID='+this.id},
					{id:4,title:'班级管理',src:'/static/index/enroll.png',desc:'',url:'../classes/index?campusID='+this.id},
					{id:4,title:'教师管理',src:'/static/index/enroll.png',desc:'',url:'../teacher/teacher?campusID='+this.id},
					{id:5,title:'我的考级',src:'/static/index/enroll.png',desc:'',url:'../cert/index?campusID='+this.id},
					{id:6,title:'上课情况',src:'/static/index/yijian.png',desc:'',url:'../inclass/status'},
					
				]
			}
		
		}
	}
</script>

<style lang="scss">

</style>
