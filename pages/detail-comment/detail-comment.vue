<template>
	<view>
		<view class="py-1">
			<view class="d-flex py-1 a-center border-bottom border-light-secondary">
				<text>用户评价({{total}})</text>
				<!-- item.goods_num点赞数  good_rate好评率-->
				<text class="main-text-color ml-auto mr-2">{{(good_rate*100)+'%'}}</text>
				<text>满意</text>
			</view>
			<view class="d-flex flex-wrap pt-1" style="margin-right:-30rpx;">
				<view v-for="(item,index) in cateList" :key="index" :class="cateIndex===index?'active':''"
					class="px-1 py border rounder mr-1 mb-1 cate-item" @tap="cateChange(index)">
					{{item.name}}
				</view>
			</view>
		</view>
		<!-- style="margin-right:-30rpx;"这个是如果右边比较空的话可以用这个就不会太空 -->
		<!-- mr-auto所在的昵称这一个吧超好所在的view推向右边 -->
		<!-- flex-1占满剩余的空间 -->
		<divider />
		<!-- 在被挤压的元素上使用flex-shrink:0 -->
		<!-- 下面的文字太多，图片会被挤压使用flex-shrink -->

		<view class="p-2 d-flex a-start" v-for="(item,index) in list" :key="index">
			<image :src="item.user.avatar" mode="widthFix" style="width:90rpx;height:90rpx;"
				class="rounded flex-shrink"></image>
			<view class="pl-2 flex-1">
				<view class="d-flex a-center">
					<text class="font-sm text-primary font-weight mr-auto">{{item.user.nickname}}</text>
					<view class="iconfont icon-service main-text-color">
						<text class="pl font-1">{{item.rating | rating}}</text>
					</view>
				</view>
				<view class="line-h-md font-1">
					{{item.review.data}}
				</view>
				<view class="row" v-if="item.review.image.length>0">
					<view class="apan24-8 px pb" v-for="(img,imgIndex) in item.review.image" :key="imgIndex">
						<image :src="img" mode="widthFix" style="width:100upx;"></image>
					</view>
				</view>
				<view class="d-flex a-center">
					<text class="text-light-muted mr-auto">{{item.review_time | formatTime}}</text>
					<view class="d-flex text-light-muted mr-1">
						{{item.goods_num}}<text class="iconfont icon-dianzan text-muted ml"></text>
					</view>
					<view class="d-flex text-light-muted">
						<text class="iconfont icon-pinglun text-muted  ml"></text>
					</view>
				</view>

				<!-- 客服回复 -->
				<view class="font-1 py rounder d-flex flex-wrap a-center mt-1" style="background: #ececec;">
					<text class="main-text-color">官方回复：</text>
					官方回复，哈哈哈哈
					<view class="py iconfont icon-dianzan text-light-muted line-h-md" style="font-size:32upx;">
						<text class="main-muted pl-1" @click="num++">赞客服 {{num}}</text>
					</view>
				</view>

			</view>
		</view>
		<divider />
		<view class="d-flex a-center j-center text-light-muted font-1 py-3">
			{{loadtext}}
		</view>

	</view>
</template>

<script>
	import $T from '@/common/lib/time.js'
	export default {
		data() {
			return {
				id: 0,
				total: 0,
				good_rate: 0,
				list: [],
				num:20,
				page: 1,
				loadtext: '上拉加载更多', //1、上拉加载更多   2、加载中...  3、没有更多数据了
				cateIndex: 0,
				cateList: [{
						name: "全部",
						value: ""
					},
					{
						name: "好评",
						value: "/good"
					},
					{
						name: "中评",
						value: "/middle"
					},
					{
						name: "差评",
						value: "/bad"
					},
				],
				// cateList: [{
				// 		name: "全部"
				// 	},
				// 	{
				// 		name: "有图"
				// 	},
				// 	{
				// 		name: "非常喜欢"
				// 	},
				// 	{
				// 		name: "拍照好"
				// 	},
				// 	{
				// 		name: "手感很棒"
				// 	},
				// 	{
				// 		name: "效果好"
				// 	},
				// 	{
				// 		name: "性能很棒"
				// 	},
				// ]
			}
		},
		filters: {
			formatTime(value) {
				return $T.gettime(value)
			},
			rating(value) {
				if (value === 3) {
					return '中评'
				} else if (value > 3) {
					return '好评'
				} else {
					return '差评'
				}
			}
		},
		onLoad(e) {
			this.id = e.id //{id: '25'}
			this.__init()
		},
		onReachBottom() { //页面上拉触底事件
			if (this.loadtext !== '上拉加载更多') return

			this.page++
			this.loadtext = '加载中...'
			this.getData()
		},
		// onBackPress(){
		// 		console.log(1)
		// // uni.navigateTo({
		// // 	// detal:1
		// // })
		// },
		// 监听下拉刷新
		onPullDownRefresh(){
			this.getData((res)=>{
				uni.showToast({
					title: '刷新成功',
					icon: 'none'
				});
				uni.stopPullDownRefresh();
			},false)
		},
		methods: {
			__init() {
				this.getData()

				// this.$H.get(`/goods/${this.id}/comments`).then(res => { //不能写成这样：。。。。。。comments/
				// 	this.total = res.total
				// 	this.good_rate = res.good_rate,
				// 	this.list = res.list
				// })
			},
			// 加载数据
			getData(callback = false, refresh = false) {
				console.log(refresh,'refrddddddesh')
				let value = this.cateList[this.cateIndex].value //好评/中评/差评

				// this.$H.get(`/goods/${this.id}/comments?page=${this.page}`).then(res => {console.log(res.list.length,'a')})
				// this.$H.get(`/goods/${this.id}/comments/good?page=${this.page}`).then(res => {console.log(res.list.length,'b')})
				// this.$H.get(`/goods/${this.id}/comments/middle?page=${this.page}`).then(res => {console.log(res.list.length,'c')})
				// this.$H.get(`/goods/${this.id}/comments/bad?page=${this.page}`).then(res => {console.log(res.list.length,'d')})

				this.$H.get(`/goods/${this.id}/comments${value}?page=${this.page}`).then(res=>{	
				console.log(res.list.length, 'def') //这是对的
				
				this.total = res.total
				this.good_rate = res.good_rate,
			
					this.list = !refresh ? [...res.list] : [...this.list, ...res.list] 
					
				//后面加载的数据，1次加载10条
				this.loadtext = res.list.length < 10 ? '没有更多数据了' : '上拉加载更多'

				if (typeof callback === 'function') {
					callback()
				}
				return
			})},
			cateChange(index) {
				this.cateIndex = index
				console.log(this.num, this.list.length, 'HH') //这是错的，1，1，'HH'
			
				this.getData((res) => {
					if(this.loadtext==='没有更多数据了') return
						uni.showLoading({
							title: '加载中...'
						})
					uni.hideLoading()
					if (res) {
						uni.showToast({
							title: '加载成功'
						})
					}
				}, false)
			}
		}
	}
</script>

<style>
	.cate-item {
		background: #FFEBEC;
		color: #7B6D6C;
		border-color: #F4E0E1;
	}

	.cate-item.active {
		background: #FF6B01 !important;
		color: #FFFFFF !important;
		border-color: #DE7232 !important;
	}
</style>
