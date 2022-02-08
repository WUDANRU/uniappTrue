<template>
	<view>
		<textarea v-model="reason" placeholder="请填写退款理由" class="uni-textarea px-3 font-md"/>
		<view class="p-3">
			<!-- button的属性：plain loading -->
			<button type="default" :plain="plain" :loading="loading" class="bg-white" @click="refund" :disabled="reason.length === 0">{{loading ? '申请中...':'申请退款'}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reason:"",//原因必填
				loading:false,//防止重复
				plain:true, //镂空按钮
				id:0
			}
		},
		onLoad(e) {
			if(!e.detail){
				uni.navigateBack({
					delta: 1
				});
				return uni.showToast({
					title: '参数错误',
					icon: 'none'
				});
			}
			this.id = (JSON.parse(e.detail)).id
		},
		methods: {
			// 退款申请
			refund(){
				this.loading = true
				this.$H.post('/order/'+this.id+'/apply_refund',{
					reason:this.reason
				},{
					token:true
				}).then(res=>{
					console.log(res);
					this.loading = false
					uni.navigateBack({
						delta: 1
					});
					uni.showToast({
						title: '申请成功，等待商家审核',
						icon: 'none'
					});
				}).catch(err=>{
					this.loading = false
				})
			}
		}
	}
</script>

<style>

</style>
