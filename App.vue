<script>
export default {
	onLaunch: function() {
		// if(!uni.getStorageSync('uid')){
		// 	uni.redirectTo({
		// 		url:'pages/login/reg'
		// 	})
		// }
		this.overshare()
		// #ifdef APP-PLUS
		plus.screen.lockOrientation('portrait-primary'); //锁定屏幕
		const dom = weex.requireModule('dom');
		dom.addRule('fontFace', { 
			'fontFamily': "graceIconfont",
			'src': "url('/static/grace.ttf')"
		});
		// #endif
	},
	onShow: function() {
	},
	onHide: function() {},
	methods:{
		overshare(){
			wx.onAppRoute(function (res) {
			      //获取加载的页面
			      let pages = getCurrentPages(),
			        //获取当前页面的对象
			        view = pages[pages.length - 1],
			        data;
					// console.log(res,pages,data,view,'123')
					// console.log(pages[pages.length - 1],'345')
					
			      if (view) {
			        data = view.data;
			        if (!data.isOverShare) {
			          data.isOverShare = true;
			          view.onShareAppMessage = function () {
			            //重写分享配置
			            return {
			              title: '奕文艺舞',
						 desc: '',
						 imageUrl: "https://img.yiwenyw.com/contest/20220729185908_172.png",
			              path: "/pages/index/index"    //分享页面地址
			            };
			          }
			        }
			      }
			    })
		}
	}

}
</script>
<style>
/* 加载框架核心样式 */
@import "./GraceUI5/css/graceUI.css";
/* 加载主题样式 */
@import "./GraceUI5/skin/my.css";
/* 加载图标字体 - 条件编译模式 */
/* #ifdef APP-PLUS-NVUE */
.gui-icons{font-family:graceIconfont;}
/* #endif */
</style>
