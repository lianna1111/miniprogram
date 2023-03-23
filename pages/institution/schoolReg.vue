<template>
	<gui-page :fullPage="true" :isLoading="pageLoading" 
	ref="guiPage" :customFooter="true">
		<view slot="gBody" class="gui-flex1 gui-flex gui-columns">
			<!-- 顶部步骤提示 -->
			<view class="gui-flex gui-rows gui-nowrap gui-align-items-center gui-margin-top">
				<view class="gui-step-item">
					<text :class="['gui-step-icon', step >= 1 ? 'gui-bg-orange1' : '', step >= 1 ? 'gui-color-white' : '']">1</text>
					<text :class="['gui-step-text', step >= 1 ? 'gui-color-black' : '']">第1步</text>
				</view>
				<view :class="['gui-step-line', step >= 2 ? 'gui-step-line-active' : '']"></view>
				<view class="gui-step-item">
					<text :class="['gui-step-icon', step >= 2 ? 'gui-bg-orange1' : '', step >= 1 ? 'gui-color-white' : '']">2</text>
					<text :class="['gui-step-text', step >= 2 ? 'gui-color-black' : '']">第2步</text>
				</view>
				<view :class="['gui-step-line', step >= 3 ? 'gui-step-line-active' : '']"></view>
				<view class="gui-step-item">
					<text :class="['gui-step-icon', step >= 3 ? 'gui-bg-orange1' : '', step >= 1 ? 'gui-color-white' : '']">3</text>
					<text :class="['gui-step-text', step >= 3 ? 'gui-color-black' : '']">第3步</text>
				</view>
			</view>
			
			<!-- 表单元素核心区域 -->
			<scroll-view :scroll-y="true" :show-scrollbar="false" 
			:style="{height:mainHeight+'px'}">
				<!-- 第1步 -->
				<view class="gui-padding" v-if="step == 1">
					
					
					<view class="gui-form-item gui-text-center">
					<!-- 	<view style="padding: 10rpx; margin: auto;"
						class="c-btn gui-color-white gui-border  gui-border-radius gui-text-center gui-bg-orange1">
							一键复用
						</view> -->
							<checkbox-group @change="checkChange" class="gui-check-item">
								<label for="">
									<checkbox color="#ffcb52"  :value='checkVal' :checked="checked"/>
									<text class="gui-h6 gui-color-gray ">基本信息与机构一致</text></label>
							</checkbox-group>
					</view>
					
					<!-- 单位 -->
				<view class="gui-margin-top">
					<text class="gui-h6 gui-color-gray gui-bold">单位</text>
				</view>
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>注册单位（全称）</text>
					<view class="gui-form-body">
						<input type="text" class="gui-form-input" 
						v-model="formData.FullName" name="FullName" placeholder="请输入注册单位（全称）" />
					</view>
				</view>
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>单位简称</text>
					<view class="gui-form-body">
						<input type="text" class="gui-form-input" 
						v-model="formData.CampusName" name="CampusName" placeholder="建议输入校区简称（如:xx校区）" />
					</view>
				</view>
				<!-- <view class="gui-form-item gui-border-b">
					<text class="gui-form-label">识别代码</text>
					<view class="gui-form-body">
						<input type="text" class="gui-form-input" 
						v-model="formData.Idcode" name="registered-entity-abbreviation" placeholder="请输入识别代码" />
					</view>
				</view> -->
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label">描述</text>
					<view class="gui-form-body">
						<input type="text" class="gui-form-input" 
						v-model="formData.Description" name="Description" placeholder="请输入相关描述" />
					</view>
				</view>
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label">校区图片</text>
					<view class="gui-form-body" @tap="upPic">
						<view class="gui-flex gui-rows gui-nowrap">
							<view class="gui-text-small gui-color-gray" v-if="formData.Pic">
								<gui-image :src="formData.Pic" :width="100" :height="100"></gui-image>
							</view>
							<view class="gui-margin gui-text-small gui-color-gray gui-flex1">
								<text class="gui-text gui-h5 gui-color-blue">{{uploadText}}</text>
							</view>
						</view>
					</view>
					</view>
					
					
					<view class="gui-form-item gui-border-b">
						<text class="gui-form-label">校区logo</text>
						<view class="gui-form-body" @tap="upPic">
							<view class="gui-flex gui-rows gui-nowrap">
								<view class="gui-text-small gui-color-gray" v-if="formData.Pic">
									<gui-image :src="formData.Pic" :width="100" :height="100"></gui-image>
								</view>
								<view class="gui-margin gui-text-small gui-color-gray gui-flex1">
									<text class="gui-text gui-h5 gui-color-blue">{{uploadText}}</text>
								</view>
							</view>
						</view>
				
				</view>
				
				
				
				
				<!-- 法人 -->
				<view class="gui-margin-top-large">
					<text class="gui-h6 gui-color-gray gui-bold ">法人代表</text>
				</view>
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>法人姓名</text>
					<view class="gui-form-body">
						<input type="text" class="gui-form-input" 
						v-model="formData.LegalName" name="LegalName" placeholder="请输入法人姓名" />
					</view>
				</view>
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>法人电话</text>
					<view class="gui-form-body">
						<input type="text" class="gui-form-input" 
						v-model="formData.LegalMobile" name="LegalMobile" placeholder="请输入法人电话(手机号)" />
					</view>
				</view>
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>身份证号</text>
					<view class="gui-form-body">
						<input type="text" class="gui-form-input" 
						v-model="formData.LegalCard" name="LegalCard" placeholder="请输入法人身份证号码" />
					</view>
				</view>
				<view class="gui-margin-top-large">
					<text class="gui-text gui-color-gray"><text class="gui-color-red">*</text>身份证照片 ( 个人信息面 )</text>
				</view>
				<view class="gui-idcard-items gui-img-in gui-flex gui-rows gui-justify-content-center">
					<view class="gui-idcard-items-image" @tap="selectImg1">
						<gui-image :src="formData.LegalCardFront" :width="380"></gui-image>
					</view>
				</view>
				<view class="gui-margin-top-large">
					<text class="gui-text gui-color-gray"><text class="gui-color-red">*</text>身份证照片 ( 国徽图案面 )</text>
				</view>
				<view class="gui-idcard-items gui-img-in gui-flex gui-rows gui-justify-content-center">
					<view class="gui-idcard-items-image" @tap="selectImg2">
						<gui-image :src="formData.LegalCardBack" :width="380"></gui-image>
					</view>
				</view>
				
				
					
					
				</view>
				<!-- 第2步 -->
				<view class="gui-padding" v-if="step == 2">
					<view class="gui-margin-top-large">
							<text class="gui-h6 gui-color-gray gui-bold">授权</text>
					</view>
					<view class="gui-form-item gui-border-b">
						<text class="gui-form-label"><text class="gui-color-red">*</text>授权方式</text>
						<view class="gui-form-body">
							<picker mode="selector" :range="genderType" @change="pickerChangeType">
								<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
									<text class="gui-text">{{genderType[genderTypeIndex]}}</text>
									<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
								</view>
							</picker>
						</view>				
					</view>
					<view class="gui-form-item gui-border-b">
						<text class="gui-form-label"><text class="gui-color-red">*</text>是否综合学校</text>
						<view class="gui-form-body">
							<picker mode="selector" :range="genderMulti" @change="pickerChangeMulti">
								<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
									<text class="gui-text">{{genderMulti[genderMultiIndex]}}</text>
									<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
								</view>
							</picker>
						</view>				
					</view>
					<view class="gui-form-item gui-border-b">
						<text class="gui-form-label"><text class="gui-color-red">*</text>开设项目</text>
						<view class="gui-form-body">
							<picker mode="selector" :range="Project" range-key="Title" @change="pickerChangePro">
								<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
									<!-- <text class="gui-text">{{Project[ProjectIndex]}}</text> -->
									<text class="gui-text">{{Project[ProjectIndex].Title}}</text>
									<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
								</view>
							</picker>
						</view>				
					</view>
					<view class="gui-form-item gui-border-b">
						<text class="gui-form-label"><text class="gui-color-red">*</text>办学许可证</text>
						<view class="gui-form-body">
							<input type="text" class="gui-form-input" 
							v-model="formData.SchoolLicence" name="SchoolLicence" placeholder="请输入办学许可证" />
						</view>
					</view>
					<view class="gui-form-item gui-border-b">
						<text class="gui-form-label"><text class="gui-color-red">*</text>审批部门</text>
						<view class="gui-form-body">
							<input type="text" class="gui-form-input" 
							v-model="formData.ApprovalDepartment" name="ApprovalDepartment" placeholder="请输入审批部门" />
						</view>
					</view>
						
					<!-- <view class="">
						<text class="gui-h6 gui-color-gray gui-bold">其他</text>
					</view>	 -->
						<view class="gui-form-item gui-border-b" @tap="open">
							<text class="gui-form-label"><text class="gui-color-red">*</text>地址</text>
									<view class="gui-form-body">
										<input type="text" class="gui-form-input" :value="areas" name="areas" placeholder="请选择" />
									</view>
									<text class="gui-icons gui-form-icon gui-color-gray gui-text-right">&#xe603;</text>
								</view>
								<gui-area-picker ref="graceAddressPicker" @confirm="confirm" :level="3" cancelText="关闭"></gui-area-picker>
								
					
					<view class="gui-form-item gui-border-b">
						<text class="gui-form-label"><text class="gui-color-red">*</text>详细地址</text>
						<view class="gui-form-body">
							<input type="text" class="gui-form-input"
							v-model="formData.Address" name="Address" placeholder="请输入详细地址" />
						</view>
					</view>
					<view class="gui-form-item gui-border-b">
						<text class="gui-form-label"><text class="gui-color-red">*</text>信用代码</text>
						<view class="gui-form-body">
							<input type="text" class="gui-form-input" 
							v-model="formData.CreditCode" name="CreditCode" placeholder="请输入统一信用代码" />
						</view>
					</view>
					<view class="gui-margin-top-large">
						<text class="gui-text gui-color-gray"><text class="gui-color-red">*</text>营业执照</text>
					</view>
					<view class="gui-idcard-items gui-img-in gui-flex gui-rows gui-justify-content-center">
						<view class="gui-idcard-items-image" @tap="selectImg3">
							<gui-image :src="formData.BusinessLicense" :width="380"></gui-image>
						</view>
					</view>
				
				</view>
				
				<!-- 第3步 -->
				<view class="gui-padding" v-if="step == 3">
					
						<view class="gui-margin-top-large">
							<text class="gui-h6 gui-color-gray gui-bold">校区</text>
						</view>
						
						<view class="gui-form-item gui-border-b">
							<text class="gui-form-label">校区网址</text>
							<view class="gui-form-body">
								<input type="text" class="gui-form-input"
								v-model="formData.Website" name="Website" placeholder="请输入校区网址" />
							</view>
						</view>
						<view class="gui-form-item gui-border-b">
							<text class="gui-form-label">校区电话</text>
							<view class="gui-form-body">
								<input type="text" class="gui-form-input"
								v-model="formData.Telphone" name="Telphone" placeholder="请输入校区电话" />
							</view>
						</view>
						<view class="gui-form-item gui-border-b">
							<text class="gui-form-label">校区热线</text>
							<view class="gui-form-body">
								<input type="text" class="gui-form-input"
								v-model="formData.Hotline" name="Hotline" placeholder="请输入校区热线" />
							</view>
						</view>
						<view class="gui-form-item gui-border-b">
							<text class="gui-form-label">校区面积</text>
							<view class="gui-form-body">
								<input type="number" class="gui-form-input"
								v-model="formData.CampusArea" name="CampusArea" placeholder="请输入校区面积" />
							</view>
						</view>
				<view class="gui-margin-top">
					<text class="gui-text-small gui-color-gray">中心介绍</text>
				</view>
				<view>
					<textarea v-model="formData.Content" name="Content" value="" placeholder="说点什么..." 
					class="gui-textarea gui-bg-gray gui-border-box" style="width:690rpx;" />
				</view>
				</view>
			</scroll-view>
		</view>
		<!-- 底部按钮 -->
		<view slot="gFooter">
			<view class="form-add-footer gui-border-b gui-flex gui-rows gui-space-between" 
			v-if="step == 1" hover-class="gui-tap">
				<text class="form-add-footer-btns"></text>
				<text class="form-add-footer-btns" @tap="stepto(2)">下一步</text>
			</view>
			<view class="form-add-footer gui-border-b gui-flex gui-rows gui-space-between" 
			v-if="step == 2" hover-class="gui-tap">
				<text class="form-add-footer-btns" @tap="stepto(1)">上一步</text>
				<text class="form-add-footer-btns" @tap="stepto(3)">下一步</text>
			</view>
			<view class="form-add-footer gui-border-b gui-flex gui-rows gui-space-between" 
			v-if="step == 3" hover-class="gui-tap">
				<text class="form-add-footer-btns" @tap="stepto(2)">上一步</text>
				<text class="form-add-footer-btns" @tap="submit()">提交</text>
			</view>
		</view>
	</gui-page>
</template>
<script>
var graceJS = require('@/GraceUI5/js/grace.js');
import {provinceData} from '../../components/data/city-data/province.js'
export default {
	data() {
		return {
			areas   : '',//省市区
			pageLoading: true,// 全屏 loading
			mainHeight: 200,// 核心区域高度 
			step: 1,// 步骤
			// 同上按钮
			checkVal:'0',
			checked:false,
			genderType : ['请选择授权方式', '直营', '代理', '加盟', '合作'],//piker：授权方式
			genderTypeIndex : 0,//pickerindex
			genderMulti : ['是否综合学校', '是', '否'],//piker：综合学校
			genderMultiIndex : 0,//pickerindex
			Project : ['开设哪些项目', '1', '2', '3', '4'],//piker：开设那些项目
			ProjectIndex : 0,//pickerindex
			uploadText:'点击上传',
			userinfo:"",//校区信息
			// 表单数据记录
			formData: {
				InstituteID:"",//机构id
				UserID:"",//用户id
				CampusName:'',//	公司名称（简称
				FullName:'',//	公司全称
				Idcode:'',//	识别代码
				Description:'',//	描述
				Pic:'',//	图片
				LegalName:'',//	法人代表名称
				LegalCard:'',//	法人身份证号码
				LegalMobile:'',//	法人手机号码
				CreditCode:'',//	统一信用代码
				BusinessLicense:'/static/businessLicense.png',//	营业执照
				Website:'',//	校区网址
				Telphone:'',//	校区电话
				Hotline:'',//	校区热线
				AuthType:'',//授权方式
				IsComprehensive:'',//是否综合学校
				CategoryItem:'',//开设哪些项目
				SchoolLicence:'',//办学许可证
				ApprovalDepartment:'',//审批部门
				CampusArea:'',//校区面积
				ProvinceID:'',//	省份ID
				CityID:'',//	城市ID
				DistrictID:'',//	区县ID
				Address:'',//	详细地址
				Content:'',//	中心介绍
				LegalCardFront : 'https://img-cdn-tc.dcloud.net.cn/uploads/article/20210107/e53bf48607dcf795ab78e419dc5cf432.png',
				LegalCardBack : 'https://img-cdn-tc.dcloud.net.cn/uploads/article/20210107/dac9c5c703b2a0bcd254a919d0da5632.png',
					},
		}
	},
	onLoad: function(option) {
	this.formData.InstituteID=option.iid
			uni.request({
			url: this.domain+'institute', //获取机构信息
			method:'post',
			data: {
			id: option.iid
			},
			  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
			success: (res) => {
				this.userinfo=res.data.msg
				console.log(this.userinfo,'this.userinfo1111')
				if(res.data.msg.CampusCount>=res.data.msg.CampusLimit){
					uni.showToast({ title: '超出新建校区限制!', icon : "none"});
					uni.redirectTo({
					url: './campus'
					});
				}
			},
		})	
		uni.request({
			url: this.domain+'cate', //获取艺术类别
			method:'post',
			data: {
			},
			  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
			success: (res) => {
				this.Project=res.data.msg
				this.Project.unshift({
				ID:0,
				Title:'请选择艺术类别'
				})
				
			},
		})	
		
		
	
		// 01. 获取页面主体高度
		graceJS.getRefs('guiPage', this, 0, (ref)=>{
			ref.getDomSize('guiPageBody', (e)=>{
				// 02. 导航的高度
				// 可以 使用 graceJS.select() 函数动态获取， 也可以使用 uni.upx2px 转换已知高度
				// 轮播主体高度 = 页面高度 - 导航高度
				this.mainHeight  = e.height - uni.upx2px(160);
				this.pageLoading = false;
			});
		});
	},
	methods: {
		// picker 切换：授权方式
				pickerChangeType : function (e) {
					this.genderTypeIndex    = e.detail.value;
					this.formData.AuthType = this.genderType[this.genderTypeIndex];
				},
		// picker 切换：综合学校
				pickerChangeMulti : function (e) {
					this.genderMultiIndex    = e.detail.value;
					this.formData.IsComprehensive = this.genderMulti[this.genderMultiIndex];
				},
		// picker 切换：开设项目
				pickerChangePro : function (e) {
					this.ProjectIndex    = e.detail.value;
					 this.formData.CategoryItem = this.Project[this.ProjectIndex];
				},				
			// 省市区
				open    : function(){this.$refs.graceAddressPicker.open();},
				confirm : function (e) {
					// 返回选中城市的编号及文本信息
					console.log(e);
					this.areas = e.names[0]+','+e.names[1]+','+e.names[2];
					this.formData.ProvinceID=e.codes[0]
					this.formData.CityID=e.codes[1]
					this.formData.DistrictID=e.codes[2]
					// {"label": "北京市", "value": "11"}
				},
		  // 复制姓名电话
		  checkChange: function (e) {
				if(e.detail.value=='0'){
					console.log(e.detail.value,'this.checked = true');
					console.log(this.userinfo,'userinfo');
					this.checked = true;
					this.formData.FullName         =this.userinfo.FullName;
					this.formData.Idcode           =this.userinfo.Idcode;
					this.formData.Description      =this.userinfo.Description;
					this.formData.Pic              =this.userinfo.Pic;
					this.formData.LegalName        =this.userinfo.LegalName;
					this.formData.LegalCard        =this.userinfo.LegalCard;
					this.formData.LegalMobile      =this.userinfo.LegalMobile;
					this.formData.LegalCardFront   =this.userinfo.LegalCardFront;
					this.formData.LegalCardBack    =this.userinfo.LegalCardBack;
					this.formData.CreditCode       =this.userinfo.CreditCode;
					this.formData.BusinessLicense  =this.userinfo.BusinessLicense;
					this.formData.Website          =this.userinfo.Website;
					this.formData.Telphone         =this.userinfo.Telphone;
					this.formData.Hotline          =this.userinfo.Hotline;
					this.formData.ProvinceID       =this.userinfo.ProvinceID;
					this.formData.CityID           =this.userinfo.CityID;
					this.formData.DistrictID       =this.userinfo.DistrictID;
					this.formData.Address          =this.userinfo.Address;
					this.formData.Content          =this.userinfo.Content;
					this.formData.UserID           =this.userinfo.UserID;
					console.log(provinceData.provinceData,'provinceData');
					let obj = provinceData.find(o => o.label === 'this.formData.ProvinceID');
					console.log(obj.value,'obj.value');
				}else{
					this.checked = false
					console.log(e.detail.value,'this.checked = false');
					this.formData.FullName         ='',
					this.formData.Idcode           ='',
					this.formData.Description      ='',
					this.formData.Pic              ='',
					this.formData.LegalName        ='',
					this.formData.LegalCard        ='',
					this.formData.LegalMobile      ='',
					this.formData.LegalCardFront = 'https://img-cdn-tc.dcloud.net.cn/uploads/article/20210107/e53bf48607dcf795ab78e419dc5cf432.png',
					this.formData.LegalCardBack = 'https://img-cdn-tc.dcloud.net.cn/uploads/article/20210107/dac9c5c703b2a0bcd254a919d0da5632.png',
					this.formData.CreditCode       ='',
					this.formData.BusinessLicense  ='',
					this.formData.Website          ='',
					this.formData.Telphone         ='',
					this.formData.Hotline          ='',
					this.formData.ProvinceID       ='',
					this.formData.CityID           ='',
					this.formData.DistrictID       ='',
					this.formData.Address          ='',
					this.formData.Content          ='',
					this.formData.UserID           =''
				}
		  },
		 
		  // idcard
		selectImg1(){
			var that = this;
			uni.chooseImage({
				count:1,
				success: (chooseImageRes) => {
					// console.log(chooseImageRes);
					const tempFilePaths = chooseImageRes.tempFilePaths;
					//图片上传
					const uploadTask = uni.uploadFile({
						url : this.domain+'upload/path/campus',
						filePath: tempFilePaths[0],
						name: 'file',
						success: function (uploadFileRes) {
							var data = JSON.parse(uploadFileRes.data);
							// console.log(data)
							if(data.errno === 0){
								that.formData.LegalCardFront = data.msg;
								uni.showToast({title:'上传成功',icon:'none'});
							}else{
								uni.showToast({title:data.msg,icon:'none'});
								return false;
							}
						}
					});
				}
			});
		},
		selectImg2(){
			var that = this;
			uni.chooseImage({
				count:1,
				success: (chooseImageRes) => {
					// console.log(chooseImageRes);
					const tempFilePaths = chooseImageRes.tempFilePaths;
					//图片上传
					const uploadTask = uni.uploadFile({
						url : this.domain+'upload/path/campus',
						filePath: tempFilePaths[0],
						name: 'file',
						success: function (uploadFileRes) {
							var data = JSON.parse(uploadFileRes.data);
							// console.log(data)
							if(data.errno === 0){
								that.formData.LegalCardBack = data.msg;
								uni.showToast({title:'上传成功',icon:'none'});
							}else{
								uni.showToast({title:data.msg,icon:'none'});
								return false;
							}
						}
					});
				}
			});
		},
	
		 upPic(){
		 	var that = this;
		 	uni.chooseImage({
		 		count:1,
		 		success: (chooseImageRes) => {
		 			// console.log(chooseImageRes);
		 			const tempFilePaths = chooseImageRes.tempFilePaths;
		 			//图片上传
		 			const uploadTask = uni.uploadFile({
						url : this.domain+'upload/path/campus',
		 				filePath: tempFilePaths[0],
		 				name: 'file',
		 				success: function (uploadFileRes) {
		 					var data = JSON.parse(uploadFileRes.data);
		 					if(data.errno === 0){
		 						that.formData.Pic = data.msg;
		 						that.uploadText = '重新上传';
		 						uni.showToast({title:'上传成功',icon:'none'});
		 					}else{
		 						uni.showToast({title:data.msg,icon:'none'});
		 						return false;
		 					}
		 				}
		 			});
		 		}
		 	});
		 },
		selectImg3(){
			var that = this;
			uni.chooseImage({
				count:1,
				success: (chooseImageRes) => {
					// console.log(chooseImageRes);
					const tempFilePaths = chooseImageRes.tempFilePaths;
					//图片上传
					const uploadTask = uni.uploadFile({
						url : this.domain+'upload/path/campus',
						filePath: tempFilePaths[0],
						name: 'file',
						success: function (uploadFileRes) {
							var data = JSON.parse(uploadFileRes.data);
							// console.log(data)
							if(data.errno === 0){
								that.formData.BusinessLicense = data.msg;
								uni.showToast({title:'上传成功',icon:'none'});
							}else{
								uni.showToast({title:data.msg,icon:'none'});
								return false;
							}
						}
					});
				}
			});
		},
		stepto : function(index){
			// console.log(this.formData,"top")
			switch(index){
				case 1:
				// 第1步数据验证这里编写
				// 不满足使用 return 返回即可
				break;
				case 2:
				  if(!this.formData.CampusName||!this.formData.FullName||!this.formData.LegalName||!this.formData.LegalCard||!this.formData.LegalMobile||
				  this.formData.LegalCardFront == 'https://img-cdn-tc.dcloud.net.cn/uploads/article/20210107/e53bf48607dcf795ab78e419dc5cf432.png' ||
				  this.formData.LegalCardBack == 'https://img-cdn-tc.dcloud.net.cn/uploads/article/20210107/dac9c5c703b2a0bcd254a919d0da5632.png'
				  )
				 {uni.showToast({title:"必填项请填写完整", icon:"none"});
				 if(this.formData.CategoryItem=='请选择艺术类别'){
				 	uni.showToast({ title: '请选择开设何种艺术类别!', icon : "none"});
				 }
				  return}
				// 第2步数据验证这里编写
				// 不满足使用 return 返回即可
				break;
				case 3:
				 if(!this.formData.AuthType||this.formData.AuthType=='请选择授权方式'||!this.formData.IsComprehensive||this.formData.IsComprehensive=='是否综合学校'||!this.formData.CategoryItem||this.formData.CategoryItem=='请选择艺术类别'
				 ||!this.formData.CreditCode||!this.formData.BusinessLicense||!this.formData.Address
				 ||!this.formData.SchoolLicence||!this.formData.ApprovalDepartment||!this.areas) 
				 {uni.showToast({title:"必填项请填写完整", icon:"none"});
				 return}
				 else if(this.formData.CategoryItem=='请选择艺术类别'){
				 	uni.showToast({ title: '请选择开设何种艺术类别!', icon : "none"});
					return
				   }
				// 第3步数据验证这里编写
				// 不满足使用 return 返回即可
				break;
			}
			this.step = index;
		},
		// 提交
		submit:function () {
			// 数据保持在 this.form data 内
			// 请根据实际需求进行数据校验及提交
			
			// console.log(this.formData,"submit");
			if(this.formData.AuthType=="直营"){
				this.formData.AuthType='1'
			}else if(this.formData.AuthType=="代理"){
				this.formData.AuthType='2'
			}else if(this.formData.AuthType=="加盟"){
				this.formData.AuthType='3'
			}else if(this.formData.AuthType=="合作"){
				this.formData.AuthType='4'
			}
			if(this.formData.IsComprehensive=="是"){
				this.formData.IsComprehensive='1'
			}else if(this.formData.IsComprehensive=="否"){
				this.formData.IsComprehensive='0'
			}
			if(!this.formData.CampusArea){
				this.formData.CampusArea='0'
			}
			if(this.formData.CategoryItem=='请选择艺术类别'){
				uni.showToast({ title: '请选择开设何种艺术类别!', icon : "none"});
			}else{
				this.formData.CategoryItem=this.formData.CategoryItem.Title
			}
			uni.request({
			    url: this.domain+'campus/add', //提交表单
				method:'post',
			    data: this.formData,
			    header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
			    success: (res) => {
					if(res.data.errno==0){
						uni.showToast({ title: '提交成功!', icon : "none"});
						uni.redirectTo({
						 url: './campus'
						});
					}
			    },
				fail() {
					uni.showToast({ title: '提交失败!', icon : "none"});
				}
			});
			
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
</style>