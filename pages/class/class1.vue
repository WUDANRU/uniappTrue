<template>
	<view class="left" style="display:flex;justify-content: space-between;">
		<view class="left-a">
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y-1" @scrolltoupper="upper" @scrolltolower="lower"
		@scroll="scroll">
		<view id="demo1" class="scroll-view-item uni-bg-red" v-for="item in arrsa">{{item}}</view>
		</scroll-view>
		</view>
		
		<view class="left-b">
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y-2"
		@scroll="scroll">
		<view id="demo2" class="demo2 " v-for="item in arrsb">{{item}}</view>
		</scroll-view>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				arrsa:[
					"分类0",
					"分类1",
					"分类2",
					"分类3",
					"分类4",
					"分类5",
					"分类6",
					"分类7",
					"分类8",
					"分类9",
					"分类10",
					"分类11",
					"分类12",
					"分类13",
					"分类14",
					"分类15",
					"分类16",
					"分类17",
					"分类18",
					"分类19",
					"分类20"
				],
				arrsb:[
					"one",
					"two",
					"three",
					"one",
					"two",
					"three",
					"one",
					"two",
					"three",
				]
			}
		}
	}
</script>
<style>
	page{
		height:100%;
	}
	.left{
		height:100%;
	}
	.left-a{
	height:100%;
		width:20%;
		text-align:center;
	}
	.left-b{
	height:100%;
	width:80%;
	background:pink;
	}
	.demo2{
		height:100upx;
	}
.scroll-Y-1,.scroll-Y-2{
height:100%;
}
.scroll-view-item{
      height:100upx;
	  line-height:100upx;
	  background:#007AFF;
}
</style>