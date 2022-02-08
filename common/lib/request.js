// import $store from 'vuex' //或import store from 'vuex'

import $store from '@/store/index.js'

export default {
	// 全局配置
	common:{
		// ceshi6.dishait.cn
		baseUrl:"http://ceshi3.dishait.cn/api",
		// baseUrl:"ceshi6.dishait.cn",
		header:{
			'Content-Type':'application/json;charset=UTF-8',
			'Content-Type':'application/x-www-form-urlencoded'
		},
		data:{},
		method:'GET',
		dataType:'json'
	},
	// 请求 返回promise
	request(options = {}){
		// 组织参数
		options.url = this.common.baseUrl + options.url
		options.header = options.header || this.common.header
		options.data = options.data || this.common.data
		options.method = options.method || this.common.method
		options.dataType = options.dataType || this.common.dataType
		
		// console.log($store.state,$store.state.user,'$store2')
		
		// console.log($store.state.user.loginStatus,'$store2')
		// token
		if(options.token){ //user.set.vue的 token:true
			options.header.token=$store.state.user.token //$store.state.user.token等于null表示退出登录(store的state.user.token默认就是null)
		
		// 二次验证,登录状态为退出   //当登录状态为退出时,点击退出登录,会弹出非法token请先登录(user-set有退出登录的按钮)
		if(!options.header.token){ //token($store.state.user.token)可能会返回null,需要二次验证 (null等于false)
// console.log(options.header.token,!options.header.token) //null true,if(options.header.token)为true,if(!options.header.token)为false
			uni.showToast({
				title:'目前未登录,请先登录',
				icon:'none'
			})
			console.log('后台会提示非法token,请先登录')
			
			// if(options.checkToken){ 表示登录状态为退出是否跳转到登录页
					// setTimeout(()=>{
					// 	return uni.navigateTo({
					// 			url:'/pages/login/login'
					// 	})
					// },800)
			// }
		}
		}
		
		
		// 请求
		return new Promise((res,rej)=>{
			// 请求之前... todo
			// 请求中...
			uni.request({
				...options,
				success: (result) => {
					// 返回原始数据
					if(options.native){
						return res(result)
					}
					
					// 服务端失败
					if(result.statusCode !== 200){
						if(options.toast!==false){ //toast不提示非法token,请先登录,user-set.vue的toast:false
						uni.showToast({
							title: result.data.msg || '500服务端失败', //比如result.data.msg是非法token,是非法token,请先登录
							icon: 'none'
						});
						return rej('404或500') //catch走这里
					}}
					// 成功
					let data = result.data.data
					res(data)
				},
					fail: (error) => {
				// fail: (res) => {
					// if(res.errMsg=='request:fail timeout'){
					// 	uni.showToast({
					// 		title: '请求超时，请重试!',
					// 		duration:2000,
					// 		icon: 'none'
					// 	});
					// }else if(res.errMsg=='request:fail'){
					// 	uni.showToast({
					// 		title: '无网络请移动到有网络的地方重试!',
					// 		duration:2000,
					// 		icon: 'none'
					// 	});
					// }else{
					// 	uni.showToast({
					// 		title: res.resultDesc,
					// 		duration:2000,
					// 	});
					// }
						// return rej(res)
					uni.showToast({
						title: error.errMsg || '请求失败',
						icon: 'none'
					});
					return rej()
				}
			});
		})
	},
	// get请求  
	get(url,data = {},options = {}){
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	// post请求   //url,请求参数,header头
	post(url,data = {},options = {}){ //data = {}的data是请求参数, options = {}的options放header头,url,method,data(请求参数)
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	// delete请求
	del(url,data = {},options = {}){ //data = {}的data是请求参数, options = {}的options放header头,url,method,data(请求参数)
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	}
}