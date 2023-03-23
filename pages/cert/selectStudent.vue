
<template>
	<view>
	<!-- 	<view class="">
			<gui-swiper :swiperItems="swiperItems" borderRadius="0 0 30rpx 30rpx" 
			:width="750" :height="330"  :spacing="0" :padding="0" 
			indicatorType="number" indicatorBarBgColor="rgba(0,0,0, 0)"></gui-swiper>
		</view> -->
		<!-- <view class="">
			<set-time :items="Times"></set-time>
		</view> -->
			
		<gui-page
		:customFooter="true" 
		:footerSets="{height:100, zIndex:100, bg:'linear-gradient(to bottom, #F8F8F8,#F8F8F8)'}">
		<view slot="gBody">
			<view class="gui-margin gui-margin-top gui-flex gui-space-between">
				<text class="gui-h5 gui-color-gray gui-bold">选择考次</text>
			</view>
		
			<view class="gui-padding gui-border gui-margin">
				<gui-empty v-if="isEmpty" >
								<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
									<image class="gui-empty-img" style="margin-top: 0;"
									src="https://upload-images.jianshu.io/upload_images/15372054-1f849183cebb80b1.png?imageMogr2/auto-orient/strip|imageView2/2/w/388/format/webp"></image>
								</view>
								<text slot="text" 
								class="gui-text-small gui-block-text gui-text-center gui-margin-top" style="color:#9DABFF;">暂无数据 ......</text>
							</gui-empty>
				<view style="margin-top:15rpx;">
					<pui-set-time 
					v-if="Times.length >= 1" 
					:items="Times" iconSize="42rpx" @change="change" 
					type="checkbox" checkedType="ring" ref="setTime"></pui-set-time>
				</view>
				<gui-select-list v-if="Times.length >= 1"  :items="selectBtn" iconSize="42rpx" @change="btnChange"
				type="checkbox" checkedType="ring"></gui-select-list>
			</view>
			<view class="gui-margin gui-margin-top gui-flex gui-space-between">
				<text class="gui-h5 gui-color-gray gui-bold">选择考生</text>
			</view>
			<view class=" gui-border gui-margin">
				<gui-empty v-if="isEmpty1" >
								<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
									<image class="gui-empty-img" style="margin-top: 0;"
									src="https://upload-images.jianshu.io/upload_images/15372054-1f849183cebb80b1.png?imageMogr2/auto-orient/strip|imageView2/2/w/388/format/webp"></image>
								</view>
								<text slot="text" 
								class="gui-text-small gui-block-text gui-text-center gui-margin-top" style="color:#9DABFF;">暂无数据 ......</text>
							</gui-empty>
				<view style="margin-top:15rpx;">
				<pui-select-list
				v-if="Students.length >= 1" 
				:items="Students" iconSize="42rpx" @change="change" 
				type="checkbox" checkedType="ring" ref="selectList"></pui-select-list>
				</view>
				<gui-select-list v-if="Students.length >= 1"  :items="selectBtn1" iconSize="42rpx" @change="btnChange1"
				type="checkbox" checkedType="ring"></gui-select-list>
			</view>
			<!-- kaoguan -->
			<view class="gui-margin gui-margin-top gui-flex gui-space-between">
				<text class="gui-h5 gui-color-gray gui-bold">选择考官</text>
			</view>
			<view class=" gui-border gui-margin">
				<gui-empty v-if="isEmpty2" >
								<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
									<image class="gui-empty-img" style="margin-top: 0;"
									src="https://upload-images.jianshu.io/upload_images/15372054-1f849183cebb80b1.png?imageMogr2/auto-orient/strip|imageView2/2/w/388/format/webp"></image>
								</view>
								<text slot="text" 
								class="gui-text-small gui-block-text gui-text-center gui-margin-top" style="color:#9DABFF;">暂无数据 ......</text>
							</gui-empty>
				<view style="margin-top:15rpx;">
				<pui-select-list
				v-if="examiner.length >= 1" 
				:items="examiner" iconSize="42rpx" @change="change" 
				type="checkbox" checkedType="ring" ref="selectList"></pui-select-list>
				</view>
				<gui-select-list v-if="examiner.length >= 1"  :items="selectBtn2" iconSize="42rpx" @change="btnChange2"
				type="checkbox" checkedType="ring"></gui-select-list>
			</view>
			</view>
			<view slot="gFooter" 
			class="gui-padding gui-flex gui-rows gui-space-between gui-align-items-center" 
			style="border-top:1px solid #E8E8E8;">
				<view class="footerBtns">
					<!-- <gui-select-list :items="selectBtn" iconSize="42rpx" @change="btnChange"
					type="checkbox" checkedType="ring"></gui-select-list> -->
				</view>
				<text class="footerBtns gui-icons gui-block-text gui-text gui-text-right"
				@tap="appy">&#xe625; 分配</text>
			</view>
		</gui-page>
	</view>

</template>

<script>
	
	var graceChecker = require("@/GraceUI5/js/checker.js");
	

	export default{
		data() {
			return {
				Times:[],
				Students:[],
				examiner:[],
				campusID:'',
				isEmpty:true,
				isEmpty1:true,
				isEmpty2:true,
				selectBtn : [
					{title:"全选", checked:false},
				],
				selectBtn1 : [
					{title:"全选", checked:false},
				],
				selectBtn2 : [
					{title:"全选", checked:false},
				],
				swiperItems : [//轮播图
					{
						img : '/static/index/chro.png',
						url : '',
						title:"测试标题 001",
						opentype : 'navigate'
					},
					{
						img : '/static/index/chro.png',
						url : '',
						title:"测试标题 002",
						opentype : 'navigate'
					},
					{
						img : '/static/index/chro.png',
						url : '',
						title:"测试标题 003",
						opentype : 'navigate'
					},
				],
				user : {}
					}
				},
		onLoad: function(option) {
			console.log('hello?')
			if(option){
				this.ExamID=option.ExamID
				this.ExamroomID=option.ID
				console.log(option)
			};
			this.campusID = uni.getStorageSync('cid');
			this.Institution = uni.getStorageSync('iid');
			console.log(this.Institution,'iid')
		
		},
		onShow() {
			this.examTime()
			this.getStudent()
			this.getExaminer()
			

		},
		
		methods: {
		//轮播图
		swiperchange : function(e){
			console.log(e);
		},
		examTime(){
			var that =this;
			uni.request({
				url: that.domain + 'exam/examtime',
				method: 'post',
				data:{roomid:that.ExamroomID},
				  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
				success:function(res){
					that.Times = res.data.msg;
					console.log(that.Times,'考次');
					for(let i=0;i<that.Times.length;i++){
						that.Times[i].checked=''
					}
					console.log(that.Times,'that.Times');
					if(that.Times.length){
						that.isEmpty=false
					}
				},
				fail:function(res){
					console.log(res);
				}
			})
		},
		getStudent(){
			var that =this;
			uni.request({
				url: that.domain + 'campus/student',
				method: 'post',
				data:{cid:that.campusID},
				  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
				success:function(res){
					that.Students = res.data.msg;
					console.log(that.Students,'考次');
					for(let i=0;i<that.Students.length;i++){
						that.Students[i].checked=''
					}
					console.log(that.Students,'that.Students');
					if(that.Students.length){
						that.isEmpty1=false
					}
				},
				fail:function(res){
					console.log(res);
				}
			})
			
		},
		getExaminer(){
			var that =this;
			uni.request({
				url: that.domain + 'institute/examiner',
				method: 'post',
				data:{iid:that.Institution},
				  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
				success:function(res){
					that.examiner = res.data.msg;
					console.log(that.examiner,'已签约考官');
					if(that.examiner.length){
						that.isEmpty=false
					}
				},
				fail:function(res){
					console.log(res);
				}
			})
		},
		change : function(e){
			 console.log(e,'e')
			if(e.length >= this.Times.length){
				this.selectBtn[0].title   = "取消";
				this.selectBtn[0].checked = true;
			}else{
				this.selectBtn[0].title   = "全选";
				this.selectBtn[0].checked = false;
			} 
		},
		change1 : function(e){
			 console.log(e,'e1')
			if(e.length >= this.Students.length){
				this.selectBtn1[0].title   = "取消";
				this.selectBtn1[0].checked = true;
			}else{
				this.selectBtn1[0].title   = "全选";
				this.selectBtn1[0].checked = false;
			} 
		},
		change2 : function(e){
			 console.log(e,'e2')
			if(e.length >= this.Students.length){
				this.selectBtn2[0].title   = "取消";
				this.selectBtn2[0].checked = true;
			}else{
				this.selectBtn2[0].title   = "全选";
				this.selectBtn2[0].checked = false;
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
			this.Times.forEach((item)=>{
				item.checked = status;
				tmpArr.push(item);
			});
			this.Times = [];
			this.$nextTick(()=>{
				this.Times = tmpArr;
			});
		},
		btnChange1 : function (e) {
			var status = false;
			if(e.length > 0){
				status = true;
				this.selectBtn1[0].checked = true;
				this.selectBtn1[0].title   = "取消";
			}else{
				this.selectBtn1[0].checked = false;
				this.selectBtn1[0].title = "全选";
			}
			var tmpArr = [];
			this.Students.forEach((item)=>{
				item.checked = status;
				tmpArr.push(item);
			});
			this.Students = [];
			this.$nextTick(()=>{
				this.Students = tmpArr;
			});
		},
		btnChange2 : function (e) {
			var status = false;
			if(e.length > 0){
				status = true;
				this.selectBtn2[0].checked = true;
				this.selectBtn2[0].title   = "取消";
			}else{
				this.selectBtn2[0].checked = false;
				this.selectBtn2[0].title = "全选";
			}
			var tmpArr = [];
			this.Students.forEach((item)=>{
				item.checked = status;
				tmpArr.push(item);
			});
			this.Students = [];
			this.$nextTick(()=>{
				this.Students = tmpArr;
			});
		},
		}
	}
</script>

<style lang="scss">

</style>
