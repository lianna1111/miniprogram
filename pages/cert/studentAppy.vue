.<template>
	<gui-page 
	:customHeader="true" 
	:customFooter="true" 
	:headerSets="{height:0, zIndex:100}"
	:footerSets="{height:100, zIndex:100, bg:'linear-gradient(to bottom, #F8F8F8,#F8F8F8)'}">
	<view class="gui-padding" slot="gHeader">
		<view class="gui-flex gui-space-around">
			<view class="gui-fixed-lt">已选{{selectNum}}人</view>
			<button type="default" class="gui-button  gui-bg-primary gui-border-radius gui-fixed-rt">
			 <text class="gui-color-white gui-button-text">自动分配考场考次</text>
			</button>
		</view>
		</view>
		<view class="gui-padding" slot="gBody">
			<view style="margin-top:15rpx;">
			<!-- 	<view class="gui-fixed-lt">已选{{selectNum}}人</view>
				<view class="gui-fixed-rt">已选{{selectNum}}人</view> -->
				<pui-select-list 
				v-if="lists.length >= 1" 
				:items="lists" iconSize="42rpx" @change="change" 
				type="checkbox" checkedType="ring" ref="selectList"></pui-select-list>
			<pui-base-img :item="nullItem" :width="650" :height="190" v-else></pui-base-img>
			</view>
			
		</view>
		<view slot="gFooter" 
		v-if="lists.length >= 1" 
		class="gui-padding gui-flex gui-rows gui-space-between gui-align-items-center" 
		style="border-top:1px solid #E8E8E8;">
			<view class="footerBtns">
				<gui-select-list :items="selectBtn" iconSize="42rpx" @change="btnChange"
				type="checkbox" checkedType="ring"></gui-select-list>
			</view>
			<view ></view>
			<view class="gui-border gui-bg-white gui-border-radius-large" style="height: 100rpx;">
				<picker mode="selector" :range="examGrade" range-key="GradeTitle"
				 class="float-right gui-margin gui-color-gray" @change="pickerChangeexamGrade">
					<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
						<text class="gui-text">{{examGrade[examGradeIndex].GradeTitle}}</text>
						<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
					</view>
				</picker>
			</view>
			<text class="footerBtns gui-icons gui-block-text gui-text gui-text-right"
			@tap="appy">&#xe625; 报名</text>
		</view>
		
		
	</gui-page>
</template>

<script>
	var graceJS = require('@/GraceUI5/js/grace.js');
	export default {
		data() {
			return {
				student:[],
				nullItem:{title:'请优先确保校区已添加学生',src:'/static/base/null.png',url:"#"},
				examGrade:[{ID:'',GradeTitle:'报名等级'}],
				examGradeIndex:'0',
				selectNum:0,
				headerStyle:'background-color:linear-gradient(to bottom, #F8F8F8,#F8F8F8);',
				formData: {
					LevelID:'',//等级；
					Fee:'',//费用
					StudentCode:'',//学生学号串
					},
					lists : [
					
					],
					// 底部选择按钮
					selectBtn : [
						{title:"全选", checked:false},]
			}
		},
		
		onLoad: function(option) {
			if(option){
				this.formData.CampusID = option.campusID;
				this.formData.InstituteID = option.InstituteID;
				// this.formData.InstituteID = '1';
				this.formData.ItemID = option.ID;
				console.log(option,'option')
			}
		},
		onShow:function(){
			this.getcert();//已报名学生
			this.getStudent();//所有学生
			this.getExamGrade();//等级
		},
		methods:{
			pickerChangeexamGrade : function (e) {
				console.log(e);
				this.examGradeIndex    = e.detail.value;
				this.formData.LevelID = this.examGrade[this.examGradeIndex].GradeID;
				this.formData.Fee = this.examGrade[this.examGradeIndex].Fee;
			},	
			getcert(){
				var that = this;
				uni.request({
					url: that.domain + 'campus/exam/cid/'+that.formData.CampusID+'/eid/'+this.formData.ItemID,
					method: 'get',
					success:function(res){
						that.certlist = res.data.msg;
						// let tmparr=[];
						// for(let i in that.certlist){
							// if(tmparr.indexOf(that.certlist[i])){
								
							// 	console.log(tmparr,'123',that.certlist[i],'that.certlist[i]')
							// }else{
							// 	tmparr.push(that.certlist[i])
							// }
						// }
						let dataInfo = {};
						that.certlist.forEach((item, index) => {
							let { StudentCode } = item;
							if (!dataInfo[StudentCode]) {
								dataInfo[StudentCode] = {
									StudentCode,			
									child: []
								}
							}
							dataInfo[StudentCode].child.push(item);
						});
						let list = Object.values(dataInfo); // list 转换成功的数据
						console.log(list,'123')
						that.certlist=list

						// console.log(res,'报名的学生');
					},
					fail:function(res){
						console.log(res);
					}
				})
			},
			getExamGrade(){
				var that = this;
				uni.request({
					url: that.domain + 'exam/id/'+this.formData.ItemID,
					method: 'get',
					success:function(res){
						that.examGrade = res.data.msg.ExamGrade;
						that.examGrade.unshift({ID:'',GradeTitle:'报名等级'})
						console.log(that.examGrade,'报名的等级');
					},
					fail:function(res){
						console.log(res);
					}
				})
			},
			getStudent(){
				var that = this;
				uni.request({
					url: that.domain + 'campus/student/cid/'+that.formData.CampusID,
					method: 'get',
					success:function(res){
						that.lists = res.data.msg;
						for(let i in that.lists){
							that.lists[i].checked=''
							for(let j in that.certlist){
								if(that.certlist[j].StudentCode==that.lists[i].StudentCode){
									// console.log(that.lists[i],'baomingle ')
									let level ='';
									if(that.certlist[j].child.length=='1'){
										that.lists[i].LevelID=that.certlist[j].child[0].LevelID;//报考单个等级
										that.lists[i].Status='1';//已报名
									}
									else{
										for(let o in that.certlist[j].child){
											level+=that.certlist[j].child[o].LevelID+','
										}
										level.substr(0,level.length-1)
										that.lists[i].LevelID=level;//报考多个等级
										that.lists[i].Status='2';//已报名
									}
								}
							}
						}
						
						console.log(that.lists,'lists')
					},
					fail:function(res){
						console.log(res);
					}
				})
			},
		addimport(){//表格
		uni.navigateTo({
			url:"./import?campusID="+this.formData.CampusID
		})
		},
			additem(){
			uni.navigateTo({
				url:"./studentReg?campusID="+this.formData.CampusID
			})
			},
			change : function(e){
				console.log(e,'e')
				if(e){
					this.selectNum=e.length
				}
				if(e.length >= this.lists.length){
					this.selectBtn[0].title   = "取消";
					this.selectBtn[0].checked = true;
				}else{
					this.selectBtn[0].title   = "全选";
					this.selectBtn[0].checked = false;
				} 
			},
			btnChange : function (e) {
				var status = false;
				if(e.length > 0){
					status = true;
					this.selectBtn[0].checked = true;
					this.selectBtn[0].title   = "取消";
				}else{
					this.selectBtn[0].checked = false;
					this.selectBtn[0].title = "全选";
				}
				var tmpArr = [];
				this.lists.forEach((item)=>{
					item.checked = status;
					tmpArr.push(item);
				});
				this.lists = [];
				this.$nextTick(()=>{
					this.lists = tmpArr;
				});
			},
			appy(){
				var indexs = this.$refs.selectList.getSelectedIndex();
				if(indexs.length < 1){
					uni.showToast({
						title : "请选择数据",
						icon  : "none"
					});
					return ;
				}else if(!this.formData.LevelID){
					uni.showToast({
						title : "请选择报考等级",
						icon  : "none"
					});
					return ;
				}
				uni.showModal({
				    title   : '提示',
				    content : '确定为以上学生报名吗?',
				    success : (res) => {
				        if (res.confirm) {
							let tmpArr = '';
							let NameArr='';
							for(let i=0;i<indexs.length;i++){
								if(tmpArr.length=='0'){
									tmpArr=tmpArr+this.lists[indexs[i]].StudentCode
								}else{
									tmpArr=tmpArr+','+this.lists[indexs[i]].StudentCode
								}
							}
							// console.log(tmpArr,'tmpArr')//报名学生的code
							this.formData.StudentCode=tmpArr
							// uni.navigateTo({
							// 	url:'./detail?StudentCode='+tmpArr+'&StudentName='+NameArr+'&ItemID='+this.formData.ItemID
							// })
							this.doappy()
				          
				        }
				    }
				});   
			},
			doappy(){
					console.log(this.formData,"submit");
					uni.request({
					    url: this.domain + 'campus/add_exam', //提交表单
						method:'post',
					    data: this.formData,
					      header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
					    success: (res) => {
							uni.showToast({ title: '提交成功!', icon : "none"});
							console.log(res,"res")
						this.lists='';
						this.getcert()
						this.getStudent()
					    },
						fail() {
							uni.showToast({ title: '提交失败!', icon : "none"});
						}
					});
			},
			remove : function () {
				// 获取选中的数据索引
				var indexs = this.$refs.selectList.getSelectedIndex();
				if(indexs.length < 1){
					uni.showToast({
						title : "请选择数据",
						icon  : "none"
					});
					return ;
				}
				uni.showModal({
				    title   : '提示',
				    content : '确定要删除选中数据吗?',
				    success : (res) => {
				        if (res.confirm) {
							var tmpArr = [];
				            this.lists.forEach((item, idx) => {
				            	if(graceJS.arrayIndexOf(indexs, idx) == -1){
									tmpArr.push(item);
									console.log(tmpArr,'tmpArr')
									console.log(item,'item')
								}
				            });
							this.lists = tmpArr;
				        }
				    }
				});
			}
		}
		}
</script>

<style>
	.footerBtns{width:200rpx;}
.center-btn{text-align:center; line-height:66rpx; width:690rpx; font-size:28rpx; margin-top:20rpx;}
</style>
