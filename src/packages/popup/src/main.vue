<template>
	<div id="sxx-popup" class="sxx-popup" :style="{opacity: opacity}">
		
	</div>
</template>

<script>
export default {
  name: 'sxx-popup',
  props: {
  	list: { //list滚动列表
  		type: Array,
  		required: true
  	},
  	onChange: Function,
  	defaultValue: [String, Number]
  },
  data () {
  	return {
  		opacity: 0, //默认初始化透明度
  	};
  },
  watch: {
  	list (val, oldVal){
  		this.translateY = this.sectionH*2;
  	}
  },
  methods: {
  	//
  },
  mounted () {
  	const self = this;
  	setTimeout(() => {
  		self.opacity = 1;
  	},1)
  }
}
</script>

<style>
.sxx-popup{
	z-index: 999;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	word-break: break-all;
	transition: opacity .3s ease;
	-webkit-transition: opacity .3s ease;
	overflow: scroll;
}
.sxx-picker-box{
	position: relative;
	width: 100%;
	height: 4rem;
	overflow: hidden;
}
.sxx-picker-section{
	width: 100%;
	-webkit-transition-property: transform;
	transition-property: transform;
    -webkit-transition-timing-function: ease-out;
	transition-timing-function: ease-out;
}
.sxx-picker-section > div{
	font-size: 0.3rem;
    line-height: 0.8rem;
    color: #333333;
    text-align: center;
}
.sxx-picker-cover{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: linear-gradient(#fff 0%, rgba(255,255,255,0) 45%, rgba(255,255,255,0) 55%, #fff 100%);
    background: -webkit-linear-gradient(#fff 0%, rgba(255,255,255,0) 45%, rgba(255,255,255,0) 55%, #fff 100%);
}
.sxx-picker-selected{
	position: absolute;
	left: 0;
	top: 1.6rem;
	width: 100%;
	height: 0.8rem;
	border-top: 1px solid #eaeaea;
	border-bottom: 1px solid #eaeaea;
	box-sizing: border-box;
}
</style>
