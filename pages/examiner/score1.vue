<template>
	<view class="gui-padding">
		<view class="gui-form-item gui-border-b">
			<view class="gui-margin gui-h5">001场次</view>
			<view class="gui-margin"> </view>
			<view class="gui-margin gui-h5">考生人数36</view>/
			<view class="gui-margin gui-h5">已考人数33</view>
		</view>
		
		
		<view class="gui-form-item gui-border-b gui-flex gui-space-between">
			<text class="gui-margin gui-h3">001场次</text>
			<view class="gui-margin gui-h5">每场考试人数<input class="gui-box gui-inline-block " style="transform: translateY(10rpx);"  v-model="perNum"></input><text class="gui-box  ">队形</text></view>
		</view>
		
		<view class="gui-form-item  gui-flex  gui-margin  ">
			<picker mode="selector" :range="Gender" @change="pickerChangeGender">
				<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
					<text class="gui-text gui-h5  gui-bg-orange1  gui-border gui-color-white" style="border-radius: 10rpx 0 0  10rpx; padding: 7rpx;">{{Gender[GenderIndex]}}</text>
					<text class="gui-form-icon gui-icons gui-text-center gui-h5  gui-bg-orange1  gui-color-white" style="border-radius:0 10rpx 10rpx  0 ;  ">&#xe633;</text>
				</view>
			</picker>
		</view>
		<view class="gui-flex gui-wrap">
			
			<view class="gui-flex gui-columns gui-align-items-center">
				<image src="/static/id/teacher.png" mode="" class="gui-head-img gui-margin gui-border gui-border-radius-cicle gui-bg-orange1"></image>
				<text class="gui-h5">程丽腾</text>
				<view class="" @tap="showKeyboard">
					<input type="text" class="gui-form-input  gui-text-center gui-mini" :disabled="true" 
					v-model="numberVal1" name="name1" placeholder="未评分" />
				</view>
			</view>
			<view class="gui-flex gui-columns gui-align-items-center">
					<image src="/static/id/teacher.png" mode="" class="gui-head-img gui-margin gui-border gui-border-radius-cicle gui-bg-orange1"></image>
					<text class="gui-h5">程丽腾</text>
					<input type="number" v-model="numberVal2" name="name2" maxlength="2" placeholder="未评分" class="gui-form-input gui-text-center gui-mini"/>
					<!-- <view class="" @tap="showKeyboard">
						<input type="text" class="gui-form-input gui-text-center gui-mini" :disabled="true" 
						v-model="numberVal1" name="name1" placeholder="未评分" />
				</view> -->
			</view>
			<view class="gui-flex gui-columns gui-align-items-center">
					<image src="/static/id/teacher.png" mode="" class="gui-head-img gui-margin gui-border gui-border-radius-cicle gui-bg-orange1"></image>
					<text class="gui-h5">程丽腾</text>
					<view class="" @tap="showKeyboard">
						<input type="text" class="gui-form-input gui-text-center gui-mini" :disabled="true" 
						v-model="numberVal1" name="name1" placeholder="未评分" />
				</view>
			</view>
			<view class="gui-flex gui-columns gui-align-items-center">
					<image src="/static/id/teacher.png" mode="" class="gui-head-img gui-margin gui-border gui-border-radius-cicle gui-bg-orange1"></image>
					<text class="gui-h5">程丽腾</text>
					<view class="" @tap="showKeyboard">
						<input type="text" class="gui-form-input gui-text-center gui-mini" :disabled="true" 
						v-model="numberVal1" name="name1" placeholder="未评分" />
				</view>
			</view>
			<view class="gui-flex gui-columns gui-align-items-center">
					<image src="/static/id/teacher.png" mode="" class="gui-head-img gui-margin gui-border gui-border-radius-cicle gui-bg-orange1"></image>
					<text class="gui-h5">程丽腾</text>
					<view class="" >
						<input type="text" class="gui-form-input gui-text-center gui-mini" :disabled="true" 
						v-model="numberVal1" name="name1" placeholder="未评分" />
				</view>
			</view>	<view class="gui-flex gui-columns gui-align-items-center">
					<image src="/static/id/teacher.png" mode="" class="gui-head-img gui-margin gui-border gui-border-radius-cicle gui-bg-orange1"></image>
					<text class="gui-h5">程丽腾</text>
					<view class="" >
						<input type="text" class="gui-form-input gui-text-center gui-mini" :disabled="true" 
						v-model="numberVal1" name="name1" placeholder="未评分" />
				</view>
			</view>	<view class="gui-flex gui-columns gui-align-items-center">
					<image src="/static/id/teacher.png" mode="" class="gui-head-img gui-margin gui-border gui-border-radius-cicle gui-bg-orange1"></image>
					<text class="gui-h5">程丽腾</text>
					<view class="" >
						<input type="text" class="gui-form-input gui-text-center gui-mini" :disabled="true" 
						v-model="numberVal1" name="name1" placeholder="未评分" />
				</view>
			</view>	<view class="gui-flex gui-columns gui-align-items-center">
					<image src="/static/id/teacher.png" mode="" class="gui-head-img gui-margin gui-border gui-border-radius-cicle gui-bg-orange1"></image>
					<text class="gui-h5">程丽腾</text>
					<view class="" >
						<input type="text" class="gui-form-input gui-text-center gui-mini" :disabled="true" 
						v-model="numberVal1" name="name1" placeholder="未评分" />
				</view>
			</view>
		</view>
		<view style="margin-top:80rpx;" >
			<!-- btn 属性@tap="getUserProfile" -->
			<button type="default" @tap="opentop" class="gui-button gui-bg-orange1" formType="submit" 
			style="border-radius:40rpx;">
				<text class="gui-color-white gui-button-text">提交评分</text>
			</button>
		</view>
			
			<!-- 弹框 居中弹出 -->
			<gui-modal ref="guimodal1" 
					title="提交分数">
						<view slot="content" class="gui-padding gui-bg-gray">
							<text class="gui-block-text gui-text-center gui-text gui-color-gray" 
							style="line-height:100rpx; padding:10rpx;">确定提交分数
							提交后将<text class="gui-color-red">无法修改</text></text>
						</view>
						<!-- 利用 flex 布局 可以放置多个自定义按钮哦  -->
						<view slot="btns" class="gui-flex gui-rows gui-space-between">
							<view class="modal-btns gui-flex1" style="margin-right:80rpx;">
								<text class="modal-btns gui-color-gray" @tap="closetop">取消</text>
							</view>
							<view class="modal-btns gui-flex1" style="margin-left:80rpx;">
								<text class="modal-btns gui-color-red" @tap="confirmtop">确认</text>
							</view>
						</view>
					</gui-modal>				 
			<!-- 键盘 -->
				<gui-number-keyboard ref="guink" 
				@keyboardDone="keyboardDone" 
				@keyboardInput="keyboardInput" 
				@keyboardDelete="keyboardDelete"></gui-number-keyboard>
			
	</view>
</template>

	<script>
	export default {
		data() {
			return {
				numberVal1  : '',
				numberVal2:"",
				perNum:'36',
				Gender : ['考试等级', '一级考试', '二级考试', '三级考试', '四级考试', '五级考试', '六级考试', '七级考试', '八级考试'],//piker：
				GenderIndex : 0,//pickerindex
			}
		},
		
		methods: {
			// picker 切换：性别
			pickerChangeGender : function (e) {
				console.log(e);
				this.GenderIndex    = e.detail.value;
				this.formData.Gender = this.Gender[this.GenderIndex];
			},	
		
			// 遮罩
				opentop : function () {
						this.$refs.guimodal1.open();
					},
					closetop : function () {
						this.$refs.guimodal1.close();
					},
					confirmtop : function () {
						// 客户点击确认按钮后的逻辑请在此处实现
						this.$refs.guimodal1.close();
					},
			// 第1个键盘
			showKeyboard : function () {
				//打开数字键盘
				this.$refs.guink.open();
			},
			// 监听输入
			keyboardInput : function(e){
				this.numberVal1 = this.numberVal1 + '' + e;
			},
			// 监听删除
			keyboardDelete : function(){
				this.numberVal1 = this.numberVal1.substring(0, this.numberVal1.length - 1);
			},
			// 完成事件
			keyboardDone : function(){
				this.$refs.guink.close();
			},
		
		}
	}
</script>

<style>
	.gui-box{
		width: 40rpx;
		border: 2rpx solid #ccc;
		padding: 0 3rpx;
		margin:0 10rpx;
	}
.modal-btns{line-height:88rpx; font-size:26rpx; text-align:center; width:200rpx;}
</style>
