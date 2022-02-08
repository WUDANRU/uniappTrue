<template>
	<!-- scroll-row,scroll-row-item比起作用，在下面写了样式 -->
	<scroll-view scroll-x class="b scroll-row">
		<view class="a scroll-row-item"
		style="width: 170upx;height: 110upx;"
		v-for="(item,index) in baseAttrs" :key="index">
			<view class="d-flex flex-column a-center j-center">
				<view class="iconfont line-h-sm"
				:class="item.icon"></view>
				<view class="line-h-md">{{item.title}}</view>
				<view style="margin-left:10px;" class="text-light-muted font-1 line-h-sm">
					{{item.desc}}
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		props:['baseAttrs'],
	}
</script>

<style>
	.a{
		display:inline-flex !important;
	}
	.b{
		width:100% !important;white-space:nowrap !important;
	}
</style>
