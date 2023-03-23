.<template>
	<gui-page 
	:customFooter="true" 
	>
<!-- 	 <view class="" slot="gHeader">
		 <view class="gui-form-item gui-border-b gui-flex gui-space-around" @tap="additem">
				
					<text class=" gui-block-text gui-icons gui-color-orange1 " 
					@tap="additem">&#xe6c7; 添加</text>
					<text class="gui-h6 gui-tb-padding gui-block-text gui-icons gui-color-orange1"
					@tap="addimport">&#xe625; 快捷添加</text>
			</view> 
		 </view> -->
		<view class="gui-padding" slot="gBody">
			
			<view style="margin-top:15rpx;">
			
				<uni-indexed-list v-if="lists.length >= 1"  :options="lists" :showSelect="false"></uni-indexed-list>
				<pui-base-img :item="nullItem" :width="650" :height="190" v-else></pui-base-img>
			</view>
		</view>
	<view slot="gFooter"
	class="gui-padding gui-flex gui-rows gui-space-between gui-align-items-center" 
	style="border-top:1px solid #E8E8E8;">
		<!--<view class="">
			 <button type="default" @click="scanCode()" plain="true">
				<text class="gui-icons gui-h4 gui-color-gray">&#xe61d;  邀请</text>
			</button>
		</view>
		<button  class="margin-none " open-type="share"  bindgetuserinfo="share"  plain="true">
		    <image src="https://buy.fishqc.com/img/icon-share-default.png" style="width:34rpx;vertical-align: middle;" class="verticalAlign"  mode="widthFix"></image>
			<text class="gui-h4 gui-color-gray">    邀约</text>
		</button> -->
	<text class=" gui-block-text gui-icons gui-color-orange1 "
	@tap="additem">&#xe6c7; 添加学生</text>
	<text class="gui-h6 gui-tb-padding gui-block-text gui-icons gui-color-orange1"
	@tap="addimport">&#xe625; 快捷添加</text>
	</view>
	</gui-page>
</template>
<script>
	import {initial} from '@/static/chineseConversion.js'
	var graceJS = require('@/GraceUI5/js/grace.js');
	export default {
		
		data() {
			return {
				student:[],
				title:'',//校区名称
				formData: {
					},
					lists : [],
					nullItem:{title:'新增学生',src:'/static/base/null.png',url:"./studentReg?campusID="+this.campusID},
					// 底部选择按钮
					selectBtn : [
						{title:"全选", checked:false},
					],
					
			}
		},
		
		onLoad: function(option) {
			if(option){
				this.campusID = option.campusID;
				this.title = option.title;
			}
		},
		onShow:function(){
			this.getStudent();
		},
		methods:{
			// 小程序分享
			 onShareAppMessage: function (res) {
			        if (res.from === 'button') {
			            // 来自页面内转发按钮
			            console.log(res.target)
			        }
			        return {
			            title: '欢迎加入'+this.title+'校区！(注：校区编号：'+this.campusID+')',
						imageUrl:'/static/logo.png',
			            path: '/pages/id/studentReg'
			        }
			    },
			//扫码
				scanCode:function(){
							uni.scanCode({
								success:function(res){
									console.log(res,'res');
								}
							});
				},
			scanCode1: function(e) {
			    //扫码
				console.log('saoma')
				console.log(e,'saoma1')
			    uni.scanCode({
			     //onlyFromCamera: true, //只能从相机中获取，不能从图片中获取
			        success: function(res) { //获取扫码结果
			             console.log(res.result)
			        }
			     });
			},
			getStudent(){
				var that = this;
				uni.request({
					url: that.domain + 'campus/student/cid/'+that.campusID,
					method: 'get',
					success:function(res){
						if(res.data.errno==0){
						// that.lists = res.data.msg;
						// console.log(that.lists,'student-list');
						// for(let i=0;i<that.lists.length;i++){
						// 	that.lists[i].checked=''
						// }
						that.lists=[]
						let letterList = []
						console.log(res,'res')
						for (let item of res.data.msg) {
						    let letter = initial(item.StudentName)//首字母
						    let index = letterList.indexOf(letter)
						    if (index === -1) {
						        letterList.push(letter)
						        let obj = {
						            letter: '',
						            data: []
						        }
						        obj.letter = letter
						        obj.data.push(item)
						        that.lists.push(obj)
						    } else {
						        that.lists[index].data.push(item)
						    }
						}
						console.log(that.lists,'lists')
						}
					},
					fail:function(res){
						console.log(res);
					}
				})
			},
			handelStudent(){
				
			},
		addimport(){//表格
		uni.navigateTo({
			url:"./import?campusID="+this.campusID
		})
		},
			additem(){
			uni.navigateTo({
				url:"./studentReg?campusID="+this.campusID
			})
			},
			change : function(e){
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
				var indexs = this.$refs.personList.getSelectedIndex();
				if(indexs.length < 1){
					uni.showToast({
						title : "请选择数据",
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
									NameArr=NameArr+this.lists[indexs[i]].StudentName
								}else{
									tmpArr=tmpArr+','+this.lists[indexs[i]].StudentCode
									NameArr=NameArr+','+this.lists[indexs[i]].StudentName
								}
							}
							// console.log(tmpArr,'tmpArr')//报名学生的code
							// console.log(NameArr,'NameArr')//报名学生的姓名
							uni.navigateTo({
								url:'./detail?StudentCode='+tmpArr+'&StudentName='+NameArr
							})
				          
				        }
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

<style scoped>
	.footerBtns{width:200rpx;}
.center-btn{text-align:center; line-height:66rpx; width:690rpx; font-size:28rpx; margin-top:20rpx;}
.gui-page-status-bar{height: 0!important;}
</style>
