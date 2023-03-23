<template>
	<view class="gui-margin" v-if="exam.length">
		<view class="gui-margin-top">
			<!-- <text class="gui-h5 gui-color-gray gui-bold">卡片列表</text> -->
		</view>
		<view class="gui-card-list gui-flex gui-rows gui-wrap gui-space-between gui-margin-top">
			<view class="gui-card-item" hover-class="gui-tap" v-for="item in exam" >
				<view class="gui-card-img" @tap="examDetail(item.ID)">
					<view class="gui-absolute-rt gui-color-white  gui-border-radius"
					:style="{background: item.bgcolor?item.bgcolor:'gray'}">
						<text class="">{{item.Status}}</text>
					</view>
					<gui-image :width="330" :height="191" 
					:src="item.Pic"></gui-image>
				</view>
				<view class="gui-flex gui-space-between">
				<text class="gui-card-title gui-block-text gui-text gui-primary-color">{{item.Title}}</text>
				<text class="gui-icons gui-h4  gui-bg-orange1 " style="padding: 10rpx;border-radius: 10rpx;margin-top: 5rpx;"
				@tap="more(item.ID,item.Title)">&#xe69e;</text>	
				</view>
				
				<text class="gui-block-text gui-text-small gui-color-gray">比赛时间：{{item.StartTime}}-{{item.EndTime}}</text>
			</view>
		
		</view>
	</view>
</template>

<script>
	
	var graceJS = require('@/GraceUI5/js/grace.js');
	export default {
		data() {
			return {
				exam:'',
				InstituteID:'',
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
			  
			} catch (e) {
			    // error
			}
			
		},
		onShow:function(){
			this.getExam();
			this.getCert();
		},
		methods:{
			more(ID,Title){uni.navigateTo({
				url:'./ordered?ID='+ID+'&Title='+Title
			})},
		getCert(){
			var that =this
			uni.request({
				url: that.domain+'campus/item',
				method: 'post',
				data: {
					cid:that.CampusID
				},
				  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
				
				success:function(res){
					if(res.data.errno==0){
					that.certList = res.data.msg;
					// console.log(res.data.msg,'报名过的项目');
					}
				},
				fail:function(res){
					console.log(res);
				}
			})
		},
		getExam(){
			var that =this
			uni.request({
				url: that.domain+'exam',
				method: 'post',
			
				  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
				
				success:function(res){
					that.exam = res.data.msg;//考级项目
					console.log(res.data.msg,'exam');
					for(let i=0;i<that.exam.length;i++){
					if(that.exam[i].Status=='0'){
					that.exam[i].Status='待审核'
					}else if(that.exam[i].Status=='1'){
						that.exam[i].Status='报名中'
						that.exam[i].bgcolor='#ffcb52'
					}else if(that.exam[i].Status=='2'){
						that.exam[i].Status='正在考级'
					}else if(that.exam[i].Status=='3'){
						that.exam[i].Status='暂停中'
					}else if(that.exam[i].Status=='4'){
						that.exam[i].Status='已结束'
					}	
					// for(let item in that.certList){
					// console.log(item,'item',that.certList[item].ItemID,'item.ItemID')
					// console.log(that.exam[i].ID,'that.exam[i].ID')
					// if(that.exam[i].ID==that.certList[item].ItemID){
					// 	that.exam[i].Status='已报名'
					// 	}
					// }
					}
					},
				fail:function(res){
					console.log(res);
				}
			})
		},
			examDetail(id){
				uni.navigateTo({
					url:'./examDetail?id='+id
				})
			},
			additem(){
			uni.navigateTo({
				url:"./addexam?campusID="+this.campusID
			})
			}
		}
		}
</script>

<style>
.center-btn{text-align:center; line-height:66rpx; width:690rpx; font-size:28rpx; margin-top:20rpx;}
</style>
