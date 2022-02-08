<template>
<view @click="openDeta" style="padding:20upx 10upx;transition: 1s 1s height ease;" class="row  border-bottom border-ligth-secondary animated fadeIn faster">	
			<view class="span-6">
				<image style="width:260upx;height:260upx;" :src="item.titlepic"></image>
			</view>
			<view class="span-14 pl-3 d-flex flex-column">
				<view class="font-1 font-weight">{{item.title}}</view>
				<view class="">
					{{item.desc}}
				</view>
				<price>{{item.pprice}}</price>
				<view class="font-1 text-light-muted">
					{{item.comment_num}} 条评论 {{item.good_num}}满意
				</view>
			</view>
		</view>
</template>

<script>
	import price from '@/components/price.vue'
	
	export default{
		components: {
			price
		},
		props:{
			item:Object,
			index:Number
		},
		methods:{
		openDeta(){
			uni.navigateTo({
				url:"/pages/detail/detail?detail="+JSON.stringify(this.item)
			})
		}
		}
	}
</script>

<style>
</style>
