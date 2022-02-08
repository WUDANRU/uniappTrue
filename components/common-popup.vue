<template>
	<view @touchmove.stop.prevent="movehandle" class="_popup" :class="popupClass">
		<view class="_mask" @tap.stop="$emit('hide')" ></view>
		<view class="_body">
			<slot />
		</view>
	</view>
</template>

<script>
	export default{ //popupClass：通过class动态改变样式(由样式隐藏和显示)
		props:{
			popupClass: {
				type: String,
				default:'none' 
			}
		},
		methods:{
			// 手机上滑动，蒙版底下的不会跟着动了
			movehandle(){}
		}
	}
</script>

<style>
	._popup,
	/* mask是蒙版，popup是弹出层，body是白色主体 */
	._mask {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
	}
	
	._popup {
		z-index: 2000;
		display: none;
	}
	
	._mask {
		z-index: 2002;
		background: rgba(0, 0, 0, 0.5);
	}
	
	._popup ._body {
		position: fixed;
		bottom: 0;
		width: 92%;
		padding: 0 4%;
		/* 2个4%和92%加起来100% */
		height: 1035rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		border-radius: 20rpx 20rpx 0 0;
		z-index: 2006;
		background: #fff;
	
	}
	
	._popup.show {
		display: block;
		/* 点击显示点击隐藏不是马上就隐藏，100离开(离开这个高度1035)再隐藏的 */
	}
	
	._popup.hide {
		display: block;
	}
	
	._popup.none {
		/* ._popub .none是同在一个view */
		display: none;
		/* none是隐藏 */
	}
	
	@keyframes showPopupMask {
		0% {
			opacity: 0;
		}
	
		100% {
			opacity: 1;
		}
	}
	
	@keyframes hidePopupMask {
		0% {
			opacity: 1;
		}
	
		100% {
			opacity: 0;
		}
	}
	
	@keyframes showPopupBody {
		0% {
			transform: rotateY(0);
		}
	
		100% {
			transform: rotateY(-100%);
			/* 上滑就是-100%*/
		}
	}
	
	@keyframes hidePopupBody {
		0% {
			transform: rotateY(-100%);
		}
	
		/* 上滑就是-100%*/
		100% {
			transform: rotateY(0);
		}
	}
	
	.show ._mask {
		animation: showPopupMask 0.2s linear both;
	}
	
	.show ._body {
		animation: showPopupBody 0.2s linear both;
	}
	
	.hide ._mask {
		animation: hidePopupMask 0.2s linear both;
	}
	
	.hide ._body {
		animation: hidePopupBody 0.2s linear both;
	}
</style>
