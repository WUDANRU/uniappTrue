<template>
	<view class="bg-white" @click.prevent="openDetail">
		<divider></divider>
		<!-- 头部 -->
		<view class="d-flex a-center p-2 border-bottom border-light-secondary">
			<text class="text-light-muted font-3">{{item.create_time}}</text>
			<text class="main-text-color ml-auto font-3">{{item.status}}</text>
		</view>
		<!-- 身体 -->
		<view class="px-1">
	<block v-for="(order,orderIndex) in item.order_items" :key="orderIndex">
		<order-list-item :item="order" :index="orderIndex"></order-list-item>
	</block>
		</view>
		<!-- 底部 -->
		<view class="d-flex a-center p-2">
			<text class="text-dark font-3 ml-auto">
				共{{item.order_items.length}}件商品，合计：￥{{item.total_price}}
			</text>
		</view>
		<view class="d-flex j-end a-center px pb">
			<!-- 每个状态下(待收货，待付款等状态)显示的按钮不一样 -->
		<template v-if="item.status === '待支付'">
			<common-button @click="openPayMethods">去支付</common-button>
			<common-button @click="closeOrder">取消订单</common-button>
		</template>
		
		<template v-else-if="item.status === '待发货'">
			<common-button>提醒发货</common-button>
			<common-button @click="applyRefund">申请退款</common-button>
		</template>
		
		<template v-else-if="item.status === '待收货'">
			<common-button @click="openLogistics">查看物流</common-button>
			<common-button @click="received">确认收货</common-button>
		</template>
		
		<!-- 订单完成 -->
		<template v-else>
			<common-button @click="openDetail">查看详情</common-button>
		</template>
		</view>
	</view>
</template>

<script>
	import orderListItem from '@/components/order-list-item.vue';
		import commonButton from '@/components/common-button.vue';
	export default {
		components: {
			orderListItem,
			commonButton
		},
		props: {
			item: Object,
			index:Number
		},
		methods:{
			// 查看详情
			openDetail(){
				uni.navigateTo({
					url: '../../pages/order-detail/order-detail?id='+this.item.id,
				});
			},
		// 去支付 //order页的待付款项去支付就是跳转到支付页pay-methods，pay-methods页支付成功返回上一页，返回到order页，这时原来待付款项的商品不见了，跑到待收货项
		openPayMethods(){
			// 跳转到支付页
			uni.navigateTo({
				url: '/pages/pay-methods/pay-methods?detail='+JSON.stringify({
					id:this.item.id,
					totalPrice:this.item.total_price
				})
			});
		},
		// 取消订单
		closeOrder(){
			uni.showModal({
				content: '是否要取消该订单？',
				success: (res)=> {
					if (res.confirm) {
						uni.showLoading({
							title: '取消订单中...',
							mask: false
						});
						this.$H.post('/closeorder/'+this.item.id,{},{
							token:true
						}).then(res=>{
							uni.hideLoading()
							uni.showToast({
								title: '取消订单成功',
								icon: 'none'
							});
							this.$emit('update') //传给了order.vue,取消订单就要重新-获取订单列表getOrderList()
						}).catch(err=>{
							uni.hideLoading()
						})
					}
				}
			});
		},
		// 提醒发货(就是给客服发消息)
		// 申请退款
		applyRefund(){
			// 跳转到支付页
			uni.navigateTo({
				url: '/pages/order-refund/order-refund?detail='+JSON.stringify({
					id:this.item.id,
					})
			})
		},
		// 查看物流
		openLogistics(){
			uni.navigateTo({
				url: '/pages/logistics-detail/logistics-detail?detail='+JSON.stringify({
					id:this.item.id
				})
			});
		},
		// 确认收货
		received(){
			uni.showModal({
				content: '是否要确定收货？',
				success: (res)=> {
					if (res.confirm) {
						uni.showLoading({
							title: '确认收货中...',
							mask: false
						});
						this.$H.post('/order/'+this.item.id+'/received',{},{
							token:true
						}).then(res=>{
							uni.showToast({
								title: '确认收货成功',
								icon: 'none'
							});
							this.$emit('update')
						}).catch(err=>{
							uni.hideLoading()
						})
					}
				}
			});
		},
		}
	}
</script>

<style>
</style>
