<template>
	<div id="sxx-loading" class="sxx-loading" :style="{opacity: opacity}" v-if="show">
		<div class="sxx-loading-box">
			<div class="sxx-loading-svg">
				<svg width="30" height="30" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
				    <defs>
				        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
				            <stop stop-color="#fff" stop-opacity="0" offset="0%"/>
				            <stop stop-color="#fff" stop-opacity=".631" offset="63.146%"/>
				            <stop stop-color="#fff" offset="100%"/>
				        </linearGradient>
				    </defs>
				    <g fill="none" fill-rule="evenodd">
				        <g transform="translate(1 1)">
				            <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2">
				                <animateTransform
				                    attributeName="transform"
				                    type="rotate"
				                    from="0 18 18"
				                    to="360 18 18"
				                    dur="0.9s"
				                    repeatCount="indefinite" />
				            </path>
				            <circle fill="#fff" cx="36" cy="18" r="1">
				                <animateTransform
				                    attributeName="transform"
				                    type="rotate"
				                    from="0 18 18"
				                    to="360 18 18"
				                    dur="0.9s"
				                    repeatCount="indefinite" />
				            </circle>
				        </g>
				    </g>
				</svg>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'sxx-loading',
  props: {
  	visible: {
  		type: Boolean,
  		required: true
  	}
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
  			self.show = val;
  			setTimeout(() => {
  				self.opacity = 1;
  			}, 10)
  		}else{
  			self.opacity = 0;
  			setTimeout(() => {
  				self.show = val;
  			},10)
  		}
  	}
  },
  mounted () {
  	const self = this;
  	self.show = self.visible;
  	setTimeout(() => {
  		if(self.visible){
  			self.opacity = 1;
  		}else{
  			self.opacity = 0;
  		}
  	},10)
  }
}
</script>

<style>
.sxx-loading{
	z-index: 999;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	word-break: break-all;
	transition: opacity .3s ease;
	-webkit-transition: opacity .3s ease;
	
	overflow: hidden;
}
.sxx-loading-box{
	display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
	width: 100%;
	height: 90%;
}
.sxx-loading-svg{
	padding: 10px;
	background-color: rgba(0,0,0,0.5);
	border-radius: 5px;
}
</style>
