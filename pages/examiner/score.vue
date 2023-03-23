<template>
	<view class="">
		
	<view  v-for="(item, index) in campus" 
		:key="index">
			<view style="margin-top:15rpx;">
				<view   class="gui-form-item gui-border-b gui-flex gui-space-between">
					<view class="gui-margin gui-h5">{{item.msg.session}}场次</view>
					<view class="gui-margin gui-h5">{{item.msg.time}}</view>
					
					<view @tap="appy" class="gui-margin gui-bg-orange1 gui-color-white gui-border-radius-small" style="padding: 5rpx 10rpx;">评分</view>
				</view>
				<pui-select-list-banner
				v-if="item.lists.length >= 1" 
				:items="item.lists" iconSize="42rpx" @change="change($event,item.lists)" 
				type="checkbox" checkedType="ring" ref="selectList"></pui-select-list-banner>
			</view>
			<view slot="gFooter"
			v-if="campus.length >= 1" 
			class="gui-padding gui-flex gui-rows gui-space-between gui-align-items-center" 
			style="border-top:1px solid #E8E8E8;">
				<view class="footerBtns">
					<gui-select-list :items="selectBtn" iconSize="42rpx" @change="btnChange($event,item.lists)"
					type="checkbox" checkedType="ring"></gui-select-list>
				</view>
				<text class="footerBtns gui-icons gui-block-text gui-text gui-text-right"
				@tap="appy">&#xe625; 报名</text>
			</view>
	</view>
	</view>
</template>

<script>
	export default{
	data() {
		return {
			campus:[
				{
					msg:{session:'01场次',time:'10:00-11:00'},
					lists : [
						{number:"001", name:"李华",score:'80', checked:false},
						{number:"001", name:"李华",score:'80', checked:false},
						{number:"001", name:"李华",score:'80', checked:false},
				
						],
				},
				{
					msg:{session:'02场次',time:'11:00-12:00'},
					lists : [
						{number:"001", name:"李华",score:'80', checked:false},
						{number:"001", name:"李华",score:'80', checked:false},
						{number:"001", name:"李华",score:'80', checked:false},
				
						],
				},
				
			],
			
			// 底部选择按钮
			selectBtn : [
				{title:"全选", checked:false},
			],
		}
		},
		methods:{
			change : function(e,item){
				if(e.length>=item.length ){
					this.selectBtn[0].title   = "取消";
					this.selectBtn[0].checked = true;
				}else if(e.length<item.length ){
					this.selectBtn[0].title   = "全选";
					this.selectBtn[0].checked = false;
				} 
			},
			btnChange : function (e,items) {
				var status = false;
				if(e.length > 0){
					status = true;
					this.selectBtn[0].checked = true;
					this.selectBtn[0].title   = "取消";
				}else{
					this.selectBtn[0].checked = false;
					this.selectBtn[0].title = "全选";
				}
				var tmpArr = [];
				items.forEach((item)=>{
					item.checked = status;
					tmpArr.push(item);
					console.log(item,'item',items,'items')
				});
				items = [];
				this.$nextTick(()=>{
					items = tmpArr;
				});
			},
			appy(){
				 this.$nextTick(()=>{
				     var indexs = this.$refs.selectList.getSelectedIndex();
				      })
				if(indexs.length < 1){
					uni.showToast({
						title : "请选择数据",
						icon  : "none"
					});
					return ;
				}
				uni.showModal({
				    title   : '提示',
				    content : '确定为以上学生报名吗?',
				    success : (res) => {
				        if (res.confirm) {
							let tmpArr = '';
							let NameArr='';
							for(let i=0;i<indexs.length;i++){
								if(tmpArr.length=='0'){
									tmpArr=tmpArr+this.lists[indexs[i]].StudentCode
									NameArr=NameArr+this.lists[indexs[i]].StudentName
								}else{
									tmpArr=tmpArr+','+this.lists[indexs[i]].StudentCode
									NameArr=NameArr+','+this.lists[indexs[i]].StudentName
								}
							}
							// console.log(tmpArr,'tmpArr')//报名学生的code
							// console.log(NameArr,'NameArr')//报名学生的姓名
							uni.navigateTo({
								url:'./detail?StudentCode='+tmpArr+'&StudentName='+NameArr
							})
				          
				        }
				    }
				});
				
							
				    
			},
		}
		
	}
</script>

<style>
</style>
