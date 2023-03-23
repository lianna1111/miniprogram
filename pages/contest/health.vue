<template>
	<view>
		<!-- <button open-type="contact" bindcontact="handleContact" session-from="sessionFrom">123</button> -->

		<web-view :webview-styles="webviewStyles" src="https://mp.weixin.qq.com/s?__biz=MzkxMjI5NTkxNQ==&mid=2247484237&idx=1&sn=d742fce4a7b5e901fa5523cc7cdd9f6e&chksm=c10e51c9f679d8df562695d72d2389715e64d5cc491fb09e73378d4ba1722c7d4221c80f9d71#rd"></web-view>
		<!-- <web-view :webview-styles="webviewStyles" src="https://www.cida168.com/health"></web-view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
		      handleContact(e) {
		        console.log(e.detail.path)
		        console.log(e.detail.query)
		      }
		},

	}
</script>

<style>

</style>
