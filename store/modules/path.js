export default {
	state: {
		list:[]
		// list: [{
		// 		name: "summer",
		// 		phone: "158****531",
		// 		path: "广东省 广州市 白云区",
		// 		detailPath: "XXXXX街道",
		// 		isdefault: false
		// 	},
		// 	{
		// 		name: "summer",
		// 		phone: "158****531",
		// 		path: "广东省 广州市 白云区",
		// 		detailPath: "XXXXX街道",
		// 		isdefault: false
		// 	}
		// ],
	},
	getters:{
		// 获取默认地址,订单支付调用的
		defaultPath:(state)=>{ //filter如果是return true的话就会吧true的这组留下来，其他的给过滤掉
			return state.list.filter(v=>{ //filter如果是return false,false这几个组的就会被留下来
				return v.isdefault  //返回isdefault为true的数组
			})
		}
	},
	mutations: {
		// 覆盖收货地址
		updatePathList(state,{ refresh,list }){
			state.list = refresh ? list : [...state.list,...list];
		},
		// 创建收货地址
		createPath(state, item) {
			state.list.unshift(item)
		},
		// 删除收货地址
		delPath(state, index) {
			state.list.splice(index, 1)
		},
		// 修改收货地址
		// {
		// 	index:"",
		// 	item:""
		// }
		updatePath(state, {
			index,
			item
		}) { //这样结构是为了拿到是需要修改哪个(index)地址

			for (let key in item) {
				// console.log(key,'key')
				state.list[index][key] = item[key]
			}
			// state.list[index]=item //user-path-edit的submit方法写的修改，修改后跳到上个页面没有改过来(打印的是对的，是修改过后的)，原因是需要一一赋值
			console.log(state.list[index],'state.list[index]')
		},
		// 取消默认地址
		removeDefault(state) {
			state.list.forEach((v) => {
				if (v.isdefault) {
					v.isdefault = false //取消默认
				}
			})
		}
	},
	actions: {
		// 修改地址
		updatePathAction({ //+号的创建地址和修改地址走的都是user-path-edit页面，然后会点击保存(走submit方法)，可还要写两个action
			commit
		}, obj) { //commit执行，obj等于上面解构的{index,item}

			if (obj.item.isdefault) { //修改地址前(或创建新地址)时要判断当前是否修改为默认，如果是要移除其他的默认再修改(或再创建)
				commit('removeDefault') //两个地址都设为默认，当最后一个设为默认后会吧第一个默认移除，只留下最后一个默认
			}
			commit('updatePath', obj) //mutation之间的方法没办法互相调用，要在action调用，比如mutation里的a方法不能被b方法调用
		},
		// 增加地址
		createPathAction({commit},item){
			if(item.isdefault){
				commit('removeDefault');
			}
			commit('createPath',item)
		}
	}
}
