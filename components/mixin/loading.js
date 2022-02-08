export default {
	data(){
		return {
			beforeReady:true,
		}
	},
	onReady() {//onReady加载完成，闪的白屏解决方法
		this.$nextTick(()=>{
			setTimeout(()=>{
				this.beforeReady = false
			},500)
		})
	},
}