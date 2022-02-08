export default{
	state:{
		// 登录状态
		loginStatus:false,
		// token
		token:null, //null表示退出登录 (登录需要用户名和密码,退出登录需要token)
		// 用户信息
		userInfo:{}
	},
	mutations:{
		// 初始化登录状态   //效果见my.vue头像和昵称
		initUser(state){
			let userinfo=uni.getStorageSync('userInfo')//App.vue有this.$store.commit('initUser')
			if(userinfo){
				userinfo=JSON.parse(uni.getStorageSync('userInfo')) 
				state.userInfo=userinfo
				state.loginStatus=true
				state.token=userinfo.token
			}
		},
		// 登录
		login(state,userinfo){
			state.userInfo=userinfo
			state.loginStatus=true
			state.token=userinfo.token
			uni.setStorageSync('userInfo',JSON.stringify(userinfo))
		},
		// 退出登录
		logout(state){
			state.userInfo={}
			state.loginStatus=false
			state.token=null  //null表示退出登录
			uni.removeStorageSync('userInfo')
		}
	}
}