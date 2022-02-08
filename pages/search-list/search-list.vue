<template>
	<view>
		<!-- #ifdef MP -->
		<!-- 自定义导航 小程序端的搜索栏 -->
		<view class="d-flex a-center px-1" style="z-index:100;height: 90rpx;position:fixed;top:0;left:0;right:0;background:#fff;">
			<view class="flex-1 bg-light rounded d-flex a-center text-light-muted" style="height: 65rpx;">
				<text class="iconfont icon-sousuo mx-2"></text>
				<input v-model="keyword" style="width:78%" type="text" value="智能积木" />
			</view>
			<!-- 右边 -->
			<view style="width: 85rpx;" class="d-flex a-center j-center">
				<text @click="search">搜索</text>
			</view>
		</view>
		<view style="height:90rpx;"></view><!-- 没有这个的话上面会被挡住 -->
		<!-- #endif -->
		<view class="position-fixed left-0 right-0 border-bottom d-flex a-center j-center bg-white" style="z-index:100;height:100upx;line-height:100upx;">
			<view class="flex-1 d-flex a-center j-center" v-for="(item,index) in screen.list" :key="index"
				@tap="changeScreen(index)">
				<text :class="screen.currentIndex===index?'main-text-color':'text-light-muted'">{{item.name}}</text>
				<view style="line-height:0;">
					<view class="iconfont icon-paixu-shengxu"
						:class="item.status===1?'main-text-color':'text-light-muted'"></view>
					<view class="iconfont icon-paixu-jiangxu"
						:class="item.status===2?'main-text-color':'text-light-muted'"></view>
				</view>
			</view>

			<view @tap="showDrawer('showRight')" class="flex-1 d-flex a-center j-center main-text-color">
				筛选
			</view>
		</view>
<view style="height:100rpx;"></view>
		<!-- 抽屉 --><!-- :mask-click="true"点击蒙蔽关闭抽屉 -->
		<uni-drawer ref="showRight" :mask-click="true" mode="right">
				<card headTitle="价格范围" :headBorderBottom="false" :headTitleWeight="true">
					<!-- 单选按钮组 -->
					<zcm-radio-group :label="label" :selected.sync="label.selected" />
					<!-- 上面是第二种写法，这是第一种写法:	<zcm-radio-group :label="label" @change2="changeRadio" /> -->
				</card>
				<!-- 按钮 -->
				<view class="a-b main-text-color" @tap="confirm('showRight')">
					确定
				</view>
				<view class="a-b-2" @tap="reset">
					重置
				</view>
		</uni-drawer>
		<!-- 列表 -->
		<template>
		<block v-for="(item,index) in list" :key="index">
			<search-list :item="item" :index="index"></search-list>
		</block>
		<!-- 没有数据 -->
		<no-thing v-if="list.length===0" msg="空空如也" />
		<!-- <view v-if="list.length===0" class="text-light-muted d-flex j-center my-5 font-sm">
			暂无数据 _0 0_
		</view> -->
</template>

<!-- 上拉加载更多 -->
		<divider />
		<view class="d-flex a-center j-center text-light-muted font-3 py-3">
			{{loadtext}}
		</view>


	</view>
</template>

<script>
	import uniDrawer from '@/components/uni-ui/uni-drawer/uni-drawer.vue'
	import card from '@/components/common/card.vue'
	import zcmRadioGroup from '@/components/common/radio-group.vue'
	import searchList from '@/components/zcmsearch-list.vue'
	import noThing from '@/components/no-thing.vue'

	export default {
		components: {
			uniDrawer,
			card,
			zcmRadioGroup,
			searchList,
			noThing
		},
		data() {
			return {
				// 1.上拉加载更多 2.加载中... 3.没有更多了
				loadtext:"上拉加载更多",
				Condition:{},
				// oldSelected:0, //旧值
				keyword: '',
				page: 1,
				// list:demo,
				list:[],
				screen: {
					currentIndex: 0,
					list: [{
							name: "综合",
							status: 2,
							key:"all"
						},
						{
							name: "销量",
							status: 0, //写0是因为3个name,默认只有1个为综合的name显示升序或降序
							key:"sale_count"
						}, //0代表没有状态，1代表箭头上，2代表箭头下
						{
							name: "价格",
							status: 0,
							key:"min_price"
						},
					]
				},
				label: {
					selected: 0,
					list: [
						{
							name: "0-0.02",rule:"between",value:"0,0.02"
						},
						{
							name: "0.02-0.03",rule:"between",value:"0.02,0.03"
						},
						{
							name: "0.03-0.04",rule:"between",value:"0.03,0.04"
						},
						{
							name: "0.04-0.05",rule:"between",value:"0.04,0.05"
						},
						{
							name: "大于0.05",rule:">",value:"0.06"
						}
					]
				}
			}
		},
		// 排序相关
		computed:{
			options(){
				let obj=this.screen.list[this.screen.currentIndex]
				let value=obj.status===1?'asc':'desc' //asc升序，desc降序
			return{
				[obj.key]:value //return {all:"desc"}  //接口all代表综合排序
			} //接口说value需要是字符串
			}
		},
		onLoad(e) {
			console.log(e.keyword,'search.vue的this.keyword')
			this.keyword = e.keyword //search.vue传过来的
			
			// 加载数据
			// this.getData()
			this.getData(false) //search.vue需要搜索小米，然后点击软键盘的搜索或笔记本的enter键跳转到search-list.vue才会值，然后再点击升降序
		},
		onNavigationBarSearchInputChanged(e) {// 输入的文本
			this.keyword=e.text //当前文件输入的
		},
		onNavigationBarSearchInputConfirmed(){ //软键盘的搜索或笔记本键盘的enter
			this.search()
		},
		onNavigationBarButtonTap(){ //点击原生的搜索按钮
			this.search()
		},
		onPullDownRefresh(){
			this.getData(true,()=>{
				uni.showToast({
					title:'刷新成功',
					icon:'none'
				})
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom(){ //每次触底执行  每次触底(前和后)一起只打印1次
			console.log(this.page,this.loadtext,this.list.length,'前')//1 '上拉加载更多' 6 '前'  从这里拿到的 this.loadtext=res.length<10?'没有更多了':'上拉加载更多'
			if (this.loadtext!=='上拉加载更多') return; //上面打印的是全等，这里要不全等才能匹配上
			this.loadtext='加载中...'
			this.page++ //1页10条，++表示进入下一页
			console.log(this.page,this.loadtext,this.list.length,'后')//2 '加载中...' 6 '后'
			this.getData(false) //每次触底都会执行1次,因为默认是callback=false,空函数代表false
			// this.getData(()=>{ //如果这个不在触底事件里，在其他方法里，那这里面需要一个空函数，callback才会执行  因为 if(typeof callback==='function'){ callback () }
			// 		// uni.showToast({
			// 		// 	title: '加载成功',
			// 		// 	icon:'none'
			// 		// })
			// })
		},
		methods: {
			search(){
				if(this.keyword===''){
					return uni.showToast({
							title:'关键词不能为空',
							icon:'none'
						})
				}
				
				// #ifdef APP-PLUS
				plus.key.hideSoftKeybord() //隐藏已经显示的软键盘
				// #endif
				// #ifndef APP-PLUS
			    uni.hideKeyboard()
				// #endif
				
				this.addHistory()
				
				this.getData()
			},
			// 加入搜索记录
			addHistory(){ //search-list.vue是吧storage里的拿出来修改再重新放进storage里，search.vue是往空数组添加和删除再放进storage
				let history=uni.getStorageSync('searchHistory')
				history=history?JSON.parse(history):[]
				
				let index = history.indexOf(this.keyword)
				if (index === -1) {
					history.unshift(this.keyword)
				} else {
					history.unshift(history.splice(index,1)[0])
				}
				uni.setStorageSync('searchHistory',JSON.stringify(history))
			},
			getData(refresh=true,callback=false) {
				// 打印...this.options控制台会报错，而且如果打印的代码在接口前面显示不出值
				// console.log(this.options,...this.options,...[this.options]) //第一和第三打印出{ all: "desc" }，第二个解构不了下面请求参数可以解构，
			let page=refresh ? 1:this.page
			this.$H.post('/goods/search', { 
				title: this.keyword,
				page: page,//不是必选的
				// all:"desc", //all:"asc",
				...this.options, //这是一个对象，对象可以...解构，比较特殊 (一般是数组才能...解构)
				...this.Condition,
				// price:"between,5,10" //这个范围内res是没有值的
				// price:"between,0,0.02" //限制价格，0到0.02之间
				
				// this.options //这样写不行要加...,为...this.options
				// ...[this.options] //请求数据不可以这样写，虽然可以显示值，但是点击同个all(综合)的升降序(升降序切换)就没反应了
				
			}).then(res => { //comments_good_count是好评率,好评数除以总数等于好评率
				// console.log(res, 'getdat') //search.vue需要搜索小米,然后按键盘的回车或软键盘的搜索才能拿到值
				 let list=this.format(res)
				 this.list = refresh ? [...list] : [...this.list,...list] //[...this.list,...list]昨天这个数据有问题，今天又没问题
				 // 恢复加载状态
				 this.loadtext=res.length<10?'没有更多了':'上拉加载更多'
				  //res.length一共才6条，比6小，会看见空数据和没有更多了，所以写了10才能看见数据，应该上拉加载时,看见的数据显示页面上了(它的page不会永远停留在page为第1页)
				  // 不知道10是后端固定的还是前端固定的，应该是后端固定的吧
				 if(typeof callback==='function'){
					 callback ()
				 }
		
			})
		
			},
			format(res) {
				return res.map(item => {
					let good_num = item.comments_count === 0 ? 0 : (item.comments_good_count / item
						.comments_count) * 100
					// console.log(good_num, 'good_num')
					return {
						id: item.id,
						title: item.title,
						titlepic: item.cover,
						desc: item.desc,
						pprice: item.min_price,
						comment_num: item.comments_count,
						good_num: Math.round(good_num) + '%' //四舍五入
						// good_num:good_num.toFixed(2) + '%' //保留两位数
					}
				})
				 
			},
			reset() {
				this.label.selected = 0
				this.Condition.price="between,0,0.02"
			},
			// 打开窗口
			showDrawer(e) {
				// console.log(e)
				this.$refs[e].open()
				// 记录旧的值
				// this.oldSelected=this.label.selected //打开窗口记录旧值
			},
			getCondition(){
				let la=this.label.list[this.label.selected]
				// this.Condition=(la.rule && la.value) ? {
				// 	 price:la.rule+","+la.value
				// } : { } //点了0-0.02没问题，然后点其他，再点0-0.02就有问题了，所以改为if...else...语句
				this.Condition={
					 price:la.rule+","+la.value
				}
			},
			// 筛选条件并关闭窗口
			confirm(e) {
				this.getCondition()
				this.getData()
				this.$refs[e].close()
			},
			changeScreen(index) { //升序1和降序2
				// 判断当前点击是否已经是激活状态
				let oldIndex = this.screen.currentIndex
				let oldItem = this.screen.list[oldIndex]
				if (oldIndex === index) {
					oldItem.status = oldItem.status === 1 ? 2 : 1 //切换升降序
					this.getData()
					return
				}
				let newIitem = this.screen.list[index]
				// 移除旧激活状态
				oldItem.status = 0
				this.screen.currentIndex = index
				// 增加新激活状态
				newIitem.status = 1
				// 加载数据
				this.getData()
			},
			//        	changeRadio(index){ //这个是第一种写法可以删除，radio-group.vue有第二种写法
			// 	this.label.selected=index
			// }
		}
	}
</script>

<style src="@/common/zcm-main-nvue.css"></style>

<style src="@/common/icon.css"></style>
<style>
	.a-b {
		background: #ff5500;
		color: #ffffff;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 50%;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
	}

	.a-b-2 {
		position: fixed;
		bottom: 0;
		right: 0;
		width: 50%;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
	}

	.a-b:active {
		background: #ea4e00;
	}

	.a-b-2:active {
		background: #e5e5e5;
	}
</style>
