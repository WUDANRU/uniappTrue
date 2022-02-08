import $H from '@/common/lib/request.js'
import $U from '@/common/lib/util.js'

export default {
	state: {
		list: [],
		// 弹出框当前索引
		popupIndex: -1,
		// popup显示
		popupShow: "none",
		// 选中列表(存放选中的id)
		selectedList: [],
		popupData: {} //getters的popupData方法注释后写了这个
	},
	getters: {
		// 判断是否全选
		checkedAll: (state) => {
			return state.list.length === state.selectedList.length
		},
		// 合计
		totalPrice: (state) => {
			var total = 0
			state.list.forEach(v => {
				if (state.selectedList.indexOf(v.id) > -1) { //这个商品需要在已选的里面才能计算价格，已选里有id才能计算价格
					total += v.num * v.pprice
				}
			})
			return total;
		},
		// 禁用全选
		disableSelectAll: (state) => { //radio的disable有bug,吧cart.vue的全选的disable=:disable="disableSelectAll" 删掉
			return state.list.length === 0 //将上面改为list:[]，radio的disable不起作用
		},
		// 拿到当前需要修改属性的商品
		// popupData: (state) => { //popupData拿到的是state.list里其中一个需要修改属性的商品，比如state.list[0]
		// 	return state.popupIndex > -1 ? state.list[state.popupIndex] : {}
		// },
		
		// 购物车商品数量
		cartCount:(state)=>{
			if(state.list.length<=99){
				console.log(state.list.length,'state.list.length')
				return state.list.length
			}
			return '99+'
		}
		
	},
	mutations: {
		// 初始化list 
		initCartList(state,list) { //获取购物车数据用的，cart.js(与cart.vue)的获取购物车数据
			state.list = list
console.log(state.list,state.list.length,'ddd')
			//uni.setTabBarBadge
			$U.updateCartBadge(state.list.length)
			// let count=state.list.length
			// if(count>0){
			// 	uni.setTabBarBadge({
			// 		index:2,
			// 		text:count.toString()
			// 	})
			// }
		},
		// 选中/取消选中某个商品
		selectItem(state, index) {
			var id = state.list[index].id
			var i = state.selectedList.indexOf(id) //返回下标0或者-1
			console.log(i) //-1

			//之前是选中，取消选中
			if (i > -1) {
				// console.log(i,'this.listId') //这里不会进来
				// 取消当前商品选中状态
				state.list[index].checked = false
				// 移除选中列表中的当前商品
				return state.selectedList.splice(i, 1) //这里要写i,不能写id  //1代表删除1个
			}
			//选中
			state.list[index].checked = true
			state.selectedList.unshift(id)

			// state.list[index].checked=!state.list[index].checked
			// if(state.list[index].checked){
			// 	state.list[index].checked=false
			// }
		},
		// 全选,拿到全部id
		selectAll(state) {
			state.selectedList = state.list.map(v => {
				// 设置选中状态
				v.checked = true
				return v.id
			})
		},
		// 取消全选
		unSelectAll(state) {
			if(state.list.length===0)return //没有加这个会报forEach of undefined
			state.list.forEach(v => {
				// 设置选中状态
				v.checked = false
			})
			state.selectedList = []
		},
		// 删除选中
		delGoods(state) { //11 12 13  选中13  过滤掉了13，两个结果(state.list和return...)拿到的都是11，12
			state.list = state.list.filter(v => {
				console.log(state.list, 'list', state.selectedList, 'selectedList') //当我选中12，selectedList这个里面是12
				// return代表最后，这句表示要看最后 -1代表最后不存在   if(state.selectedList.indexOf(v.id) === -1)代表的是现在不存在，不代表最后
				return state.selectedList.indexOf(v.id) === -1 //-1表示最后不存在(选中列表里面),最后要删除的
			}) //filter:  return true过滤掉false,return false过滤掉true
			$U.updateCartBadge(state.list.length)
		},
		// 初始化弹出框当前索引
		initPopupIndex(state, index) {
			state.popupIndex = index
		},
		// // 加入购物车(假数据用到的，真数据没有用到)
		// addGoodsToCart(state, goods) {
		// 	state.list.unshift(goods)
		// 	$U.updateCartBadge(state.list.length)
		// },
		
		// 清空购物车 (退出购物车需要移除角标，清除购物车数据)
		clearCart(state){
			state.list=[]
			state.selectedList=[]
			$U.updateCartBadge(state.list.length)
		}
		
	},
	actions: { //全选？取消全选：全选     //commit执行，提交
		
		// 更新购物车列表(获取购物车数据，这个从cart.vue剪切过来的，因为启动页面没有角标，为了App.vue页面可以用)
	updateCartList({state,commit}){
		return new Promise((res,rej)=>{
		$H.get('/cart', {}, {
			token: true,
			toast: false
		}).then(result => {
			// 取消选中状态
			commit('unSelectAll')// this.unSelectAll() //全选打勾，一刷新，底部打勾还会显示，所以加了这个
		// 赋值
			commit('initCartList',result)// this.initCartList(res)
	res(result)
		}).catch(err=>{
			rej(err)
		})
		})
	},
		
		// 显示popup和拿到当前需要修改属性的商品
		doShowPopup({
			state,
			commit
		}, {
			index,
			data
		}) {
			commit('initPopupIndex', index)
			state.popupData = data //getters的popupData方法注释后写了这个
			state.popupData.item = state.list[index]
			console.log(state.popupData.item, 'state.popupData.item')
			state.popupShow = "show"
		},
		// 隐藏popup
		doHidePopup({
			state,
			commit
		}) {
			state.popupShow = "hide"
			setTimeout(() => {
				state.popupShow = "none"
				commit('initPopupIndex', -1) //隐藏弹出框是回归到初始化-1
			}, 200)
		},
		doSelectAll({
			commit,
			getters
		}) {
			getters.checkedAll ? commit('unSelectAll') : commit('selectAll')
		},
		dODelGoods({ // 批量删除购物车商品，shop_ids,string,购物车id,多个用逗号隔开
			commit,
			state
		}) {
			if (state.selectedList.length === 0) {
				return uni.showToast({
					title: '请选择要删除的商品',
					icon: 'none'
				})
			}
			uni.showModal({ //模态框
				content: '是否删除选中',
				success: (res) => {
					if (res.confirm) {
						$H.post('/cart/delete', {
							shop_ids: state.selectedList.join(',')
						}, {
							token: true
						}).then(res => {
							commit('delGoods')
							commit('unSelectAll')
							uni.showToast({
								title: '删除成功'
							})
						})

						// commit('delGoods')
						// commit('unSelectAll') //多加一个这个，是因为共四个商品，删了3个(执行delGoods时)后，再选中第四个，底下的全选没有打勾
						// //删了的三个的checked是true,  state.selectedList删了的三个选中的也在这里  所以取消全选 unSelectAll
						// //也可以这样理解：执行delGoods时，删除state.list的内容，没有删除state.selectedList的内容
						// uni.showToast({
						// 	title: '删除成功'
						// })
					}
				}
			})
		}
	}
}
