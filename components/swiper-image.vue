<template>
	<view class="page-section swiper">
	     <view class="page-section-spacing">
	         <swiper class="swiper" indicator-dots="true" autoplay="true" interval="2000" circular="true">
	           <block  v-for="(item,index) in resdata" :key="index">
				 <swiper-item>
	                 <view  style="width:100%;height:100%;" class="swiper-item uni-bg-red"><image style="width:100%;height:100%;" :src="item.src" mode="scaleToFill"></image></view>
	             </swiper-item>
				 </block>
	         </swiper>
	     </view>
	 </view>
</template>

<script>
	export default {
		props:{
			resdata:{
				type:Object
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>
