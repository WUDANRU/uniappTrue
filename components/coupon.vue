<template>
	<view @click="$emit('click')" class="bg-white rounded border d-flex a-center border-light-secondary mb-3">
		<view class="flex-1 d-flex flex-column j-center px-2">
			<view class="font-3" :class="item.disabled || !item.status ? 'text-light-muted':''">{{item.title}}</view>
			<!-- 父组件item.status是true，这里的!item.status表示false -->
			<view class="font-1 text-light-muted">
				<!-- {{item.start_time}}~{{item.end_time}} -->
				{{item.start_time|formatTime}}~{{item.end_time|formatTime}}
			</view>
		</view>
		<view class="text-white d-flex flex-column a-center j-center" style="width: 220rpx;height: 200rpx;"
			:class="item.disabled || !item.status ? 'bg-secondary':'main-bg-color'">
			<view style="font-size: 32rpx;line-height: 1.4;">
				{{item.price}}<text class="font-3">{{item.type===0?'元':'折'}}</text>
			</view>
			<view class="font-3">{{item.desc}}</view>

			<view style="width:200rpx;" class="rounded bg-white text-center" hover-class="bg-light"
				:class="item.disabled || !item.status? 'text-secondary':'main-text-color'">
				<slot>{{ item.status ? '去使用' : '已失效'}}</slot>
				<!-- {{ item.status ? '去使用' : '已失效'}} -->
			</view>
			<!-- status:true和disabled:false，如果是这样，代表可领取 -->
			<!-- status等于0代表失效，1代表有效 -->
			<!-- disabled代表是否领取，true代表已领取 -->
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: Number
		},
		filters: {
			//toString().length<13 时间戳13位
			//shorttime*1000  不到13位补到13位
			formatTime(shorttime) {
				shorttime = shorttime.toString().length < 13 ? shorttime * 1000 : shorttime;
				let date = new Date(shorttime)
				
				let parseNumber = (num) => {
					return num < 10 ? "0" + num : num;
				}
				return date.getFullYear() + '-' + parseNumber(date.getMonth() + 1) + '-' + parseNumber(date.getDate()) +
					' ' + parseNumber(date.getHours()) + ':' + parseNumber(date.getMinutes())
			}
		}
	}
</script>

<style>
</style>
