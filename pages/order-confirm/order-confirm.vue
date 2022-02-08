<template>
	<view style="background: #F5F5F5;min-height: 100%;height: auto;">
		<!-- 地址选择 -->
		<!-- 点击cart的结算就会跳转到这个页面 -->
		<view class="main-bg-color text-white d-flex a-center px-3" style="height: 250rpx;"
			hover-class="main-bg-hover-color">
			<view>
				<!-- user-path-list页面三种情况(两个页面(全局)之间的传递uni.$on,uni.$emit)：有收货地址 || 没有收货地址 || 有收货地址，对收货地址不满意要修改 -->
				<template v-if="path">
					<!-- <view  @click="openPathList"> -->
					<view class="font-weight d-flex a-center font-sm">
						{{path.name}} {{path.phone}}
						<view class="border border-white rounded px-1 font-1 ml-2" v-if="path.isdefault">默认</view>
					</view>
					<view class="font-2 py">
						{{path.province}} {{path.city}} {{path.district}} {{path.address}}
						<!-- {{path.path}} {{path.detailPath}} -->
					</view>
					<!-- </view> -->
				</template>
				<template v-else>
					<!-- 将path.js的所有对象的isdefault改为false -->
					<view @click="openPathList" class="font-weight font-sm d-flex a-center">
						请选择收货地址
					</view>
				</template>
			</view>
			<view class="iconfont icon-you ml-auto"></view>
		</view>

		<!-- showArrow代表右箭头图标 -->
		<view style="border-top-left-radius: 25rpx;border-top-right-radius: 25rpx;margin-top: -25rpx;overflow: hidden;">
			<view class="bg-white">
				<uni-list-item showArrow>
					<view class="d-flex a-center">
						<image v-for="(item,index) in goodsList" :key="index" :src="item.cover"
							style="width: 100rpx;height: 100rpx;" class="rounded mr"></image>
					</view>
					<view slot="rightContent">共{{goodsList.length}}件</view>
				</uni-list-item>
				<uni-list-item title="商品总价" :showArrowIcon="false">
					<view slot="rightContent">
						<price color="text-dark">{{price}}</price>
					</view>
				</uni-list-item>
				<uni-list-item title="运费" :showArrowIcon="false">
					<view slot="rightContent">包邮</view>
				</uni-list-item>
					<uni-list-item title="优惠券" @click="openCoupon">
						<!-- <view slot="rightContent" class="text-light-muted">无可用</view> -->
						<view slot="rightContent" :class="couponCount>0?'main-text-color':'text-light-muted'">
							<!-- coupon.id>0,表示有优惠券，因为data固定写了假的 -->
							<text v-if="coupon.id > 0">{{coupon.type===0 ? '-'+coupon.value+'元':coupon.value+'折'}}</text>
							<text v-else>{{couponCount===0?'无可用':couponCount+'张可用'}}</text>
						</view>
					</uni-list-item>
				<uni-list-item :showArrowIcon="false">
					<text class="main-text-color">小计</text>
					<view slot="rightContent">
						<price>{{price}}</price>
					</view>
				</uni-list-item>
				<divider></divider>
				<uni-list-item title="发票" extraStyle="width:300upx;">
					<view slot="rightContent">电子发票-个人</view>
				</uni-list-item>
			</view>
		</view>

		<view class="position-fixed d-flex a-center j-end border bottom-0 left-0 right-0 bg-white p font-3">
			合计:
			<view class="ml">
				<price>{{price}}</price>
			</view>
			<view :class="loading?'bg-secondary':'main-bg-color'" class="ml-2 px-2 py-1 text-white font-3" hover-class="main-bg-hover-color"
				style="border-radius: 80rpx;" @click="openPayMethods">
				{{loading?'加载中':'去支付'}}
			</view>
		</view>

	</view>
</template>

<script>
	import uniListItem from "@/components/uni-ui/uni-common/uni-list-item/uni-list-item.vue"
	import price from "@/components/price.vue"

	import {
		mapState,
		mapGetters
	} from 'vuex'

	export default {
		components: {
			uniListItem,
			price
		},
		computed: {
			...mapGetters(['defaultPath','totalPrice']), //对于getters,这里用this.defaultPath才能打印值
			...mapState({
				list: state => state.cart.list
			}),
			// 商品列表，简写
			// goodsList() {
			// 	return this.items.map(id => {
			// 		return this.list.find(v => v.id === id) //拿到数组
			// 	})
			// },
			// 最终价格
			price() {
				// 没有优惠券
				if (this.coupon.id === 0) {
					return this.totalPrice
				}
				if (this.coupon.type === 0) { //type:0固定金额(满减),1百分比(折扣)
					return this.totalPrice - this.coupon.value
				}
				return (this.totalPrice * (this.coupon.value / 10)).toFixed(2)
			},

			goodsList(){
				let list=this.items.map(id=>{
					let obj=this.list.find(v=>{ //find比对拿到封面图
						return v.id===id
					})
					return obj
				})
				return list
			}
		},
		data() {
			return {
				order_id:0,//订单id
				loading:false,//用户可能会点击去支付2次
				path: false,
				items: [], //[12, 13]
				couponCount: 0, //获取可用优惠券数量
				coupon: {
					id: 0, //coupon.id>0,表示有，因为这里固定写了假的
					type: 0,
					value: 0
				}
			}
		},
		onShow(){
			// this.order是在创建订单成功返回的res中拿到的，表示提交过订单了
			// 如果已经提交过订单了，重定向到订单详情页
			if(this.order_id>0){
				uni.redirectTo({
					url:'../order-detail/order-detail?id='+this.order_id,
				})
			}
			console.log(this.order_id,'ddd')
		},
		onLoad(e) {
			if (!e.detail) {
				uni.showToast({
					title: '请选择要下单的商品',
					icon: 'none'
				})
				return uni.navigateBack({
					delta: 1
				})
			}
			this.items = JSON.parse(e.detail)
			// console.log(e.detail) //[1793,1790,1791]

			// console.log(this.defaultPath,this.defaultPath[0]) //第一个拿到默认为true的数组，第二个拿到默认为true的对象
			if (this.defaultPath.length) { //判断是否存在默认地址，this.defaultPath.length为1
				this.path = this.defaultPath[0]
			}

			// 开启监听选择收货地址事件
			uni.$on('choosePath', (res) => { //uni.$on和uni.$emit互相传递(全局)参数
				console.log('接收到参数', res)
				this.path = res
			})

			// 监听选择优惠券，order-coupon
			uni.$on('couponUser', (res) => {
				this.coupon = res
			})

			// 计算当前价格有多少张可用优惠券
			this.getCouponCount()

		},
		onUnload(){ //卸载
			// 关闭监听选择收货地址事件
			uni.$off('choosePath')
			uni.$off('couponUser')
		},
		// order-coupon和coupon和order-confirm
		methods: {
			// 获取可用优惠券数量 //status等于0代表失效，1代表有效
			getCouponCount() { //used:0未使用,1已使用 //type:0固定金额(满减),1百分比(折扣)
				this.$H.post('/coupon_count', {
					price: this.totalPrice
				}, {
					token: true
				}).then(res => {
					this.couponCount = res
					console.log(res,'获取可用优惠券数量') //0
				}).catch(err => {
					uni.showToast({
						title: '获取可用优惠券数量失败',
						icon: 'none'
					})
				})
			},
			 //去支付/创建订单页
			openPayMethods() {
			
			// 防止重复下单
			if(this.loading){
				console.log(this.loading,'this.loading')
				return
			}
			
				// 判断是否选择收货地址
				if(!this.path){
					return uni.showToast({
						title:'请选择收货地址',
						icon:'none'
					})
				}
				this.loading=true
				
				let id=this.goodsList.map(v=>v.id)
				let price=this.goodsList.map(v=>v.pprice)
				id=id.join(',')
				price=price.join(',')
			// // 	for(let i=0;i<this.goodsList.length;i++){
			// // 		if(i!==i){
						
			// // price=price[i]
			// // 	price+=price
				
			// // 	}
			// // 	}
				
				// console.log(id,price)
				
					setTimeout(()=>{
						uni.navigateTo({ //创建订单成功再去跳转
							url:'../pay-methods/pay-methods?detail='+JSON.stringify({
								id,
								price
							})
						})
						this.loading=false //写在.then和.catch里的跳转页面之前(支付成功或失败都要还原状态)
						console.log(this.loading,'setTimeout')
						 this.order_id=2 //创建订单成功返回的res中拿到的
					// 通知购物车更新数据，创建好订单页后通知购物车要更新
					uni.$emit('updateCart')
					},2000)
					
				
				
				// let options={
				// 	user_addresses_id:this.path.id,
				// 	items:this.items.join(',')
				// }
				
				// // 是否选择优惠券
				// if(this.coupon.id>0){ //表示有优惠券
				// 	options.coupon_user_id=this.coupon.id
				// }
				
				// this.$H.post('/order',options,{ //购物车下单/创建订单
				// 	token:true
				// }).then(res=>{
				// 	console.log(res,'服务端失败')
				// this.loading=false
				// 	uni.navigateTo({ //创建订单成功再去跳转
				// 		url:'../pay-methods/pay-methods?detail='+JSON.stringify({
				// 			id:res.id,
				// 			price:res.total_price
				// 		})
				// 	})
				// // 保存订单id
				// this.order_id=res.id
				// // 通知购物车更新数据，创建好订单页后通知购物车要更新
				// uni.$emit('updateCart')
				
				// }).catch(err=>{
				// 	console.log(err) //undefined
				// 	uni.showToast({
				// 		title:'创建订单失败',
				// 		icon:'none'
				// 	})
				// })
				
				// uni.navigateTo({
				// 	url: '../pay-methods/pay-methods'
				// })
			},
			openPathList() { //点击请选择收货地址
				uni.navigateTo({
					url: '../user-path-list/user-path-list?type=choose'
				})
			},
			// 选择优惠券
			openCoupon(){
				uni.navigateTo({
					url:'../order-coupon/order-coupon?detail='+JSON.stringify({
						price:this.totalPrice
					})
				})
			}
		}
	}
</script>

<style>

</style>
