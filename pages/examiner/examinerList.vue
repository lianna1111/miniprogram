<template>
	<view class="gui-padding">
		<view v-for="(item,index) in examiner" :key="index"   v-if="examiner.length" class="gui-form-item gui-border-b gui-flex gui-space-between">
			<view class="gui-margin gui-h4" >{{item.RealName}}({{item.level}})</view>
			<text class="gui-icons gui-form-icon gui-color-gray gui-text-right">{{item.Cate}}</text>
		</view>
		<pui-base-img :item="nullItem" :width="500" :height="190" v-else></pui-base-img>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				nullItem:{title:'暂无考官',src:'/static/base/null.png',url:'#'},
				examiner:'',//已签约考官
				Cate:[],//艺术类别
				user:[],//所有考官
				
				formData:{
					InstituteID:'',
					
					
				}
			}
		},
		onLoad() {
			this.formData.InstituteID=uni.getStorageSync('iid');
			this.getUserExaminer()
			this.getCate()
			
			
		},
		onShow() {
			// if(this.examiner.length){
			uni.showToast({title:'已找到结果，请稍后……',icon:'none'})
			setTimeout(()=>{
				this.getExaminer()
			},1000)
			// }
			
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
						if(that.examiner.length){
							for(let i in that.examiner){
								if(that.examiner[i].LevelID=='1'){that.examiner[i].level='考官'}
								else if(that.examiner[i].LevelID=='2'){that.examiner[i].level='高级考官'}
								else if(that.examiner[i].LevelID=='3'){that.examiner[i].level='国家级考官'}
								for(let j in that.user){
									if(that.examiner[i].ExaminerID==that.user[j].AccountID){
										that.examiner[i].RealName=that.user[j].RealName
									}
								}
								for(let z in that.Cate){
									if(that.examiner[i].CategoryID==that.Cate[z].ID){
										that.examiner[i].Cate=that.Cate[z].Title
									}
								}
							}
						}
						console.log(that.examiner,'已签约考官');
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
						console.log(res.data.msg,'cate')
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
						// console.log(this.user,'userExaminer')
						}
					},
				})	
			},
		
			
		}
	}
</script>

<style>
	.input-box{
		
	}
</style>
