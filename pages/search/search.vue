<template>
	<view>
		<!-- #ifdef MP -->
		<!-- 自定义导航 小程序端的搜索栏 -->
		<view class="d-flex a-center px-1" style="z-index:100;height: 90rpx;position:fixed;top:0;left:0;right:0;background:#fff;">
			<view class="flex-1 bg-light rounded d-flex a-center text-light-muted" style="height: 65rpx;">
				<text class="iconfont icon-sousuo mx-2"></text>
				<!-- 测试小程序端：防抖要用watch，写封装函数才用@input -->
				<!-- @keyup="appSearch" 在小程序端不起作用 -->
				<input @input="appSearch" v-model="keyword" style="width:78%" type="text" value="智能积木" />
			</view>
			<!-- 右边 -->
			<view style="width: 85rpx;" class="d-flex a-center j-center">
				<text @click="search">搜索</text>
					<!-- <text @click="getSearch">搜索2</text> -->
			</view>
		</view>
		<view style="height:90rpx;"></view><!-- 没有这个的话下面会被挡住 -->
		<!-- #endif -->
	<!-- nvue页面跳转到vue页面  
	bodyCover传给子组件，虽然bodyCover是String,但是子组件需要写成 :src和父组件传给子组件需要用绝对路径(小程序会找不到图片)-->
	<card headTitle="热门搜索" bodyCover="/static/images/demo/search-banner.png"></card>
<!-- 	<block v-for="(item,index) in hot" :key="index">
		<view :style="getStyle" class="px-2 py-1 border m-1">
			{{item.name}}
		</view>
		</block> -->
		
		<!-- 多色按钮 -->
		<view style="margin:none;" class="">
			<color-tag v-for="(item,index) in hot" @clicked="quickSearch(item.name)" :key="index" :item="item"></color-tag>
		</view>
		
		<!-- 常用按钮 -->
		<card headTitle="常用分类" :bodyPadding="true" :headBorderBottom="false">
			<color-tag @clicked="quickSearch(item.name)" :color="false" v-for="(item,index) in cate" :key="index" :item="item"></color-tag> 
		</card>
		
		<divider />
		
		<!-- 搜索记录 -->
		<card headTitle="搜索记录" headTitleWeight>
			<view slot="right" class="font-1 text-primary d-flex text-muted"
			@click="clearHistory">清除搜索记录</view>
			<uni-list-item @click="quickSearch(item)" v-for="(item,index) in historyList" :key="index" 
			:title="item" :showArrow="true"></uni-list-item>
		</card>
		
	</view>
</template>
<!-- style="background:#007AFF;border-color:#007AFF;" -->
<script>
	import { debounce,throttle } from '@/common/lib/debounce.js'
	import card from "@/components/uni-card.vue"
	import colorTag from "@/components/common/color-tag.vue"
	
		// uniListItem这是在官方提供的uniapp项目拿的，需要吧uni-common整个拿才不会报错
	import uniListItem from "@/components/uni-ui/uni-common/uni-list-item/uni-list-item.vue"

	export default {
		components:{
			card,
			colorTag,
			uniListItem
		},
		data() {
			return {
				historyList:[],
				keyword:'',
				hot:[
					{name:'领券中心'},
					{name:'Redmi k20'},
					{name:'RedmiBook 14'},
					{name:'智能积木 越野四驱车'},
					{name:'手环 腕带'}
				],
				cate:[
					{ name:'耳机' },
					{ name:'手机' },
					{ name:'音箱' },
					{ name:'手表' },
					{ name:'配件' },
					{ name:'网关/传感器' },
					{ name:'健康' },
					{ name:'酷玩' },
				],
			}
		},
		onNavigationBarButtonTap(e) { //点击(原生导航栏右边的搜索)按钮才能跳转
		
		this.search()
			console.log(e)
				if (e.index === 0){
					// uni.navigateTo({
					// 	url: '../search-list/search-list',
					// });
				}
		},
		// onNavigationBarSearchInputClicked(e){ //disabled为true，点击原生input框触发
		// 	console.log(e)
		// },
		//输入内容触发
		onNavigationBarSearchInputChanged(e){ //pages.json设置"disabled": false，(true表示不能输入，false相反)
		console.log('abc',e)
			this.keyword=e.text
			// uni.navigateTo({
			// 	url: '/pages/search-list/search-list',
			// });
		},
		// 点击(软键盘的搜索)触发或笔记本的enter键触发
		onNavigationBarSearchInputConfirmed() {
			this.search()
		},
		created(){ //这个是app端用的
			// 加载历史记录
			let history=uni.getStorageSync('searchHistory')
			this.historyList=history?JSON.parse(history):[]
		},
		//onLoad执行1次，onShow只要回到这个页面就执行
		onShow(){//这个不是app端用的
			// 加载历史记录
			let history=uni.getStorageSync('searchHistory')
			this.historyList=history?JSON.parse(history):[]
			if(this.historyList.length>6){// 不超过6条，超过删除最后一个
				this.historyList.splice(this.historyList.length-1,1)
			}
			uni.setStorageSync('searchHistory',JSON.stringify(this.historyList))
		},
	// watch:{
	// 	keyword(){
	// 		if (timer) clearTimeout(timer)
	// 		let timer=null
	// 		timer=setTimeout(()=>{
	// 			this.handled()
	// 		},1000)
	// 	}
	// },
		methods: {
		// handled(){
		// 	console.log(this.keyword)
		// },
		 appSearch:debounce (function() {
		      this.getAppList()
		    }, 1000),
		    getAppList() {
		      console.log(this.keyword,'this.keyword')
		    },
		 // getSearch(){
			 
		 // },
		 // 	quickSearch(name){
		 // 	this.keyword=name
		 // 	this.search()
		 // 	},
			search(){
				if(this.keyword===''){
					return uni.showToast({
							title:'关键词不能为空',
							icon:'none'
						})
				}
				// this.addHistory()
				// #ifdef APP-PLUS
				console.log('plus.key.hideSoftKeybord')
				plus.key.hideSoftKeybord() //隐藏已经显示的软键盘
				// #endif
				
				// #ifndef MP
				console.log('MP')
			    uni.hideKeyboard()
				// #endif
			
				uni.navigateTo({
					url:'../search-list/search-list?keyword='+this.keyword,
					success: () => {
							setTimeout(()=>{
								this.addHistory()
							},500)
					}
				})
			},
			// 加入搜索记录
			addHistory(){
				// let historyList=[]
				// historyList.unshift(this.keyword)
				// this.historyList=this.keyword
				// console.log(this.historyList,'a')
				// this.keyword=''
				
				let index = this.historyList.indexOf(this.keyword)
				if (index === -1) {
						// console.log(index,'不包含')
					this.historyList.unshift(this.keyword)
				} else {
					this.historyList.unshift(this.historyList.splice(index,1)[0]) //删除并向前添加当前关键词,执行这个不能打印下面的,splice会删除
					// console.log(this.historyList.splice(index,1)[0],this.keyword) //'dd' 'dd'
				}
				if(this.historyList.length>6){// 不超过6条，超过删除最后一个
				console.log(this.historyList.length,'前')
					this.historyList.splice(this.historyList.length-1,1)
						console.log(this.historyList.length,'后')
				}
				uni.setStorageSync('searchHistory',JSON.stringify(this.historyList))
			},
			// 清除搜索记录
			clearHistory(){
				uni.showModal({
					title:'提示',
					content:'是否要清除搜索历史?',
					cancelText:'取消',
					confirmText:'清除',
					success:res=>{
						if(res.confirm){
							uni.removeStorageSync('searchHistory')
							this.historyList=[]
						}
					}
				})
			},
		}
	}
</script>

<style src="@/common/zcm-main-nvue.css">

</style>
