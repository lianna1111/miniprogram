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
					
					
					<!-- 单位 -->
				<view class="">
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
						v-model="formData.InstituteName" name="registered-entity-abbreviation" placeholder="请输入注册单位（简称）" />
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
					<text class="gui-form-label">图片</text>
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
						v-model="formData.LegalName" name="principal-name" placeholder="请输入法人姓名" />
					</view>
				</view>
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>法人电话</text>
					<view class="gui-form-body">
						<input type="text" class="gui-form-input" 
						v-model="formData.LegalMobile" name="principal-tel" placeholder="请输入法人电话(手机号)" />
					</view>
				</view>
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>身份证号</text>
					<view class="gui-form-body">
						<input type="text" class="gui-form-input" 
						v-model="formData.LegalCard" name="id" placeholder="请输入法人身份证号码" />
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
							<text class="gui-h6 gui-color-gray gui-bold">公司</text>
						</view>
						<view class="gui-form-item gui-border-b">
							<text class="gui-form-label"><text class="gui-color-red">*</text>信用代码</text>
							<view class="gui-form-body">
								<input type="text" class="gui-form-input" 
								v-model="formData.CreditCode" name="CreditCode" placeholder="请输入统一信息代码" />
							</view>
						</view>
						<view class="gui-margin-top-large">
							<text class="gui-text gui-color-gray"><text class="gui-color-red">*</text>营业执照</text>
						</view>
						<view class="gui-idcard-items gui-img-in gui-flex gui-rows gui-justify-content-center">
							<view class="gui-idcard-items-image" @tap="selectImg5">
								<gui-image :src="formData.BusinessLicense" :width="380"></gui-image>
							</view>
						</view>
					
						<view class="gui-form-item gui-border-b">
							<text class="gui-form-label">公司网址</text>
							<view class="gui-form-body">
								<input type="text" class="gui-form-input"
								v-model="formData.Website" name="Website" placeholder="请输入公司网址" />
							</view>
						</view>
						<view class="gui-form-item gui-border-b">
							<text class="gui-form-label">公司电话</text>
							<view class="gui-form-body">
								<input type="text" class="gui-form-input"
								v-model="formData.Telphone" name="Telphone" placeholder="请输入公司电话" />
							</view>
						</view>
						<view class="gui-form-item gui-border-b">
							<text class="gui-form-label">客服热线</text>
							<view class="gui-form-body">
								<input type="text" class="gui-form-input"
								v-model="formData.Hotline" name="Hotline" placeholder="请输入客服热线" />
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
								<view class="gui-margin-top">
									<text class="gui-text-small gui-color-gray">中心介绍</text>
								</view>
								<view>
									<textarea v-model="formData.Content" name="Content" value="" placeholder="说点什么..." 
									class="gui-textarea gui-bg-gray gui-border-box" style="width:690rpx;" />
								</view>
						
						
				</view>
				
				<!-- 第3步 -->
				<view class="gui-padding" v-if="step == 3">
					<view class="gui-margin-top-large">
						<text class="gui-h6 gui-color-gray gui-bold">授权人</text>
						<view class="gui-form-item float-right">
							<checkbox-group @change="checkChange" class="gui-check-item">
								<label for="">
									<checkbox color="#ffcb52"  :value='checkVal' :checked="checked"/>
									<text class="gui-h6 gui-color-gray ">授权人信息同法人</text></label>
							</checkbox-group>
					</view>
					</view>
						<view class="gui-form-item gui-margin-top gui-border-b">
						<text class="gui-form-label">姓名</text>
						<view class="gui-form-body">
							<input type="text" class="gui-form-input" 
							v-model="formData.Contact" name="Contact" placeholder="请输入授权人姓名"  />
						</view>
					</view>
					<view class="gui-form-item gui-border-b">
						<text class="gui-form-label">电话</text>
						<view class="gui-form-body">
							<input type="text" class="gui-form-input" 
							v-model="formData.ContactMobile" name="ContactMobile" placeholder="请输入授权人电话(手机号)" />
						</view>
					</view>
					<view class="gui-form-item gui-border-b">
						<text class="gui-form-label">邮箱地址</text>
						<view class="gui-form-body">
							<input type="text" class="gui-form-input" 
							v-model="formData.ContactEmail" name="ContactEmail" placeholder="请输入授权人邮箱地址" />
						</view>
					</view>
					<view class="gui-form-item gui-border-b">
						<text class="gui-form-label">身份证号</text>
						<view class="gui-form-body">
							<input type="text" class="gui-form-input" 
							v-model="formData.ContactCard" name="ContactCard" placeholder="请输入授权人身份证号码" />
						</view>
					</view>
					<view class="gui-margin-top-large">
						<text class="gui-text gui-color-gray">授权人身份证照片 ( 个人信息面 )</text>
					</view>
					<view class="gui-idcard-items gui-img-in gui-flex gui-rows gui-justify-content-center">
						<view class="gui-idcard-items-image" @tap="selectImg3">
							<gui-image :src="formData.ContactCradFront" :width="380"></gui-image>
						</view>
					</view>
					<view class="gui-margin-top-large">
						<text class="gui-text gui-color-gray">授权人身份证照片 ( 国徽图案面 )</text>
					</view>
					<view class="gui-idcard-items gui-img-in gui-flex gui-rows gui-justify-content-center">
						<view class="gui-idcard-items-image" @tap="selectImg4">
							<gui-image :src="formData.ContactCradBack" :width="380"></gui-image>
						</view>
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
			uploadText:'点击上传',
			// 表单数据记录
			formData: {
				//CategoryID:9,//上传表单类别id
				UserID:"",//用户id
				InstituteName:'',//	公司名称（简称
				FullName:'',//	公司全称
				Idcode:'',//	识别代码
				Description:'',//	描述
				Pic:'',//	图片
				LegalName:'',//	法人代表名称
				LegalCard:'',//	法人身份证号码
				LegalMobile:'',//	法人手机号码
				CreditCode:'',//	统一信用代码
				BusinessLicense:'/static/businessLicense.png',//	营业执照
				Website:'',//	公司网址
				Telphone:'',//	公司电话
				Hotline:'',//	客服热线
				Contact:'',//	授权人
				ContactCard:'',//	授权人身份证号码
				ContactMobile:'',//	授权人手机号码
				ContactEmail:'',//	授权人邮箱地址
				ProvinceID:'',//	省份ID
				CityID:'',//	城市ID
				DistrictID:'',//	区县ID
				Address:'',//	详细地址
				Content:'',//	中心介绍
				LegalCardFront : 'https://img-cdn-tc.dcloud.net.cn/uploads/article/20210107/e53bf48607dcf795ab78e419dc5cf432.png',
				LegalCardBack : 'https://img-cdn-tc.dcloud.net.cn/uploads/article/20210107/dac9c5c703b2a0bcd254a919d0da5632.png',
				ContactCradFront : 'https://img-cdn-tc.dcloud.net.cn/uploads/article/20210107/e53bf48607dcf795ab78e419dc5cf432.png',
				ContactCradBack : 'https://img-cdn-tc.dcloud.net.cn/uploads/article/20210107/dac9c5c703b2a0bcd254a919d0da5632.png',
			},
		}
	},
	onLoad: function() {
		try {
		    const uid = uni.getStorageSync('uid');
			this.formData.UserID=uid//传参uid
			this.formData.CategoryID='9'//传参cid
			// console.log(this.formData,"this.formData")
		} catch (e) {
		    // error
		}
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
			// 省市区
				open    : function(){this.$refs.graceAddressPicker.open();},
				confirm : function (e) {
					// 返回选中城市的编号及文本信息
					console.log(e);
					this.areas = e.names[0]+','+e.names[1]+','+e.names[2];
					this.formData.ProvinceID=e.codes[0]
					this.formData.CityID=e.codes[1]
					this.formData.DistrictID=e.codes[2]
				},
		  // 复制信息  
		  checkChange: function (e) {
				if(e.detail.value=='0'){
					console.log(e.detail.value,'this.checked = true');
					this.checked = true
					this.formData.Contact=this.formData.LegalName//姓名
					this.formData.ContactMobile=this.formData.LegalMobile//电话
					this.formData.ContactCard=this.formData.LegalCard//身份证号
					this.formData.ContactCradFront=this.formData.LegalCardFront//正面
					this.formData.ContactCradBack=this.formData.LegalCardBack//反面
				}else{
					this.checked = false
					console.log(e.detail.value,'this.checked = false');
					this.formData.Contact=''
					this.formData.ContactMobile=''
					this.formData.ContactCard='',//身份证号
					this.formData.ContactCradFront='',//正面
					this.formData.ContactCradBack=''//反面
				}
		  },
		
		  // idcard
		
		  selectImg1 : function() {
			  var that =this;
		  	uni.chooseImage({
		  		count:1,
				success: (chooseImageRes) => {
					// console.log(chooseImageRes);
					const tempFilePaths = chooseImageRes.tempFilePaths;
					//图片上传
					const uploadTask = uni.uploadFile({
						url : that.domain+'upload/path/institution',
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
						},
						fail(){
							uni.showToast({title:'网络通讯错误',icon:'none'});
						}
						
					});
				},
				fail(){
					uni.showToast({title:'未获取图片',icon:'none'});
				}
		  		// success:(res) => {this.formData.LegalCardFront = res.tempFilePaths[0];}
		  	})
		  },
		  selectImg2 : function() {
			  var that = this;
		  	uni.chooseImage({
		  		count:1,
				success: (chooseImageRes) => {
					// console.log(chooseImageRes);
					const tempFilePaths = chooseImageRes.tempFilePaths;
					//图片上传
					const uploadTask = uni.uploadFile({
						url : that.domain+'upload/path/institution',
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
		  	})
		  },
		  selectImg3 : function() {
			  var that = this;
		  	uni.chooseImage({
		  		count:1,
				success: (chooseImageRes) => {
					// console.log(chooseImageRes);
					const tempFilePaths = chooseImageRes.tempFilePaths;
					//图片上传
					const uploadTask = uni.uploadFile({
						url : that.domain+'upload/path/institution',
						filePath: tempFilePaths[0],
						name: 'file',
						success: function (uploadFileRes) {
							var data = JSON.parse(uploadFileRes.data);
							// console.log(data)
							if(data.errno === 0){
								that.formData.ContactCradFront = data.msg;
								uni.showToast({title:'上传成功',icon:'none'});
							}else{
								uni.showToast({title:data.msg,icon:'none'});
								return false;
							}
						}
					});
				}
		  	})
		  },
		  selectImg4 : function() {
			  var that = this;
		  	uni.chooseImage({
		  		count:1,
				success: (chooseImageRes) => {
					// console.log(chooseImageRes);
					const tempFilePaths = chooseImageRes.tempFilePaths;
					//图片上传
					const uploadTask = uni.uploadFile({
						url : that.domain+'upload/path/institution',
						filePath: tempFilePaths[0],
						name: 'file',
						success: function (uploadFileRes) {
							var data = JSON.parse(uploadFileRes.data);
							// console.log(data)
							if(data.errno === 0){
								that.formData.ContactCradBack = data.msg;
								uni.showToast({title:'上传成功',icon:'none'});
							}else{
								uni.showToast({title:data.msg,icon:'none'});
								return false;
							}
						}
					});
				}
		  	})
		  },
		  selectImg5(){
		  	var that = this;
		  	uni.chooseImage({
		  		count:1,
		  		success: (chooseImageRes) => {
		  			// console.log(chooseImageRes);
		  			const tempFilePaths = chooseImageRes.tempFilePaths;
		  			//图片上传
		  			const uploadTask = uni.uploadFile({
		  				url : that.domain+'upload/path/institution',
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
		upPic(){
			var that = this;
			uni.chooseImage({
				count:1,
				success: (chooseImageRes) => {
					// console.log(chooseImageRes);
					const tempFilePaths = chooseImageRes.tempFilePaths;
					//图片上传
					const uploadTask = uni.uploadFile({
								url : that.domain+'upload/path/institution',
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
		stepto : function(index){
			switch(index){
				case 1:
				break;
				case 2:
				 if(!this.formData.InstituteName||!this.formData.FullName||!this.formData.LegalName||!this.formData.LegalCard||!this.formData.LegalMobile||
				 this.formData.LegalCardFront == 'https://img-cdn-tc.dcloud.net.cn/uploads/article/20210107/e53bf48607dcf795ab78e419dc5cf432.png' ||
				 this.formData.LegalCardBack == 'https://img-cdn-tc.dcloud.net.cn/uploads/article/20210107/dac9c5c703b2a0bcd254a919d0da5632.png'
				 )
				{uni.showToast({title:"必填项请填写完整", icon:"none"});
				return}
				break;
				case 3:
				 if(!this.formData.CreditCode||!this.formData.BusinessLicense||!this.areas||!this.formData.Address) 
				{uni.showToast({title:"必填项请填写完整", icon:"none"});
				return} 
				break;
			}
			this.step = index;
		},
		// 提交
		submit:function () {
			var that=this;
			// 数据保持在 this.form data 内
			// 请根据实际需求进行数据校验及提交
			if(
			that.formData.ContactCradFront == 'https://img-cdn-tc.dcloud.net.cn/uploads/article/20210107/e53bf48607dcf795ab78e419dc5cf432.png' || 
			that.formData.ContactCradBack == 'https://img-cdn-tc.dcloud.net.cn/uploads/article/20210107/dac9c5c703b2a0bcd254a919d0da5632.png'
			){
				that.formData.ContactCradFront = ''
				that.formData.ContactCradBack = ''
			}
			console.log(that.formData);
			uni.request({
			    url: that.domain+'institute/add', //提交表单
				method:'post',
			    data: that.formData,
			      header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
			    success: (res) => {
					console.log(res,'res')
					if(res.data.errno=='0'){
						that.idcode=res.data.msg.Idcode;
						uni.setStorageSync('idcode',res.data.msg.Idcode);
						uni.setStorageSync('utype', '0');
						that.getiid()
						uni.showToast({ title: '提交成功!', icon : "none"});
					}
					
				
			    },
			});
			
		},
		getiid(){
			uni.request({
				url: this.domain+'institute/code', //获取机构id
				method:'post',
				data: {
				code : this.idcode
				},
				  header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
				success: (res) => {
					if(res.data.errno=='0'){
						this.iid=res.data.msg.ID;
						try {
							uni.setStorageSync('iid',res.data.msg.ID)
						} catch (e) {
							// error
						};
						uni.switchTab({
							url:'../user/index',//传参：0为机构
						});
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
					
			    },
				fail() {
					uni.showToast({ title: '提交失败!', icon : "none"});
				}
			})
		},
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