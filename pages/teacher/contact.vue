
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
			if(option.id){
				this.id = option.id;
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
					{id:1,title:'作业',src:'/static/index/enroll.png',desc:'',url:'#'},
					{id:2,title:'学生点评',src:'/static/index/enroll.png',desc:'',url:'#'},
					{id:3,title:'月测试',src:'/static/index/enroll.png',desc:'',url:'#'},
				
					
				]
			}
		
		}
	}
</script>

<style lang="scss">

</style>
