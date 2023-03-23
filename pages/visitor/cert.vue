<template>
  <view class="gui-flex"  style="margin-top: 150rpx;">
	  
		   <image class="bg-set" src="../../static/visitor/cert.png"></image>
	<view>
		<view class="title">中国国际流行舞蹈</view>
		<pui-form-item :items="formList"></pui-form-item>
		
	</view>
     <view class=" gui-text-center right" >
		  <!-- <view class="sign-setting-border {{idx==item.Item_id?'selected':''}}" v-for="applyList" v-key="" @tap='selectApply' :data-id="item.Item_id">{{item.Item_Name}}</view> -->
          <view class="">证书查询</view>
          <view>教师查询</view>
          <view>评审查询</view>
          <view>教\考官查询</view>
          <view>注册单位查询</view> 
      
        </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
		idx:'',
		    applyList:[
		        {Item_id: "10", Item_Name: "公司"},
		        {Item_id: "11", Item_Name: "职务"},
		        {Item_id: "12", Item_Name: "行业"},
		        {Item_id: "13", Item_Name: "家庭住址"}],
		formList:[
			{name:'teacher',value:'',src:'../../static/tabbar/report.png',placeholder:"请输入教师名字"},
			{name:'teacher',value:'',src:'../../static/tabbar/report.png',placeholder:"请输入教师名字"},
			{name:'teacher',value:'',src:'../../static/tabbar/report.png',placeholder:"请输入教师名字"}
		],
      // nav: [
      //   {
      //     title: "证书查询",
      //     path: "/search/certificate",
      //     style: "border-radius:0 10rpx 0 0",
      //   },
      //   { title: "教师查询", path: "/search/teacher" },
      //   { title: "评审查询", path: "/search/review" },
      //   { title: "教/考官查询", path: "/search/examiner" },
      //   {
      //     title: "注册单位查询",
      //     path: "/search/Registered",
      //     style: "border-radius:0 0 10rpx  0",
      //   },
      // ],
      // navIndex: 0,
    };
  },
  watch: {
    $route() {
      // 获取当前路径
      let path = this.$route.path;
      // 检索当前路径
      this.checkRouterLocal(path);
    },
  },
  methods: {
	  
	  selectApply:function(e){
	      let id = e.target.dataset.id
	       this.setData({
	         idx: id
	       })
	   },
  },
};
</script>

<style lang="scss">
/* box */

.bg-set{
    position: fixed;
    width: 96%;
    height: 480rpx;
    top: 150rpx;
    left: 2%;
	border-radius: 20rpx;
    z-index: -1;
	box-shadow: 0 10rpx 10rpx #d8d8d8;
}
.title {
  font-size: 35rpx;
  font-weight: 600;
  padding: 20rpx 40rpx;
}



/* 

.form .btn {
  width: 140rpx;
  height: 45rpx;
  background-color: #f13a3a;
  border-radius: 10rpx;
  color: #fff;
  text-aviewgn: center;
  font-size: 24rpx;
  viewne-height: 24rpx;
}
.form .btn:nth-child(1) {
  transform: translatex(-50rpx);
}
.msg {
  text-aviewgn: center;
  padding-top: 20rpx;
  transform: translatex(-5%);
  margin: auto;
} */
/* right  */
.right {
  font-size: 25rpx;
  height: 480rpx;//bg-height
view {
	display: flex;
	align-items: center;
	justify-content: center;
  height: 20%;
   cursor: default;
  box-shadow: 0 0 3rpx #ccc;
  background-color: #f3f5f8;
  color: #040404;
&:nth-child(1){
	border-radius: 0 20rpx 0 0;
}
&:nth-last-child(1){
	border-radius: 0 0 20rpx 0;
}
}

}


.right .active {
  border: 0 !important;
  width: 99%;
  /* margin-left: 1%; */
  transform: translateX(1%);
  background-color: #f13a3a;
  color: #fff !important;
}

/* 
.footer {
  font-size: 13rpx;
} */
/* .cert-detail table {
  width: 90%;
  position: absolute;
  transform: translatex(-20%);
  margin-top: 60rpx;
}
 */
.notice {
  position: absolute;
  width: 40%;
  margin-top: 60rpx;
  display: none;
  /* color: #f13a3a; */
  /* transform: translatex(50%); */
  /* font-size: 25rpx; */
}

/* @media screen and (max-width: 960rpx) { */
  /* bgimage */
 
/* 
  .title {
    font-size: 11rpx;
    padding: 10rpx 0 15rpx 15rpx;
  }

  .form {
    margin: 0;
  }
  .input-box {
    height: 28rpx;
    width: 251rpx;
    margin: 0rpx 0 5rpx 10rpx;
  }
  .input-box input {
    width: 210rpx;
    height: 25rpx;
    margin-left: 24rpx;
    margin-top: 0.5rpx;
    font-size: 8rpx;
  }
  .input-box image {
    height: 15rpx;
    width: 15rpx;
  }

  .form .btn {
    width: 50rpx;
    height: 20rpx;
    border-radius: 2rpx;
    text-aviewgn: center;
    font-size: 10rpx;
    viewne-height: 3rpx;
  }
  .form .btn:nth-child(1) {
    transform: translatex(-20rpx);
  }
  .form .btn:nth-child(2) {
    transform: translatex(20rpx);
  }

  .msg {
    font-size: 8rpx !important;
    padding-top: 5rpx;
    transform: translatex(-20%);
    width: 400rpx;
  }
  .notice {
    transform: none;
  }

  .cert-detail table {
    font-size: 10rpx;
    transform: none;
  }
  .right {
    font-size: 8rpx;
  } */

  /* .right p {
    padding-top: 0;
  } */
/* } */
</style>