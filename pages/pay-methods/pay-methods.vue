<template>
	<view>
		<view class="d-flex flex-column a-center j-center py-1 my-3">
			<text class="text-light-muted font-sm">支付金额</text>
			<price unitSize="font-sm" style="margin-top:5upx;font-size: 32upx;">{{detail.price}}</price>
		</view>
		<view class="px-5">
			<radio-group @change="change">
			<label v-for="(item,index) in options" :key="index">
				<uni-list-item :leftIcon="item.icon" :title="item.title" showExtraIcon
					leftIconStyle="font-size:60rpx;" :note="item.note">
					<radio slot="right" :value="item.value" color="#FD6801" :checked="payMethod===item.value" />
				</uni-list-item>
			</label>
</radio-group>
			<view class="rounded main-bg-color text-white font-3 py-1 mt-3 text-center"
				hover-class="main-bg-hover-color" @click="submit">
				{{loading?'支付中...':'确认支付'}}
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
				detail:{
					id:0,
					price:0
				},
				loading:false,//防止重复提交
				payMethod:'alipay',
				options:[{
					title:'支付宝支付',
					note:'推荐使用支付宝支付',
					icon:'icon-zhifubao text-primary',
					value:'alipay'
				},{
					title:'微信支付',
					note:'推荐使用微信支付',
					icon:'icon-weixinzhifu text-success',
					value:'wxpay'
				}]
			}
		},
		onLoad(e){
			if(!e.detail){
				return uni.showToast({
					title:'支付失败',
					icon:'none'
				})
			}
			this.detail=JSON.parse(e.detail)
			console.log(this.detail)
		},
		methods:{
			change(e){
				this.payMethod=e.detail.value
			},
			submit(){
				// 防止重复支付
				// if(this.loading)return
				
				// this.loading=true
				// this.$H.get('/payment/'+this.detail.id+'/'+this.payMethod,{},{
				// 	token:true,
				// 	native:true
				// }).then(res=>{
				// 	this.loading=false
				// 	console.log(res,'this.detail.id是订单号，订单号的接口是服务端错误')
				// 	uni.requestPayment({
				// 	    provider: this.paymethod,
				// 	    orderInfo: res.data,//(app端)微信、支付宝订单数据
				// 	    success: (e) => {
				// 	        uni.redirectTo({
				// 	            url: '../pay-result/pay-result?detail='+JSON.stringify({
				// 					success:true
				// 				})
				// 	        });
				// 	    },
				// 	    fail: (e) => {
				// 	       uni.showModal({
				// 	           content: "支付失败,原因为: " + e.errMsg,
				// 	           showCancel: false
				// 	       })
				// 	    },
				// 		complete: () => { //支付完成
				// 			this.loading = false
				// 		}
				// 	})
				// }).catch(err=>{
				// 	this.loading=false
				// 	console.log(err)
				// 	uni.showToast({
				// 		title:'支付失败',
				// 		icon:'none'
				// 	})
				// })
				
				//经过：order-confirm pay-methods(用到了重定向) pay-result(用到了返回上一页)  //返回：pay-result order-confirm
				uni.redirectTo({ //防止重复下单(跳过中间的页面,即当前页面)，pay-result页面返回上一页会跳到order-confirm页面(重定向的作用)
					url:'/pages/pay-result/pay-result' //到了order-confirm页面，如果是有提交订单成功后会有order_id会跳转到订单详情页order-detail，见order-confirm.vue的onShow
				})
				
				// uni.navigateTo({ //返回：pay-result pay-methods
				// 	url:'../pay-result/pay-result'
				// })
			}
		}
	}
</script>

<style>

</style>
