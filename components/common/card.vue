<template>
	<view class="card">
		<!-- head -->
		<view v-if="showhead" class="p-1 main-border-color" :class="getHeadClass" style="padding-top:40rpx;">
			<slot name="title">
				<text v-if="headTitle" style="font-size: 30upx;" :class="headTitleWeight?'font-weight':''">{{headTitle}}</text>
			</slot>
		</view>
		
		<!-- body -->
		<!-- <view :class="{'p-2':bodyPadding}" -->
		<view :class="getBodyClass" >
			<image v-if="bodyCover" :src="bodyCover" 
			mode="widthFix"></image>
			<slot />
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			// 头部标题
			headTitle:String,
			// 封面图
			bodyCover:String,
			// 是否显示头部
			showhead:{
				type:Boolean,
				default:true
			},
			bodyPadding:{
				type:Boolean,
				default:false
			},
			// 头部下边框
			headBorderBottom:{
				type:Boolean,
				default:false
			},
			bodyPadding:{
				type:Boolean,
				default:false
			},
			headTitleWeight:{
				type:Boolean,
				default:true
			}
		},
		computed:{
			getHeadClass(){
				return {
					'border-bottom':this.headBorderBottom,
				}
			},
			getBodyClass(){
				return {
					'p-2':this.bodyPadding
				}
			}
		},
		// onLoad(){
		// 	console.log(this.headTitleWeight,'headTitleWeight')
		// 	console.log(this.headTitle,'ddddddddddd')
		// }
	}
</script>

<style src="@/common/zcm-main-nvue.css"></style>