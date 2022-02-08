<template>
	<view class="d-flex main-text-color line-h" :class="priceSize+''+color">
		<text class="a-self-start" :class="unitSize">￥</text>
		<slot />
	</view>
</template>

<script>
	export default {
		props: {
			priceSize: { //价格
				type: String,
				default: "font-sm"
			},
			unitSize: { //价格单位
				type: String,
				default: "font-2"
			},
			color: {
				type: String,
				default: "main-text-color"
			}
		}
	}
</script>

<style>

</style>
