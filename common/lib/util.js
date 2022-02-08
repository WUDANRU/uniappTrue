export default{
	// 更新tabbar角标
	updateCartBadge(count){
		if(count>0){
			return uni.setTabBarBadge({
				index:2,
				text:count.toString()
			})
		}
		// 等于0移除角标
		return uni.removeTabBarBadge({
			index:2
		})
	},
	
	// create_time: "2021-03-15 15:03:30"
	// id: 723
	// no: "20210315150330161699"
	// order_items: [{…}]
	// paid_time: 1615791874
	// refund_status: "applied"
	// reviewed: 0
	// ship_status: "pending"
	// total_price: "0.01"
	// user_id: 3
	
	// 判断订单状态
	formatStatus(order){
		if(!order){
			return ''
		}
		// 未支付
		if(!order.paid_time){ //支付过了才有order.paid_time支付时间
			return "待支付"
		}
		// 退款情况
		if(order.refund_status !== 'pending'){ //if有顺序，有支付才有退款，没有支付哪来退款
			switch (order.refund_status){ //refund_status为退款状态，refund_status的值为pending等待就是没有退款
				case 'applied':
				return '退款中'
					break;
				case 'success':
				return '退款成功'
					break;
				case 'failed':
				return '退款失败'
					break;
			} 
		}//上面是订单情况，下面是物流情况
		switch (order.ship_status){//ship_status为物流状态
			case 'pending':
			return '待发货'
				break;
			case 'delivered':
			return '待收货'
				break;
			case 'received':
			return '已签收'
				break;
		}
	},
}