<template>
	<div id="sxx-common-picker" class="sxx-all" :style="{opacity: opacity}" v-if="showStatus">
		<div class="sxx-all-box">
			<div class="sxx-all-tit">
				<div @touchend="close('cancel')">取消</div>
				<div @touchend="close('confirm')">确定</div>
			</div>
			<div class="sxx-all-con">
				<div class="sxx-all-all-con">
					<div>
						<sxx-picker :list="list" v-model="selectValue"></sxx-picker>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Picker from '../../picker/src/main.vue'
export default {
  name: 'sxx-common-picker',
  components: {
  	'sxx-picker': Picker
  },
  props: {
	list:{
  	    type:Array,
		required:true
	},
	value:{
  	    type:[String, Number]
	},
  	confirm: {
  		type: Function
  	},
  	cancel: {
  		type: Function
  	}
  },
  data () {
  	return {
  		opacity: 0, //默认初始化透明度
  		showStatus: false, //组件是否显示
  		selectValue: '',
  	};
  },
  watch: {
	value (val) {
        this.selectValue = val;
	}
  },
  created () {
  	this.selectValue = this.value;
  },
  methods: {
  	open () {
  		this.showStatus = true;
		setTimeout(() => {
			this.opacity = 1;
		},10)
  	},
  	close (type) {
  		if(type === 'cancel'){
  			if(this.cancel){
  				setTimeout(() => {
  					this.cancel()
  				}, 300)
  			};
  		}else if(type === 'confirm'){
  			this.$emit('input', this.selectValue);
  			if(this.confirm){
  				setTimeout(() => {
  					this.confirm(this.selectValue)
  				}, 300)
  			}
  		}
  		this.opacity = 0;
  		this.$el.addEventListener('transitionend', () => {
  			this.showStatus = false;
  		});
  	}
  }
}
</script>

<style>
.sxx-all{
	z-index: 100;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	word-break: break-all;
	background-color: rgba(0,0,0,0.4);
	transition: opacity .3s ease;
	-webkit-transition: opacity .3s ease;
}
.sxx-all-box{
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	background-color: #fff;
}
.sxx-all-tit{
	width: 100%;
	border: 1px solid #eaeaea;
}
.sxx-all-tit:after{
	display: block;
	content: '';
	clear: both;
}
.sxx-all-tit > div{
	float: left;
	width: 50%;
	text-align: center;
	font-size: 0.3rem;
	line-height: 0.8rem;
	color: #d9383f;
}
.sxx-all-all-con{
	width: 100%;
	display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    overflow: hidden;
}
.sxx-all-all-con > div{
	position: relative;
	-webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    height: 4rem;
}
</style>
