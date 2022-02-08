<template>
	<view class="p-2">
		<view class="font-sm">{{detail.title}}</view>
		<view class="font-1 text-light-muted mb-1 line-h-md">{{detail.desc}}</view>
		<price unitSize="font-1">{{showPrice}}</price>
	</view>
</template>

<script>
		import price from '@/components/price.vue'
		
			export default {
				components: {
					price
				},
				props:['detail','showPrice']
		}
</script>

<style>
</style>
