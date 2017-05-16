<template>
	<div id="sxx-popup" class="sxx-popup" :style="{opacity: opacity}" v-show="show" @touchend="layerTap?layerTap:''">
		<slot>这是个自定义弹窗组件！</slot>
	</div>
</template>

<script>
export default {
  name: 'sxx-popup',
  props: {
  	visible: {
  		type: Boolean,
  		required: true
  	},
  	layerTap: Function,
  	afterClose: Function
  },
  data () {
  	return {
  		opacity: 0, //默认初始化透明度
  		show: false,
  	};
  },
  created () {
  	if(this.visible){
  		this.show = this.visible;
  	}
  },
  watch: {
  	visible (val){
  		const self = this;
  		if(val){
  			self.opacity = 1;
  		}else{
  			self.opacity = 0;
  		}
  		setTimeout(() => {
  			self.show = val;
  			if(!val&&self.afterClose){
  				self.afterClose();
  			}
  		}, 300);
  	}
  },
  mounted () {
  	const self = this;
  	self.show = self.visible;
  	setTimeout(() => {
  		self.opacity = 1;
  	},1)
  }
}
</script>

<style>
.sxx-popup{
	z-index: 999;
	display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	word-break: break-all;
	transition: opacity .3s ease;
	-webkit-transition: opacity .3s ease;
	background-color: rgba(0,0,0,0.4);
	overflow: hidden;
}
</style>
