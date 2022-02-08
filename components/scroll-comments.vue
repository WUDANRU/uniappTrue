<template>
	<view class="p-1">
		<scroll-view scroll-x class="scroll-row">

			<view class="scroll-row-item rounded bg-light-secondary mr-2 p-2" v-for="(item,index) in comments"
				:key="index" style="width: 640rpx;height: 380rpx;background-color:#f1f1f1;">

				<view class="d-flex a-center p-1">
					<image :src="item.userpic" mode="widthFix" style="width: 70rpx;height: 70rpx;"
						class="rounded-circle"></image>
					<view class="ml-2">
						<text class="font-1 line-h">
							{{item.username}}</text>
						<text class="d-block font-1 text-light-muted line-h">{{item.create_time | formatTime}}</text>
					</view>
					<view class="iconfont icon-dianzan text-light-muted font-1 pl-1 ml-auto">{{item.goods_num}}</view>
				</view>

				<text class="d-block font-1 m-2">
					{{item.context}}
				</text>

				<view class="row">
					<view style="padding:0 15px;" class="span24-8" v-for="(img,i) in item.imglist" :key="i">
						<image :src="img" mode="widthFix" style="width: 80rpx;" class="rounded"></image>
					</view>
				</view>

			</view>
		</scroll-view>

		<!-- <navigator url="/pages/detail-comment/detail-comment"> -->
		<view style="justify-content: center;" class="d-flex py-1 text-primary" hover-class="bg-light-secondary"
			@click="open">
			更多评论 <view class="iconfont icon-you" style="margin-left:23rpx;margin-top:8rpx;"></view>
		</view>
		<!-- </navigator> -->

	</view>
</template>

<script>
	// import $T from '@/common/lib/time.js' //子组件引用js文件，小程序端会报错，所以挂载到全局上
	export default {
		props: ['comments', 'goods_id'], //:goods_id="detail.id"
		filters: {
			formatTime(value) {
				return this.$T.gettime(value)
			}
		},
		methods: {
			open() {
				uni.navigateTo({
					url: '/pages/detail-comment/detail-comment?id=' + this.goods_id
				})
			}
		}
	}
</script>

<style>
</style>
