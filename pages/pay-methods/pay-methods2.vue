<template>
	<view>
		<view class="d-flex flex-column a-center j-center py-1 my-3">
			<text class="text-light-muted font-sm">支付金额</text>
			<price unitSize="font-sm" style="margin-top:5upx;font-size: 32upx;">38.00</price>
		</view>
		<view class="px-5">
			<label>
				<uni-list-item leftIcon="icon-zhifubao text-primary" title="支付宝支付" showExtraIcon
					leftIconStyle="font-size:60rpx;" note="推荐使用支付宝支付">
					<radio slot="right" value="1" color="#FD6801" :checked="checkNum==='1'" @click="radio('1')" />
				</uni-list-item>
			</label>
			<label>
				<uni-list-item leftIcon="icon-weixinzhifu text-success" title="微信支付" showExtraIcon
					leftIconStyle="font-size:60rpx;color:#28a745;">
					<radio slot="right" value="2" color="#FD6801" :checked="checkNum==='2'" @click="radio('2')" />
				</uni-list-item>
			</label>
			<view class="rounded main-bg-color text-white font-3 w-100 py-1 mt-3 text-center"
				hover-class="main-bg-hover-color" @click="submit">
				确认支付
			</view>
		</view>
	</view>
</template>

<script>
	import price from "@/components/price.vue"
	import uniListItem from "@/components/uni-ui/uni-common/uni-list-item/uni-list-item.vue"
	export default {
		components: {
			price,
			uniListItem
		},
		data(){
			return{
				checkNum:'1'
			}
		},
		methods:{
			radio(e){
				this.checkNum=e
			},
			submit(){
				uni.navigateTo({
					url:'../pay-result/pay-result'
				})
			}
		}
	}
</script>

<style>

</style>
