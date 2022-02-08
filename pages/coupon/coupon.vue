<template>
	<view class="p-2">
		<coupon v-for="(item,index) in list" :key="index" :item="item" 
		:index="index" @click="getCoupon(item)">
		<!-- disabled代表是否领取，true代表已领取 -->
		<!-- status等于0代表失效，1代表有效 -->
			<text v-if="!item.status">已失效</text>
			<text v-else-if="item.disabled">已领取</text>
			<text v-else>马上领取</text>
		</coupon>
		<view v-if="list.length > 0"
		class="d-flex a-center j-center text-light-muted font-3 py">
			{{loadtext}}
		</view>
		<no-thing v-else msg="没有优惠券" />
	</view>
</template>

<script>
	
	import coupon from '@/components/coupon.vue'
	import noThing from '@/components/no-thing.vue';
	
	export default {
		components: {
			coupon,
			noThing
		},
		data() {
			return {
				page: 1,
				list: [],
				// 1.上拉加载更多 2.加载中... 3.没有更多了
				loadtext:"上拉加载更多"
				// list:[
				// 	{
				// 	title:"第三季仿微信立减100元",
				// 	start_time:"2019-10-01",
				// 	end_time:"2019-11-01",
				// 	price:100,
				// 	desc:"满300元使用",
				// 	status:true, //状态有效/可用
				// 	disabled:false //不会被禁用
				// },
				// {
				// 	title:"第三季仿微信立减100元",
				// 	start_time:"2019-10-01",
				// 	end_time:"2019-11-01",
				// 	price:100,
				// 	desc:"满300元使用",
				// 	status:true,
				// 	disabled:true
				// },
				// {
				// 	title:"第三季仿微信立减100元",
				// 	start_time:"2019-10-01",
				// 	end_time:"2019-11-01",
				// 	price:100,
				// 	desc:"满300元使用",
				// 	status:true,
				// 	disabled:true
				// }],
			}
		},
		onLoad() {
			this.getData()
		},
		onPullDownRefresh() {
			this.page = 1
			this.getData(true).then(res => {
				uni.stopPullDownRefresh()
			}).catch(err => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			if(this.loadtext !== '上拉加载更多')return
			this.loadtext='加载中...'
			this.page++
			this.getData()
		},
		// order-coupon和coupon和order-confirm
		methods: {
			// 获取数据
			getData(refresh=false) {
				return new Promise((resolve, reject) => {
					this.$H.get('/coupon/' + this.page, {}, {
						token: true
					}).then(res => {
						//status等于0代表失效，1代表有效
						// coupon_id是优惠券id, user_id是用户id
						console.log(res) //打印的status显示1，可是优惠券却是失效的
						let list = res.map(item => {
							let time = (new Date()).getTime()
							console.log(time, 'time', item.coupon_user.length)
							console.log(item.end_time, 'item.end_time')
							//优惠券的时间小于当前时间代表超时，除以1000就能变成13位
							let status = (item.end_time > time / 1000) && item.status
							return {
								id: item.id,
								title: item.name,
								start_time: item.start_time,
								end_time: item.end_time,
								price: item.value,
								desc: item.desc, //coupon_user有数据代表领取过了，
								status, // false已失效
								// 是否领取，true代表已领取，(res打印没有这个，这个是自己写的)
								disabled: (item.coupon_user.length > 0)
							}
						}) //status:true和disabled:false，如果是这样，代表可领取
					
					this.list=!refresh?[...this.list,...list]:[...list]
					
						this.loadtext=(res.length===10)?'上拉加载更多':'没有更多了'
						
						resolve(res)
					}).catch(err => {
						this.page--;
						reject(err)
					})
				})
			},
			// 领取优惠券
			getCoupon(item) {
				console.log(item)
				this.$H.post('/getcoupon/' + item.id, {}, {
					token: true
				}).then(res => {
					// 设为已领取状态
					item.disabled = true
					uni.showToast({
						title: '领取成功',
						icon: 'none'
					})
				})
			}
		}
	}
</script>

<style>

</style>
