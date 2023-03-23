<template>
	<view class="gui-select-list gui-flex gui-wrap">
		<view v-for="(item, index) in dataIn" 
		:key="index" class="gui-select-list-item gui-flex gui-column gui-align-items-center gui-border-b" 
		:data-index="index"  >
		<view class="gui-list-image gui-margin-top">
			<image class="gui-list-image " :src="item.Headimg"></image>
		</view>
		
				<view class="gui-select-list-content1 gui-flex gui-column gui-align-items-center">
					
							<view class="gui-lr-margin">
								<view class="gui-list-title">
									<text class="gui-list-title-text gui-primary-color">{{item.StudentName}}</text>
									</view>
								<text class="gui-list-body-desc gui-color-gray">学号：{{item.StudentCode}}</text>
							</view>
						
				</view>
				
			
		</view>
	</view>
</template>
<script>
export default{
	name  : "person-list",
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
		
	}
}
</script>
<style scoped>
.gui-select-list-item{font-size:0;}
.gui-select-list-icon{margin-left:10rpx;}
.gui-select-list-icon-l{margin-left:0; margin-right:10rpx;}
.gui-select-list-body{width:100rpx; flex:1;}
.gui-select-list-content1{width:170rpx; flex:1; overflow:hidden; padding:10rpx 0 20rpx;}

</style>