<template>
	<view class="row" style="display:flex;justify-content:space-around;width:100%;flex-wrap:wrap;margin:30upx 0;">
		<view v-for="(item,index) in resdata" :key="index" style="width:20%;" class="span-5">
			<image lazy-load :src="item.src" mode="" style="display:flex;width:100upx;height:100upx;margin-left:20upx;">
			</image>
			<text style="font-size:20upx;display:flex;margin-left:20upx;">{{item.text}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			resdata: Object
		}
	}
</script>

<style>

</style>
