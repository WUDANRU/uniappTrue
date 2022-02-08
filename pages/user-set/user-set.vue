<template>
	<view>
		
		<!-- 账号管理是登录才会有的 -->
		<card v-if="loginStatus" headTitle="账号管理" bodyStyle="background:#fff;">
			<uni-list-item contain title="个人资料"></uni-list-item>
			<uni-list-item contain title="收货地址" @click="navigate('user-path-list')"></uni-list-item>
		</card>
		
		<card :headTitle="item.label" bodyStyle="" v-for="(item,index) in list" :key="index">
			<uni-list-item contain :title="list.title" v-for="(list,listIndex) in item.value" :key="listIndex"
				titleStyle="font-size:26upx;" @click="navigate(list.path)">
				<block slot="right">
					<text class="iconfont icon-you" style="font-size:25upx;color:#b0b0b0;"></text>
				</block>
			</uni-list-item>
		</card>

<!--  v-if="loginStatus"显示或隐藏按钮,可加可不加 -->
		<view class="p-3">
			<button type="default" class="bg-white" @click="logoutEvent">退出登录</button>
		</view>
	</view>
</template>

<script>
	import card from "@/components/card1.vue"
	import uniListItem from "@/components/uni-ui/uni-common/uni-list-item/uni-list-item.vue"

	import {
		mapMutations,
		mapState
	} from 'vuex'

	export default {
		components: {
			card,
			uniListItem
		},
		data() {
			return {
				list: [{
					label: "关于",
					value: [{
							title: "关于商城",
							path: "about"
						},
						{
							title: "意见反馈",
							path: ""
						},
						{
							title: "协议规则",
							path: ""
						},
						{
							title: "资质证件",
							path: ""
						},
						{
							title: "用户协议",
							path: ""
						},
						{
							title: "隐私政策",
							path: ""
						},
					]
				}, ]
			}
		},
		computed: {
			...mapState({
				token: state => state.user.token,
				loginStatus: state => state.user.loginStatus
			})
		},
		methods: {
			...mapMutations(['logout','clearCart']),

			navigate(path) {
				if (!path) return;
				uni.navigateTo({
					url: `/pages/${path}/${path}`
				});
			},
			//当登录状态为退出时,点击退出登录,会弹出非法token请先登录
			logoutEvent() { //post(url,data = {},options = {}){
				this.$H.post('/logout', {}, {
					// header:{ //header头
					// token:this.token
					// }
					token: true, //request.js的if(options.token){}
					// checkToken:false //表示退出登录不想跳转到登录页
					toast: false //表示不提示非法token和非法token,请先登录
				}).then(res => {
					if (this.loginStatus) { //已登录要退出
						// 退出登录
						this.logout()
						// 清空购物车
						this.clearCart()
						uni.showToast({
							title: '退出成功',
							icon: 'none'
						})
						uni.navigateBack({
							delta: 1 //从user-set跳到my
						})
						return
					}
					// 未登录要退出,走这里和request.js的二次验证
					return setTimeout(() => {
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}, 800)
				})
			}
		}
	}
</script>

<style>
	page {
		background: #EEEEEE;
	}
</style>
