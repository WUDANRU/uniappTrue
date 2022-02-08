<template>
	<!-- box-sizing:border-box;隐藏上边线(border-top)  hover-class就是点击显示的样式 -->
	<view class="d-flex border-top border-light-secondary animated fadeIn faster"
		style="height:100%;box-sizing:border-box;">

		<!-- 	<view style="z-index: 10000;left:0;top:0;right:0;bottom:0;background: #fff;" class="position-fixed d-flex a-center j-center font-sm main-text-color"
	v-if="beforeReady">
		加载中...
	</view> -->

		<scroll-view scroll-with-animation id="leftScroll" :scroll-top="leftScrollTop" scroll-y style="flex:1;height:100%;"
			class="border-right border-light-secondary">
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
				<view class="span24-8 py-2  text-center" v-for="(item2,index2) in item.list" :key="index2">
					<image :src="item2.src" style="width:120upx;height:120upx;"></image>
					<text style="" class="d-block">{{item2.name}}</text>
				</view>
			</view>
		</scroll-view>
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
			const query = uni.createSelectorQuery().in(this)
			query.selectAll('.left-scroll-item').fields({
				size: true,
				rect: true
			}, data => { //获取节点的相关信息
				this.leftDomsTop = data.map(v => {
					// console.log(v.height,'v.height')
					this.cateItemHeight = v.height
					return v.top //(每个)节点离页面顶部的距离
				})
				console.log(this.leftDomsTop, 'left')
			}).exec()
			
			query.selectAll('.right-scroll-item').fields({
				size:false,
				rect:true
			},data => {
				this.rightDomsTop = data.map(v => {
					return v.top
				})
				console.log(this.rightDomsTop, 'right')
			}).exec()

// 这是最开始的leftDomsTop和rightDomsTop
			// query.selectAll('.right-scroll-item').boundingClientRect(data => { //得到布局位置信息
			// 	this.rightDomsTop = data.map(v => {
			// 		return v.top
			// 	})
			// 	console.log(this.rightDomsTop, 'right')
			// }).exec()

		},
		data() {
			return {
				leftDomsTop: [], //(左边每个)节点离页面顶部的距离
				rightDomsTop: [], //(右边每个)节点离页面顶部的距离
				rightScrollTop: 0,
				leftScrollTop: 0,
				cateItemHeight: 0, //左边某个分类的高度
				// beforeReady:true,
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
			activeIndex(newValue, oldValue) { //activeIndex改变的时候再有右边滚动的异步方法，否则会触发很多次，所以写watch
				// console.log(newValue) //真正有改变，才会去触发，(newValue表示真正有改变)

				// 获取scroll-view高度，scrollTop
				const query = uni.createSelectorQuery().in(this)
				query.select('#leftScroll').fields({ //select获取单个
					size: true,
					scrollOffset: true
				}, data => { //获取节点的相关信息
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
				}).exec()

			}

		},
		onLoad() {
			this.getData()
		}, //分类页因为这个动态生成的数据(getElInfo)加载慢
		methods: {
			getData() {
				for (let i = 0; i < 20; i++) {
					this.cate.push({
						name: "分类" + i
					})

					//this.list是20条数据，this.list[i].list是24个商品
					this.list.push({
						list: [] //this.list[i]是20个对象
					})
				}

				for (let i = 0; i < 20; i++) {
					for (let j = 0; j < 24; j++) {
						this.list[i].list.push({
							src: '/static/images/demo/cate_03.png',
							name: `分类${i}-商品${j}`
						})
					}
				}

			},
			// 点击左边分类
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
					if (v < e.detail.scrollTop) {
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

