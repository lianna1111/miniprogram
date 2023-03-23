<template>
	<gui-page
	:customFooter="true" 
	:footerSets="{height:80, zIndex:100, bg:'linear-gradient(to bottom, #F8F8F8,#F8F8F8)'}">
		<view slot="gBody" class="gui-flex1 gui-flex gui-columns">
			<!-- 局部选项卡 使用 切换导航 + swiper 实现 -->
				<!-- <view class="demo-nav">
							<gui-switch-navigation :items="tabs" :size="150" :currentIndex="currentIndex" @change="navchange"></gui-switch-navigation>
						</view> -->
			<view class="gui-grids gui-flex gui-rows gui-wrap  gui-bg-gray demo-nav">
						<gui-switch-navigation2 :items="navItems" @change="navchange" 
						:isCenter="true" :currentIndex="currentIndex"  :size="180" activeColor="#FF0036">
						</gui-switch-navigation2>
				</view>
			<swiper :current="currentIndex" @change="swiperChange" 
						:style="{height:mainHeight+'px', width:'750rpx'}">
							<!-- 轮播项目数量对应 上面的选项标签 -->
							<swiper-item v-for="(item,index) in lists" :key='index'>
								<!-- 使用滚动区域来实现主体内容区域 -->
								<scroll-view :scroll-y="true" class="gui-bg-white gui-margin-top" :style="{height:mainHeight+'px'}" >
									<pui-select-list2
									v-if="lists[index].length >= 1"  
									:items="lists[index]" iconSize="42rpx" @change="change" 
									type="checkbox" checkedType="ring" ref="selectList"></pui-select-list2>
								</scroll-view>
								
							</swiper-item>
							
						</swiper>
						<!-- score -->
						<view class="border-orange-10 gui-margin gui-padding gui-border-radius-large">
							<view class="gui-flex gui-space-between">
								<view class="footerBtns">
									<gui-select-list :items="selectBtn" iconSize="42rpx" @change="btnChange"
									type="checkbox" checkedType="ring"></gui-select-list>
								</view>
								<text class="footerBtns gui-icons gui-block-text gui-text gui-text-right gui-margin"
								>&#xe60f; 评分</text>
							</view>
							
							<view class="score  gui-flex  gui-bg-gray  gui-space-around" >
								<view class=""  v-for="(items,index) in scores" @tap="appy(items)" >
									<text class="gui-block-text " :style="{background: items.clickbg}" style="padding: 30rpx 20rpx; margin: 0rpx 10rpx; ">{{items.value}}</text>
								</view>
							</view>
						
						</view>
		</view>
		<view slot="gFooter"
		v-if="lists.length >= 1" 
		class="gui-padding gui-flex gui-rows gui-justify-content-end " 
		style="border-top:1px solid #E8E8E8;">
			<text class="footerBtns gui-icons gui-block-text gui-text gui-text-right"
			@tap="nextTime">&#xe601; 下一场</text>
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
			mainHeight   : 400,
				navItems : [],
				Times:'',//time
				clickbg:'',//点击色
				scores:[{value:'1',clickbg:''},{value:'2',clickbg:''},{value:'3',clickbg:''},{value:'4',clickbg:''},{value:'5',clickbg:''}],
				lists : {1:[
					{Headimg:"@/static/user/user", StudentName:"李华", StudentCode:'012',score:'未评分',checked:false},
					{Headimg:"@/static/user/user", StudentName:"李华", StudentCode:'021',score:'未评分',checked:false},
					{Headimg:"@/static/user/user", StudentName:"李华", StudentCode:'022',score:'未评分',checked:false},
					],2:[
					{Headimg:"@/static/user/user", StudentName:"李华", StudentCode:'012',score:'未评分',checked:false},
					{Headimg:"@/static/user/user", StudentName:"李华", StudentCode:'021',score:'未评分',checked:false},
					{Headimg:"@/static/user/user", StudentName:"李华", StudentCode:'022',score:'未评分',checked:false},
					]},
					listLen:3,//lists' length
					scoreMsg:'',
				// 底部选择按钮
				selectBtn : [
					{title:"全选", checked:false},
				],
		}
	},
	onLoad(option) {
		this.roomid=option.roomid;
		this.examTime();
		this.getTime()
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
		
		navchange:function(index){
			this.currentIndex = index;
		},
		swiperChange : function(e){
			var index = e.detail.current;
			this.currentIndex = index;
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
		examTime(){
			var that =this;
			var tmparr=[];
			uni.request({
				url: that.domain + 'exam/examtime',
				method: 'post',
				data:{roomid:this.roomid},
				  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
				success:function(res){
					that.Times = res.data.msg;
					console.log(that.Times,'考次');
					that.Times.forEach((items,j)=>{
						that.navItems.push({title:that.Times[j].Title,desc:that.Times[j].StartTime+'-'+that.Times[j].EndTime})
						// console.log(that.Times[j].Title,that.Times[j].StartTime,'????');
					})
					console.log(that.navItems,'????');
				},
				fail:function(res){
					console.log(res);
				}
			})
		},
		appy(items){
			items.clickbg='#ffcb52'
			setTimeout(()=>{items.clickbg=''},600)
			var indexs = this.$refs.selectList.getSelectedIndex();
			var item = this.$refs.selectList.getSelectedItem();
			// console.log(indexs,'index',item,'items')
			if(indexs.length < 1){
				uni.showToast({
					title : "请选择数据",
					icon  : "none"
				});
				return ;
			}
			uni.showModal({
			    title   : '分数:'+items.value,
			    content : '被评分人:'+item,
			    success : (res) => {
			        if (res.confirm) {//点击了确定
					for(let j in item){
						for(let i in this.lists){
							// console.log(this.lists[i].StudentCode,'所有人')
								// console.log(item[j],'选中的人','---')
								if(this.lists[i].StudentCode==item[j]){
									// console.log('0')
									this.lists[i].score=items.value
								}
							}
						}
			        }
			    }
			});
		},
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
							that.scoreMsg = res.data.msg;
							console.log(res.data.msg,'msg');
						},
						fail:function(res){
							console.log(res);
						}
					})
				},
 
		nextTime(){
			
			console.log(this.lists,'lists')
		}
			
				
	}
}
</script>
<style>
.demo-nav{padding:15rpx 30rpx;}
.demo-text{line-height:200rpx; padding-bottom:3000px;}
.mt60{margin-top:50rpx;}
.demo-nav{width:750rpx; padding:10rpx 30rpx; box-sizing: border-box;}
.footerBtns{width:200rpx;}
</style>