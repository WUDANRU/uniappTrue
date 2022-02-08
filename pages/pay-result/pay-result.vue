<template>
	<view>
		
		<view class="d-flex flex-column a-center j-center py-5 my-3">
			<text class="iconfont icon-iconfontxuanzhong4 main-text-color line-h" style="font-size: 180rpx;"></text>
			<text class="text-dark font-sm line-h-sm">支付成功</text>
		</view>
		<view class="px-5">
			<view @click="openDetail" class="rounded main-bg-color text-white font-2 py-1 mt-2 text-center" hover-class="main-bg-hover-color">
				查看订单
			</view>
			<view @click="openIndex" class="rounded border font-2 py-1 mt-2 text-center" hover-class="bg-light">
				返回首页
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			openDetail(){
				uni.navigateBack({
					delta:1
				})
			},
			openIndex(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style>