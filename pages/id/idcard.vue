<template>
	<view class="gui-padding" 
	style="min-height:100vh;">
	<view style="height:60rpx;"></view>
		<view>
			<text class="gui-h3 gui-color-black gui-block-text">请选择用户类型</text>
		</view>
		<view  >
	
		<view class="gui-card-view gui-margin-top"   v-for="(item,index) in list" :key="index"
        @click="Change(item)" :class="[{active: activeName == item.id}]">
			<view class="gui-card-body gui-flex gui-rows gui-nowrap gui-align-items-center">
				<image :src="item.src" class="gui-card-img"></image>
				<view class="gui-card-desc">
						<text class="gui-h4">{{item.name}}</text>
				</view>
				
			</view>
		</view>
	
		</view>
		<view class="" style="margin-top: 100rpx ;auto; 0">
			<button type="default" class="gui-button gui-bg-orange1 gui-noborde " style="border-radius: 40rpx;" @click="toMain">
				<text class="gui-color-white gui-button-text">确定</text>
			</button>
			
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			activeName: '0',
			// uid:"",
			list:[
				// {name:'注册单位(机构)',id:'0',src:'/static/id/header.png'},
				// {name:'考官',id:'1',src:'/static/id/teacher.png'},
				// {name:'教师',id:'2',src:'/static/id/header.png'},
				// {name:'家长/学生',id:'3',src:'/static/id/teacher.png'},
				{name:'游客（健康上报）',id:'4',src:'/static/id/header.png'},
				{name:'摄影师',id:'5',src:'/static/id/teacher.png'},
				 	
			]
		}
	},
	onLoad: function (option) { 
	this.utype = uni.getStorageSync('utype');
		// uni.removeStorage({
		// 	key:'utype',
		// 	success:function(res){
		// 	        console.log('删除成功了')
		// 	}
		// })
	  },
	methods:{
		
		Change(item){
			this.activeName = item.id
			console.log(item)
		} ,
		toMain(){
		if(this.activeName=='0'){
				// try{uni.setStorageSync('utype','0');uni.setStorageSync('iid','1')}catch{}
				// 	uni.switchTab({url:"../user/index"})	
			// 
			const iid = uni.getStorageSync('iid');
			if (!iid) {
				uni.navigateTo({
					url: './institutionReg'
				})	
			}else{
				try{uni.setStorageSync('utype','0')}catch{}
					
				uni.switchTab({
					url:"../user/index"
				})	
			}
			
		}else if(this.activeName=='1'){
			if (!uni.getStorageSync('isExaminer')) { 
				uni.navigateTo({
					url:"./examinerReg"
				})	
			}else{
				// try{uni.setStorageSync('utype','1')}catch{}
				uni.switchTab({
					url:"../user/index"
				})	
			}
		}else if(this.activeName=='2'){
			if (!uni.getStorageSync('isTeacher')) {
				uni.navigateTo({
					url:"./teachReg"
				})	
			}else{
				// try{uni.setStorageSync('utype','2')}catch{}
				uni.switchTab({
					url:"../user/index"
				})	
			}	
		}else if(this.activeName=='3'){
			try {
			if (!uni.getStorageSync('isStudent')) {
				uni.navigateTo({
					url:"./studentReg"
				})	
			}else{
				try{uni.setStorageSync('utype','3')}catch{}
				uni.switchTab({
					url:"../user/index"
				})	
			}
			} catch (e) {
			    // error
			};	
		}else if(this.activeName=='4'){
			uni.setStorageSync('utype','5')
			uni.switchTab({
				// url:"../index/index"
				url:"../user/index"
			})	
		}
		else if(this.activeName=='5'){
			uni.setStorageSync('utype','6')
			uni.switchTab({
				// url:"../index/index"
				url:"../user/index"
			})
		}
			
		}
	}
}
</script>
<style> 
/* 卡片视图 */
.gui-card-view{background-color:#FFFFFF; padding:25rpx;
background-color: #eee;
border-radius: 40rpx;
	}
.gui-card-body{padding-bottom:25rpx;}
.gui-card-img{width:100rpx; height:120rpx; }
.gui-card-desc{width:400rpx; margin:20rpx 0 0 60rpx;  color: #1a1a1a;}
/* 
.gui-card-text{line-height:40rpx; font-size:24rpx; color:#888888;}
.gui-card-footer{ margin-top:25rpx;}
.gui-card-footer-item{width:100rpx; text-align:center; flex:1; line-height:38rpx; font-size:26rpx; color:#666666;} */
/* #ifndef APP-NVUE */
.gui-card-footer-item{display:block;}

.active{
	background-color: #fff;
border: 10rpx solid #ffcb52;
	
}

button{
	/* width: 90%; */
	height: 95rpx;
	/*position: absolute;
	 top: 1350rpx;*/
}
/* #endif */
</style>