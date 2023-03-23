<template>
	<view class="">
		
				<!-- 例子 1 -->
				<gui-modal ref="guimodal1" 
				title="确认校区名称">
					<view slot="content" class="gui-padding gui-bg-gray">
						<text class="gui-block-text gui-text-center gui-text gui-color-gray" 
						style="line-height:100rpx; padding:10rpx;">所属校区是否为{{schoolname}}？</text>
					</view>
					<!-- 利用 flex 布局 可以放置多个自定义按钮哦  -->
					<view slot="btns" class="gui-flex gui-rows gui-space-between">
						<view class="modal-btns gui-flex1" style="margin-right:80rpx;">
							<text class="modal-btns gui-color-gray" @tap="close1">否</text>
						</view>
						<view class="modal-btns gui-flex1" style="margin-left:80rpx;">
							<text class="modal-btns gui-color-blue" @tap="confirm1">是</text>
						</view>
					</view>
				</gui-modal>
	<gui-page :fullPage="true" :isLoading="pageLoading" 
	ref="guiPage" :customFooter="true">
		<view slot="gBody" class="gui-flex1 gui-flex gui-columns">
			<!-- 顶部步骤提示 -->
			
			
			<!-- 表单元素核心区域 -->
			<scroll-view :scroll-y="true" :show-scrollbar="false" 
			:style="{height:mainHeight+'px'}">
				<!-- 第1步 -->
				<view class="gui-padding" v-if="step == 1">
		<view :class="[isSearch?'search':'']" >
			<view class="gui-form-item gui-border-b" style="overflow: scroll">
				<text class="gui-form-label">所属校区</text>
				<view class="gui-form-body">
					<input type="text" class="gui-form-input" 
					v-model="formData.campus_name" name="campus_name"  @focus='focus' @blur='blur' @input='Searches' placeholder="请输入关键字后点击对应学校(非学生勿填)" />
				</view>
				<!-- <text class="gui-form-icon gui-icons gui-text-center" >&#xe604;</text> -->
			</view>
					<view class="gui-color-gray gui-text gui-border-b gui-padding gui-lr-margin" v-if='isSearch' v-for="(item,index) in Tips" :key='index' @tap="chose(item.ID,item.title)">
						<!-- li -->
						{{item.title}}
					
					</view>
		</view>				
				
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label"><text class="gui-color-red">*</text>姓名</text>
				<view class="gui-form-body">
					<input type="text" class="gui-form-input" @blur='checkIdcard'
					v-model="formData.realname" name="realname" placeholder="请输入姓名" />
				</view>
			</view>
			
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label"><text class="gui-color-red">*</text>身份证号</text>
				<view class="gui-form-body">
					<input type="text" class="gui-form-input" @blur='checkIdcard'
					v-model="formData.idcard" name="idcard" placeholder="请输入身份证号" />
				</view>
			</view>
			
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label"><text class="gui-color-red">*</text>手机号</text>
				<view class="gui-form-body">
					<input type="number" class="gui-form-input" 
					v-model="formData.mobile" name="mobile" placeholder="请输入手机号" />
				</view>
			</view>
			
			 <view class="gui-form-item gui-border-b">
			 	<text class="gui-form-label"><text class="gui-color-red">*</text>身份</text>
			 	<view class="gui-form-body">
			 		<picker mode="selector" :range="grade" range-key="title" @change="pickerChangeType">
			 			<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
			 				<text class="gui-text">{{grade[gradeIndex].title}}</text>
			 				<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
			 			</view>
			 		</picker>
			 	</view>				
			 </view>
			
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label"><text class="gui-color-red">*</text>健康码</text>
				<view class="gui-form-body" @tap="upPic1">
					<view class="gui-flex gui-rows gui-nowrap">
						<view class="gui-text-small gui-color-gray" v-if="formData.health_pic">
							<gui-image :src="formData.health_pic" :width="100" :height="100"></gui-image>
						</view>
						<view class="gui-margin gui-text-small gui-color-gray gui-flex1">
							<text class="gui-text gui-h5 gui-color-blue">{{uploadText1}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label"><text class="gui-color-red">*</text>行程码</text>
				<view class="gui-form-body" @tap="upPic2">
					<view class="gui-flex gui-rows gui-nowrap">
						<view class="gui-text-small gui-color-gray" v-if="formData.travel_pic">
							<gui-image :src="formData.travel_pic" :width="100" :height="100"></gui-image>
						</view>
						<view class="gui-margin gui-text-small gui-color-gray gui-flex1">
							<text class="gui-text gui-h5 gui-color-blue">{{uploadText2}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- <view class="gui-form-item gui-border-b">
				<text class="gui-form-label">代表队</text>
				<view class="gui-form-body">
					<picker mode="selector" :range="team" range-key="title" @change="pickerChangeTeam">
						<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
							<text class="gui-text">{{team[teamIndex].title}}</text>
							<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
						</view>
					</picker>
				</view>				
			</view> -->
			<!-- <view class="gui-form-item gui-border-b">
				<text class="gui-form-label">所属校区</text>
				<view class="gui-form-body">
					<input type="text" class="gui-form-input" 
					v-model="formData.campus_id" name="campus_id"  placeholder="输入完成后请点击搜索(非学生勿填)" />
				</view>
				<text class="gui-form-icon gui-icons gui-text-center" @tap="SearchSchool">&#xe604;</text>
			</view> -->
				
				</view>
				
			</scroll-view>
		</view>
		<!-- 底部按钮 -->
		<view slot="gFooter">
			<view class="form-add-footer gui-border-b gui-flex gui-rows gui-space-between" 
			v-if="step == 1" hover-class="gui-tap">
				<text class="form-add-footer-btns"></text>
				<text class="form-add-footer-btns" :style="{'pointer-events':disabled?'none':''}" @tap="submit()">{{submitText}}</text>
			</view>
			
		</view>
		
	</gui-page>
	</view>
</template>
<script>
var graceJS = require('@/GraceUI5/js/grace.js');
export default {
	data() {
		return {
			isSearch:false,
			Tips:'',
			submitText:'提交',
			uploadText1:'点击上传(截图时请勿遗漏姓名)',
			uploadText2:'点击上传',
			disabled:false,
			pageLoading: true,// 全屏 loading
			mainHeight: 200,// 核心区域高度 
			step: 1,// 步骤
			IsGender : ['请选择', '女', '男'],//piker:性别
				IsGenderIndex : 0,//pickerindex
			// Category
			grade : [{id:"0" ,title:'请选择身份'},{id:"74" ,title:'学生'}, {id:"73" ,title:'家长'},{id:"70" ,title:'教师'},{id:"76" ,title:'评审'},{id:"115" ,title:'赛务工作人员'},{id:"116" ,title:'摄影师'}],//piker:学生类型
			gradeIndex : 0,//pickerindex
			teamIndex : 0,//pickerindex
			team:[
{id:'0',title:'请选择代表队'},{id:'1',title:'岳阳天浩'},{id:'2	',title:'1988 Dance'},{id:'3	',title:'TheLeader舞林盟主'},{id:'4	',title:'临湘金色童年'},{id:'5	',title:'临湘金色童年艺校'},{id:'6	',title:'乐宸艺术培训'},{id:'7	',title:'乐美童艺.羽翼舞蹈'},{id:'8	',title:'众翼飞扬星沙校区'},{id:'9	',title:'华睿舞蹈-舞·未来艺术中心'},{id:'10',title:'卓瑞艺术培训学校'},
{id:'11',title:'卓雅·鑫艺舞蹈'},{id:'12',title:'嘉兴明星国际舞蹈艺术学校'},{id:'13',title:'奇艺艺术中心'},{id:'14',title:'妇儿舞蹈学校'},{id:'15',title:'尚舞艺术培训学校'},{id:'16',title:'屈原舞则天舞蹈团'},{id:'17',title:'常德星光'},{id:'18',title:'张家界亲雨艺术学校'},{id:'19',title:'张家界处慈利华雅文化艺术学校'},{id:'20',title:'星汇舞蹈'},
{id:'21',title:'星沙利华舞校'},{id:'22',title:'星瀚舞蹈代表队'},{id:'23',title:'星遥艺术'},{id:'24',title:'星都艺术国际舞蹈'},{id:'25',title:'晓宇艺术培训学校'},{id:'26',title:'株洲华睿舞蹈文化发展有限公司'},{id:'27',title:'株洲启舞东方艺校'},{id:'28',title:'株洲市430星艺舞校'},{id:'29',title:'桂阳蓉都艺舞培训中心'},{id:'30',title:'梦享·SHOW工作室'},{id:'31',title:'江华尚舞拉丁舞'},{id:'32',title:'沅江市浩林艺术培训'},
{id:'33',title:'湖南军敏教育'},{id:'34',title:'湖南华航艺术团'},{id:'35',title:'湖南省衡阳市文龙艺术'},{id:'36',title:'湘潭市赤坚拉丁舞总校一队'},{id:'37',title:'湘潭悦艺馨'},{id:'38',title:'湘潭赤坚拉丁舞'},{id:'39',title:'湘潭赤坚拉丁舞总校'},{id:'40',title:'益阳倩欣专业舞校'},{id:'41',title:'舞林大会娄底校区代表队'},{id:'42',title:'艾梦舞苑舞蹈工作室'},{id:'43',title:'菲玲艺校'},{id:'44',title:'蓓蕾教育'},{id:'45',title:'蕲春舞加舞'},{id:'46',title:'衡阳市艺之澜艺术中心'},{id:'47',title:'衡阳文君舞蹈培训学校'},{id:'48',title:'衡阳星巢舞蹈俱乐部'},{id:'49',title:'衡阳星飞艺舞蹈'},
{id:'50',title:'贺雨晨'},{id:'51',title:'赤坚拉丁舞总校二队'},{id:'52',title:'醴陵市飞扬教育培训学校'},{id:'53',title:'金色童年'},{id:'54',title:'金色童年艺校'},{id:'55',title:'鑫洋艺术培训学校'},{id:'56',title:'铭星·王者艺术中心'},{id:'57',title:'长沙悦艺馨'},{id:'58',title:'长沙新舞汇体育舞蹈俱乐部'},{id:'59',title:'长沙海草舞蹈'},{id:'60',title:'长沙玛丽舞蹈学校'},{id:'61',title:'领舞艺术学校'},{id:'62',title:'黑天鹅舞蹈学校'},{id:'63',title:'龍裔东方'},{id:'64',title:'龙山县航艺培训学校'},{id:'65',title:'湘潭舞艺艺校学校'},{id:'66',title:'株洲东方艺校'},{id:'67',title:'菲尔艺术学校'},{id:'68',title:'杨慧专业拉丁'},{id:'69',title:'多艺猴云中心校区'}
],

			
			isok:'',//身份科研
			schoolname:'',
				// 表单数据记录
				formData: {
					id:'',
					// GradeID:'',?
					realname       :"",
					idcard:'',//身份证照
					mobile:"",
					health_pic        :"",
					travel_pic       :"",
					grade_id        :"",//grade_id
					// IsGender         :"",
					campus_id            :"",
					campus_name            :"",
						},
		}
	},
	onLoad: function() {
	this.formData.id = uni.getStorageSync('uid');
	
	uni.request({
	    url:  this.domain+'health', //提交表单
		method:'post',
	    data: {uid:this.formData.id},
	      header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
	    success: (res) => {
			console.log(res,"res")
			if(res.data.errno=='0'){
				if(res.data.msg.length>1&&res.data.msg.length<=5){
					uni.showToast({ title: '已提交,请勿重复提交！', icon : "none"});
				}else if(res.data.msg.length>5){
					uni.showToast({ title: '提交次数已达到最大限制,将显示最后一次提交结果！', icon : "none"});
					setTimeout(()=>{
					uni.redirectTo({url:'./success'})
				},1000)
				}
				
				
			}
	    }
	});
		
		
		// 01. 获取页面主体高度
	graceJS.getRefs('guiPage', this, 0, (ref)=>{
		ref.getDomSize('guiPageBody', (e)=>{
			// 02. 导航的高度
			// 可以 使用 graceJS.select() 函数动态获取， 也可以使用 uni.upx2px 转换已知高度
			// 轮播主体高度 = 页面高度 - 导航高度
			this.mainHeight  = e.height ;
			this.pageLoading = false;
		});
	});	
	
	},
	
	methods: {
		Searches(e){
			console.log(e.detail.value,'e')
		uni.request({
			url: this.domain+'campus', //获取校区列表
			method:'post',
			data: {
			keyword: e.detail.value
			},
			  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
			success: (res) => {
				if(res.data.errno==0){
				this.Tips=res.data.msg
				console.log(this.Tips,"所有校区")
				}
			},
		})	
		},
		focus(){
			this.isSearch=true
		},
		blur(){
			this.isSearch=false
			
		},
		chose(id,title){
			console.log(id,title,'input')
			this.formData.campus_id=id
			this.formData.campus_name=title
		},
		SearchSchool(){
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
					console.log(this.campus,"所有校区")
					this.handleSearch()
					
					}
				},
			})
		},
	handleSearch() {
	      console.log(this.formData.campus_id);
	      let arr = this.campus
	      arr = this.filterFunc(this.formData.campus_id, 'CampusName', arr)
		   console.log(arr.length,'weaew')
		  if(arr.length=='0'||arr.length>'1'){
			  uni.showToast({
				  icon:'none',
			  	title:'未查询到校区，请确认后重填！'
			  }) 
		  }else if(arr.length=='1'){
			  this.campus=arr
			  this.schoolname=this.campus[0].CampusName
			 this.open1()
			 
		  }
	   
	    },
	   
	    filterFunc(val, target, filterArr) {
	      if (val == undefined || val == '') return filterArr
	      
	      return filterArr.filter(p => p[target].indexOf(val) > -1) // 可以自己加一个.toLowerCase()来兼容一下大小
	    },	
	open1 : function () {
					this.$refs.guimodal1.open();
				},
				close1 : function () {
					this.$refs.guimodal1.close();
					this.formData.campus_id=''
				},
				confirm1 : function () {
					// 客户点击确认按钮后的逻辑请在此处实现
					this.$refs.guimodal1.close();
					this.formData.campus_id=this.campus[0].CampusName
					
				},			
		
		inputting : function(e){
					console.log(e);
					
				},
				// 监听提交
				confirm : function (e) {
					console.log(e);
				},
		
			pickerChangeType: function (e) {
				console.log(e);
				this.gradeIndex    = e.detail.value;
				this.formData.grade_id = this.grade[this.gradeIndex].id;
			},	
			pickerChangeTeam: function (e) {
				console.log(e);
				this.teamIndex    = e.detail.value;
				this.formData.campus_id = this.team[this.teamIndex].id;
			},					
		checkIdcard(){
			if(!this.formData.realname){
				uni.showToast({ title: '请输入真实姓名!', icon : "none"});
			}else if(this.formData.realname&&!this.formData.idcard){
				uni.showToast({ title: '请输入身份证号!', icon : "none"});
			}
			else{
				console.log(this.formData.realname)
				uni.request({
				    url: 'https://api.dackou.com/tencent/idcard', //身份证
					method:'post',
				    data: {realname:this.formData.realname,idcard: this.formData.idcard},
				      header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
				    success: (res) => {
						console.log(res,"cardres")
						if(!res.data){
							uni.showToast({ title: '身份核验失败，请确认姓名、身份证号填写是否正确!', icon : "none"});
						}else{
							 if(res.data.data.result.isok){
								uni.showToast({ title: '身份核验成功!', icon : "none"});
								this.isok=true
							}else{
								uni.showToast({ title: '身份核验失败，请确认姓名、身份证号填写是否正确!', icon : "none"});
							}
						}
				    },
					fail() {
						uni.showToast({ title: '提交失败!', icon : "none"});
					}
				});
			}
		},
	
		upPic1(){//健康码
			var that = this;
			if(!this.formData.realname){
				uni.showToast({ title: '请先填写姓名!', icon : "none"});
			}else{
			uni.chooseImage({
				count:1,
				success: (chooseImageRes) => {
					 console.log(chooseImageRes);
					const tempFilePaths = chooseImageRes.tempFilePaths;
					//图片上传
					const uploadTask = uni.uploadFile({
						url : that.domain+'upload/path/health',
						filePath: tempFilePaths[0],
						name: 'file',
						success: function (uploadFileRes) {
							var data = JSON.parse(uploadFileRes.data);
							console.log(data.msg)
							if(data.errno === 0){
								that.formData.health_pic = data.msg;
								that.uploadText1 = '重新上传';
								// uni.showToast({title:'图片上传成功',icon:'none'});
								that.check1()
							}else{
								uni.showToast({title:data.msg,icon:'none'});
								return false;
							}
						}
					});
				}
			});	
			}
			
		},
		check1(){
			uni.request({
			    url: 'https://test.yiwenyw.com/tencent/health', //健康码
				method:'post',
			    data: {ap:'ap-beijing',url: this.formData.health_pic},
			      header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
			    success: (res) => {
					console.log(res,"healthres")
					
					if(res.data.data.code){
						uni.showToast({ title: res.data.data.message, icon : "none"});
					}else if(res.data.data.Name!=this.formData.realname){
						console.log(res.data.data.Name!=this.formData.realname,'1',res.data.data.Name,'2',this.formData.realname)
						uni.showToast({ title: '验证失败，请上传正确健康码!', icon : "none"});
					}else{
						uni.showToast({ title: '提交成功!', icon : "none"});
						for (let i in res.data.data) {
						     console.log(i, res.data.data[i])  //i是键名，obj[i]是键值
							 if(!res.data.data[i]){
								  delete res.data.data[i]
							 }
						 }
						 console.log(res.data.data,'res.data.data')
						this.formData.res_health= JSON.stringify(res.data.data)
					}
					
			    },
				fail() {
					uni.showToast({ title: '提交失败，请重新上传!', icon : "none"});
				}
			});
		},
		
		upPic2(){//行程码
			var that = this;
			uni.chooseImage({
				count:1,
				success: (chooseImageRes) => {
					// console.log(chooseImageRes);
					const tempFilePaths = chooseImageRes.tempFilePaths;
					//图片上传
					const uploadTask = uni.uploadFile({
						url : that.domain+'upload/path/health',
						filePath: tempFilePaths[0],
						name: 'file',
						success: function (uploadFileRes) {
							var data = JSON.parse(uploadFileRes.data);
							if(data.errno === 0){
								that.formData.travel_pic = data.msg;
								that.uploadText2 = '重新上传';
								// uni.showToast({title:'图片上传成功',icon:'none'});
								that.check2()
							}else{
								uni.showToast({title:data.msg,icon:'none'});
								return false;
							}
						}
					});
				}
			});
		},
		check2(){
			uni.request({
			    url: 'https://test.yiwenyw.com/tencent/travel', 
				method:'post',
			    data: {ap:'ap-beijing',url: this.formData.travel_pic},
			      header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
			    success: (res) => {
					console.log(res,"res")
					console.log(res.data.data['ReachedCity'],"healthres2")
					if(res.data.data.code){
						uni.showToast({ title: res.data.data.message, icon : "none"});
					}else if(!res.data.data['ReachedCity'].length){
						console.log('123')
						uni.showToast({ title: '验证失败,请上传正确的行程码!', icon : "none"});
					}
					else{
						res.data.data['ReachedCity']=res.data.data['ReachedCity'].toString()
						res.data.data['RiskArea']=res.data.data['RiskArea'].toString()
						let obj_travel={}
						for (let i in res.data.data) {
						     console.log(i, res.data.data[i])  //i是键名，obj[i]是键值
							 if(!res.data.data[i]){
								 delete res.data.data[i]
							 }
						 }
						 console.log(res.data.data,'res.data.data')
						this.formData.res_travel=JSON.stringify(res.data.data)
						
					uni.showToast({ title: '提交成功!', icon : "none"});
					}
				
			    },
				fail() {
					uni.showToast({ title: '提交失败,请重新上传!', icon : "none"});
				}
			});
		},

		// 提交
		submit:function () {
			
		// uni.redirectTo({
		// 	url:'./success'
		// })
			if(!this.isok||!this.formData.health_pic||!this.formData.travel_pic
			||!this.formData.res_health||!this.formData.res_travel
			||!this.formData.mobile||!this.formData.grade_id||this.formData.grade_id=='0'
			) 
			 {uni.showToast({title:"请确认填写是否正确！", icon:"none"});
			 console.log(this.formData)
			return}
			else if(this.formData.grade_id=='74'&&this.formData.campus_id==''){
				uni.showToast({title:"校区填写完必须点击下方对应校区！", icon:"none"});
				 console.log(this.formData)
				return
			}else{
			
			console.log(this.formData,"submit");
			this.submitText='提交中'
			this.disabled=true
			uni.request({
			    url:  this.domain+'user/health_auth', //提交表单
				method:'post',
			    data: this.formData,
			      header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
			    success: (res) => {
					console.log(res,"res")
					if(res.data.errno=='0'){
						uni.showToast({ title: '健康上报成功，感谢支持!', icon : "none"});
						setTimeout(()=>{
							// uni.switchTab({url:'./index'})
							
							uni.redirectTo({
								url:'./success'
							})
						},1000)	
					}else{
						uni.showToast({ title: res.data.msg, icon : "none"});
					}
				
			    },
				fail() {
					uni.showToast({ title: '提交失败!', icon : "none"});
				}
			});
			}
			
	 	}
	}
}
</script>
<style>
.gui-step-item{padding:10rpx 20rpx; width:88rpx; display:flex; flex-direction:column; align-items:center; flex-shrink:0;}
.gui-step-icon{width:50rpx; font-size:22rpx; height:50rpx; text-align:center; line-height:50rpx; margin:10rpx; border-radius:100%; background-color:#F1F2F3; color:#999999;}
.gui-step-text{text-align:center; line-height:50rpx; font-size:24rpx; color: gray;}
.gui-step-line{width:100rpx; height:1px; background-color:#F1F2F3; margin-bottom:50rpx; flex:1;}
.gui-step-line-active{background-color:#ffcb52;}
.form-add-footer-btns{padding:0 38rpx; color:#ffcb52; font-size:30rpx; line-height:100rpx;}
.modal-btns{line-height:88rpx; font-size:26rpx; text-align:center; width:200rpx;}
.search{
	border-radius: 10rpx;
	border: 5rpx solid #ffcb52;
}

</style>