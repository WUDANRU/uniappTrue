<template>
	<view>
		<block v-for="(item,index) in list" :key="index">
			<uni-swipe-action :rightOptions="rightOptions" @click="bindClick($event,index)">
				<uni-list-item @click="choose(item)">
					<view class="text-secondary">
						<view class="d-flex a-center">
							<text class="main-text-color">{{item.name}}</text>
							{{item.phone}}
							<!-- <text class="main-text-color" v-if="item.isdefault">[默认]</text> -->
							<text class="main-text-color" v-if="index===0 && item.last_used_time !==null">[默认]</text>
						</view>
						<view>{{item.province}} {{item.city}} {{item.district}}</view>
						<view>{{item.address}}</view>
					</view>
				</uni-list-item>
			</uni-swipe-action>
		</block>

		<!-- 没有数据 -->
		<no-thing v-if="list.length===0" msg="空空如也" />
		<!-- 上拉加载更多 -->
		<divider />
		<view class="d-flex a-center j-center text-light-muted font-3 py-3">
			{{loadtext}}
		</view>

	</view>
</template>
<!-- 
index===0代表默认地址  
"last_used_time"代表最后一次，值为1568636040或null  
如果没有默认地址就使用最后一次作为默认地址
没有默认就是null，null就是false
  -->

<!-- 增加(创建)收货地址和修改收货地址都是同一个user-path-edit页面-->

<!-- 用storage试试 -->
<!-- /user-path-list这个页面通过+进入到的/user-path-edit页面增加收获地址再点击刷新，state新增的列表数据被刷没了 -->
<!-- /user-path-edit页面修改后的值点击刷新，还是回到回来的假数据 -->

<script>
	import uniListItem from "@/components/uni-ui/uni-common/uni-list-item/uni-list-item.vue"
	import uniSwipeAction from "@/components/uni-ui/uni-swipe-action-item/uni-swipe-action-item.vue"
	import noThing from '@/components/no-thing.vue'

	import {
		mapState,
		mapMutations,
	} from "vuex"

	export default {
		components: {
			uniListItem,
			uniSwipeAction,
			noThing
		},
		data() {
			return {
				// 上拉加载更多 加载中 没有更多了
				loadtext: "上拉加载更多",
				page: 1,
				isChoose: false, //true表示从confirm页面进来的
				rightOptions: [{
					text: '修改',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
			}
		},
		// 监听导航栏按钮点击
		onNavigationBarButtonTap(e) { //创建地址(+号在pages.json写的)
			console.log(e)
			if (e.index === 0) {
				uni.navigateTo({
					url: '/pages/user-path-edit/user-path-edit'
				})
			}
		},
		computed: {
			...mapState({
				list: state => state.path.list
			})
		},
		onLoad(e) {
			//console.log(e) //confirm页传来的{type: 'choose'}
			if (e.type === 'choose') {
				this.isChoose = true
				console.log(this.list,'this.list[0]')
			}
			
			this.getData()
			
			// 注册一个监听事件
			uni.$on('updateUserPathList',()=>{
				this.page=1
				this.getData()
			})
			
		},
		onUnload(){
			uni.$off('updateUserPathList')
		},
		onPullDownRefresh() {
			this.page = 1
			this.getData(() => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			// 是否已经处于加载状态
			if (this.loadtext !== '上拉加载更多') return
			// 改变加载状态
			this.loadtext = '加载中...'
			this.page++
			//请求数据
			// this.getData() //共走了1次，没有走callback，走了this.getData()1次

			this.getData(() => { //共走了2次，走callback1次，和this.getData()1次
				uni.showToast({
					title: '加载成功', //这个会替换掉刷新成功
					icon: 'none'
				})
			})
		},
		methods: {
			...mapMutations(['delPath', 'updatePathList']),
			// 初始化
			getData(callback = false) {
				this.$H.get('/useraddresses/' + this.page, {}, {
					token: true
				}).then(res => {
					let refresh = this.page === 1
					this.updatePathList({
						refresh: refresh, //分页为1表示下拉刷新，分页为2或2以上表示上拉加载
						list: res
					})
					this.loadtext = res.length < 10 ? '没有更多了' : '上拉加载更多'
					// 下拉刷新
					if (typeof callback === 'function') {
						uni.showToast({
							title: '刷新成功',
							icon: 'none'
						})
						callback()
						console.log('里')
					}
					console.log('外')
					// 404服务端失败走catch
				}).catch(err => { //catch加或不加都可以，search-list.vue也可以同样写catch
					if (typeof callback === 'function') {
						callback()
					}
					if (this.page > 1) { //=1表示下拉刷新，>1表示只存在于上拉加载
						// 页码回归上一页   //this.page++ 加1如果刷新失败,页码回归上一页
						this.page--
						this.loadtext = '上拉加载更多'
					}
				})
			},
			// 选择收货地址
			choose(item) {
				if (this.isChoose) { //从confirm页面进来的才触发choose方法
					//通知订单提交页修改收货地址
					uni.$emit('choosePath', item) //吧item传给confirm页
					// 关闭当前页面(返回上一页)
					uni.navigateBack({
						delta: 1
					})

				}
			},
			bindClick(e, index) {
				// console.log(e, index) //e.index有0，1，其中0代表修改，1代表删除   //e.content.text
				switch (e.index) {
					case 0: //修改
						let obj = {
							dex: index,
							item: this.list[index]
						}
						console.log(obj.item,'obj')
						// 加上是否默认  default必须是1，0
						obj.item.default=(index===0 && obj.item.last_used_time !== null) ? 1 : 0
					console.log(obj.item.default,'default')
					console.log(obj.item,'default')
						setTimeout(() => { //如果点击修改反应比较慢然后点击后要跳转，这个问题可以延迟解决
							uni.navigateTo({
								url: '../user-path-edit/user-path-edit?data=' + JSON.stringify(obj)
							})
						}, 50)
						break;

					case 1: //删除
						uni.showModal({
							content: '要删除该收货地址吗？',
							success: (res) => {
								if (res.confirm) {
									
									// 删除需要id，通过索引拿到id
									this.$H.del('/useraddresses/'+this.list[index].id, {}, {
										token: true
									}).then(res => {
										this.delPath(index) //直接写this要用箭头函数
										uni.showToast({
											title: '删除成功'
										})
									})
								}
							}
						})
						break;
				}
			}
		}
	}
</script>

<style>

</style>
