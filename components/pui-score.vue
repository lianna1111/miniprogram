<template>
		<view class="gui-select-list gui-flex gui-wrap">
		<view v-for="(item, index) in dataIn" 
		:key="index" class="gui-select-list-item gui-flex gui-column gui-align-items-center" 
		  >
		<view :data-index="index" @tap.stop="choose">
			<view class="gui-list-image" v-if="checkedType == 'ring' && !item.checked">
			<image class="gui-list-image border-gray-10" :src="item.Headimg"></image>
		</view>
		<view class="gui-list-image" v-if="checkedType == 'ring' && item.checked">
			<image class="gui-list-image border-orange-10" :src="item.Headimg"></image>
		</view>
		</view>

			<view class="" style="margin: 0 20rpx;">
				<view class="gui-select-list-content gui-flex gui-column gui-align-items-center">
					<view class="gui-list-title">
						<text class="gui-list-title-text gui-primary-color">{{item.StudentName}}</text>
					</view>
					<text class="gui-list-body-desc gui-color-gray">背号：{{item.StudentCode}}</text>
					
					<text class="gui-list-title-text gui-color-orange1" @tap="setscore(item)">分数：{{item.score}}</text>	
				</view>
			</view>
				<text class="gui-icons gui-block-text gui-select-list-icon gui-select-list-current" 
				:class="[item.checked ? 'gui-fade-in gui-select-list-current' : '']" 
				v-if="item.checked && checkedType == 'right'">&#xe60f;</text>
		</view>
		<view class="border-orange-10 gui-margin gui-padding gui-border-radius-large">
			<view class="gui-flex gui-space-between">
				<view class="footerBtns">
					<gui-select-list :items="selectBtn" iconSize="42rpx" @change="btnChange"
					type="checkbox" checkedType="ring"></gui-select-list>
				</view>
				<text class="footerBtns gui-icons gui-block-text gui-text gui-text-right gui-margin"
				>&#xe60f; 评分</text>
			</view>
			
			<view class="score  gui-flex  gui-bg-gray  gui-space-around" >
				<view class=""  v-for="(items,index) in scoreIn" @tap="appy(items)" >
					<text class="gui-block-text " :style="{background: items.clickbg}" style="padding: 30rpx 20rpx; margin: 0rpx 10rpx; ">{{items.value}}</text>
				</view>
			</view>
		
		</view>
	</view>
</template>
<script>
export default{
	name  : "pui-select-list",
	props : {
		items           : {type : Array,   default : function(){return [];}},
		score           : {type : Array,   default : function(){return [];}},
		type            : {type : String,  default : "radio"},
		checkedType     : {type : String,  default : 'right'},
		isBorder        : {type : Boolean, default : true},
		borderColor     : {type : String,  default : "#F6F6F6"},
		maxSize         : {type : Number,  default : 0}
	},
	data() {
		return {
			dataIn :  [],
			scoreIn:[]
			}
	},
	created : function(){
		this.dataIn = this.items;
		this.scoreIn = this.score;
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
		getSelectedItem : function(){
			var tmpArr1 = [];
			this.dataIn.forEach((item, idx)=>{
				if(item.checked){
					tmpArr1.push(this.dataIn[idx].StudentCode);
				}
			});
			return tmpArr1;
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
		},
		appy(items){
			items.clickbg='#ffcb52'
			setTimeout(()=>{items.clickbg=''},600)
			var indexs = this.getSelectedIndex();
			var item = this.getSelectedItem();
			// console.log(indexs,'index',item,'items')
			if(indexs.length < 1){
				uni.showToast({
					title : "请选择数据",
					icon  : "none"
				});
				return ;
			}
			uni.showModal({
			    title   : '分数:'+items.value,
			    content : '被评分人:'+item,
			    success : (res) => {
			        if (res.confirm) {//点击了确定
					for(let j in item){
						for(let i in this.lists){
							// console.log(this.lists[i].StudentCode,'所有人')
								// console.log(item[j],'选中的人','---')
								if(this.lists[i].StudentCode==item[j]){
									// console.log('0')
									this.lists[i].score=items.value
								}
							}
						}
			        }
			    }
			});
		},
	}
}
</script>
<style scoped>
.gui-select-list-item{font-size:0;}
.gui-select-list-icon{margin-left:10rpx;}
.gui-select-list-icon-l{margin-left:0; margin-right:10rpx;}
.gui-select-list-body{width:100rpx; flex:1;}
.gui-select-list-content{width:140rpx; flex:1; overflow:hidden; padding:25rpx 0;}

</style>