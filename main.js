import Vue from 'vue'
import App from './App'
import store from "./store"

Vue.prototype.$store = store //挂载到this的, this.$store

Vue.config.productionTip = false



// 引入全局加载动画组件
import loading from "@/components/loading.vue"
Vue.component('loading',loading)

import loadingPlus from "components/mixin/loading-plus.vue"
Vue.component('loading-plus',loadingPlus)

import divider from './components/divider.vue'
Vue.component('divider',divider)


// 引入request库
import $T from '@/common/lib/time.js';
Vue.prototype.$T = $T //this.$H


// 引入request库
import $H from '@/common/lib/request.js';
Vue.prototype.$H = $H //this.$H


// 权限跳转 (比如登录后才能看到全部订单)
Vue.prototype.navigateTo=(options)=>{ 
	// 判断用户是否登录
	if(!store.state.user.loginStatus){ //因为import store from "./store"的store
	uni.showToast({
		title:'请先登录',
		icon:'none'
	})
	return uni.navigateTo({
		url:'/pages/login/login'
	})
	}
	uni.navigateTo(options)
}

import $U from './common/lib/util.js'
Vue.prototype.$U=$U

App.mpType = 'app'

const app = new Vue({
    ...App,
		store,
})
app.$mount()
