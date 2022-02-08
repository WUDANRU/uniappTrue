<template>
	<!-- <common-popup :popupClass="popup.attr" @hide="hide('attr')"> -->
	<common-popup :popupClass="popupShow" @hide="doHidePopup">
		<!-- 
		商品信息(275rpx)
		图片 180*180
		-->
		<view class="d-flex a-center" style="height: 275rpx;">
			<image :src="popupData.cover" mode="widthFix" style="height: 180rpx;width: 180rpx;"
				class="border rounded"></image>
			<view class="pl-2">
				<price priceSize="font-lg" unitSize="font">{{showPrice}}</price>
			<!-- 	<text class="mr-1" v-for="(attr,attrIndex) in popupData.attrs" :key="attrIndex">
					{{attr.list[attr.selected].name}}</text> -->
					<text class="d-block">
						{{checkedSkus}}
					<!-- 火焰红 64GB 标配 -->
				</text>
			</view>
		</view>
	
		<!-- 
		表单部分(660rpx)
		-->
		<scroll-view scroll-y style="height: 660rpx;width:750rpx;">
			<card :headTitle="item.title" :headTitleWeight="false" :headBorderBottom="false" :key="index"
				v-for="(item,index) in popupData.selects"> <!-- popupData.attrs -->
				<!--  从detail.vue拷贝过来的   v-for="(item,index) in selects" -->
	
				<zcm-radio-group :label="item" :selected.sync='item.selected'></zcm-radio-group>
	
				<!-- {{attr.list[attr.selected].name的[attr.selected]是切换attr.list的索引}} -->
				<!-- item.selected就是等于zcm-radio-group里的index -->
				<!-- 
			<zcm-radio-group @change2="change2" :label="item"
			></zcm-radio-group> -->
	
			</card>
			<view class="d-flex j-sb a-center p-2 border-top border-light-secondary">
				<text>购买数量</text>
				<uni-number-box :min="1" :value="Array.isArray(popupData) ? popupData.item.num : 1" @change="popupData.item.num=$event"></uni-number-box>
			</view>
		</scroll-view>
	
		<!--
		 按钮(100rpx)
		 -->
		<view class="main-bg-color text-white font-sm d-flex a-center j-center" hover-class="main-bg-hover-color"
			style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;" @tap.stop="doHidePopup">
			<!-- 加入购物车 -->
			确定
		</view>
	</common-popup>
	
</template>

<script>
	import commonPopup from '@/components/common-popup.vue'
	import zcmRadioGroup from "@/components/common/radio-group.vue"
	import uniNumberBox from "@/components/uni-ui/uni-number-box/uni-number-box.vue"
	import card from "@/components/common/card.vue"
	import price from "@/components/price.vue"
	
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex'
	
	export default{
		components:{
			commonPopup,
			uniNumberBox,
			zcmRadioGroup,
			card,
			price,
		},
		computed:{
			...mapState({
				popupShow:state=>state.cart.popupShow,
				popupData:state=>state.cart.popupData
			}),
			...mapGetters([
				// 'popupData'
			]),
			// 用户选中的sku
			checkedSkus() {
				if(!this.pupupData && !Array.isArray(this.pupupData)){
					return ''
				}
				// if(!this.pupupData.selects && !Array.isArray(this.pupupData.selects)){ //这样还会报selects是undefined
				// 	return ''
				// }
				// 拿到选中skus组成字符串,默认选中的是第一个
				let checkedSkus = this.popupData.selects.map(v => {
					// console.log(v.list) //两个数组[ [{},{}] , [{},{}] ]
					return v.list[v.selected].name // ['黄色', '标配']
				})
				// console.log(checkedSkus,'checkedSkuscheckedSkus')
				return checkedSkus.join(',')
				// 拿到skusText
				// this.selects[0]
			},
			// 选中skus的索引
			checkedSkusIndex() {
				if (!this.popupData.goods_skus && !Array.isArray(this.popupData.goods_skus)) {
					return -1
				}
				// 数组可以通过查找下标来拿
				let index = this.popupData.goods_skus.findIndex((item) => {
					return item.skusText === this.checkedSkus //goodsSkus的四种可能比对goodsSkusCard(this.selects)规格属性
				})
				return index
			},
			// 显示价格
			showPrice() { //没有选中属性价格就显示sku最小的价格，选中属性价格就跟着改变
			// console.log(this.checkedSkusIndex) //0
			if(this.checkedSkusIndex < 0){ // if (!this.checkedSkus) {
					// return this.popupData.item.pprice || 0.00 //吧页面所有的信息都放在this.detail
				return this.popupData.item ? this.popupData.item.pprice : 0.00 
				}
				return this.popupData.goods_skus[this.checkedSkusIndex].pprice
				// console.log(this.checkedSkusIndex, 'index')
			},
		},
		methods:{
			...mapActions([ //点击事件
				'doHidePopup'
			])
		}
	}
</script>

<style>
</style>
