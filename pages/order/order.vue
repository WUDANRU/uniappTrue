<template>
	<view style="background: #F5F5F5;">
		<!-- 
		<view class="position-relative border" style="height:400rpx;">
			<no-thing icon="no_pay" msg="你还没有待付款订单"></no-thing>
		</view> -->

		<!-- 选项卡 -->
		<view class="d-flex bg-white a-center font-md text-muted border-top border-bottom">
			<view class="flex-1 d-flex a-center j-center py-2" v-for="(item,index) in tabBars" :key="index"
				:class="tabIndex === index ? 'tabactive' : ''" @tap="changeTab(index)">
				{{item.name}}
			</view>
		</view>

		<!-- 订单列表 -->
		<block v-for="(tab,tabI) in tabBars" :key="tabI">
			<view class="position-relative" v-show="tabI === tabIndex" style="min-height: 440rpx;">
				<template v-if="tab.list.length > 0">
					<!-- 订单列表 -->
					<block v-for="(item,index) in tab.list" :key="index">
						<order-list :item="item" :index="index" @update="getOrderList"></order-list>
					</block>
				</template>
				<!-- 默认无 -->
				<template v-else>
					<no-thing :icon="tab.no_thing" :msg="tab.msg"></no-thing>
				</template>
			</view>
		</block>

		<view class="text-center main-text-color font-sm font-weight mt-5">
			为你推荐
		</view>
		<view class="position-relative d-flex a-center j-center text-secondary mb-3 pt-3">
			<view style="background: #f5f5f5;z-index: 2;" class="px-2 position-absolute">
				买的人还买了</view>
			<view class="position-absolute" style="height: 1upx;left: 0;right: 0;background-color: #DDDDDD;"></view>
		</view>
		<!-- 为你推荐 -->
		<view class="row j-sb bg-white">
			<common-list v-for="(item,index) in hotList" :key="index" :item="item" :index="index">
			</common-list>
		</view>

	</view>
</template>

<script>
	import commonList from "@/components/common/common-list.vue"
	import noThing from "@/components/no-thing.vue"
	import orderList from "@/components/order-list.vue"

	export default {
		components: {
			commonList,
			noThing,
			orderList
		},
		data() {
			return {
				tabIndex: 0,
				tabBars: [{
						name: "全部",
						key: 'all',
						no_thing: "no_pay",
						msg: "你还没有订单",
						list: []
					},
					{
						name: "待付款",
						key: 'paying',
						no_thing: "no_pay",
						msg: "你还没有待付款订单",
						list: []
					},
					{
						name: "待收货",
						key: 'receiving',
						no_thing: "no_receiving",
						msg: "你还没有待收货订单",
						list: []
					},
					{
						name: "待评价",
						key: 'reviewing', //key为订单列表接口必选的参数
						no_thing: "no_comment",
						msg: "你还没有待评价订单",
						list: []
					}
				],
				hotList: []
			}
		},
		computed: {
			key(){
				return this.tabBars[this.tabIndex].key
			}
		},
		onLoad(e){
			if(e.tabIndex){
				this.tabIndex=parseInt(e.tabIndex)
			}
			this.getHotList()
		},
		onShow(){
			this.getOrderList()
		},
	// {...,...,"skus_type": 1,
	 // "goods_skus": {
	 //                        "id": 9,
	 //                        "skus": {
	 //                            "0": {
	 //                                "goods_skus_card_id": 1,
	 //                                "id": 2,
	 //                                "name": "颜色",
	 //                                "value": "绿色"
	 //                            },
	 //                            "1": {
	 //                                "goods_skus_card_id": 2,
	 //                                "id": 6,
	 //                                "name": "套餐",
	 //                                "value": "套餐一"
	 //                            }
	 //                        }
	 //                    }}
		methods: {
			// 获取订单列表
			getOrderList() {
this.$H.post('/order/'+this.key,{},{ //待收货项里点击确认收货，商品就会跳到待评价里
	token:true
}).then(res=>{
this.tabBars[this.tabIndex].list=res.map(item=>{ //goods_id,商品id
	let order_items=item.order_items.map(v=>{
		let attrs=[]
		if(v.skus_type===1 && v.goods_skus && v.goods_skus.skus){
			let skus=v.goods_skus.skus
			for(let k in skus){ //用到for in,skus为对象
				attrs.push(skus[k].value) //["绿色","套餐一"]
			}
		}
		return {
			id:v.goods_id,
			cover:v.goods_item.cover,
			title:v.goods_item.title,
			pprice:v.price,
			attrs:attrs.join(','),
			num:v.num,
		}
	})
	return {
		id:item.id,
		create_time:item.create_time,
		status:this.$U.formatStatus(item),
		reviewed:item.reviewed,
		order_items,
		total_price:item.total_price
	}
})
})
			},
			// 获取热门推荐
			getHotList() {
				// this.hotList=this.hotList
				this.$H.get('/goods/hotlist').then(res=>{
					console.log(res,'热门推荐')
					this.hotList=res.map(v=>{
						return {
							id:v.id,
							cover:v.cover,
							title:v.title,
							desc:v.desc,
							oprice:v.min_oprice,
							pprice:v.min_price
						}
					})
				})
			},
			// 切换选项卡
			changeTab(index) {
				this.tabIndex = index
				this.getOrderList()
			}
		}
	}
</script>

<style>
	.tabactive {
		border-bottom: 5rpx solid #FD6801;
		color: #FD6801;
		margin-bottom: -5rpx;
	}
</style>
