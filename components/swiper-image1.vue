<template>
	<view>
		<!-- 这里要有2个:style="getStyle" 图片才能显示完整 -->
		<swiper style="width: 100%;" :style="getStyle" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
			<block v-for="(item,index) in resdata" :key="index">
			<swiper-item>
				<view class="swiper-item" @tap="event(item,index)">
					<image style="width: 100%;" :src="item.src" lazy-load :style="getStyle"></image>
				</view>
			</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
	export default {
		props:{
			resdata:Array,
			height:{
				type:String,
				default:"350" // default:"350rpx" //这里不用upx，用rpx
			},
			preview:{
				type:Boolean,
				default:false
			}
		},
		computed:{
			getStyle(){
				console.log(this.height)
				return `height: ${this.height}rpx`
			},
			getUrls(){
				return this.resdata.map((v)=>v.src)
			}
		},
		methods: {
			event(item,index){
				if(this.preview){
					return uni.previewImage({
						current:index,
						urls:this.getUrls,
						indicator:"default" //app端才能看到具体的效果
					})
				}
			}
		}
	}
</script>

<style>

</style>

