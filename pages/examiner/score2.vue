<template>
	<gui-page :fullPage="true" :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody" class="gui-flex1 gui-flex gui-columns">
			<!-- 局部选项卡 使用 切换导航 + swiper 实现 -->
				<!-- <view class="demo-nav">
							<gui-switch-navigation :items="tabs" :size="150" :currentIndex="currentIndex" @change="navchange"></gui-switch-navigation>
						</view> -->
			<view class="gui-grids gui-flex gui-rows gui-wrap  gui-bg-gray demo-nav">
						<gui-switch-navigation2 :items="Times" @change="navchange" 
						:isCenter="true" :currentIndex="currentIndex"  :size="180" activeColor="#FF0036">
						</gui-switch-navigation2>
				</view>
			<swiper :current="currentIndex" @change="swiperChange" 
						:style="{height:mainHeight+'px', width:'100wv'}">
							<!-- 轮播项目数量对应 上面的选项标签 -->
							<swiper-item v-for="(items,indexs) in lists" :key='index'>
								<!-- 使用滚动区域来实现主体内容区域 -->
								<scroll-view :scroll-y="true" class="gui-bg-white gui-padding-top" :style="{height:mainHeight+'px'}" >
									<!-- 上半 -->
									<view class="gui-select-list gui-flex gui-wrap" style="height: 50vh;overflow: scroll;">
										<view v-for="(item, index) in items" 
										:key="index" class="gui-select-list-item gui-flex gui-column gui-align-items-center" 
										  >
										<view :data-index="index" @tap.stop="choose($event,lists[indexs])">
											<view class="gui-list-image" v-if="checkedType == 'ring' && !item.checked">
											<image class="gui-list-image border-gray-10" :src="item.Headimg"></image>
										</view>
										<view class="gui-list-image" v-if="checkedType == 'ring' && item.checked">
											<image class="gui-list-image border-orange-10" :src="item.Headimg"></image>
										</view>
										</view>
									
											<view class="" style="margin: 0 20rpx;">
												<view class="gui-select-list-content gui-flex gui-column gui-align-items-center">
													<view class="gui-list-title">
														<text class="gui-list-title-text gui-primary-color">{{item.StudentName}}</text>
													</view>
													<text class="gui-list-body-desc gui-color-gray">{{item.StudentCode}}</text>
													
													<text class="gui-list-title-text gui-color-orange1" @tap="setscore(item)">分数：{{item.score}}</text>	
												</view>
											</view>
												<text class="gui-icons gui-block-text gui-select-list-icon gui-select-list-current" 
												:class="[item.checked ? 'gui-fade-in gui-select-list-current' : '']" 
												v-if="item.checked && checkedType == 'right'">&#xe60f;</text>
										</view>
									
									</view>
									<!-- 下半 -->
									<view class="" style="position: fixed;bottom: 30rpx;width: 100vw;">
										<view class="border-orange-10 gui-margin gui-padding gui-border-radius-large" >
											<view class="gui-flex gui-space-between">
												<!-- <view class="footerBtns">
													<gui-select-list :items="selectBtn" iconSize="42rpx" @change="btnChange"
													type="checkbox" checkedType="ring"></gui-select-list>
												</view> -->
												<text class="footerBtns gui-icons gui-block-text gui-text gui-text-right gui-margin"
												>&#xe60f; 评分</text>
											</view>
											<view class="score  gui-flex  gui-bg-gray  gui-space-around gui-wrap" >
												<view class=""  v-for="(scoreitem,i) in scores" @tap="appy(scoreitem,lists[indexs])" >
													<text class="gui-block-text " :style="{background: scoreitem.clickbg}" style="padding: 30rpx 20rpx; margin: 0rpx 20rpx; ">{{scoreitem.value}}</text>
												</view>
											</view>
										</view>
										
									<view 
									v-if="lists[indexs].length >= 1" 
									class="gui-padding gui-flex gui-rows gui-justify-content-end " 
									style="border-top:1px solid #E8E8E8;">
										<text class="footerBtns gui-icons gui-block-text gui-text gui-text-right"
										@tap="nextTime(lists[indexs])">&#xe601; 下一场</text>
									</view>	
									</view>
								</scroll-view>
								
							</swiper-item>
							
						</swiper>
						<!-- score -->
						
		</view>
	
	</gui-page>
</template>
<script>
var graceJS = require('@/GraceUI5/js/grace.js');
export default {
	data() {
		return {
			// 全屏 loading
			pageLoading : true,
			// 选项卡标签
			// 选中选项的 索引
			currentIndex : 0,
			// 核心区域高度 
			mainHeight   : 600,
				Times:[],//time
				certlist:'',//报名学生
				studentlist:'',//报名学生
				clickbg:'',//点击色
				roomid:'',
				eid:'',
				scores:[{value:'1',clickbg:''},{value:'2',clickbg:''},{value:'3',clickbg:''},{value:'4',clickbg:''},{value:'5',clickbg:''}],
				lists : {},
					scoreMsg:'',
					checkedType:'ring',
					// type:'radio',
				// 底部选择按钮
				selectBtn : [
					{title:"全选", checked:false},
				],
		}
	},
	onLoad(option) {
		this.roomid=option.roomid;
		this.eid=option.eid;
		this.cid=option.cid;
		console.log(option,'op')
		this.examTime();
		this.getTime();
		this.getscore();
		this.getcert();
setTimeout(()=>{
	this.getStudentList()
},800)
		// 01. 获取页面主体高度
		graceJS.getRefs('guiPage', this, 0, (ref)=>{
			ref.getDomSize('guiPageBody', (e)=>{
				console.log(e);
				// 02. 导航的高度
				// 可以 使用 graceJS.select() 函数动态获取， 也可以使用 uni.upx2px 转换已知高度
				// 轮播主体高度 = 页面高度 - 导航高度
				this.mainHeight  = e.height - uni.upx2px(100);
				this.pageLoading = false;
			});
		});
	},
	methods: {
		getTime(){
		var date = new Date(),
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate(),
		hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
		minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
		second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
		month >= 1 && month <= 9 ? (month = "0" + month) : "";
		day >= 0 && day <= 9 ? (day = "0" + day) : "";
		var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
		// return timer
		console.log(timer,'time')
		},
		examTime(){
			const timeArr=[];
			var  that=this
			uni.request({
				url: that.domain + 'exam/examtime/roomid/'+that.roomid,
				method: 'get',
				  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
				success:function(res){
					if(res.data.errno==0){
					const Times = res.data.msg;
					// console.log(res.data.msg,'考次');
					 Times.forEach((items,j)=>{
					 	timeArr.push({title:Times[j].Title,desc:Times[j].StartTime+'-'+Times[j].EndTime})
					 // console.log(Times[j].Title,Times[j].StartTime,'????');
					 })
					 
					 that.Times=timeArr;
					 }
				},
				fail:function(res){
					console.log(res);
				}
			})
		},
		getscore(){
			var  that=this
			uni.request({
				url: that.domain + 'exam',
				method: 'post',
				data:{id:that.eid},
				  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
				success:function(res){
					if(res.data.errno==0){
					that.score = res.data.msg.ExamGrade;
					console.log(that.score,'score!!');
					}
				},
				fail:function(res){
					console.log(res);
				}
			})
		},
		getStudentList(){
			var  that=this
			uni.request({
				url: that.domain + 'exam/examtime/roomid/'+that.roomid,
				method: 'post',
				  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
				success:function(res){
					if(res.data.errno==0){
					that.examtimeList=res.data.msg
					that.handleStudent()//处理学生列表
					}
				},
				fail:function(res){
					console.log(res);
				}
			})
		},
		getcert() {
			var that = this;
			uni.request({
				url: that.domain + 'campus/exam/cid/' + that.cid + '/eid/' + that.eid,
				method: 'get',
				success: function(res) {
					if(res.data.errno==0){
					that.certlist = res.data.msg;
		
					let dataInfo = {};
					that.certlist.forEach((item, index) => {
						let {
							StudentCode
						} = item;
						if (!dataInfo[StudentCode]) {
							dataInfo[StudentCode] = {
								StudentCode,
								child: []
							}
						}
						dataInfo[StudentCode].child.push(item);
					});
					let list = Object.values(dataInfo); // list 转换成功的数据
					that.certlist = list
					// console.log(that.certlist,'报名的学生');
					that.getStudentMsg()
					}
				},
				fail: function(res) {
					console.log(res);
				}
			})
		},
		getStudentMsg() {
			var that = this;
			uni.request({
				url: that.domain + 'campus/student/cid/' + that.cid,
				method: 'get',
				success: function(res) {
					if(res.data.errno==0){
					let studentArr = []
					that.studentlist = res.data.msg;
					for (let i in that.studentlist) {
						that.studentlist[i].checked = ''
						for (let j in that.certlist) {
							if (that.certlist[j].StudentCode == that.studentlist[i].StudentCode) {
								// that.studentlist[i].Status='1';//已报名
								let level = '';
								if (that.certlist[j].child.length == '1') {
									that.studentlist[i].LevelID = that.certlist[j].child[0].LevelID; //报考单个等级
		
								} else {
									for (let o in that.certlist[j].child) {
										level += that.certlist[j].child[o].LevelID + ','
									}
									level.substr(0, level.length - 1)
									that.studentlist[i].LevelID = level; //报考多个等级
								}
								studentArr.push(that.studentlist[i])
							}
						}
					}
					that.studentlist = studentArr
					console.log(that.studentlist, 'studentlist')
					}
				},
				fail: function(res) {
					console.log(res);
				}
			})
		},
		handleStudent(){
			// this.student=this.examtimeList
			let arr=[]
			let list =[]
			var that=this
			for(let item in that.examtimeList){
					that.studentlist.forEach((items,indexs)=>{
					 if(that.examtimeList[item].StudentList.indexOf(items.StudentCode)==-1){
					            // console.log("不存在")
					      }else{
							  items.score='未评分'
							  items.checked=false
								list.push(items)
								// console.log("存在")
					      }
					})
						  arr.push(list)
						  list=[]
			}
			that.lists = JSON.parse(JSON.stringify(arr))
					// that.lists=arr
					console.log(that.lists,'show student')
		},
		navchange:function(index){
			this.currentIndex = index;
		},
		swiperChange : function(e){
			var index = e.detail.current;
			this.currentIndex = index;
		},
		//??
		// change : function(e){
		// 	if(e.length >= this.lists.length){
		// 		this.selectBtn[0].title   = "取消";
		// 		this.selectBtn[0].checked = true;
		// 	}else{
		// 		this.selectBtn[0].title   = "全选";
		// 		this.selectBtn[0].checked = false;
		// 	} 
		// },
		// btnChange : function (e) {
		// 	var status = false;
		// 	if(e.length > 0){
		// 		status = true;
		// 		this.selectBtn[0].checked = true;
		// 		this.selectBtn[0].title   = "取消";
		// 	}else{
		// 		this.selectBtn[0].checked = false;
		// 		this.selectBtn[0].title = "全选";
		// 	}
		// 	var tmpArr = [];
		// 	this.lists.forEach((item)=>{
		// 		item.checked = status;
		// 		tmpArr.push(item);
		// 	});
		// 	this.lists = [];
		// 	this.$nextTick(()=>{
		// 		this.lists = tmpArr;
		// 	});
		// },
		
		getSelectedIndex (items){
			var tmpArr = [];
			items.forEach((item, idx)=>{
				if(item.checked){
					tmpArr.push(idx);
				}
			});
			return tmpArr;
			console.log(tmpArr,'tmparr')
		},
		getSelectedItem (items){
			var tmpArr1 = [];
			items.forEach((item, idx)=>{
				if(item.checked){
					tmpArr1.push(items[idx].StudentCode);
				}
			});
			return tmpArr1;
			console.log(tmpArr1,'tmparr1')
		},
		// 选择数据
		choose (e,items){
			var index = e.currentTarget.dataset.index;
			if(this.type == 'radio'){
				if(items[index].checked){
					items[index].checked = false;
					// this.$emit('change', -1);
					console.log(-1)
				}else{
					for(let i = 0; i < items.length; i++){
						items[i].checked = false;
					}
					items[index].checked = true;
					// this.$emit('change', index);
					console.log(index,'changeindex')
				}
			}else{
				if(items[index].checked){
					items[index].checked = false;
					console.log(false)
				}else{
					if(this.maxSize > 0){
						var size = 0;
						items.forEach((item)=>{
							if(item.checked){size++;}
						});
						size++;
						if(size > this.maxSize){
							console.log(maxSed,'changemaxSed')
							// this.$emit('maxSed'); 
							return ;}
					}
					items[index].checked = true;
					console.log(true)
				}
				var sedArr = [];
				for(let i = 0; i < items.length; i++){
					if(items[i].checked){
						sedArr.push(i);
					}
				}
				// this.$emit('change', sedArr);
				console.log(sedArr,'选中的索引')
			}
		},
		appy(scoreitem,items){
			scoreitem.clickbg='#ffcb52'
			setTimeout(()=>{scoreitem.clickbg=''},600)
			// console.log(items,'lists[index]')
			var indexs = this.getSelectedIndex(items);
			var item = this.getSelectedItem(items);
			console.log(indexs,'index',item,'items')
			if(indexs.length < 1){
				uni.showToast({
					title : "请选择数据",
					icon  : "none"
				});
				return ;
			}
			uni.showModal({
			    title   : '分数:'+scoreitem.value,
			    content : '被评分人:'+item,
			    success : (res) => {
			        if (res.confirm) {//点击了确定
					for(let j in item){
						for(let i in items){
							// console.log(this.lists[i].StudentCode,'所有人')
								// console.log(item[j],'选中的人','---')
								if(items[i].StudentCode==item[j]){
									// console.log('0')
									items[i].score=scoreitem.value
									items[i].checked=''
								}
							}
						}
			        }
			    }
			});
		},
		
		nextTime(lists){
			console.log(lists,'lists')
		},
	
		
	
		getmsg(){
				var that =this
					uni.request({//获取报名项目
						url: that.domain+'exam',
						method: 'post',
						data: {
							id:that.formData.ItemID
						},
						  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
						
						success:function(res){
							if(res.data.errno==0){
							that.scoreMsg = res.data.msg;
							console.log(res.data.msg,'msg');
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
.demo-nav{padding:15rpx 30rpx;}
.demo-text{line-height:200rpx; padding-bottom:3000px;}
.mt60{margin-top:50rpx;}
.demo-nav{width:750rpx; padding:10rpx 30rpx; box-sizing: border-box;}
.footerBtns{width:200rpx;}

.gui-select-list-item{font-size:0;}
.gui-select-list-icon{margin-left:10rpx;}
.gui-select-list-icon-l{margin-left:0; margin-right:10rpx;}
.gui-select-list-body{width:100rpx; flex:1;}
.gui-select-list-content{width:140rpx; flex:1; overflow:hidden; padding:25rpx 0;}

</style>