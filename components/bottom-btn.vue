<template>
	<view>
		<view style="height: 100rpx;"></view> <!-- 加这个占位，拉到底部显示才全 -->
		<view class="d-flex a-stretch bg-white position-fixed left-0 bottom-0 right-0"
			style="height: 100rpx; z-index: 100;">
			<view class="flex-1 d-flex flex-column a-center j-center line-h-md" hover-class="bg-light-secondary">
				<view class="iconfont icon-xihuan text-muted line-h-md"></view>
				收藏
			</view>
			<!-- type="error"红色 -->
			<view @tap="ToCart" class="position-relative flex-1 d-flex flex-column a-center j-center line-h-md"
				hover-class="bg-light-secondary">
				<view class="iconfont icon-gouwuche text-muted line-h-md"></view>
				<view class="position-absolute" style="left:90rpx;top:0;" v-if="cartCount==='99+' || cartCount > 0">
					<uni-badge :text="cartCount" type="error" size="small"></uni-badge>
				</view>
				购物车
			</view>
			<view @tap="$emit('showed')" class="d-flex j-center a-center font-3 main-bg-color text-white"
				hover-class="main-bg-hover-color" style="flex: 2.5;">
				加入购物车
			</view>
		</view>

	</view>
</template>

<script>
	import uniBadge from '@/components/uni-ui/uni-common/uni-badge/uni-badge.vue'; //角标组件
import { mapGetters } from 'vuex'

	export default {
		components: {
			uniBadge
		},
		computed:{
			...mapGetters(['cartCount'])
		},
		methods: {
			ToCart() { //首页、分类、购物车、我的都属于底部导航所以要用switchTab
				uni.switchTab({
					url: '../../pages/cart/cart'
				})
			}
		}
	}
</script>

<style>
</style>
