<template>
	<view @click="openDetail(item,index)" style="width: 372.5upx;">
		<image style="width:100%;" :src="item.cover" mode="widthFix" lazy-load></image>
		<view class="p-2 pt-1">
			<view class="font-sm">{{item.title}}</view>
			<text class="d-block mt font-2 text-light-muted">{{item.desc}}</text>
			<view class="d-flex my-1">
				<price>{{item.pprice}}</price>
				<view class="font-2 text-light-muted line-through ml-1 a-self-end line-h" >￥{{item.oprice}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import price from "@/components/price.vue"
	export default {
		components:{
			price
		},
		props:{
			item:Object,
			index:String
		},
		methods: {
			openDetail() {
				uni.navigateTo({
					url: '/pages/detail/detail?detail='+JSON.stringify(this.item)
				});
			}
		}
	}
</script>

<style>
</style>
