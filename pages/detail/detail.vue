<template>
	<view>
		<!-- 商品详情大图 -->
		<swiper-image :resdata="banners" height="750" preview />

		<!-- 基础详情 -->
		<base-info :detail="detail" :show-price="showPrice"></base-info>

		<!-- 滚动商品特性 w170*h110 -->
		<scroll-attrs :baseAttrs="baseAttrs"></scroll-attrs>

		<!-- 属性选择  uni-list-item.vue文件加了<slot></slot> -->
		<view class="p-1 pt-2">
			<view class="rounded border bg-light-secondary">
				<!--  <uni-list-item  title="已选">  -->
				<uni-list-item showArrow newStyle="background-color: #f1f1f1;" v-if="detail.sku_type===1">
					<view class="d-flex a-center" @click="show('attr')">
						<text class="mr-2 text-muted">已选</text>
						<text>{{checkedSkus}}</text>
						<!-- <text>火焰红 64G 标配</text> -->
					</view>

				</uni-list-item>
				<uni-list-item newStyle="background-color: #f1f1f1;" @click="goToCoupon">
					<view class="d-flex">
						<text class="mr-2 text-muted">优惠券</text>
						<text class="main-text-color">马上领取</text>
					</view>
				</uni-list-item>
				<uni-list-item newStyle="background-color: #f1f1f1;">
					<view class="d-flex" @click="show('express')">
						<text class="mr-2 text-muted">配送</text>
						<text class="mr-2">北京 东城区</text>
						<text class="main-text-color">现配</text>
					</view>
				</uni-list-item>
				<uni-list-item newStyle="background-color: #f1f1f1;" extraStyle="width:2%;" :showArrowIcon="false">
					<view class="d-flex" style="justify-content: space-around;" @click="show('service')">
						<view style="margin-left:-20upx;" class="text-muted font-1 d-flex j-center">
							<view class="iconfont d-flex  icon-finish main-text-color"></view>
							小米自营
						</view>
						<view class="text-muted font-1 mr-1 d-flex j-center">
							<view class="iconfont icon-finish main-text-color"></view>
							小米发货
						</view>
						<view style="margin-left:-20upx;" class="text-muted font-1 mr-1 d-flex j-center">
							<view class="iconfont icon-finish main-text-color"></view>
							七天无理由退货
						</view>
					</view>
				</uni-list-item>

			</view>
		</view>

		<!-- 横向滚动评论
			外层 w620*h380
			头像 w70*h70
			图片 h115
			:goods_id="detail.id"
		-->
		<scroll-comments :goods_id="detail.id" :comments="comments"></scroll-comments>

		<!-- 商品详情 -->
		<u-parse className="uparse" :content="context" @preview="preview" @navigate="navigate"></u-parse>

		<!-- 热门推荐 -->
		<card headTitle="热门推荐" :headTitleWeight="false" :headBorderBottom="false">
			<view class="row j-sb">
				<common-list v-for="(item,index) in hotList" :key="index" :item="item" :index="index">
				</common-list>
			</view>
		</card>

		<!-- 底部操作条 -->
		<bottom-btn @showed="show('attr')"></bottom-btn>

		<!-- 属性筛选框 -->
		<common-popup :popupClass="popup.attr" @hide="hide('attr')">
			<!-- 
			商品信息(275rpx)
			图片 180*180
			-->
			<view class="d-flex a-center" style="height: 275rpx;">
				<image src="../../static/images/demo/list/1.jpg" mode="widthFix" style="height: 180rpx;width: 180rpx;"
					class="border rounded"></image>
				<view class="pl-2">
					<!-- <price priceSize="font-lg" unitSize="font">2365</price> -->
					<price priceSize="font-lg" unitSize="font">{{showPrice}}</price>
					<!-- <text class="d-block">
						火焰红 64GB 标配
					</text> -->
					<text class="d-block">
						{{checkedSkus}}
					</text>
				</view>
			</view>

			<!-- 
			表单部分(660rpx)
			-->
			<scroll-view scroll-y style="height: 660rpx;width:750rpx;">
				<card :headTitle="item.title" :headTitleWeight="false" :headBorderBottom="false" :key="index"
					v-for="(item,index) in selects">
					<zcm-radio-group :label="item" :selected.sync='item.selected'></zcm-radio-group>
				</card>
				<view class="d-flex j-sb a-center p-2 border-top border-light-secondary">
					<text>购买数量</text>
					<uni-number-box :min="1" :max="maxStock" :value="detail.num" @change="detail.num=$event">
					</uni-number-box>
				</view>
			</scroll-view>

			<!--
			 按钮(100rpx)
			 -->
			 <view class="text-white font-sm d-flex a-center j-center" :class="maxStock===0?'bg-secondary':'main-bg-color'"
			 	 hover-class="maxStock!==0?main-bg-hover-color:''" style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;" @tap.stop="addCart">
			 		{{maxStock===0?'暂无库存':'加入购物车'}}
			 	</view>
			 </common-popup>

		<!-- 收货地址 -->
		<!-- 275+660=935-100=835 -->
		<common-popup :popupClass="popup.express" @hide="hide('express')">
			<scroll-view scroll-y class="w-100" style="height: 935rpx;">
				<uni-list-item :newStyle="'background: none;border-bottom: 1upx solid #bfbfbf;'"
					v-for="(item,index) in pathList" :key="index">
					<view class="iconfont icon-dingwei font-weight font-3">{{item.name}}</view>
					<view class="font-1 text-light-muted mt-1">
						{{item.path}} {{item.detailPath}}
					</view>
				</uni-list-item>
			</scroll-view>
			<!--
					按钮(100rpx)
					-->
			<view class="font-3 main-bg-color text-white d-flex a-center j-center" hover-class="main-bg-hover-color"
				style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;" @tap.stop="openCreatePath">
				选择新的地址
			</view>
		</common-popup>

		<!-- 服务说明 -->
		<common-popup :popupClass="popup.service" @hide="hide('service')">
			<view class="d-flex a-center j-center font-sm border-bottom border-light-secondary" style="height: 100rpx;">
				服务说明
			</view>
			<scroll-view scroll-y class="w-100" style="height: 835rpx;">
				<view class="py-1">
					<view class="d-flex a-center">
						<view class="iconfont icon-finish main-text-color mr-1"></view>
						小米自营
					</view>
					<text class="text-light-muted font-2 pl-4">
						不管满多少，就是不包邮
					</text>
				</view>
			</scroll-view>
			<!-- 
		 按钮(100rpx)
		 -->
			<view class="main-bg-color text-white font-3 d-flex a-center j-center" hover-class="main-bg-hover-color"
				style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;" @tap.stop="hide('service')">
				确定
			</view>
		</common-popup>




	</view>
</template>

<script>
	import swiperImage from '@/components/swiper-image1.vue'
	import baseInfo from '@/components/base-info.vue'
	import scrollAttrs from '@/components/scroll-attrs.vue'
	import uniListItem from '@/components/uni-ui/uni-common/uni-list-item/uni-list-item.vue'
	import scrollComments from "@/components/scroll-comments.vue"
	import uParse from '@/components/uni-ui/uParse/src/wxParse.vue' //解析富文本
	import card from "@/components/common/card.vue"
	import commonList from "@/components/common/common-list.vue"
	import bottomBtn from "@/components/bottom-btn.vue" //详情页面的，里面有角标组件
	import commonPopup from "@/components/common-popup.vue"
	import price from "@/components/price.vue"
	import zcmRadioGroup from "@/components/common/radio-group.vue"
	import uniNumberBox from "@/components/uni-ui/uni-number-box/uni-number-box.vue"

	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'

	// var htmlString = `
	// <p>
	// 	<img src="https://i8.mifile.cn/v1/a1/9c3e29dc-151f-75cb-b0a5-c423a5d13926.webp">
	// 	<img src="https://i8.mifile.cn/v1/a1/f442b971-379f-5030-68aa-3b0accb8c2b9.webp">
	// 	<img src="https://i8.mifile.cn/v1/a1/63b700b6-643e-ec18-fdf3-da66b4b4173f.webp">
	// 	<img src="https://i8.mifile.cn/v1/a1/e9dbf276-193e-11c4-99a6-3097fde82350.webp">
	// 	<img src="https://i8.mifile.cn/v1/a1/1249d3ee-2990-a2b4-28d9-f719c2417b1f.webp">
	// 	<img src="https://i8.mifile.cn/v1/a1/97c79915-64b2-808c-53b4-4345652a179f.webp">
	// 	<img src="https://i8.mifile.cn/v1/a1/cd0fbe1e-a1b3-a87a-f4a6-6fb08ec54931.webp">
	// </p>
	//     `
	export default {
		components: {
			swiperImage,
			scrollAttrs,
			baseInfo,
			uniListItem,
			scrollComments,
			uParse,
			card,
			commonList,
			bottomBtn,
			commonPopup,
			price,
			zcmRadioGroup,
			uniNumberBox
		},
		data() {
			return {
				// popupClass: "none",
				popup: {
					attr: "none",
					express: "none", //隐藏地址
					service: "none"
				},
				banners: [],
				// context: htmlString, //从uParse复制过来的
				context: '',
				comments: [],
				detail: {},
				baseAttrs: [],
				hotList: [],
				selects: [],
			}
		},
		computed: {
			...mapState({
				pathList: state => state.path.list
			}),
			...mapGetters(['cartCount']),
			// 用户选中的sku
			checkedSkus() {
				// 拿到选中skus组成字符串,默认选中的是第一个
				let checkedSkus = this.selects.map(v => {
					// console.log(v.list) //两个数组[ [{},{}] , [{},{}] ]
					return v.list[v.selected].name // ['黄色', '标配']
				})
				return checkedSkus.join(',')
				// 拿到skusText
				// this.selects[0]
			},
			// 选中skus的索引
			checkedSkusIndex() {
				if (!Array.isArray(this.detail.goodsSkus)) {
					return -1
				}
				// 数组可以通过查找下标来拿
				let index = this.detail.goodsSkus.findIndex((item) => {
					return item.skusText === this.checkedSkus //goodsSkus的四种可能比对goodsSkusCard(this.selects)规格属性
				})
				return index
			},
			// 显示价格
			showPrice() { //没有选中属性价格就显示sku最小的价格，选中属性价格就跟着改变
			// console.log(this.checkedSkusIndex) //0
			if(this.checkedSkusIndex < 0){
				console.log(this.detail.min_price,this.checkedSkus,'---------------------------------------')
				// if (!this.checkedSkus) {
					return this.detail.min_price || 0.00 //吧页面所有的信息都放在this.detail
				}
				return this.detail.goodsSkus[this.checkedSkusIndex].pprice
				console.log(this.checkedSkusIndex, 'index')
			},
			// 最大库存  skus_type是skus类型，0单一规格，1多规格
			maxStock() {
				if (this.detail.sku_type === 0) {
					// console.log(this.detail, '//////////////////////////////////')
					return this.detail.stock
				}
				// console.log(this.checkedSkusIndex) //-1或1
				if (!Array.isArray(this.detail.goodsSkus)) {
					return 100
				}
				// 0的话禁用加入购物车
				 // this.detail.goodsSkus[this.checkedSkusIndex].stock=0
				 // if(this.detail.goodsSkus[this.checkedSkusIndex].stock===0){ 
					 		 // console.log(this.detail.goodsSkus[this.checkedSkusIndex].stock,'stock') 
					  return this.detail.goodsSkus[this.checkedSkusIndex].stock //假如库存是0，点击黄色和套餐一，购买数量却能一直加，是因为要去掉||100
				 // }
			},
			// 套餐固定套餐一，点击黄色和绿色，最大数量分别为18和14，问题：先点击黄色再点击绿色，值一直停留在18,uni-number-box组件一直显示18
			// 最大库存变化(uni-number-box组件增加了这个)
			// max(newVal,oldVal){
			// 	console.log(newVal)
			// if(this.inputValue>newVal){ //newVal最大的值，this.inputValue默认是1
			// 	this.inputValue=newVal
			// }
			// }
		},
		onLoad(e) {
			if (e.detail) {
				console.log(e.detail)
				this.__init(JSON.parse(e.detail))
			}
		},
		methods: {
			...mapMutations(['addGoodsToCart']),
			// 初始化页面
			__init(data) {
				this.$H.get('/goods/' + data.id).then(res => {
					console.log(res)
					this.banners = res.goodsBanner.map(v => {
						return {
							src: v.url
						}
					})
					// 初始化基本信息
					this.detail = res
					this.detail.num = 1
					console.log(this.detail, 'rrrrrrrr')
					uni.setNavigationBarTitle({
						title: res.title
					})
					// 滚动商品属性
					this.baseAttrs = res.goodsAttrs.map(v => {
						return {
							icon: "icon-cpu",
							title: v.name,
							desc: v.value
						}
					})
					// 评论  //评价不是针对商品，是针对订单
					this.comments = res.hotComments.map(v => {
						// var imglist = []
						// for (let k in v.imglist) { // v.imglist是后端数据，是对象，k为0，for in遍历对象
						// 	imglist.push(v.imglist[k].src)
						// }
						return {
							id: v.id,
							userpic: v.user.avatar,
							username: v.user.nickname,
							create_time: v.review_time, //"2019-09-01 20:34:27" 转为 2019-09-01 下午 8:34
							goods_num: v.goods_num,
							context: v.review.data,
							imglist: v.review.image
							// context: v.context,
							// imglist: imglist
						}
					})

					// 商品详情
					this.context = res.content
					// 热门推荐
					this.hotList = res.hotList.map(v => {
						return {
							id: v.id,
							cover: v.cover,
							title: v.title,
							desc: v.desc,
							oprice: v.min_oprice,
							pprice: v.min_price
						}
					})

					if (this.detail.sku_type === 1) {
						// 商品规格（选项部分）
						this.selects = res.goodsSkusCard.map(v => {
							let list = v.goodsSkusCardValue.map(v1 => {
								return {
									id: v1.id,
									name: v1.value
								}
							})
							return {
								id: v.id,
								title: v.name,
								selected: 0,
								list: list
							}
						})
						// 选中属性的价格是从后端数据的goodsSkus来的,goodsSkus有属性的四种可能(可以判断价格)的，goodsSkus的skus是用户选中的颜色和套餐属性

						// 吧goodsSkus的skus组成skusText:"黄色,标配"

						// goodsSkus的[0-3]的pprice是用户选择的组合的单价
						// goodsSkus的[0-3]的pprice乘以购买数量得到最后的价格	

						// 商品规格（匹配价格）
						this.detail.goodsSkus.forEach(item => {
							let arr = []
							for (let key in item.skus) {
								arr.push(item.skus[key].value)
							}
							item.skusText = arr.join(',') //黄色,套餐一
						})
					}
				})
			},
			openCreatePath() {
				uni.navigateTo({
					url: '../user-path-edit/user-path-edit'
				})
				this.hide('express')
			},
			addCart() {//加入购物车
				if(this.maxStock===0){
					return
				}
				// 多规格: shop_id,单规格:商品id
				// skus_type:1为多规格,0为单规格
				// num商品数量
				console.log(this.detail,'this.detail')
				this.$H.post('/cart',{ //获取购物车数据
					shop_id:this.detail.sku_type===0?this.detail.id:this.detail.goodsSkus[this.checkedSkusIndex].id,
					skus_type:this.detail.sku_type,
					num:this.detail.num
				},{
					token:true
				}).then(res=>{
					console.log(res,'resresresresresresres')
					// 通知购物车页面更新数据
					uni.$emit('updateCart')
					console.log(this.cartCount,'this.cartCount')
					// 隐藏筛选框
					this.hide('attr')
					// 成功提示
					uni.showToast({
						title: '加入成功'
					})
				})
				
				// 组织数据
				// let goods = this.detail
				// console.log(this.detail.cover, this.detail.pprice, 'src')
				// goods['checked'] = false
				// goods['attrs'] = this.selects
				// // 加入购物车
				// this.addGoodsToCart(goods)
				// // 隐藏筛选框
				// this.hide('attr')
				// // 成功提示
				// uni.showToast({
				// 	title: '加入成功'
				// })
			},
			// 关闭模态框
			onBackPress() { //( 只对于app端起作用 )监听页面返回事件，点了detail页面的返回键返回的是首页，需要让它返回到上一个页面
				for (let key in this.popup) {
					// console.log(this.popup[key],'this.popup[key]')
					if (this.popup[key] !== 'none') {
						this.hide(key)
						// return true//写在这里反而阻止不了默认行为
					}
					// return true; //阻止默认行为，默认行为是返回到首页，只写这个的话，点击返回键是没有效果的
				}
			},
			show(key) {
				this.popup[key] = "show"
			},
			hide(key) {
				this.popup[key] = "hide"
				setTimeout(() => {
					this.popup[key] = "none"
				}, 200)
			},
			preview(src, e) { //从uParse复制过来的

			},
			navigate(href, e) {
				console.log(href, e)
			},
			// 进入领取优惠券页面
			goToCoupon(){
				this.navigateTo({//用户需要登录才能领取
					url:'/pages/coupon/coupon'
				})
			}
		}
	}
</script>

<style>
	.uparse .p {
		padding: 0 !important;
	}

	.uparse view,
	.uparse uni-view {
		line-height: 0 !important;
	}
</style>
