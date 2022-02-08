<template>
	<view class="d-flex flex-column" style="height: 100%;">
		<!-- 选项卡 -->
		<view class="d-flex bg-white a-center font-md text-muted border-top border-bottom border-light-secondary">
			<view class="flex-1 d-flex a-center j-center py-2"
			v-for="(item,index) in tabBars" :key="index"
			:class="tabIndex === index ? 'tabactive' : ''"
			@tap="changeTab(index)">
				{{item.name}}
			</view>
		</view>
		
		<scroll-view scroll-y class="flex-1" style="background: #F5F5F5;">
			<block v-for="(tab,tabI) in tabBars" :key="tabI">
				<view class="position-relative" v-show="tabI === tabIndex"
				style="min-height: 440rpx;">
					<template v-if="tab.list.length > 0">
						<view class="p-3">
							<coupon v-for="(item,index) in tab.list" :key="index" 
							:item="item" :index="index" @click="chooseCoupon(item)">
							<!-- disabled代表是否领取，true代表已领取 -->
							<!-- status等于0代表失效，1代表有效 -->
							<text v-if="item.disabled">已使用</text>
							<text v-else>{{item.status?'去使用':validText}}</text>
							</coupon>
						</view>
					</template>
					<!-- 默认无 -->
					<template v-else>
						<no-thing :icon="tab.no_thing" :msg="tab.msg"></no-thing>
					</template>
				</view>
			</block>
		</scroll-view>
		
	</view>
</template>

<script>
	import noThing from "@/components/no-thing.vue"
	import coupon from "@/components/coupon.vue"
	export default {
		components: {
			noThing,
			coupon
		},
		data() {
			return {
				tabIndex:0,
				price:0,
				tabBars:[
					{ 
						name:"可用",
						no_thing:"no_pay",
						msg:"你还没有可用的优惠券",
						page:1,
						// key:'valid',//这个打印是空数组
						key:"invalid",//当前用户已领取优惠券列表(参数isvalid,可用valid，失效invalid)
					firstLoad:false,//防止重复加载
							list:[],
					// 	list:[
					// 		{
					// 		title:"第三季仿微信立减100元",
					// 		start_time:"2019-10-01",
					// 		end_time:"2019-11-01",
					// 		price:100,
					// 		desc:"满300元使用",
					// 		status:true, //状态有效/可用
					// 		disabled:false //不会被禁用
					// 	},
					// ],
					},
					{
						name:"已失效",
						no_thing:"no_pay",
						msg:"你还没有优惠券",
						page:1,
						// key:'valid',//这个打印是空数组
						key:"invalid",
						firstLoad:false,//防止重复加载
					list:[],
						// list:[{
						// 	title:"第三季仿微信立减100元",
						// 	start_time:"2019-10-01",
						// 	end_time:"2019-11-01",
						// 	price:100,
						// 	desc:"满300元使用",
						// 	status:false, //状态失效/不可用
						// 	disabled:false
						// },
						// {
						// 	title:"第三季仿微信立减100元",
						// 	start_time:"2019-10-01",
						// 	end_time:"2019-11-01",
						// 	price:100,
						// 	desc:"满300元使用",
						// 	status:false,
						// 	disabled:false
						// }]
					},
				],
			}
		},
		onLoad(e){
			this.getData()
			
			if(e.detail){
				this.price=(JSON.parse(e.detail)).price
			}
		},
		computed:{
			// 是否失效
			isvalid(){
				return this.tabBars[this.tabIndex].key
			},
			// 当前页码
			page(){
				return this.tabBars[this.tabIndex].page
			},
			validText(){
				return this.tabIndex===0?'不可用':'已失效'
			}
		},
		// order-coupon和coupon和order-confirm
		methods: {
			// 获取优惠券数据
			getData(){ //点击tabbar的购物车进入到结算，再点击优惠券
				let index=this.tabIndex
				this.$H.get('/usercoupon/'+this.page+'/'+this.isvalid,{},{ //当前用户已领取优惠券列表
					token:true
				}).then(res=>{
					// console.log(res)//used为0没有使用过，为1使用过
					// this.tabBars[this.tabIndex].list=res //这样写有风险，网速比较慢，会赋值错
			this.tabBars[index].list=res.map(item=>{ // console.log(item,'item') //id,当前用户领取的优惠券id //coupon:{},优惠券
				// 优惠券不满足最小价格是不可用的优惠券
				let status=(index===0) && (this.price>=parseFloat(item.coupon.min_price)) //字符串要转为浮点数
				return {
					id:item.id,
					title:item.coupon.name,
					start_time:item.coupon.start_time,
					end_time:item.coupon.end_time,
					price:item.coupon.value,
					desc:item.coupon.desc,
					// status:true, //status等于0(即false)代表失效，1(即true)代表有效
					// status:index === 0,//判断是否可用，后端作了处理
					status,//改了这个优惠券都变成灰色的，不改能看见橘色的，原来是用了上一句代码(下单多件商品才可以看到有效的优惠券)
					// 是否领取,true代表已领取，(res打印没有这个，这个是自己写的)
					disabled:item.used, // disabled:false,
					type:item.coupon.type //used:0未使用,1已使用 //type:0固定金额(满减),1百分比(折扣)
				}
			})
			this.tabBars[index].firstLoad=true //成功拿到改为true,代表加载过
				})
			},
			// 切换选项卡
			changeTab(index){
				this.tabIndex = index
				if(!this.tabBars[index].firstLoad){
					this.getData()
				}
			},
			// 选择优惠券,order-confirm
			chooseCoupon(item){ //这里的item是由getData来的
			
			console.log(item) //这里可以看到res打印的disabled
			
			// 已使用 (点了不可用价格会被减去)
			if(item.disabled){
				return uni.showToast({
					title:'该优惠券已经使用过了',
					icon:'none'
				})
			}
			
			// 已失效/不可用
			if(!item.status){
				return uni.showToast({
					title:'该优惠券'+this.validText,
					icon:'none'
				})
			}
			
			uni.$emit('couponUser',{ //order-confirm
				id:item.id,
				type:item.type,
				value:item.price
			})
			
			uni.navigateBack({
				delta:1
			})
			}
		}
	}
</script>

<style>
.tabactive{
	border-bottom: 5rpx solid #FD6801;
	color: #FD6801;
	margin-bottom: -5rpx;
}
</style>
