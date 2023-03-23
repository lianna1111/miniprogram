<template>
	<gui-popup 
	ref="guipopupforcarnumber" 
	width="750rpx" 
	position="bottom" 
	:canCloseByShade="true">
		<view 
		@tap.stop.prevent="stopfun" 
		class="gui-bg-white">
			<view 
			class="gui-flex gui-rows gui-space-between gui-align-items-center"
			style="padding:20rpx;">
				<!-- 类型 -->
				<view style="width:320rpx;">
				<!-- <gui-segmented-control 
				:items="['普通车牌','新能源牌']" 
				:current="carType" 
				@change="changeType"></gui-segmented-control> -->
				</view>
				<text class="gui-car-number-submit gui-block-text gui-color-blue" 
				@tap="confirm">确定</text>
			</view>
			<!-- 车牌展示 -->
		<view class="gui-flex gui-space-between">  
			<view class="gui-icons gui-padding" style="color: transparent;">&#xe623;</view><!--占位 -->
			<view 
			class="gui-flex gui-rows gui-nowrap gui-justify-content-center" 
			style=" padding-bottom:20rpx;">
			
				<text class="gui-car-number-item gui-block-text" 
				v-for="(item, idx) in carNumberArray" :key="idx" 
				@tap="numberTap(idx)">{{item}}</text>
			</view>
			<view @tap="deleteNumber">
				<text class=" gui-block-text gui-icons gui-padding">&#xe623;</text>
			</view>
		</view>
			<view class="gui-bg-gray" 
			style="padding:15rpx;">
				
				<!-- 号码键盘 -->
				<view class="gui-flex gui-rows gui-wrap  gui-justify-content-center" 
				>
					<view class="gui-car-number-key" 
					hover-class="gui-kd-tap" 
					:hover-stay-time="50" 
					v-for="(item, idx) in keyWords" 
					:key="idx" 
					@tap="keyTap(item)">
						<text class="gui-car-number-key-txt gui-block-text">{{item}}</text>
					</view>
					
				</view>
			</view>
			<gui-iphone-bottom></gui-iphone-bottom>
		</view>
	</gui-popup>
</template>
<script>
export default{
	name  : "number-keyboard",
	props : {
		items           : {type : Number,   default : function(){return [];}},
	},
	data() {
		return {
			carNumber      : '',
			carNumberArray : [],
			carType        : '',
			inputIndex     : 0,
			keyWords       : [],
			errorshow      : false,
		}
	},
	created : function(){
		this.carType = this.items;
	},
	watch : {
		items : function(val){ this.carType = val;}
	},
	mounted:function(){
		this.showNumber();
		this.keyWordsNumber();
	},
	methods:{
		showError  : function () {
			this.errorshow = true;
			setTimeout(()=>{this.errorshow = false},2000)
		},
		confirm    : function () {
			let carNumberLength = this.carType == 0 ? 2 : 1;
			if(this.carNumber.length < carNumberLength){
				this.showError();
				return ;
			}
			this.$emit('confirm', this.carNumber);
			this.$refs.guipopupforcarnumber.close();
		},
		numberTap  : function (idx) {
			this.inputIndex = idx
		},
		
		keyTap     : function(key){
			let carNumberLength = this.carType == 0 ? 2 : 1;
			if(this.inputIndex >= carNumberLength){return ;}
			this.carNumberArray[this.inputIndex] = key;
			this.carNumber = this.carNumberArray.join('');
			this.showNumber();
		},
		keyWordsNumber(){//0:优秀-不合格,1:1-5,2:1-10
			if(this.carType=='0'){this.keyWords=['优秀','良好','合格']}//优秀-不合格
			else if(this.carType=='1'){this.keyWords=[1,2,3,4,5]}//1-5
			else if(this.carType=='2'){this.keyWords=[1,2,3,4,5,6,7,8,9,10]}//1-10
		},
		showNumber : function(){
			let carNumberArray     = this.carNumber.split('');
			let carNumberLength    = this.carType == 0 ? 2 : 1;
			let carNumberArrLength = carNumberArray.length;
			this.carNumberArray    = [];
			var inputIndex        = 0;
			for(let i = 0; i < carNumberLength; i++){
				if(carNumberArrLength > i){
					this.carNumberArray[i] = carNumberArray[i];
					inputIndex++;
				}else{
					this.carNumberArray[i] = '';
				}
			}
			this.carNumber  = this.carNumberArray.join('');
			this.inputIndex = inputIndex;
			console.log(this.carNumber)
		},
		changeType : function(e){
			this.carType = e;
			this.showNumber();
		},
		setType : function(carType){
			this.carType   = carType;
			this.showNumber();
		},
		setVal  : function(carNumber){
			this.carNumber = carNumber;
			this.showNumber();
		},
		deleteNumber : function(){
			if(this.inputIndex < 0){return ;}
			this.carNumberArray.splice((this.inputIndex -1), 1, '');
			this.carNumber = this.carNumberArray.join('');
			this.showNumber();
		},
		open : function(){
			this.$refs.guipopupforcarnumber.open();
		},
		stopfun : function(e){
			e.stopPropagation();
			return ;
		}
	}
}
</script>
<style scoped>
.gui-car-number-item{width:70rpx; height:70rpx; font-size:30rpx; line-height:70rpx; text-align:center; border:1px solid #CECECE; border-radius:6rpx; margin-right:15rpx; font-weight:700;}
.gui-car-number-key{width:120rpx; height:120rpx; border:1px solid #CECECE; border-radius:6rpx; margin:5rpx;}
.gui-car-number-key-txt{font-size:35rpx; line-height:120rpx; text-align:center;}
.gui-car-number-submit{width:100rpx; line-height:60rpx; text-align:center; font-size:30rpx;}
.gui-bg-blue{color:#FFFFFF; border-color: #008AFF;}
/* #ifndef APP-NVUE */
@keyframes gui-a-shade{0%{opacity:1;} 25%{opacity:0.6;} 50%{opacity:0.6;} 75%{opacity:1;} 100%{opacity:1;}}
.gui-a-shade{animation:gui-a-shade 1.5s ease infinite;}
.gui-kd-tap{color:#FFFFFF; background-color:#008AFF; border-color:#008AFF;}
/* #endif */
/* #ifdef APP-NVUE */
.gui-kd-tap{color:#FFFFFF; background-color:#CECECE; border-color:#CECECE;}
/* #endif */
</style>
