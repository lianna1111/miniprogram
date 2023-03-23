import Vue from 'vue'

import App from './App'

Vue.prototype.mainTitle 	  = '';
Vue.prototype.domain 		  = 'https://api.yiwenyw.com/';
Vue.prototype.picurl 		  = 'https://admin.yiwenyw.com/upload/';
Vue.prototype.token 		  = 'saksl';

// checkLogin
// Vue.prototype.checkLogin = function(backpage = '../index/index',backtype = 2){
// 	var uid = uni.getStorageSync('uid');
// 	var gid = uni.getStorageSync('gid');
// 	var sid = uni.getStorageSync('sid');
// 	var username = uni.getStorageSync('username');
// 	var realname = uni.getStorageSync('realname');
// 	var nickname = uni.getStorageSync('nickname');
// 	var gradename = uni.getStorageSync('gradename');
// 	var sign = uni.getStorageSync('sign');
// 	var face = uni.getStorageSync('face');
// 	var pic = uni.getStorageSync('pic');
// 	var code = uni.getStorageSync('code');
// 	var token = uni.getStorageSync('token');
	
// 	if(uid == '' || gid == '' || sid == '' || sign == '' || token == ''){
// 		uni.redirectTo({url:'../login/login?backpage='+backpage+'&backtype='+backtype});
// 		return false;
// 	}
// 	return {uid:uid,gid:gid,sid:sid,username:username,realname:realname,nickname:nickname,gradename:gradename,face:face,pic:pic,code:code,sign:sign,token:token};
// }
import share from '@/components/share.js'
Vue.mixin(share)
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()