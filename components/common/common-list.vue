<template>
	<view style="width: 372.5upx;" @click="openDetail">
		<image style="width:375upx;" :src="item.cover" mode="widthFix" lazy-load></image>
		<view class="p-1 pt-1">
			<view class="font-3">{{item.title}}</view>
			<text class="d-block font-1 text-light-muted">{{item.desc}}</text>
			<view class="d-flex my-1">
				<price>{{item.pprice}}</price>
				<view class="font-2 text-light-muted line-through ml-1 a-self-end line-h" >￥{{item.oprice}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import price from "@/components/price.vue";
	export default {
		components:{
			price
		},
		props:{
			item:Object,
			index:Number,
			type:{
				type:String,
				default:"navigateTo"
			}
		},
		methods:{
			openDetail(){
				uni[this.type]({ //redirectTo重定向 redirectTo关闭旧的打开新的，navigateTo会重新打开页面，还保留旧的
					url:'/pages/detail/detail?detail='+JSON.stringify(this.item)
				})
			}
		}
	}
</script>

<style>
</style>
