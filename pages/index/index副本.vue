<template>
	<view style="height:100%;">
		<scroll-view scroll-x="true" style="width: 100%;overflow:hidden;white-space:nowrap;"
			:scroll-into-view="scrollinto" scroll-with-animation="true">
			<view class="scroll-view_H">
				<view id="demo1" class="" v-for="(item,index) in arr" :key="index">
					<view @click="dianji(index)" :class="dex===index?'arr1':''" :id="'tab'+index" class="arr">
						{{item.name}}
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- :id="'tab'+item.index" :scroll-into-view="scrollinto" -->
		<!-- 解决连动问题：scroll-into-view 值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素 -->
		<swiper @change="onChangeTab" circular :current="dex" :duration="150" :style="'height:'+scrollH+'px'">
			<!--:current当前所在滑块的索引 e.detail.current,当前滑块的索引 -->
			<swiper-item v-for="(item,index) in arr" :key="index">
				<scroll-view scroll-y scroll-left="120" :style="'height:'+scrollH+'px'">
					<view class="">
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

							<template v-else-if="list.type==='card'">
								<card headTitle="每日精选" bannerCover="/static/images/demo/demo8.jpg" />
								<card :showHead="false">
									<image style="width:100%;" src="/static/images/demo/demo8.jpg" mode="widthFix">
									</image> <!-- slot-name:body -->
								</card>
							</template>

							<view class="row j-sb" v-else-if="list.type==='muchPic'" @click="openDetail">
								<block v-for="(item,index) in list.data" :key="index">
									<much-pic :item="item" :index="index" />
								</block>
							</view>

						</block>
					</view>
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
				dex: 0,
				arr: [{
						name: '关注',
						list: [{
								type: 'swiper',
								data: [{
										src: "/static/images/demo/demo4.jpg"
									},
									{
										src: "/static/images/demo/demo8.jpg"
									}
								]
							},
							{
								type: 'indexnavs',
								data: [{
										src: "../../static/indexnav/1.png",
										name: "新品分类"
									},
									{
										src: "../../static/indexnav/2.gif",
										name: "小米众筹"
									},
									{
										src: "../../static/indexnav/3.gif",
										name: "以旧换新"
									},
									{
										src: "../../static/indexnav/4.gif",
										name: "1分拼团"
									},
									{
										src: "../../static/indexnav/5.gif",
										name: "超值特卖"
									},
									{
										src: "../../static/indexnav/1.png",
										name: "新品分类"
									},
									{
										src: "../../static/indexnav/2.gif",
										name: "小米众筹"
									},
									{
										src: "../../static/indexnav/3.gif",
										name: "以旧换新"
									},
									{
										src: "../../static/indexnav/4.gif",
										name: "1分拼团"
									},
									{
										src: "../../static/indexnav/5.gif",
										name: "超值特卖"
									}
								]
							},
							{
								type: "threeAdv",
								data: {
									big: {
										src: "/static/images/demo/demo1.jpg"
									},
									smalltop: {
										src: "/static/images/demo/demo2.jpg"
									},
									smallbottom: {
										src: "/static/images/demo/demo2.jpg"
									},
								}
							},
							{
								type: "card"
							},
							{
								type: "muchPic",
								data: [{
										cover: "/static/images/demo/list/1.jpg",
										title: "米家空调",
										desc: "1.5匹变频",
										oprice: 2699,
										pprice: 1399
									},
									{
										cover: "/static/images/demo/list/1.jpg",
										title: "米家空调",
										desc: "1.5匹变频",
										oprice: 2699,
										pprice: 1399
									},
									{
										cover: "/static/images/demo/list/1.jpg",
										title: "米家空调",
										desc: "1.5匹变频",
										oprice: 2699,
										pprice: 1399
									},
									{
										cover: "/static/images/demo/list/1.jpg",
										title: "米家空调",
										desc: "1.5匹变频",
										oprice: 2699,
										pprice: 1399
									},
									{
										cover: "/static/images/demo/list/1.jpg",
										title: "米家空调",
										desc: "1.5匹变频",
										oprice: 2699,
										pprice: 1399
									},
									{
										cover: "/static/images/demo/list/1.jpg",
										title: "米家空调",
										desc: "1.5匹变频",
										oprice: 2699,
										pprice: 1399
									}
								]
							}
						]
					},
					{
						name: '推荐',
						list: [
							{
								type: "threeAdv",
								data: {
									big: {
										src: "/static/images/demo/demo1.jpg"
									},
									smalltop: {
										src: "/static/images/demo/demo2.jpg"
									},
									smallbottom: {
										src: "/static/images/demo/demo2.jpg"
									},
								}
							},
							{
								type: "muchPic",
								data: [{
										cover: "/static/images/demo/list/1.jpg",
										title: "米家空调",
										desc: "1.5匹变频",
										oprice: 2699,
										pprice: 1399
									},
									{
										cover: "/static/images/demo/list/1.jpg",
										title: "米家空调",
										desc: "1.5匹变频",
										oprice: 2699,
										pprice: 1399
									},
									{
										cover: "/static/images/demo/list/1.jpg",
										title: "米家空调",
										desc: "1.5匹变频",
										oprice: 2699,
										pprice: 1399
									},
									{
										cover: "/static/images/demo/list/1.jpg",
										title: "米家空调",
										desc: "1.5匹变频",
										oprice: 2699,
										pprice: 1399
									},
									{
										cover: "/static/images/demo/list/1.jpg",
										title: "米家空调",
										desc: "1.5匹变频",
										oprice: 2699,
										pprice: 1399
									},
									{
										cover: "/static/images/demo/list/1.jpg",
										title: "米家空调",
										desc: "1.5匹变频",
										oprice: 2699,
										pprice: 1399
									}
								]
							}
						]
					},
					{
						name: '体育'
					},
					{
						name: '热点'
					},
					{
						name: '财经'
					},
					{
						name: '娱乐'
					},
					{
						name: '军事'
					},
					{
						name: '历史'
					},
					{
						name: '本地'
					}
				],
			}
		},
		onLoad() {
			// 获取剩余可视区域高度
			uni.getSystemInfo({
				success: (res) => {
					// console.log(res.windowHeight) //可视区域高度(px单位)，573px
					// this.scrollH是是剩余可视区域高度
					this.scrollH = res.windowHeight - uni.upx2px(
						100) // .arr的height是98，减去98   //uni.upx2px是吧upx转为px
					// console.log(this.scrollH, 'dddddddddd')
				}
			})
		},
		methods: {
			find(item) {
				console.log('itemddddddddd', item)
			},
			dianji(index) { //切换选项卡
				console.log(index)
				if (this.dex === index) {
					return;
				}
				this.dex = index
				this.scrollinto = 'tab' + index
			},
			onChangeTab(e) { //监听滑动列表
				console.log(e.detail.current)
				this.dianji(e.detail.current)
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

