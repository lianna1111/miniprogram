.<template>
	<!-- 表格下载 -->
	<gui-page 
	:customFooter="true" 
	:footerSets="{height:100, zIndex:100, bg:'linear-gradient(to bottom, #F8F8F8,#F8F8F8)'}">
		<view class="gui-padding" slot="gBody">
			<view style="margin-top:38rpx;">
				<text class="gui-h5 gui-color-gray gui-bold">全选列表</text>
			</view>
			<view style="margin-top:15rpx;">
				<gui-select-list 
				v-if="lists.length >= 1" 
				:items="lists" iconSize="42rpx" @change="change" 
				type="checkbox" checkedType="ring" ref="selectList"></gui-select-list>
			</view>
		</view>
		<view slot="gFooter" 
		v-if="lists.length >= 1" 
		class="gui-padding gui-flex gui-rows gui-space-between gui-align-items-center" 
		style="border-top:1px solid #E8E8E8;">
			<view class="footerBtns">
				<gui-select-list :items="selectBtn" iconSize="42rpx" @change="btnChange"
				type="checkbox" checkedType="ring"></gui-select-list>
			</view>
			<text class="footerBtns gui-icons gui-block-text gui-text gui-text-right"
			@tap="remove">&#xe794; 删除</text>
		</view>
	</gui-page>
</template>
<script>
var graceJS = require('@/GraceUI5/js/grace.js');
export default {
	data() {
		return {
			// 选择列表
			lists : [
				{title:"多选项目 01", desc:"描述 0001 ......", checked:false},
				{title:"多选项目 02", desc:"描述 0002 ......", checked:false},
				{title:"多选项目 03", desc:"描述 0003 ......", checked:true},
				{title:"多选项目 04", desc:"描述 0004 ......", checked:false},
				{title:"多选项目 05", desc:"描述 0005 ......", checked:false},
				{title:"多选项目 06", desc:"描述 0006 ......", checked:false},
				{title:"多选项目 07", desc:"描述 0007 ......", checked:false},
				{title:"多选项目 08", desc:"描述 0008 ......", checked:false},
			],
			// 底部选择按钮
			selectBtn : [
				{title:"全选", checked:false},
			],
		}
	},
	methods: {
		change : function(e){
			if(e.length >= this.lists.length){
				this.selectBtn[0].title   = "取消";
				this.selectBtn[0].checked = true;
			}else{
				this.selectBtn[0].title   = "全选";
				this.selectBtn[0].checked = false;
			} 
		},
		btnChange : function (e) {
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
			this.lists.forEach((item)=>{
				item.checked = status;
				tmpArr.push(item);
			});
			this.lists = [];
			this.$nextTick(()=>{
				this.lists = tmpArr;
			});
		},
		remove : function () {
			// 获取选中的数据索引
			var indexs = this.$refs.selectList.getSelectedIndex();
			if(indexs.length < 1){
				uni.showToast({
					title : "请选择数据",
					icon  : "none"
				});
				return ;
			}
			uni.showModal({
			    title   : '提示',
			    content : '确定要删除选中数据吗?',
			    success : (res) => {
			        if (res.confirm) {
						var tmpArr = [];
			            this.lists.forEach((item, idx) => {
			            	if(graceJS.arrayIndexOf(indexs, idx) == -1){
								tmpArr.push(item);
							}
			            });
						this.lists = tmpArr;
			        }
			    }
			});
		}
	}
}
</script>
<style scoped>
.footerBtns{width:200rpx;}
</style>