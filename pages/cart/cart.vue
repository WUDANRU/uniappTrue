<template>
	<!-- <view> -->

	<!-- 最外一层的view-->
	<view class="animated fadeIn faster">

		<loading-plus v-if="beforeReady"></loading-plus>

		<!-- 	 <view style="z-index: 10000;left:0;top:0;right:0;bottom:0;background: #fff;" class="position-fixed d-flex a-center j-center font-sm main-text-color"
		v-if="beforeReady">
			加载中...
		</view> -->

		<uni-nav-bar :fixed="true" :rightText="isedit?'完成':'编辑'"  @clickRight="isedit=!isedit" statusBar title="购物车"
			:shadow="false">
		</uni-nav-bar>
		<!-- <view style="height:1000px;"></view> 如果写了这个上面那个不会固定住的, 见 fixed="true"和pages.json-->

		<!-- 购物车为空  v-if="disableSelectAll"-->
		<view v-if="list.length===0" class="py-5 d-flex a-center bg-white border" style="padding-left: 20%;">
			<view class="iconfont icon-gouwuche1 text-light-muted" style="font-size:60upx;"></view>
			<text class="text-light-muted" style="padding:30upx;">购物车还是为空</text>
			<view class="px-2 py-1 border border-light-secondary rounded" hover-class="bg-light-secondaary">去逛逛</view>
		</view>

		<!-- a-self-end处于垂直的地方的底部 -->
		<!-- 将radio单选框变成复选框,加了:checked="checked" -->
		<!-- <label class="radio" @click="selectItem(1)">
		<radio value="1" color="#FD6801" :checked="checked"/>
	</label> -->

		<!-- 购物车商品列表  v-else-if="!disableSelectAll" -->
		<!-- <view class="bg-white px-2" v-else-if="list.length!==0"> -->
		<view class="bg-white px-2" v-if="list.length!==0">
			<!-- 列表 -->
			<view v-for="(item,index) in list" :key="index"
				class="d-flex a-center py-3 border-bottom border-light-secondary">
				<!-- 这个点击事件调用的是store的mutation里的，不能在methods再写一个方法 -->
				<label @click="selectItem(index)" class="radio d-flex a-center j-center flex-shrink"
					style="width: 80upx;height: 80upx;">
					<radio value="item.id" color="#FD6801" :checked="item.checked" />
				</label>

				<image :src="item.cover" mode="widthFix" style="z-inde:3000;width: 150rpx;"
					class="border border-light-secondary rounded p-1 flex-shrink">
				</image>

				<view class="flex-1 d-flex flex-column pl-2">
					<view class="text-dark" style="font-size: 35upx;">
						{{item.title}}
					</view>

					<!-- //单规格0没有属性 多规格1有属性
		// skus_type:0
		// skus_type:1   skusText:"黄色,标配" -->

					<!-- 规格属性 -->
					<view class="d-flex text-light-muted mb-1" :class="isedit?'p-1 bg-light-secondary mb-2':''"
						@tap.stop="showPopup(index,item)" v-if="item.skus_type === 1">
						{{item.skusText}}
						<!-- <text class="mr-1" v-for="(attr,attrIndex) in item.attrs"
							:key="attrIndex">{{attr.list[attr.selected].name}}</text> -->
						<view v-if="isedit" class="iconfont icon-bottom font-2 ml-auto"></view>
					</view>


					<view class="mt-auto d-flex j-sb">
						<price>{{item.pprice}}</price>
						<view class="a-self-end">
							<uni-number-box :min="item.minnum" :value="item.num" :max="item.maxnum"
								@change="changeNum($event,item,index)">
							</uni-number-box>
						</view>
					</view>
				</view>
				<!-- $event是点击数量(加或减)后的值 -->
			</view>
		</view>

		<!-- 合计 -->
		<!-- #ifndef MP -->
		<view v-if="list.length!==0" class="d-flex a-center position-fixed border-top border-light-secondary a-stretch"
			style="height: 100upx;z-index:100;left:0;right:0;bottom:50px;background:#fff;">
			<label @click="doSelectAll" class="radio d-flex a-center j-center flex-shrink" style="width: 120upx;">
				<!-- 是否全选 -->
				<!--  disable代表禁用状态 :disable="disableSelectAll"  -->
				<radio color="#FD6801" :checked="checkedAll" />
			</label>
			<template v-if="!isedit">
				<!-- isedit为true是编辑 -->
				<view class="flex-1 d-flex a-center font-3" style="justify-content: center;">
					合计 <price>{{totalPrice}}</price>
				</view>
				<view class="flex-1 d-flex a-center j-center main-bg-color text-white font-3" @tap="orderConfirm"
					hover-class="main-bg-hover-color">
					结算
				</view>
			</template>
			<template v-else>
				<view class="flex-1 d-flex a-center font-2 main-bg-color text-white" style="justify-content: center;">
					移入收藏
				</view>
				<view @tap="dODelGoods" class="flex-1 d-flex a-center font-2 bg-danger text-white"
					style="justify-content: center;">
					删除
				</view>
			</template>
		</view>
		<!-- #endif -->
		
		<!-- 合计 -->
		<!-- #ifdef MP -->
		<view v-if="list.length!==0" class="d-flex a-center position-fixed border-top border-light-secondary a-stretch"
			style="height: 100upx;z-index:100;left:0;right:0;bottom:0;background:#fff;">
			<label @click="doSelectAll" class="radio d-flex a-center j-center flex-shrink" style="width: 120upx;">
				<!-- 是否全选 -->
				<!--  disable代表禁用状态 :disable="disableSelectAll"  -->
				<radio color="#FD6801" :checked="checkedAll" />
			</label>
			<template v-if="!isedit">
				<!-- isedit为true是编辑 -->
				<view class="flex-1 d-flex a-center font-3" style="justify-content: center;">
					合计 <price>{{totalPrice}}</price>
				</view>
				<view class="flex-1 d-flex a-center j-center main-bg-color text-white font-3" @tap="orderConfirm"
					hover-class="main-bg-hover-color">
					结算
				</view>
			</template>
			<template v-else>
				<view class="flex-1 d-flex a-center font-2 main-bg-color text-white" style="justify-content: center;">
					移入收藏
				</view>
				<view @tap="dODelGoods" class="flex-1 d-flex a-center font-2 bg-danger text-white"
					style="justify-content: center;">
					删除
				</view>
			</template>
		</view>
		<!-- #endif -->
		
			<!-- #ifndef MP -->
		<view v-if="list.length===0" class="d-flex a-center position-fixed border-top border-light-secondary a-stretch"
			style="height: 100upx;z-index: 100;left:0;right:0;bottom:50px;background:#fff;">
			<label @click="doSelectAll" class="radio d-flex a-center j-center flex-shrink" style="width: 120upx;">
				<!-- 是否全选 -->
				<!--  disable代表禁用状态 删了:disable="disableSelectAll"和:checked="checkedAll" -->
				<radio color="#FD6801" :disabled="true" />
			</label>
			<view class="flex-1 d-flex a-center font-3" style="justify-content: center;color:#bfbfbf;">
				合计 <price style="color:#bfbfbf;">0元</price>
			</view>
			<view style="background-color:#bfbfbf;" class="flex-1 d-flex a-center j-center text-white font-3"
				hover-class="main-bg-hover-color">
				结算
			</view>
		</view>
		<!-- #endif -->

		<!-- 合计 -->
		<!-- #ifdef MP -->
		<view v-if="list.length===0" class="d-flex a-center position-fixed border-top border-light-secondary a-stretch"
			style="height: 100upx;z-index: 100;left:0;right:0;bottom:0;background:#fff;">
			<label @click="doSelectAll" class="radio d-flex a-center j-center flex-shrink" style="width: 120upx;">
				<!-- 是否全选 -->
				<!--  disable代表禁用状态 删了:disable="disableSelectAll"和:checked="checkedAll" -->
				<radio color="#FD6801" :disabled="true" />
			</label>
			<view class="flex-1 d-flex a-center font-3" style="justify-content: center;color:#bfbfbf;">
				合计 <text style="color:#bfbfbf;">￥0元</text>
			</view>
			<view style="background-color:#bfbfbf;" class="flex-1 d-flex a-center j-center text-white font-3"
				hover-class="main-bg-hover-color">
				结算
			</view>
		</view>
		<!-- #endif -->

		<!-- 属性筛选框 -->
		<sku-popup></sku-popup>
		
		<view class="text-center main-text-color font-sm font-weight mt-5">
			为你推荐
		</view>
		<view class="position-relative d-flex a-center j-center text-secondary mb-3 pt-3">
			<view style="background: #ffffff;z-index: 2;" class="px-2 position-absolute">
				买的人还买了</view>
			<view class="position-absolute" style="height: 1upx;left: 0;right: 0;background-color: #DDDDDD;"></view>
		</view>
		<!-- 为你推荐 -->
		<view class="row j-sb bg-white">
			<!-- type="redirectTo" 这个重定向会影响角标及时出现 -->
			<common-list v-for="(item,index) in hotList" :key="index" :item="item" :index="index">
			</common-list>
		</view>

		<!-- 占位 -->
		<view style="height:100upx;"></view>

	</view>
</template>
<!-- :statusBar="true"可以简写成statusBar，这个可以让手机状态栏隐藏 -->
<script>
	// uni.css改成和新版本一样: src: url('~@/static/uni.ttf')并且从新版本复制过来uni.ttf粘贴到static文件夹
	// import statusBar from "./uni-status-bar.vue";  // 手机状态栏
	import loading from "@/components/mixin/loading.js"
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue"
	import price from "@/components/price.vue"
	import uniNumberBox from "@/components/uni-ui/uni-number-box/uni-number-box.vue"
	import commonList from "@/components/common/common-list.vue"
	import skuPopup from "@/components/sku-popup.vue"

	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex'

	export default {
		mixins: [loading],
		components: {
			uniNavBar,
			price,
			uniNumberBox,
			commonList,
			skuPopup
		},
		data() {
			return {
				isedit: false,
				// checked:false,
				hotList: [],
			}
		},
		computed: {
			...mapState({
				list: state => state.cart.list,
				selectedList: state => state.cart.selectedList
				// popupShow: state => state.cart.popupShow
			}),
			...mapGetters([
				'checkedAll',
				'totalPrice',
				// 'disableSelectAll',
				// 'popupData'
			])
		},
	onLoad() { 
			this.getData()
			//1、点击原生导航栏，search页面，加入购物车后，回到首页，角标没有更新，还停留在原来的购物车数量上
			//2、是因为这个全局事件(首页)没有触发(cart和detail页面触发了)
			//3、吧全局事件剪切到app.vue页面
			// uni.$on('updateCart',()=>{ //detail的addCart传过来的，写在onLoad页面加载里
			// 	this.getData()
			// })
		},
		beforeDestroy(){
			uni.$off('updateCart')
		},
		// onShow() { //每次回到这个页面，每次调用
		// 	this.getData()
		// },
		onPullDownRefresh(){
			this.getData()
		},
		methods: {
			// change2(index,label){
			// 	console.log(index,label,'index')
			// 	label.selected=index
			// },
			...mapMutations([ //点击事件
				'selectItem',
				'initCartList',
				'unSelectAll'
			]),
			...mapActions([ //点击事件
				'doSelectAll',
				'dODelGoods',
				'doShowPopup',
				'updateCartList' //更新购物车列表/获取购物车数据
				// 'doHidePopup'
			]),
			// selectItem(id,){
			// 	console.log(id)
			// 	this.checked=!this.checked
			// },
			
			getData() { //没有登录是看不了购物车数据的,会提示未登录需要登录
				
				// 获取购物车数据
				this.updateCartList().then(res=>{
					// cart.js写了promise了，这里才可以.then后写停止刷新
					uni.stopPullDownRefresh()
				}).catch(err=>{
					uni.stopPullDownRefresh()
				})
				
				// 获取购物车数据  // 剪切到cart.js的actions的更新购物车列表里，因为启动页面，角标没有显示，为了App.vue页面可以用
				// this.$H.get('/cart', {}, {
				// 	token: true,
				// 	toast: false
				// }).then(res => {
				// 	// 取消选中状态
				// 	this.unSelectAll() //全选打勾，一刷新，底部打勾还会显示，所以加了这个
				// 	// console.log(res, 'initCartList')
				// 	this.initCartList(res)
				// 	uni.stopPullDownRefresh()
				// }).catch(err=>{
				// 	uni.stopPullDownRefresh()
				// })
				
				// 获取热门推荐
				this.$H.get('/goods/hotlist').then(res => {
					this.hotList = res.map(v => {
						return {
							id: v.id,
							cover: v.cover,
							title: v.title,
							desc: v.desc,
							oprice: v.min_oprice,
							pprice: v.min_price
						}
					})
				})
			},
			// 获取购物车商品sku
			showPopup(index,item){  //编辑状态才吧购物车页面的弹出框弹出来
						if(!this.isedit){//未处于编辑状态
							return
						}
			this.$H.get('/cart/'+item.id+'/sku',{},{
				token:true
			}).then(res=>{
				console.log(res,'hhhh')
				// 商品规格（选项部分）
				let check=item.skusText.split(',') //item.skusText是字符串，split返回数组
				res.selects = res.goods_skus_card.map((v,i) => {
						// console.log(v,i,'vvvvviiiiiiiiii')
					let selected=0
					let list = v.goods_skus_card_value.map((v1,i1) => {
						// console.log(v1,i1,'v1v1v1v1v1v1,i1i1i1i1i1i1i1')
						console.log(check[i],v1.value,i1,i,'value')
						if(check[i]===v1.value){
							selected=i1 //拿到索引
							console.log(selected,'selected')
						}
						return {
							id: v1.id,
							name: v1.value
						}
					})
					return {
						id: v.id,
						title: v.name,
						selected,
						list: list
					}
				})
				console.log(res.selects,'res.selects')
				res.goods_skus.forEach(item => { //用户选中的
					let arr = []
					for (let key in item.skus) {
						arr.push(item.skus[key].value)
					}
					item.skusText = arr.join(',') //黄色,套餐一 //join返回字符串
				console.log(item.skusText,'dddddddddd')
				})
				
					// if(this.isedit){
						console.log(this.isedit)
						this.doShowPopup({
							index,
							data:res,
							})
					// }
				})
			},
			changeNum(e, item, index) { //e是数量
			if(item.num===e) return;
				// console.log(e,item.num,'happy') //20,10
				uni.showLoading({
					title: '加载中...'
				})
			// '/cart/updatenumber'+item.id如果写成这样会报错，弹出id必须为整数
				this.$H.post('/cart/updatenumber/'+item.id,{ //修改购物车商品数量 
					num: e
				},{
					token: true
				}).then(res => {
					// console.log(res,'console') //页面渲染出来会触发两次true
					item.num = e
					uni.hideLoading()
				})
				// item.num = e
			},
			// 订单结算
			orderConfirm() {
				if(this.selectedList.length===0){
					return uni.showToast({
						title:'请选择要结算的商品',
						icon:'none'
					})
				}
				uni.navigateTo({
					url: '../order-confirm/order-confirm?detail='+JSON.stringify(this.selectedList)
				})
			}
		}
	}
</script>

<style>
</style>
