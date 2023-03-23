<template>
	<view class="gui-padding">
		<view class="gui-margin-top-large"></view>
		<form @submit="submit">
			<!-- 教室 每教室多少人 连考是否在一起 -->
			<view>
				<text class="gui-h6 gui-color-gray gui-bold">上传项目</text>
			</view>
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label">教室</text>
				<view class="gui-form-body">
					<input type="text" class="gui-form-input" 
					v-model="formData.name1" name="name1" placeholder="请输入教室" />
				</view>
			</view>
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label">人数</text>
				<view class="gui-form-body">
					<input type="text" class="gui-form-input" 
					v-model="formData.name2" name="name2" @input="inputting" placeholder="请输入每教室多少人" />
				</view>
				<text class="gui-form-icon gui-icons gui-text-center gui-color-gray" 
				v-if="formData.name2.length >= 1" @click="clearName2">&#xe78a;</text>
			</view>
		
			<view class="gui-form-item gui-border-b">
				<text class="gui-form-label">连考</text>
				<view class="gui-form-body ">
					<radio-group name="name8" class=" gui-flex gui-rows">
						<label class="gui-check-item gui-check-item-y">
							<radio color="#008AFF" value="yes"></radio>
							<text class="gui-text gui-primary-color">是</text>
						</label>
						<label class="gui-check-item gui-check-item-y">
							<radio color="#008AFF" value="no"></radio>
							<text class="gui-text gui-primary-color">否</text>
						</label>
					</radio-group>
				</view>
			</view>
		
			
			
			<view class="gui-margin-top-large gui-flex gui-rows gui-nowrap gui-justify-content-end">
				<button type="default" class="gui-button gui-bg-orange1" 
				style="width:200rpx;" formType="submit">
					<text class="gui-icons gui-color-white gui-button-text"> 提交</text>
				</button>
			</view>
			<view style="height:80rpx;"></view>
		</form>
	</view>
</template>
<script>
export default {
	data() {
		return {
			// 表单数据存储
			formData : {
				name1 : '',
				name2 : '',
				name3 : '',
				name4 : '',
			},
			// 密码可视 类型切换
			isPwd  : true,
			// picker 
			gender : ['请选择性别', '男', '女'],
			genderIndex : 0
		}
	},
	methods: {
		// 清空输入框的值
		clearName2 : function () {
			console.log(11);
			this.formData.name2 = '';
		},
		// 监听输入框输入事件
		inputting : function (e) {
			var name2Val = e.detail.value;
			console.log(name2Val);
		},
		// 密码可视 类型切换
		changePwdType : function(){
			this.isPwd = !this.isPwd;
		},
		// picker 切换
		pickerChange : function (e) {
			console.log(e);
			this.genderIndex    = e.detail.value;
			this.formData.name4 = this.gender[this.genderIndex];
		},
		// switch 开关
		switchChange : function (e) {
			this.formData.name6 = e.detail.value;
		},
		// 表单提交
		submit : function (e) {
			// 部分能够获得的表单数据 在 e 对象保存
			// 不支持表单直接获取的数据通过事件记录
			// 最终整理获得完整的表单记录
			var fromData   = e.detail.value;
			fromData.name4 = this.formData.name4;
			console.log(fromData);
			uni.redirectTo({
			    url: '../uplist/uplist'
			});
		}
	}
}
</script>
<style scoped>
.gui-text-small{line-height:50rpx;}
</style>