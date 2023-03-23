<template>
	
	<view class="gui-select-list gui-flex gui-wrap">
		<view v-for="(item, index) in dataIn" 
		:key="index" class="gui-select-list-item gui-flex gui-column gui-align-items-center  gui-wrap" 
		:data-index="index" @tap.stop="choose" >
		<view class="" v-if="checkedType == 'ring' && !item.checked">
			<!-- <image class="gui-list-image border-gray-10" :src="item.Title"></image> -->
			<view class="gui-lr-margin border-gray-10 time-box">
				<!-- <view class="gui-list-title"> -->
					<text class="gui-list-title-text gui-primary-color">{{item.Title}}</text>
					<!-- </view> -->
				<text class="gui-list-body-desc gui-color-gray">{{item.StartTime}}-{{item.EndTime}}</text>
			</view>
		</view>
		<view class="" v-if="checkedType == 'ring' && item.checked">
			<!-- <image class="gui-list-image border-orange-10" :src="item.Title"></image> -->
			<view class="gui-lr-margin border-orange-10 time-box">
				<!-- <view class="gui-list-title"> -->
					<text class="gui-list-title-text gui-primary-color">{{item.Title}}</text>
					<!-- </view> -->
				<text class="gui-list-body-desc gui-color-gray">{{item.StartTime}}-{{item.EndTime}}</text>
			</view>
		</view>
			
				<text class="gui-icons gui-block-text gui-select-list-icon gui-select-list-current" 
				:class="[item.checked ? 'gui-fade-in gui-select-list-current' : '']" 
				v-if="item.checked && checkedType == 'right'">&#xe60f;</text>
		</view>
	</view>
</template>

	<script>
	export default{
		name  : "pui-set-time",
		props : {
			items           : {type : Array,   default : function(){return [];}},
			type            : {type : String,  default : "radio"},
			checkedType     : {type : String,  default : 'right'},
			isBorder        : {type : Boolean, default : true},
			borderColor     : {type : String,  default : "#F6F6F6"},
			maxSize         : {type : Number,  default : 0}
		},
		data() {
			return {
				dataIn :  []
			}
		},
		created : function(){
			this.dataIn = this.items;
		},
		watch : {
			items : function(val){ this.dataIn = val;}
		},
		methods : {
			// 获取选中数据的索引
			getSelectedIndex : function(){
				var tmpArr = [];
				this.dataIn.forEach((item, idx)=>{
					if(item.checked){
						tmpArr.push(idx);
					}
				});
				return tmpArr;
			},
			// 选择数据
			choose : function(e){
				var index = e.currentTarget.dataset.index;
				if(this.type == 'radio'){
					if(this.dataIn[index].checked){
						this.dataIn[index].checked = false;
						this.$emit('change', -1);
					}else{
						for(let i = 0; i < this.dataIn.length; i++){
							this.dataIn[i].checked = false;
						}
						this.dataIn[index].checked = true;
						this.$emit('change', index);
					}
				}else{
					if(this.dataIn[index].checked){
						this.dataIn[index].checked = false;
					}else{
						if(this.maxSize > 0){
							var size = 0;
							this.dataIn.forEach((item)=>{
								if(item.checked){size++;}
							});
							size++;
							if(size > this.maxSize){this.$emit('maxSed'); return ;}
						}
						this.dataIn[index].checked = true;
					}
					var sedArr = [];
					for(let i = 0; i < this.dataIn.length; i++){
						if(this.dataIn[i].checked){
							sedArr.push(i);
						}
					}
					this.$emit('change', sedArr);
				}
			}
		}
	}
	</script>
	<style scoped>
	.gui-select-list-item{font-size:0;}
	.gui-select-list-icon{margin-left:10rpx;}
	.gui-select-list-icon-l{margin-left:0; margin-right:10rpx;}
	.gui-select-list-body{width:100rpx; flex:1;}
	.gui-select-list-content{width:170rpx; flex:1; overflow:hidden; padding:25rpx 0;}
	.time-box{
		width: 200rpx; text-align: center;background-color: white; line-height: 40rpx;margin-bottom: 20rpx;
	}
	</style>