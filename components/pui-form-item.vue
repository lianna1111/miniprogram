<template>
	<view>
		<view class="input" v-for="item in items">
			<image :src="item.src" mode=""></image>
		            <input
		              type="text"
		              :name="item.name"
		              :placeholder="item.placeholder"
		              v-model="item.value"
		            />
		</view>
	</view>
</template>

<script>
	export default{
		name  : "form-item",
		props : {
			items    		: { type : Array,  default : []}
		},
		data() {
			return {
				
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.input {
	  width: 500rpx;
	  border: solid 1rpx #e0e0e0;
	  margin: 15rpx 30rpx;
	  background-color: #fff;
	  display: flex;
	  padding: 10rpx;
	  
	image {
	  width: 40rpx;
	  height: 40rpx;
	}
	input {
	   margin-left: 35rpx;
	}
	}
	
</style>
