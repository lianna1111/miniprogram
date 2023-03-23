<template>
	<view>
		<view class="">
			<map style="width:750rpx; height:300px;" 
			:scale="16" @markertap="markertap"
			:latitude="latitude" :longitude="longitude" 
			:markers="covers"></map>
		</view>
		<view class="gui-padding" style="margin-top:80rpx;">
			<view>
				<text class="gui-text gui-color-gray">标注演示</text>
			</view>
			<view class="gui-list gui-margin-top">
				<view class="gui-list-items" 
				v-for="(item, index) in demoAddress" :key="index" 
				:data-address="item" @tap="mapit">
					<view class="gui-list-body gui-border-b">
						<view class="gui-list-title">
							<text class="gui-list-title-text">{{item}}</text>
							<text class="gui-list-title-desc gui-color-gray">点击标注</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
var graceJS = require('@/GraceUI5/js/grace.js');
export default {
	data() {
		return {
			latitude  : 39.909, // 纬度
			longitude : 116.39742 ,//经度,
			covers    : [{
				id        : 1, 
				latitude  : 39.909,
				longitude : 116.39742,
				iconPath  : '../../../static/location.png',
				width     : 38,
				height    : 38
			}],
			locationName  : '',
			demoAddress   : [
				'北京市国家体育馆',
				'西安市大雁塔北广场',
				'西安市高新一路25号创新大厦'
			]
		}
	},
	onLoad:function(){
		// 默认情况下获取当前位置
		// 请仔细阅读 注意事项!!
		// https://uniapp.dcloud.io/api/location/location
		uni.getLocation({
			type: 'gcj02',
			success:(res)=>{
				console.log('当前位置的经度：' + res.longitude);
				console.log('当前位置的纬度：' + res.latitude);
				this.latitude  =  res.latitude;
				this.longitude =  res.longitude;
				this.covers    = [{
					id        : 1,
					latitude  : res.latitude,
					longitude : res.longitude,
					iconPath  : '../../../static/location.png',
					width     : 38,
					height    : 38
				}];
				// 根据精度纬度获取详细地址
				graceJS.get(
					'https://www.graceui.com/txMap/txMap.php?method=location2address&latitude='+res.latitude+'&longitude='+res.longitude,
					{m:"getJson"},
					{},
					(res)=>{
						console.log(res);
						if(res.status == 'ok'){
							this.locationName =  res.data.address;
						}
					}
				);
			}
		});
	},
	methods:{
		mapit : function(e){
			var address = e.currentTarget.dataset.address;
			this.getLocation(address);
		},
		// 根据详细地址计算坐标
		// 后端 api php 版本 请在群文件内下载
		getLocation : function(address){
			graceJS.get(
				'https://www.graceui.com/txMap/txMap.php?method=address2location&address='+address,
				{m:"getJson"},
				{},
				(res)=>{
					if(res.status == 'ok'){
						var location   = res.data.location;
						this.latitude  = location.lat;
						this.longitude = location.lng;
						this.covers    = [{
							id        : 1,
							latitude  : location.lat,
							longitude : location.lng,
							iconPath  : '../../../static/location.png',
							width     : 30,
							height    : 30
						}];
						this.locationName =  address;
					}else{
						uni.showToast({ title:"地址解析失败", icon:"none" });
					}
				}
			);
		},
		// 点击标注点 打开新页面并可以调用第三方导航
		markertap : function(e){
			console.log(e);
			uni.openLocation({
				latitude  : this.covers[0].latitude,
				longitude : this.covers[0].longitude,
				name      : this.locationName,
				success: function () {
					console.log('success');
				}
			});
		}
	}
}
</script>
<style>
</style>