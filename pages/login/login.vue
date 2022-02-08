<template>
	<view>
		<!-- uni-status-bar对于app端有作用，禁用状态栏 -->
		<!-- uni-input官方预设的样式 -->
		<!-- @click="goBack"只对app端有作用 -->

		<uni-status-bar />

		<view class="d-flex a-center j-sb py-2 px-3 text-light-muted">
			<view class="iconfont icon-shanchu1" @click="goBack"></view>
			<view class="font-3" @click="forget">忘记密码</view>
		</view>

		<view class="p-5">
			<view class="font-md mb-5">密码登录</view>
			<input type="text" class="border-bottom mb-4 uni-input px-0" placeholder="请输入手机号/邮箱/账号" v-model="username"
				placeholder-class="text-light-muted" @focus="focus('username')" @blur="blur('username')"
				:class="focusClass.username ? 'input-border-color' : ''" />
			<input type="text" class="border-bottom mb-4 uni-input px-0" placeholder="请输入密码" v-model="password"
				placeholder-class="text-light-muted" @focus="focus('password')" @blur="blur('password')"
				:class="focusClass.password ? 'input-border-color' : ''" />
			<view class="py-2 d-flex a-center main-bg-color text-white rounded font-sm mb-4"
				style="justify-content: center;" hover-class="main-bg-hover-color" @click="submit">
				登录
			</view>
			<label class="checkbox d-flex a-center" @click="che=!che">
				<!-- <checkbox v-model="check2" /> uniapp不支持这样的写法-->
				<checkbox :checked="che" />
				<text class="text-light-muted font-2">已阅读并同意XXXXX协议</text>
			</label>
		</view>

	</view>
</template>

<script>
	import uniStatusBar from '@/components/uni-ui/uni-nav-bar/uni-status-bar.vue'

	import {
		mapMutations
	} from 'vuex'
	//    /^[a-zA-Z]\w{5,17}$/ 以字母开头,长度在6-18之间,只能包含字母,数字,下划线
	//    /^.{5,20}$/ 长度为5-20的所有字符 

	export default {
		components: {
			uniStatusBar
		},
		data() {
			return {
				username: "",
				password: "",
				che: true,
				focusClass: {
					username: false,
					password: false
				},
				// 验证规则
				rules: {
					username: [],
					password: []
					// username: [{ //规则多可以多写几个对象
					// 	rule: /^[a-zA-Z]\w{5,17}$/,
					// 	msg: "账号必须字母开头，长度在6~18之间，只能包含字母、数字和下划线"
					// }],
					// password: [{
					// 	rule: /^.{5,20}$/,
					// 	msg: "密码长度必须为5-20个字符"
					// }]
				}
			}
		},
		methods: {
			...mapMutations(['login', 'initUser']),

			// (封装)表单验证
			// validate(key) {
			// 	var check = true // 验证成功
			// 	this.rules[key].forEach((v) => {
			// 		// 验证失败
			// 		if (!(v.rule).test(this[key])) { //this[key]是this.username
			// 			console.log(v.msg)
			// 			check = false
			// 			// 没有return会往下走，验证用户名和密码和this.che都要加return
			// 			return false // return false吧forEach循环终止
			// 		}
			// 	})
			// 	return check
			// },
			submit() { // 提交表单

				// 验证用户名
				// if (!this.validate('username')) return
				// // 验证密码
				// if (!this.validate('password')) return

				if (!this.username) {
					uni.showToast({
						title: '请输入用户名',
						icon: 'none'
					})
					return
				}
				if (!this.password) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return
				}
				if (!this.che) {
					return uni.showToast({ //在if里要加return
						title: '请先同意xxxxx协议',
						icon: 'none'
					})
				}
				console.log('提交成功')
				uni.showLoading({
					title: '登录中...',
					mask: true
				})
				this.$H.post('/login', { //post(url,data = {},options = {}){
					username: this.username,
					password: this.password,
				}).then((res) => { //后端验证正则是先验证密码再验证用户名
					uni.hideLoading()
					// 存储用户信息
					this.login(res)
					// 用户登录需要刷新购物车
					uni.$emit('updateCart')
					uni.showToast({
						title: '登录成功',
						icon: 'none'
					})
					uni.navigateBack({
						delta: 1
					})
				})

				// uni.showLoading({
				// 	title: '登录中...',
				// 	mask: true
				// })
				// setTimeout(() => {
				// 	uni.hideLoading()
				// 	uni.navigateBack({
				// 		delta: 1
				// 	})
				// }, 3000)

				// console.log(this.validate('username'))

				// console.log(/^[a-zA-Z]\w{5,17}$/.test(this.username)) //输入a_1234显示true

				// 验证用户名
				// this.rules.username.forEach((v) => {
				// 	if (!(v.rule).test(this.username)) {
				// 		console.log(v.msg)
				// 	}
				// })

				// // 验证密码
				// this.rules.password.forEach((v) => {
				// 	if (!(v.rule).test(this.password)) {
				// 		console.log(v.msg)
				// 	}
				// })

			},
			focus(key) { //聚焦
				this.focusClass[key] = true
			},
			blur(key) { //失焦
				this.focusClass[key] = false
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			forget() {

			}
		}
	}
</script>

<style scoped>
	.input-border-color {
		border-color: #ff5500;
	}
</style>
