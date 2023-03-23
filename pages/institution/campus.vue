<template>
	<view class="gui-padding">
		<!-- 添加按钮 -->
		<view class="gui-form-item gui-padding gui-border-b gui-flex gui-space-between">
			<view class="gui-color-gray">校区列表</view>
			<text class=" gui-icons gui-color-orange1" 
			@tap="additem">&#xe6c7; </text>
		</view>
		<view v-for="(item,index) in campus" :key="index"  @tap='campusDetail(item.id,item.title)'  class="gui-form-item gui-border-b gui-flex gui-space-between">
			<view class="gui-margin gui-h4" >{{item.CampusName}}校区</view>
			<text class="gui-icons gui-form-icon gui-color-gray gui-text-right">&#xe601;</text>
		</view>
		<pui-base-img :item="nullItem" :width="500" :height="190" v-if="campus.length==0"></pui-base-img>
		
	
	</view>
</template>

<script>
	
	var graceJS = require('@/GraceUI5/js/grace.js');
	export default {
		data() {
			return {
				iid:"",//机构id
				//userinfo:"",//机构信息
				 campus:"",//校区信息
				 isEmpty:true,
				 nullItem:{title:'新增校区',src:'/static/base/null.png',url:'./schoolReg?iid='+this.iid},
				formData: {
					},
			}
		},
		
		onLoad: function() {
			console.log("onload")
			this.iid = uni.getStorageSync('iid');
			console.log(this.iid)
			this.getClist();
		},
		methods:{
			
			getClist(){
				uni.request({
					url: this.domain+'campus', //获取校区列表
					method:'post',
					data: {
					iid: this.iid
					// iid: '1'
					},
					  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
					success: (res) => {
						console.log(res,"res")
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
						if(res.data.errno=='0'){
							this.campus=res.data.msg
							// this.isEmpty=false
							console.log(this.iid,"this.iid")
							console.log(this.campus,"this.campus")
						}
					},
				})
			},
			additem(){
			uni.navigateTo({
				url:"./schoolReg?iid="+this.iid
			})
			},
			
			campusDetail(id,title){
				uni.navigateTo({
					url:"./detail?id="+id+'&title='+title
				})
			}
		}
		}
</script>

<style>
.center-btn{text-align:center; line-height:66rpx; width:690rpx; font-size:28rpx; margin-top:20rpx;}
</style>
