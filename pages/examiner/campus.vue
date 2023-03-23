<template>
	<view class="gui-padding">
		
		<view class="gui-form-item gui-border-b gui-flex gui-space-between" v-for="item in School" @tap="jump(item.CampusID)">
			<text class="gui-margin gui-h4">{{item.CampusName}}</text>
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
				School:[],//show
				formData: {
					},
			}
		},
		onLoad(option) {
			console.log(option,'op')
			this.eid=option.eid
			this.getClist()
		},
		methods:{
			tomap(){
				uni.navigateTo({
				url:'./map'
			})
			},
			jump(cid){
				uni.navigateTo({
					url:'./classroom?cid='+cid+'&eid='+this.eid
				})
			},
			getClist(){
				uni.request({
					url: this.domain+'campus', //获取校区列表
					method:'post',
					data: {
					// iid: this.iid
					iid: '1'
					},
					  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
					success: (res) => {
						if(res.data.errno==0){
						this.campus=res.data.msg
						console.log(this.campus,"教官匹配机构的所有校区")
						this.getSchool()
						}
					},
				})
			},
			getSchool(){
				var that =this;
				uni.request({
					url: that.domain + 'exam/examroom',
					method: 'post',
					data:{eid:that.eid},
					  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
					success:function(res){
						if(res.data.errno==0){
						that.School = res.data.msg;
						that.campus.forEach((item,i)=>{
							that.School.forEach((items,j)=>{
							if (that.School[j].CampusID==that.campus[i].ID){
								that.School[j].CampusName= that.campus[i].CampusName
							}
						})
						})
						
						console.log(that.School,'所有报名校区')
						
						let map = new Map();
						for (let item of that.School) {
						    if (!map.has(item.CampusID)) {
						        map.set(item.CampusID, item);
						    };
						};
						that.School = [...map.values()];
						console.log(that.School,'报名校区名')
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
