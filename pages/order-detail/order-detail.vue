<template>
	<view>
		<view class="main-bg-color text-white p-4 d-flex a-end j-sb" style="height: 300rpx;">
			<view class="mb-3">
				<view class="font-3">{{status}}</view>
				<view class="font-3">{{timeDownText}}</view>
			</view>
			<view class="iconfont icon-daishouhuo line-h mb-3" style="font-size: 100rpx;"></view>
		</view>
		<view class="p-3 bg-white">
			<view class="text-light-muted font-3">
				<text class="font-sm text-dark mr-2">{{address.name}}</text>
				{{address.phone}}
			</view>
			<view class="text-light-muted font-3">
				{{path}}
			</view>
		</view>
		<divider></divider>
		<view class="px-2">
			<block v-for="(item,index) in order_items" :key="index">
				<order-list-item :item="item" :index="index"></order-list-item>
			</block>
		</view>
		<divider></divider>
		<uni-list-item>
			<text class="font-3 text-light-muted">商品总价</text>
			<view slot="right" class="font-3 text-light-muted">
				{{price}}
			</view>
		</uni-list-item>
		<uni-list-item>
			<text class="font-3 text-light-muted">快递</text>
			<view slot="right" class="font-3 text-light-muted">
				包邮
			</view>
		</uni-list-item>
		<uni-list-item @click="openCoupon">
			<text class="font-3 text-light-muted">优惠券</text>
			<view slot="right" class="font-sm text-light-muted">
				{{coupon}}
			</view>
		</uni-list-item>
		<uni-list-item>
			<text class="font-3 main-text-color">实际付款</text>
			<view slot="right" class="font-3 text-light-muted">
				<price>{{total_price}}</price>
			</view>
		</uni-list-item>
		<divider></divider>
		<card headTitle="订单信息">
			<uni-list-item title="订单编号">
				<view slot="right" class="font-3 text-light-muted">
					{{no}}
				</view>
			</uni-list-item>
		</card>
		
		<card v-if="extra" headTitle="退款相关">
			<uni-list-item title="申请退款">
				<view slot="right" class="font-3 text-light-muted">
					{{extra.refund_reason}}
				</view>
			</uni-list-item>
		</card>

		<view v-if="status==='待支付' || status === '待发货' || status === '待收货'" style="height:80rpx;"></view>
		<view v-if="status==='待支付' || status === '待发货' || status === '待收货'" class="bg-white position-fixed bottom-0 left-0 right-0 d-flex a-center" style="height:80rpx;margin-top:20rpx;">
			<template v-if="status==='待支付'">
				<common-button @click="openPayMethods">去支付</common-button>
				<common-button @click="closeOrder">取消订单</common-button>
			</template>
			<template v-else-if="status === '待发货'">
				<common-button>提醒发货</common-button>
				<common-button @click="applyRefund">申请退款</common-button>
			</template>
			<template v-else-if="status === '待收货'">
				<common-button @click="openLogistics">查看物流</common-button>
				<common-button @click="received">确认收货</common-button>
			</template>
		</view>

	</view>
</template>

<script>
	var timer = null
	import orderListItem from "@/components/order-list-item.vue"
	import uniListItem from "@/components/uni-ui/uni-common/uni-list-item/uni-list-item.vue"
	import price from '@/components/price.vue';
	import card from '@/components/common/card.vue';
	import commonButton from '@/components/common-button.vue'

	import $T from '@/common/lib/time.js'

	export default {
		components: {
			orderListItem,
			uniListItem,
			price,
			card,
			commonButton
		},
		computed: {
			// 商品总价
			price() {
				let p = 0
				this.order_items.forEach(item => {
					p += item.pprice * item.num
				})
				return p.toFixed(2)
			},
			path() {
				let {
					province,
					city,
					district,
					address
				} = this.address
				return `${province} ${city} ${district} ${address}`
			},
			//订单状态
			status() {
				return this.$U.formatStatus({
					paid_time: this.paid_time,
					refund_status: this.refund_status,
					ship_status: this.ship_status
				})
			},
			coupon() { //优惠券信息
				if (Array.isArray(this.couponUserItem) && this.couponUserItem.length === 0) { //选中的优惠券是放在couponUserItem里的,这里是没选中
					return '未使用'
				}
				let {
					type,
					value
				} = this.couponUserItem.coupon
				if (type === 0) { //满减
					return '-￥' + value
				} else { //打折
					return '打' + value + '折'
				}
			},
			timeDownText() {
				let msg = ''
				switch (this.status) {
					case '待支付':
						msg = '取消订单'
						break;
					case '待收货':
						msg = '确认订单'
						break;
					case '待发货':
						return '等待商家发货'
						break;
					case '退款中':
						return '等待商家审核'
						break;
					case '已签收':
						return '订单已签收'
						break;
				}
				// console.log(this.timeDown,'返回空，因为这个订单是退款中的状态')
				if (msg !== '' && this.timeDown !== '') { //假如待支付状态的订单半小时不支付会占一个库存，半小时后要将这个订单自动取消
					return `还差 ${this.timeDown} 自动${msg}`
				}
				return ''
			},
		},
		data() {
			return {
				loading: false,
				no: "",
				id: 0,
				address: {
					province: "",
					city: "",
					district: "",
					address: "",
					name: "",
					phone: "",
				},
				total_price: 0, // total_price: 0.00,
				remark: "",
				paid_time: null,
				payment_method: "",
				payment_no: "",
				create_time: 0,
				now_time: 0,
				order_items: [],
				refund_status: null,
				ship_status: null,
				couponUserItem: [],
				// coupon: "未使用",
				extra: null, // extra: {}
				timeDown: "",
				end_time: 0
			}

			// return {
			// 	id:0,
			// 	create_time:"2019-09-10 10:20",
			// 	status:"已发货",
			// 	order_items:[
			// 		{
			// 			cover:"/static/images/demo/demo6.jpg",
			// 			title:"小米8",
			// 			pprice:1999.00,
			// 			attrs:"金色 标配",
			// 			num:1
			// 		}
			// 	],
			// 	total_num:3,
			// 	total_price:299.00
			// }
		},
		onLoad(e) {
			if (!e.id) {
				uni.showToast({
					title: '订单不存在',
					icon: 'none'
				})
				return uni.navigateBack({ //order-confirm的onShow重定向跳过来的，返回上一页实际会跳到cart页，原来推算是pay-result
					delta: 1
				})
			}
			this.id = e.id
			// // 获取订单详情
			// this.getData()
		},
		onShow(){
			// 获取订单详情
			this.getData()
		},
		onUnload() {
			if (timer) {
				clearInterval(timer)
			}
		},
		methods: {
			// 开启定时器
			openTimeDown() {
				if (this.status === '待支付' || this.status === '待收货') {
					if (timer) {
						clearInterval(timer)
					}
					timer = setInterval(() => {
						let now = (new Date().getTime()) / 1000 //10位数
						if (now > this.end_time) {
							uni.switchTab({
								url: '../index/index'
							})
							uni.showToast({
								title: this.status === '待支付' ? '订单已关闭' : '订单已确认',
								icon: 'none'
							})
							this.timeDown = ''
							return clearInterval(timer)
						}
						this.timeDown = $T.timeDown(this.end_time)
					}, 1000)
				}
			},
			getData() {
				this.$H.get('/order/' + this.id, {}, { //查看订单详情
					token: true
				}).then(res => {
					console.log(res, '订单详情')
					this.end_time = res.end_time ? res.end_time : 0
					//额外数据
					if (res.extra) {
						this.extra = res.extra
					}
					this.no = res.no
					this.paid_time = res.paid_time
					this.refund_status = res.refund_status
					this.ship_status = res.ship_status
					this.create_time = res.create_time

					this.total_price = res.total_price

					//商品  //整理商品列表数据
					let order_items = res.orderItems.map(item => {
						console.log(item, 'log')
						let attrs = []
						if (item.goodsSkus) {
							let skus = item.goodsSkus.skus
							if (skus) {
								for (let k in skus) {
									attrs.push(skus[k].value)
								}
							}
						}
						return {
							id: item.goodsItem.id,
							cover: item.goodsItem.cover,
							title: item.goodsItem.title,
							pprice: item.price,
							attrs: attrs.join(','),
							num: item.num,
						}
					});
					// 地址
					this.address = res.address
					this.order_items = order_items
					this.couponUserItem = res.couponUserItem
					// 开启倒计时
					this.openTimeDown()
				}).catch(err => {
					uni.showToast({
						title: '加载失败',
						icon: 'none'
					})
				})
			},
			// 去支付
			openPayMethods(){
				// 跳转到支付页面
				uni.navigateTo({
					url: '/pages/pay-methods/pay-methods?detail='+JSON.stringify({
						id:this.id,
						price:this.total_price
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
							this.$H.post('/closeorder/'+this.id,{},{
								token:true
							}).then(res=>{
								uni.hideLoading()
								uni.navigateBack({
									delta: 1
								});
								uni.showToast({
									title: '取消订单成功',
									icon: 'none'
								});
								// this.$emit('update') //order-list要加这个，这里不用
							}).catch(err=>{
								uni.hideLoading()
							})
						}
					}
				});
			},
			// 申请退款
			applyRefund(){
				uni.navigateTo({
					url: '/pages/order-refund/order-refund?detail='+JSON.stringify({
						id:this.id
					})
				});
			},
			// 查看物流
			openLogistics(){
				uni.navigateTo({
					url: '/pages/logistics-detail/logistics-detail?detail='+JSON.stringify({
						id:this.id
					})
				});
			},
			// 确认收货
			received(){
				uni.showModal({
					content: '是否要确认收货？',
					success:  (res)=> {
						if (res.confirm) {
							uni.showLoading({
								title: '确认收货中...',
								mask: false
							});
							this.$H.post('/order/'+this.id+'/received',{},{
								token:true
							}).then(res=>{
								uni.hideLoading()
								uni.navigateBack({
									delta: 1
								});
								uni.showToast({
									title: '确认收货成功',
									icon: 'none'
								});
							}).catch(err=>{
								uni.hideLoading()
							})
						}
					}
				});
			},
			openCoupon() {
				uni.navigateTo({
					url: '/pages/order-coupon/order-coupon'
				})
			},
		}
	}
</script>

<style>

</style>
