<template>
	<!-- <view class="d-flex flex-column"> -->
	<view class="d-flex flex-column" style="height:100vh;"><!-- 加了height:100vh;这个可以固定，100vh屏幕的100% -->
		<!-- #ifdef MP -->
		<!-- 自定义导航 小程序端的搜索栏 -->
			<view class="d-flex a-center" style="height: 90rpx;">
			<!-- 左边 -->
			<view style="width: 85rpx;" class="d-flex a-center j-center">
				<text class="iconfont icon-xiaoxi"></text>
			</view>
			<!-- 中间 -->
			<navigator style="width:98%;" url="/pages/search/search">
			<view class="flex-1 bg-light rounded d-flex a-center text-light-muted" style="height: 65rpx;">
				<text class="iconfont icon-sousuo mx-2"></text>
				智能积木
			</view>
				</navigator>
			<!-- 右边 -->
			<view style="width: 85rpx;" class="d-flex a-center j-center">
				<text class="iconfont icon-richscan_icon"></text>
			</view>
		</view>
		<!-- #endif -->
	
	<!-- box-sizing:border-box;隐藏上边线(border-top)  hover-class就是点击显示的样式 -->
	<view class="d-flex border-top border-light-secondary animated fadeIn faster"
		style="height:100%;box-sizing:border-box;">

<loading :showload="showLoading"></loading>

		<!-- 	<view style="z-index: 10000;left:0;top:0;right:0;bottom:0;background: #fff;" class="position-fixed d-flex a-center j-center font-sm main-text-color"
	v-if="beforeReady">
		加载中...
	</view> -->


		<scroll-view scroll-with-animation id="leftScroll" :scroll-top="leftScrollTop" scroll-y
			style="flex:1;height:100%;" class="border-right border-light-secondary">
			<!-- scroll-with-animation 性能差，加动画效果滚动太快有问题 -->
			<view v-for="(item,index) in cate" :key="index" hover-class="bg-light-secondary"
				class="left-scroll-item border-bottom border-light-secondary py-1">
				<view @tap="changeCate(index)" class="d-flex py-1 font-1 text-muted j-center"
					:class="activeIndex===index?'class-active':''">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<scroll-view scroll-y :scroll-top="rightScrollTop" :scroll-with-animation="true" @scroll="onRightScroll"
			style="display:inline-flex;!import;flex-diration:row!import;flex-wrap:wrap!import;flex:3.5;height:100%;">
			<view class="right-scroll-item row" style="display:inline-flex;!import;" v-for="(item,index) in list"
				:key="index">
				<view class="span24-8 py-2  text-center" 
				v-for="(item2,index2) in item.list" :key="index2"  @click="openDetail(item2)">
					<image :src="item2.cover" style="width:120upx;height:120upx;"></image>
					<text style="" class="d-block">{{item2.name}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
	</view>
</template>

<script>
	export default {
		// onReady() { //onReady加载完成，闪的白屏解决方法
		// 	setTimeout(()=>{
		// 		this.beforeReady = false
		// 	},500)
		// },

		//scrollOffset是否返回节点的scrollLeft,scrollTop

		// rect是否返回节点布局位置(left,right,top,bottom) size是否返回节点尺寸(width,height)

		onReady() { //onReady,mounted都是加载完成

			// this.getElInfo({
			// 	all: 'left',
			// 	size: true,
			// 	rect: true
			// }).then(data => {
			// 	this.leftDomsTop = data.map(v => {
			// 		// console.log(v.height,'v.height')
			// 		this.cateItemHeight = v.height
			// 		return v.top //(每个)节点离页面顶部的距离
			// 	})
			// 	// console.log(this.leftDomsTop, 'left')
			// })


			// this.getElInfo({
			// 	all: 'right',
			// 	size: false,
			// 	rect: true
			// }).then(data => {
			// 	this.rightDomsTop = data.map(v => v.top)
			// 	// console.log(this.rightDomsTop, 'right')
			// })
		},
		data() {
			return {
				leftDomsTop: [], //(左边每个)节点离页面顶部的距离
				rightDomsTop: [], //(右边每个)节点离页面顶部的距离
				rightScrollTop: 0,
				leftScrollTop: 0,
				cateItemHeight: 0, //左边某个分类的高度
				// beforeReady:true,
				showLoading:true,
				activeIndex: 0,
				cate: [], //左边的商品名称(分类N)列表
				list: [],
				// list:[
				// 	{
				// 		list:[
				// {src:"/static/images/demo/cate_03.png",name:"商品一"},
				// ]
				// 	}
				// ]
			}
		},
		watch: { //newValue当前的activeIndex
			async activeIndex(newValue, oldValue) { //activeIndex改变的时候再有右边滚动的异步方法，否则会触发很多次，所以写watch

				let data = await this.getElInfo({
					size: true,
					scrollOffset: true
				})
				let H = data.height //获取scroll-view高度(即可视高度)
				let ST = data.scrollTop //获取scrollTop
				// this.leftDomsTop[newValue]+this.cateItemHeight //当前top值+左边某商品几的高度
				// 下边
				if ((this.leftDomsTop[newValue] + this.cateItemHeight) > (H + ST)) {
					return this.leftScrollTop = this.leftDomsTop[newValue] + this.cateItemHeight - H
				}
				// 上边
				if (ST > this.cateItemHeight) {
					this.leftScrollTop = this.leftDomsTop[newValue]
				}
	}

	},
	onLoad() {
			this.getData()
		}, //分类页因为这个动态生成的数据(getElInfo)加载慢
		methods: {
			// 打开详情页
			openDetail(item){
				uni.redirectTo({
					url: '../detail/detail?detail='+JSON.stringify({
						id:item.goods_id,
						title:item.name
					}),
				});
			},
			// 获取节点信息
			getElInfo(obj = {}) {
				return new Promise((res, rej) => {
					let option = {
						size: obj.size ? true : false,
						rect: obj.rect ? true : false,
						scrollOffset: obj.scrollOffset ? true : false
					}
					const query = uni.createSelectorQuery().in(this)
					let q = obj.all ? query.selectAll(`.${obj.all}-scroll-item`) : query.select('#leftScroll')

					q.fields(option, data => {
						res(data)
					}).exec()

				})

			},
			getData() {
				// cate:[{
				// 	name:"分类1"
				// },{
				// 	name:'分类2'
				// }],
				// list:[{
				// 	list:[...] //分类1"对应这个
				// },{
				// 	list:[...] //分类2对应这个
				// }]
				
				this.$H.get('/category/app_category').then(res=>{
					let cate=[]
					let list=[]
					console.log(res)
					res.map((v=>{
						cate.push({
							id:v.id,
							name:v.name
						})
						list.push({
							list:v.app_category_items
						})
					}))
					this.cate=cate
					this.list=list
			
				this.$nextTick(()=>{//页面渲染完成再。。。，没有写这个是看不见loading的
					
					// 写了真数据就联动不了了，onReady属于还没有加载出数据就渲染页面了，吧onReady里的拿过来放在这里
					this.getElInfo({
						all: 'left',
						size: true,
						rect: true
					}).then(data => {
						this.leftDomsTop = data.map(v => {
							// console.log(v.height,'v.height')
							this.cateItemHeight = v.height
							return v.top //(每个)节点离页面顶部的距离
						})
						// console.log(this.leftDomsTop, 'left')
					})
					
					
					this.getElInfo({
						all: 'right',
						size: false,
						rect: true
					}).then(data => {
						this.rightDomsTop = data.map(v => v.top)
						// console.log(this.rightDomsTop, 'right')
					})
					
					
					
					// setTimeout(()=>{
							this.showLoading=false //前面数据获取完成，这里要改成false
					// },500)
				})
					})
			},
			// 点击左边分类,(点击这个会触发onRightScroll方法)
			changeCate(index) {
				this.activeIndex = index
				// 右边scroll-view滚动到对应区块
				this.rightScrollTop = this.rightDomsTop[index] //点击左边的分类2跳到了右边的分类2
			},
			// 监听右边滚动事件
			async onRightScroll(e) {
				// console.log(e.detail.scrollTop)

				// 匹配当前scrollTop所处的索引
				this.rightDomsTop.forEach((v, k) => {
					console.log(v, k, e.detail.scrollTop, 'dddddddddddd')
					// if(e.detail.scrollTop>v){ //[10,20,30]当大于10会停留在20
					if (v < e.detail.scrollTop + 3) { //滚动有bug就加3像素：if (v < e.detail.scrollTop + 3) {
						this.activeIndex = k //k是下标
						return false
					}
				})

			}
		}
	}
</script>

<style src="@/common/zcm-main-nvue.css"></style>

<style>
	page {
		height: 100%;
	}

	.class-active {
		border-left: 8upx solid #FD6801;
		color: #FD6801 !important;
	}
</style>
