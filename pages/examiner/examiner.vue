<template>
	<view class="gui-padding">
		<view class="gui-form-item gui-border-b">
			<text class="gui-form-label"><text class="gui-color-red">*</text>签约考官</text>
			<view class="gui-form-body">
				<picker mode="selector" :range="user" range-key="RealName" @change="pickerChangeUser">
					<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
						<text class="gui-text">{{user[userIndex].RealName}}</text>
						<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
					</view>
				</picker>
			</view>				
		</view>
		<view class="gui-form-item gui-border-b">
			<text class="gui-form-label"><text class="gui-color-red">*</text>艺术类别</text>
			<view class="gui-form-body">
				<picker mode="selector" :range="Cate" range-key="Title" @change="pickerChangeCate">
					<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
						<text class="gui-text">{{Cate[CateIndex].Title}}</text>
						<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
					</view>
				</picker>
			</view>				
		</view>
		<view class="gui-form-item gui-border-b">
			<text class="gui-form-label"><text class="gui-color-red">*</text>考官级别</text>
			<view class="gui-form-body">
				<picker mode="selector" :range="Level" range-key="Title" @change="pickerChangeLevel">
					<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
						<text class="gui-text">{{Level[LevelIndex].Title}}</text>
						<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
					</view>
				</picker>
			</view>				
		</view>
		
		<button type="default" class="submit-btn gui-bg-orange1 gui-margin gui-color-white gui-h6"
		@tap="submit">点击签约</button>
		
		<!-- <view  style="height: 700rpx;"></view> -->
		<navigator url="./examinerList" class="gui-color-blue float-right gui-margin" >已签约考官</navigator>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				examiner:'',//已签约考官
				Cate:[],
				CateIndex:0,
				Level:[{ID:0,Title:'请选择考官级别'},{ID:1,Title:'考官'},{ID:2,Title:'高级考官'},{ID:3,Title:'国家级考官'}],
				LevelIndex:0,
				user:[],//所有考官
				userIndex:0,
				formData:{
					InstituteID:'',
					ExaminerID:"",
					CategoryID:'',
					LevelID:""
					
				}
			}
		},
		onLoad() {
			this.formData.InstituteID=uni.getStorageSync('iid');
			this.getExaminer()
			this.getCate()
			this.getUserExaminer()
		},
		methods:{
			getExaminer(){
				var that =this;
				uni.request({
					url: that.domain + 'institute/examiner',
					method: 'post',
					data:{iid:that.formData.InstituteID},
					  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
					success:function(res){
						if(res.data.errno==0){
						that.examiner = res.data.msg;
						console.log(that.examiner,'考官');
						// if(that.examiner.length){
						// 	that.isEmpty=false
						// }
						}
					},
					fail:function(res){
						console.log(res);
					}
				})
			},
			getCate(){
				uni.request({
					url: this.domain + 'cate', //获取艺术类别
					method:'post',
					data: {
					},
					  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
					success: (res) => {
						if(res.data.errno==0){
						this.Cate=res.data.msg
						this.Cate.unshift({ID:0,Title:'请选择艺术类别'})
						}
					},
				})	
			},
			getUserExaminer(){
				uni.request({
					url: this.domain + 'user/examiner', //获取所有考官
					method:'post',
					data: {
					},
					  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
					success: (res) => {
						if(res.data.errno==0){
						this.user=res.data.msg
						this.user.unshift({AccountID:0,RealName:'请选择考官签约'})
						console.log(this.user,'userExaminer')
						}
					},
				})	
			},
			
			// picker 切换：项目
					pickerChangeCate : function (e) {
						this.CateIndex    = e.detail.value;
						 this.formData.CategoryID = this.Cate[this.CateIndex].ID;
					},	
			// picker 切换：级别
					pickerChangeLevel : function (e) {
						this.LevelIndex    = e.detail.value;
						 this.formData.LevelID = this.Level[this.LevelIndex].ID;
					},	
			// picker 切换：级别
					pickerChangeUser : function (e) {
						this.userIndex    = e.detail.value;
						 this.formData.ExaminerID = this.user[this.userIndex].AccountID;
					},	
		
		submit(){
			if(!this.formData.CategoryID||this.formData.CategoryID=='0'||!this.formData.LevelID||this.formData.LevelID=='0'
			||!this.formData.ExaminerID||this.formData.ExaminerID=='0'){
				uni.showToast({title:"必填项请填写完整", icon:"none"});
				return;
			}else{
				console.log(this.formData,'formdata')
				uni.request({
					url: this.domain + 'institute/add_examiner', //签约
					method:'post',
					data: this.formData,
					  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
					success: (res) => {
						console.log(res,'res')
						if(res.data.errno=='0'){
							uni.showToast({title:'签约成功！',icon:'none'})
						}
						
					},
				})	
			}
		}
			
		}
	}
</script>

<style>
	.input-box{
		
	}
</style>
