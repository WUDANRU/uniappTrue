<template>
	<view>
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
		<scroll-view scroll-x="true" style="width: 100%;overflow:hidden;white-space:nowrap;"
			:scroll-into-view="scrollinto" scroll-with-animation="true">
			<view class="scroll-view_H">
				<view id="demo1" class="" v-for="(item,index) in tabBars" :key="index">
					<view @click="dianji(index)" :class="tabIndex===index?'arr1':''" :id="'tab'+index" class="arr">
						{{item.name}}
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- :id="'tab'+item.index" :scroll-into-view="scrollinto" -->
		<!-- 解决连动问题：scroll-into-view 值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素 -->
		<swiper @change="onChangeTab" circular :current="tabIndex" :duration="150" :style="'height:'+scrollH+'px'">
			<!--:current当前所在滑块的索引 e.detail.current,当前滑块的索引 -->
			<!-- @scrolltolower="loadmore"触底事件 -->
			<swiper-item v-for="(item,index2) in newsitems" :key="index2">
				<scroll-view @scrolltolower="loadmore(index2)" scroll-y scroll-left="120"
					:style="'height:'+scrollH+'px'">
					<template v-if="item.list.length > 0">
						<block v-for="(list,listIndex) in item.list" :key="listIndex">
							<swiper-image v-if="list.type==='swiper'" :resdata="list.data" />

							<template v-else-if="list.type==='indexnavs'">
								<uni-icons :resdata="list.data" />
								<divider />
							</template>

							<template v-else-if="list.type==='threeAdv'">
								<three-adv :resdata="list.data"></three-adv>
								<divider />
							</template>

						<template v-else-if="list.type==='oneAdv'">
								<card :headTitle="list.data.title" />
								<card :showHead="false">
									<image style="width:100%;" :src="list.data.cover" mode="widthFix">
									</image> <!-- <slot name:body /> -->
									</card>
							</template>

							<view class="row j-sb" v-else-if="list.type==='list'" @click="openDetail">
								<block v-for="(item,index3) in list.data" :key="index3">
									<much-pic :item="item" :index="index3" />
								</block>
							</view>

						</block>
						<!-- 上拉加载更多 -->
						<divider />
						<view class="d-flex a-center j-center text-light-muted font-3">
							{{item.loadText}}
						</view>
						</template>
						
						<template v-else-if="item.firstLoad === 'before' || item.firstLoad === 'ing'">
							<view class="d-flex j-center a-center pt-5">
								<text class="font-md text-light-muted">加载中...</text>
							</view>
						</template>
						<template v-else>
							<!-- 空数据 -->
							<view class="d-flex j-center a-center pt-5">
								<text class="font-md text-light-muted">暂无数据</text>
							</view>
						</template>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>

</template>

<script>
	import swiperImage from '../../components/swiper-image.vue'
	import uniIcons from '../../components/uni-icons.vue'
	import threeAdv from '../../components/threeadv.vue'
	import card from '../../components/uni-card.vue'
	import muchPic from '../../components/much-pic.vue'

	export default {
		components: {
			swiperImage,
			uniIcons,
			threeAdv,
			card,
			muchPic,
		},
		data() {
			return {
				scrollinto: "",
				scrollH: 500,
				tabIndex: 0,
				tabBars: [],
				newsitems: []
			}
		},
		// 监听点击搜索框
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search', //nvue页面跳转到vue页面
			});
		},
		onLoad() {
			// 获取剩余可视区域高度
			uni.getSystemInfo({
					success: (res) => {
						// #ifndef MP
						let navbarH = 0 //如果不是小程序端
						// #endif
						// #ifdef MP 
						let navbarH = uni.upx2px(90) //如果是小程序端
						// #endif
						// console.log(res.windowHeight) //可视区域高度(px单位)，573px
						// this.scrollH是是剩余可视区域高度
						this.scrollH = res.windowHeight - uni.upx2px(
							100) - navbarH // .arr的height是98，减去98   //uni.upx2px是吧upx转为px
						// console.log(this.scrollH, 'dddddddddd')
					}
				}),
				this.__init()
		},
		methods: {
			// 初始化事件
			__init() {
				// 获取顶部选项卡
				this.$H.get('/index_category/data').then((res) => {
					this.tabBars = res.category
					// 根据顶部选项卡生成页面
					let arr = []
					for (var i = 0; i < this.tabBars.length; i++) {
						let firstload = i === 0 ? 'after' : 'before'
						let obj = { //this.tabBars.length为9个，每个里面都有1个obj
							list: [],
							 //1.上拉加载更多 2.加载中... 3.没有更多了
							loadText: '上拉加载更多',//文字提示
							
							// 首次加载：before加载前，after加载后，ing加载中
							firstLoad: firstload //这个是为了切换选项卡(推荐/手机/智能等)不要频繁调用接口数据
						}

						// 获取首屏数据
						if (i === 0) {
							obj.list = res.data
						}

						arr.push(obj)
					}
					this.newsitems = arr
				})
			},
			// 加载数据/刷新数据
			async addData(callback = false) { 
			// index.nvue   下拉刷新   <refresh></refresh>组件    @refresh="refresh"
			// index.vue    下拉刷新    pages.json的"enablePullDownRefresh": true, //开启下拉刷新
				
				//拿到当前索引
				let e = this.tabIndex
				let obj = this.newsitems[e]
				// 拿到当前分类id
				let id = this.tabBars[e].id

				// 拿到当前分类的分页数 
				// console.log(obj.list.length) //固定总数5
				let page = Math.ceil(obj.list.length / 5) + 1
	             console.log(page,obj.firstLoad,'page')
				//下拉刷新的加载中如何隐藏
				if (page === 1) { //所有选项卡(推荐/手机/智能等)的第一页才需要显示加载中
					obj.firstLoad = 'ing'
				}
			
				let data = await this.$H.get('/index_category/' + id + '/data/' + page)
				//修改请求状态，首次加载完成 
				if (page === 1) {
					obj.firstLoad = 'after'
				}
					console.log(page,obj.firstLoad,'page')
				// 执行回调函数
				if (typeof callback === 'function') {
					callback()
				}
				
				//如果没有下拉刷新会拿到第一页的数据：[...data]
				//上拉加载会拿到[...this.newsitems[e].data,...data]的数据
				if (data) {
					obj.list = [...obj.list, ...data]
					// 没有更多了
					obj.loadText = data.length < 5? '没有更多了': '上拉加载更多'
				}
			
			},
			// 加载数据
			loadmore(index) { //上拉加载更多
				let item = this.newsitems[index]
				// 是否处于可加载状态
				
				// 条件：item.loadText等于加载中...或没有更多了时，才会终止  
				if (item.loadText !== '上拉加载更多') return //if里的判断怎样为true，要不全等于上拉加载更多(if里的判断为true执行，为false不执行)
				
				// 模拟加载
				item.loadText = '加载中...' //1.上拉加载更多 2.加载中... 3.没有更多了
				this.addData(() => {
					uni.showToast({
						title: '加载成功'
					})
				})
				// setTimeout(() => {
				// 	// 加载数据
				// 	item.list = [...this.newsitems[index].list, ...demo2]
				// 	item.loadText = '上拉加载更多' //上面代码只执行1次,写了这句可以加载无数次
				// }, 2000)
			},
			dianji(index) { //切换选项卡
				if (this.tabIndex === index) {
					return
				}
				this.tabIndex = index
				this.scrollinto = 'tab' + index
				
				console.log(this.newsitems[index].firstLoad,'ffffffffffffff')
			
				if (this.newsitems[index].firstLoad === 'after') {
					return
				}
				this.addData() //滑动选项卡的时候加载第2个数据
			},
			onChangeTab(e) { //监听滑动列表
				this.dianji(e.detail.current)
			},
			openDetail(){
				
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
	}

	.scroll-view_H {
		width: 130%;
		display: flex;
		flex-wrap: nowrap;
	}

	.arr {
		font-size: 28upx;
		margin-left: 50upx;
		width: 98upx;
		line-height: 100upx;
		height: 100upx;
	}

	.arr1 {
		color: orange;
		border-bottom-width: 6upx;
		border-bottom-style: solid;
		border-color: orange;
		text-align: center;
	}
</style>
