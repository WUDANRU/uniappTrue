<template>
	<view>
		
		 <loading-plus v-if="beforeReady"></loading-plus>  
		
		<view class="position-relative" style="height:320rpx;">
				<image src="/static/images/bg.jpg" style="height:320rpx;width:100%;"></image>
				<!-- 消息列表 -->
				<view @click="navigate('msg-list',true)" class="iconfont icon-xiaoxi position-absolute text-white"
				style="font-size:50rpx;top:75rpx;right:20rpx;z-index:900;">
			</view>
			<view class="d-flex a-center" style="min-width:750rpx;margin-top:-200rpx;">
				<image :src="loginStatus?userInfo.avatar:'/static/images/demo/demo6.jpg'" style="margin-left:20rpx;width:145rpx;height:145rpx;" 
				class="rounded-circle border-light ml-4"></image>
				
				<!-- <navigator url="../login/login"> -->
				<view class="ml text-white font-sm" @click="navigate('login')" style="z-index:1000;color:#007AFF">{{loginStatus?userInfo.nickname:'登录/注册'}}</view>
				<!-- </navigator> -->
				
				<view class="d-flex a-center j-center ml-auto px-1" style="z-index:1000;height:70rpx;background:#FFD43F;color:#CC4A00;border-top-left-radius:40rpx;border-bottom-left-radius:40rpx;">
					<view class="line-h iconfont icon-huangguan mr-2"></view>
					会员积分 0.00
				</view>
			</view>
		</view>
		
		<!-- 图标分类 -->
		<card>
			<view slot="title" class="d-flex a-center j-sb">
				<!-- 这里面是card1子组件里title的slot -->
				<text class="font-3 font-weight">我的订单</text>
				<view class="text-secondary font-3" @click="navigate('order',true)">
					全部订单 <text class="iconfont icon-you font-3"></text>
				</view>
			</view>
			<view class="d-flex a-center">
				<view class="flex-1 d-flex flex-column a-center j-center py-3"
				hover-class="bg-light-secondary"
				 v-for="(item,index) in orders" :key="index" @click="openOrder(item)">  <!-- 这是card1子组件里body的slot -->
					<view class="iconfont font-sm line-h" :class="item.icon"></view>
					<view class="font-2" style="margin-top:20upx;">{{item.name}}</view>
				</view>
			</view>
		</card>
		
		<divider></divider>
		
	<uni-list-item showArrow v-for="(item,index) in iconArr" :key="index" showExtraIcon :otherIconStyle="item.otherIconStyle"
		:otherIcon="item.icon" :title="item.title"><block slot="right">
			</block></uni-list-item>
	<!-- 	<uni-list-item showExtraIcon otherIconStyle="color:#FCBE2D;"
		otherIcon="icon-huangguan" title="会员中心"></uni-list-item>
		<uni-list-item showExtraIcon otherIconStyle="color:#FA6C5E;"
		otherIcon="icon-service" title="服务中心"></uni-list-item>
		<uni-list-item showExtraIcon otherIconStyle="color:#FE8B42;"
		otherIcon="icon-home" title="小米之家"></uni-list-item>
		<uni-list-item showExtraIcon otherIconStyle="color:#9ED45A;"
		otherIcon="icon-gengduo" title="更多功能"></uni-list-item> -->
		
		<divider></divider> 
	
		<uni-list-item @click="navigate('user-set')" showExtraIcon leftIconStyle="color:#2fbdb1;"
		leftIcon="icon-icon_set_up" title="用户设置">
		</uni-list-item>
	
		<uni-list-item @click="navigate('user-path-list')" showExtraIcon leftIconStyle="color:#808C98;"
		leftIcon="icon-icon_set_up" title="更多设置">
		</uni-list-item>
		
	</view>
</template>
<script>
	import loading from "@/components/mixin/loading.js"
	import card from '@/components/card1.vue'
	import uniListItem from "@/components/uni-ui/uni-common/uni-list-item/uni-list-item.vue"
	
	import {mapState} from 'vuex'
	
	export default{
		mixins:[loading],
		components:{
			card,
			uniListItem
		},
		data(){
			return{
				orders:[{
					name:"待付款",
					icon:"icon-wallet_icon",
					index:1
				},{
					name:"待收货",
					icon:"icon-daishouhuo",
					index:2
				},{
					name:"待评价",
					icon:"icon-pinglun",
					index:3
				},{
					name:"待退修",
					icon:"icon-buoumaotubiao46"
				}],
				iconArr:[
					{
						icon:'icon-VIP',
						title:'小米会员',
						otherIconStyle:'color:#FDBF2E;'
					},
					{
						icon:'icon-huangguan',
						title:'会员中心',
						otherIconStyle:'color:#FCBE2D;'
					},
					{
						icon:'icon-service',
						title:'服务中心',
						otherIconStyle:'color:#FA6C5E;'
					},
					{
						icon:'icon-home',
						title:'小米之家',
						otherIconStyle:'color:#FE8B42;'
					},
					{
						icon:'icon-gengduo',
						title:'更多功能',
						otherIconStyle:'color:#9ED45A;'
					},
					// {
					// 	icon:icon-icon_set_up,
					// 	title:'更多设置',
					// 	otherIconStyle:'color:#808C98;'
					// }
					
				]
			}
		},
		computed: {
			...mapState({
				loginStatus: state => state.user.loginStatus,
				userInfo: state => state.user.userInfo
			})
		},
		methods:{
			navigate(path,check=false){
				if (!path) return;
				// if(path==='login'){
				// 	// console.log(this.loginStatus,'fa') //false
				// 	if(!this.loginStatus){ //没有登录跳转到登录页
				// 		uni.navigateTo({
				// 			url:'../login/login'
				// 		})
				// 		// console.log(this.loginStatus,'abd') //false
				// 			return
				// 	}else{
				// 			return
				// 		}
				// }
				if(check){ //path为order登录后才能看到全部订单(check一直为true),path为user-set有无登录都能看到收货地址
					console.log(check,'check')
					return this.navigateTo({ //登录后才能看到全部订单 //main.js的Vue.prototype.navigateTo(){}
						url: `/pages/${path}/${path}`
					})
				}
				if(path==='login'){
					if(this.loginStatus)return
				}
				uni.navigateTo({ 
					url: `/pages/${path}/${path}`
				});
			},
			openOrder(item){
				if(item.index){
					this.navigateTo({
						url:"/pages/order/order?tabIndex="+item.index
					})
				}
			}
		}
	}
</script>
<style></style>