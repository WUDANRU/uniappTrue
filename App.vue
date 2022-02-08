<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 初始化登录状态
			this.$store.commit('initUser') //执行方法(mutations里的方法)
			// console.log(this.$store.state,this.$store.state.user,'$store1') //打印的跟request.js是一样的
			// 更新购物车数据
			this.$store.dispatch('updateCartList') // 分发动作(actions里的方法)
			//监听购物车更新 ，detail页面传过来的updateCart(监听全局事件放在这里，有哪个地方触发了，都会去执行)
			uni.$on('updateCart', () => { //cart.vue剪切过来的
				this.$store.dispatch('updateCartList')
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "/common/uni.css";
	@import "/common/animate.css";
	@import "/common/common.css";
	@import "/common/icon.css";
	@import './common/zcm-main.css';
	/* #ifndef APP-PLUS-NVUE */
	/* #endif */
	@import './common/zcm-main-nvue.css';
</style>
<style>
	.uni-app--showtabbar uni-page-wrapper {
		background: #fefefe;
	}
</style>
