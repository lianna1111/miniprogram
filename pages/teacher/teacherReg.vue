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
					
				
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>真实姓名</text>
					<view class="gui-form-body">
						<input type="text" class="gui-form-input" 
						v-model="formData.TeacherName" name="TeacherName" placeholder="请输入教师真实姓名" />
					</view>
				</view>
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>教师编号</text>
					<view class="gui-form-body">
						<input type="text" class="gui-form-input" 
						v-model="formData.TeacherCode" name="TeacherCode" placeholder="请输入教师编号" />
					</view>
				</view>
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>教师头像</text>
					<view class="gui-form-body" @tap="upPic">
						<view class="gui-flex gui-rows gui-nowrap">
							<view class="gui-text-small gui-color-gray" v-if="formData.Headimg">
								<gui-image :src="formData.Headimg" :width="100" :height="100"></gui-image>
							</view>
							<view class="gui-margin gui-text-small gui-color-gray gui-flex1">
								<text class="gui-text gui-h5 gui-color-blue">{{uploadText}}</text>
							</view>
						</view>
					</view>
					<!-- <view class="gui-form-body">
						<input type="text" class="gui-form-input" 
						v-model="formData.Headimg" name="Headimg" placeholder="请输入教师头像" />
					</view> -->
				</view>
				 <view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>手机号码</text>
					<view class="gui-form-body">
						<input type="text" class="gui-form-input" 
						v-model="formData.Mobile" name="Mobile" placeholder="请输入教师手机号码" />
					</view>
				</view> 
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>性别</text>
					<view class="gui-form-body">
						<picker mode="selector" :range="Gender" @change="pickerChangeGender">
							<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
								<text class="gui-text">{{Gender[GenderIndex]}}</text>
								<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
							</view>
						</picker>
					</view>				
				</view>
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>年龄</text>
					<view class="gui-form-body">
						<input type="number" class="gui-form-input" 
						v-model="formData.Age" name="Age" placeholder="请输入教师年龄" />
					</view>
				</view>
				
				
				
				
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label">身高</text>
					<view class="gui-form-body">
						<input type="number" class="gui-form-input" 
						v-model="formData.Height" name="Height" placeholder="请输入教师身高(单位:mm)" />
					</view>
				</view>
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label">体重</text>
					<view class="gui-form-body">
						<input type="number" class="gui-form-input" 
						v-model="formData.Weight" name="Weight" placeholder="请输入教师体重(单位:g)" />
					</view>
				</view>
				
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label">血型</text>
					<view class="gui-form-body">
						<picker mode="selector" :range="Blood" @change="pickerChangeBlood">
							<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
								<text class="gui-text">{{Blood[BloodIndex]}}</text>
								<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
							</view>
						</picker>
					</view>				
				</view>
				<view class="gui-form-item gui-border-b" @tap="open">
					<text class="gui-form-label"><text class="gui-color-red">*</text>籍贯地址</text>
							<view class="gui-form-body">
								<input type="text" class="gui-form-input" :value="areas" name="areas" placeholder="请选择" />
							</view>
							<text class="gui-icons gui-form-icon gui-color-gray gui-text-right">&#xe603;</text>
						</view>
						<gui-area-picker ref="graceAddressPicker" @confirm="confirm" :level="3" cancelText="关闭"></gui-area-picker>
						
									
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label"><text class="gui-color-red">*</text>籍贯地址</text>
					<view class="gui-form-body">
						<input type="text" class="gui-form-input"
						v-model="formData.NativeAddress" name="NativeAddress" placeholder="请输入详细籍贯地址(具体到门牌号)" />
					</view>
				</view>
				
				<view class="gui-form-item gui-border-b" @tap="open1">
					<text class="gui-form-label">现居地址</text>
							<view class="gui-form-body">
								<input type="text" class="gui-form-input" :value="areas1" name="areas1" placeholder="请选择" />
							</view>
							<text class="gui-icons gui-form-icon gui-color-gray gui-text-right">&#xe603;</text>
						</view>
						<gui-area-picker ref="graceAddressPicker1" @confirm="confirm1" :level="3" cancelText="关闭"></gui-area-picker>
						
				<view class="gui-form-item gui-border-b">
					<text class="gui-form-label">现居地址</text>
					<view class="gui-form-body">
						<input type="text" class="gui-form-input"
						v-model="formData.LocationAddress" name="LocationAddress" placeholder="请输入详细现居地址(具体到门牌号)" />
					</view>
				</view>
				
					
					
				</view>
				<!-- 第2步 -->
				<view class="gui-padding" v-if="step == 2">
					 
					
					
					<view class="gui-form-item gui-border-b gui-margin-top-large">
						<text class="gui-form-label"><text class="gui-color-red">*</text>身份证号</text>
						<view class="gui-form-body">
							<input type="text" class="gui-form-input"  @blur="birthDay" maxlength="18"
							v-model="formData.Idcard" name="Idcard" placeholder="请输入身份证号码" />
						</view>
					</view>
					
					<view class="gui-form-item gui-border-b ">
										<text class="gui-form-label">民族</text>
										<view class="gui-form-body">
											<input type="text" class="gui-form-input"  
											v-model="formData.Nation" name="Nation" placeholder="请输入民族" />
										</view>
									</view>
										
					<view class="gui-form-item gui-border-b">
						<text class="gui-form-label"><text class="gui-color-red">*</text>公/农历</text>
						<view class="gui-form-body">
							<picker mode="selector" :range="Cale" @change="pickerChangeCale">
								<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
									<text class="gui-text">{{Cale[CaleIndex]}}</text>
									<text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
								</view>
							</picker>
						</view>				
					</view>
					
					<view class="gui-form-item gui-border-b">
						<text class="gui-form-label"><text class="gui-color-red">*</text>出生年</text>
						<view class="gui-form-body">
							<input type="text" class="gui-form-input" disabled
							v-model="formData.BirthYear" name="BirthYear" placeholder="请输入出生年份" />
						</view>
					</view>
					<view class="gui-form-item gui-border-b">
						<text class="gui-form-label"><text class="gui-color-red">*</text>出生月</text>
						<view class="gui-form-body">
							<input type="text" class="gui-form-input" disabled
							v-model="formData.BirthMonth" name="BirthMonth" placeholder="请输入出生月份" />
						</view>
					</view>
					<view class="gui-form-item gui-border-b">
						<text class="gui-form-label"><text class="gui-color-red">*</text>出生日</text>
						<view class="gui-form-body">
							<input type="text" class="gui-form-input" disabled
							v-model="formData.BirthDay" name="BirthDay" placeholder="请输入出生日期" />
						</view>
					</view>
					<view class="gui-form-item gui-border-b">
						<text class="gui-form-label">出生时</text>
						<view class="gui-form-body">
							<input type="number" class="gui-form-input"
							v-model="formData.BirthHour" name="BirthHour" placeholder="请输入出生时" />
						</view>
					</view>
					<view class="gui-form-item gui-border-b">
						<text class="gui-form-label">出生分</text>
						<view class="gui-form-body">
							<input type="number" class="gui-form-input"
							v-model="formData.BirthMinute" name="BirthMinute" placeholder="请输入出生分" />
						</view>
					</view>
				
						<view class="gui-margin-top-large">
							<text class="gui-text gui-color-gray"><text class="gui-color-red">*</text>身份证照片 ( 个人信息面 )</text>
						</view>
						<view class="gui-idcard-items gui-img-in gui-flex gui-rows gui-justify-content-center">
							<view class="gui-idcard-items-image" @tap="selectImg1">
								<gui-image :src="formData.IdcardFont" :width="380"></gui-image>
							</view>
						</view>
						<view class="gui-margin-top-large">
							<text class="gui-text gui-color-gray"><text class="gui-color-red">*</text>身份证照片 ( 国徽图案面 )</text>
						</view>
						<view class="gui-idcard-items gui-img-in gui-flex gui-rows gui-justify-content-center">
							<view class="gui-idcard-items-image" @tap="selectImg2">
								<gui-image :src="formData.IdcardBack" :width="380"></gui-image>
							</view>
						</view>
						
						
				
								
						
						
				</view>
				
				<!-- 第3步 -->
				<view class="gui-padding" v-if="step == 3">
					
						<view class="gui-margin-top-large">
							<text class="gui-h6 gui-color-gray gui-bold">资格证</text>
						</view>
						
						<view class="gui-form-item gui-border-b gui-margin-top-large">
							<text class="gui-form-label"><text class="gui-color-red">*</text>资格证号</text>
							<view class="gui-form-body">
								<input type="text" class="gui-form-input"  @blur="birthDay" maxlength="18"
								v-model="formData.CertificationID" name="TeacherNumber" placeholder="请输入资格证号码" />
							</view>
						</view>
						<view class="gui-margin-top-large">
							<text class="gui-text gui-color-gray"><text class="gui-color-red">*</text>资格证照片 ( 个人信息面 )</text>
						</view>
						<view class="gui-idcard-items gui-img-in gui-flex gui-rows gui-justify-content-center">
							<view class="gui-idcard-items-image" @tap="selectImg3">
								<gui-image :src="formData.Certification" :width="380"></gui-image>
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
			areas1   : '',//省市区
			uploadText:'点击上传',
			pageLoading: true,// 全屏 loading
			mainHeight: 200,// 核心区域高度 
			step: 1,// 步骤
			Gender : ['请选择教师性别', '女', '男'],//piker：性别
			GenderIndex : 0,//pickerindex
			Blood : ['请选择教师血型', 'A', 'B', 'AB', 'O'],//piker：血型
			BloodIndex : 0,//pickerindex
			Cale : ['请选择公历/农历', '公历', '农历'],//piker：性别
			CaleIndex : 0,//pickerindex
			 
			// 表单数据记录
			formData: {
				GradeID:'70',
				TeacherName       :"",
				Headimg        :"",
				Nation:'',
				Mobile         :"",
				Gender         :"",
				Age            :"",
				Height         :"",
				Weight         :"",
				Blood          :"",
				Idcard         :"",
				IsLunar        :"",
				BirthYear      :"",
				BirthMonth     :"",
				BirthDay       :"",
				BirthHour      :"",
				BirthMinute    :"",
				IdcardFont     :"https://img-cdn-tc.dcloud.net.cn/uploads/article/20210107/e53bf48607dcf795ab78e419dc5cf432.png",
				IdcardBack     :"https://img-cdn-tc.dcloud.net.cn/uploads/article/20210107/dac9c5c703b2a0bcd254a919d0da5632.png",
				NativePID      :"",
				NativeCID      :"",
				NativeDID      :"",
				NativeAddress  :"",
				LocationPID    :"",
				LocationCID    :"",
				LocationDID    :"",
				LocationAddress:"",
				Certification:'',
				Certification:''
				
					},
		}
	},
	onLoad: function() {
		
		try {
		    const InstituteID = uni.getStorageSync('iid');
			const CampusID = uni.getStorageSync('cid');
			const UserID = uni.getStorageSync('uid');
		   console.log(UserID)
				this.formData.InstituteID=InstituteID;
				this.formData.UserID=UserID;
				this.formData.CampusID=CampusID
		  
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
		// picker 切换：性别
		pickerChangeGender : function (e) {
			console.log(e);
			this.GenderIndex    = e.detail.value;
			this.formData.Gender = this.Gender[this.GenderIndex];
		},		
		// picker 切换：血型
		pickerChangeBlood : function (e) {
			console.log(e);
			this.BloodIndex    = e.detail.value;
			this.formData.Blood = this.Blood[this.BloodIndex];
		},		
		// picker 切换：农历阳历
		pickerChangeCale : function (e) {
			console.log(e);
			this.CaleIndex    = e.detail.value;
			this.formData.IsLunar = this.Cale[this.CaleIndex];
		},	
					
		// 省市区
		open    : function(){this.$refs.graceAddressPicker.open();},
		confirm : function (e) {
			// 返回选中城市的编号及文本信息
			console.log(e);
			this.areas = e.names[0]+','+e.names[1]+','+e.names[2];
			this.formData.NativePID=e.codes[0]
			this.formData.NativeCID=e.codes[1]
			this.formData.NativeDID=e.codes[2]
		},		
		// 省市区
		open1    : function(){this.$refs.graceAddressPicker1.open();},
		confirm1 : function (e) {
			// 返回选中城市的编号及文本信息
			console.log(e);
			this.areas1 = e.names[0]+','+e.names[1]+','+e.names[2];
			this.formData.LocationPID=e.codes[0]
			this.formData.LocationCID=e.codes[1]
			this.formData.LocationDID=e.codes[2]
		},			
		  
		 //生日
		 birthDay(){
			this.formData.BirthYear=this.formData.Idcard.slice(6,10)
			this.formData.BirthMonth=this.formData.Idcard.slice(10,12)
			this.formData.BirthDay=this.formData.Idcard.slice(12,14)
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
		 				url : that.domain+'upload/path/teacher',
		 				filePath: tempFilePaths[0],
		 				name: 'file',
		 				success: function (uploadFileRes) {
		 					var data = JSON.parse(uploadFileRes.data);
		 					if(data.errno === 0){
		 						that.formData.Headimg = data.msg;
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
						url : that.domain+'upload/path/campus',
						filePath: tempFilePaths[0],
						name: 'file',
						success: function (uploadFileRes) {
							var data = JSON.parse(uploadFileRes.data);
							// console.log(data)
							if(data.errno === 0){
								that.formData.IdcardFont = data.msg;
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
						url : that.domain+'upload/path/campus',
						filePath: tempFilePaths[0],
						name: 'file',
						success: function (uploadFileRes) {
							var data = JSON.parse(uploadFileRes.data);
							// console.log(data)
							if(data.errno === 0){
								that.formData.IdcardBack = data.msg;
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
						url : that.domain+'upload/path/campus',
						filePath: tempFilePaths[0],
						name: 'file',
						success: function (uploadFileRes) {
							var data = JSON.parse(uploadFileRes.data);
							// console.log(data)
							if(data.errno === 0){
								that.formData.Certification = data.msg;
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
		
		//验证
		stepto : function(index){
			console.log(this.formData,"top")
			switch(index){
				case 1:
				// 第1步数据验证这里编写
				// 不满足使用 return 返回即可
				break;
				case 2:
				   if(!this.formData.TeacherName||!this.formData.Headimg||!this.formData.Gender||!this.formData.Age
				   ||!this.areas||!this.formData.NativeAddress)
				  {uni.showToast({title:"必填项请填写完整", icon:"none"});
				   return}
				// 第2步数据验证这里编写
				// 不满足使用 return 返回即可
				break;
				case 3:
				  if(!this.formData.Idcard||!this.formData.IsLunar||!this.formData.Mobile||this.formData.IdcardFont == 'https://img-cdn-tc.dcloud.net.cn/uploads/article/20210107/e53bf48607dcf795ab78e419dc5cf432.png' ||
				   this.formData.IdcardBack == 'https://img-cdn-tc.dcloud.net.cn/uploads/article/20210107/dac9c5c703b2a0bcd254a919d0da5632.png'
				   ) 
				  {uni.showToast({title:"必填项请填写完整", icon:"none"});
				  return}
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
			if(!this.formData.CertificationID||!this.formData.Certification)
			{uni.showToast({title:"必填项请填写完整", icon:"none"});
			return}
			else{
				//性别
				if(this.formData.Gender=="女"){this.formData.Gender='1'}
				else if(this.formData.Gender=="男"){this.formData.Gender='2'}
				else {uni.showToast({title:"请选择教师性别", icon:"none"});}
				//血型
				if(this.formData.Blood=="A"){this.formData.Blood='1'}
				else if(this.formData.Blood=="B"){this.formData.Blood='2'}
				else if(this.formData.Blood=="AB"){this.formData.Blood='3'}
				else if(this.formData.Blood=="O"){this.formData.Blood='4'}
				else{this.formData.Blood='0'}
				//公历农历
				if(this.formData.IsLunar=="公历"){this.formData.IsLunar='0'}
				else if(this.formData.IsLunar=="农历"){this.formData.IsLunar='1'}
				else {uni.showToast({title:"请选择生日公/农历", icon:"none"});}
				if(this.formData.Height==""){this.formData.Height='0'}
				if(this.formData.Weight==""){this.formData.Weight='0'}
				if(this.formData.BirthHour==""){this.formData.BirthHour='0'}
				if(this.formData.BirthMinute==""){this.formData.BirthMinute='0'}
				if(this.formData.LocationCID==""){this.formData.LocationCID='0'}
				if(this.formData.LocationPID==""){this.formData.LocationPID='0'}
				if(this.formData.LocationDID==""){this.formData.LocationDID='0'}
			console.log(this.formData,"submit");
			uni.request({
			    url: this.domain+'campus/add_teacher', //提交表单
				method:'post',
			    data: this.formData,
			      header:{token:'alaskdflasdf','content-type': 'application/x-www-form-urlencoded'},
			    success: (res) => {
					if(res.data.errno==0){
					uni.showToast({ title: '提交成功!', icon : "none"});
					console.log(res,"res")
				uni.redirectTo({
					
			     url: './teacher?campusID='+this.formData.CampusID
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