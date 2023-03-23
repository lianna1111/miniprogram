<!-- 所有考级项目 报过名的黑色 没报名的 点进去给学生报名 改图片形式 首页的也改图片 -->
<template>
	<view class="gui-margin">
		<view class="gui-form-item gui-border-b gui-flex gui-space-between" >
			<view class="gui-margin gui-h4">考级</view>
			<!-- 添加按钮 -->
		
				<text class="center-btn gui-block-text gui-icons gui-color-orange1" 
				@tap="additem">&#xe6c7; 报名考级</text>
			
		</view>
		<view class="gui-card-list gui-flex gui-rows gui-wrap gui-space-between gui-margin-top"  v-if="list.length" >
			<view class="gui-card-item" hover-class="gui-tap" v-for="item in list" @tap="ToDetail(item.ID)">
				<view class="gui-card-img" >
					<gui-image :width="330" :height="191"  :src="item.Pic"></gui-image>
					<view class="gui-absolute-rt gui-color-gray">{{item.Status}}</view>
				</view>
				<view class="gui-flex gui-space-between">
					<text class="gui-card-title gui-block-text gui-text gui-primary-color">{{item.Title}}</text>
					
					<text class="gui-icons gui-h4  gui-bg-orange1 " style="padding: 10rpx;border-radius: 10rpx;margin-top: 5rpx;"
					@tap="setSchool(item.ID,item.Title)">&#xe613;</text>
				</view>
				<text class="gui-block-text gui-text-small gui-color-gray">{{item.Contact}}:{{item.Telphone}}</text>
			</view>
		</view>
		<pui-base-img :item="nullItem" :width="650" :height="190" v-else></pui-base-img>
		
	</view>
</template>



<script>
	
	var graceJS = require('@/GraceUI5/js/grace.js');
	export default {
		data() {
			return {
				exam:'',
				InstituteID:'',
				list:'',
				nullItem:{title:'报名考级',src:'/static/base/null.png',url:"./addexam"},
				formData: {
					},
			}
		},
		
		onLoad: function(option) {
			try {
			    const InstituteID = uni.getStorageSync('iid');
				const CampusID = uni.getStorageSync('cid');
					this.InstituteID=InstituteID;
					this.CampusID=CampusID
					console.log(option,'option')
			  
			} catch (e) {
			    // error
			}
			
		},
		onShow:function(){
			this.getExam();
		},
		methods:{
			
			getExam(){
			var that =this
				uni.request({
					url: that.domain+'campus/item',
					method: 'post',
					data: {
						cid:that.CampusID
					},
					  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
					
					success:function(res){
						that.exam = res.data.msg;
						console.log(res.data.msg,'报名过的项目');
						that.getProject()
						
					},
					fail:function(res){
						console.log(res);
					}
				})
			},
			getProject(){
			var that =this
				uni.request({
					url: that.domain+'exam',
					method: 'post',
					
					  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
					
					success:function(res){
						that.project = res.data.msg;
						// console.log(res.data.msg,'所有的项目');
						if(that.exam){
							let arr=[]
							for(let i=0;i<that.exam.length;i++){
								// console.log(i,'i')
								for(let j=0;j<that.project.length;j++){
									if(that.exam[i].ItemID==that.project[j].ID){
										arr[i]=that.project[j]
										arr[i]
										if(arr[i].Status=='0'){
										arr[i].Status='待审核'
										}else if(arr[i].Status=='1'){
											arr[i].Status='待报名'
											// arr[i].bgcolor='#ffcb52'
										}else if(arr[i].Status=='2'){
											arr[i].Status='待缴费'
										}else if(arr[i].Status=='3'){
											arr[i].Status='已缴费'
										}else if(arr[i].Status=='4'){
											arr[i].Status='已结束'
										}
									}
								}
							}
							that.list=arr//展示的项目
							console.log(that.list,'展示的项目');
						}
					},
					fail:function(res){
						console.log(res);
					}
				})
			},
			additem(){
				uni.navigateTo({
					url:'./addexam'
				})
			},
			ToDetail(ID){
				uni.navigateTo({
					// url:'./detail?id='+id
					url:'./studentAppy?campusID='+this.CampusID+'&InstituteID='+this.InstituteID+'&ID='+ID
				})
			},
			setSchool(ID,Title){
				uni.navigateTo({
					url:'./setSchool?ID='+ID+'&Title='+Title
				})
			}
			
		}
		}
</script>

<style>
.center-btn{text-align:center; line-height:66rpx; width:250rpx; font-size:28rpx; margin-top:20rpx;}
</style>

	