<template>
	<!-- 外层不要多加一个view标签 -->
	<view @click="$emit('clicked')" style="display:inline-flex;text-align:center;font-size:24upx;" :style="getStyle" class="border m-1 p">
		{{item.name}}
	</view>
</template>

<script>
	export default{
		props:{
			item:Object,
			color:{
				type:Boolean,
				default:true //子组件这个要写,下面的!this.color才起作用，颜色才会显示出来
			}
		},
		computed:{
			getStyle(){
				if(!this.color)return `background:#ececec;border-color:#f4f4f4;`
				let color={
					borderColor:['#EEA6AA','#dd6a48','#98D5D8','#90BE93','#BCCD99'],
					background:['#aaff7f','#F8EAE9','#FFBEC6','#1aff1a','#E8F6F6','#E4F5E2','#F2F6E8']
				}
			let bg=color.background[Math.floor(Math.random()*color.background.length)]
			let bc=color.borderColor[Math.floor(Math.random()*color.borderColor.length)]
			return `background:${bg};border-color:${bc};`
		}
		}
	}
</script>

<style src="@/common/zcm-main-nvue.css">
</style>
