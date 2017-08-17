<template>
	<div id="sxx-common-picker" class="sxx-all" :style="{opacity: opacity}" v-if="showStatus">
		<div class="sxx-all-box">
			<div class="sxx-all-tit">
				<div @touchend="close('cancel')">取消</div>
				<div @touchend="close('confirm')">确定</div>
			</div>
			<div class="sxx-all-con">
				<!--<div class="sxx-all-all-tit">
					<div v-for="title in titles">{{title}}</div>
				</div>-->
				<div class="sxx-all-all-con">
					<div>
						<sxx-picker :list="lists" :defaultValue="selectValue" :onChange="getValue"></sxx-picker>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Picker from '../../picker/src/main.vue'
import Message from '../../message/src/main.js'
export default {
  name: 'sxx-common-picker',
  components: {
  	'sxx-picker': Picker
  },
  props: {
  	visibility: Boolean,
	lists:{
  	    type:Array,
		required:true
	},
	index:{
  	    type:Number,
		default:function () {
			return 0;
        }
	},
  	confirm: {
  		type: Function,
  		default: function() {
  			return '';
  		}
  	},
  	cancel: {
  		type: Function,
  		default: function() {
  			return '';
  		}
  	}
  },
  data () {
  	return {
  		opacity: 0, //默认初始化透明度
  		showStatus: false, //组件是否显示
  		selectList: '', //选中的List
  		selectValue: '',
		Index:0
  	};
  },
  watch: {
  	visibility (val) {
  		if(val){
  			this.showStatus = val;
  			setTimeout(() => {
	  			this.opacity = 1;
	  		},10)
  		}else{
  			this.opacity = 0;
  			setTimeout(() => {
	  			this.showStatus = val;
	  		},10)
  		}
  	},
	index (val) {
        this.Index = val;
	},
  	selectValue (val) {
  		this.updateSelect();
        this.Index=this.lists.indexOf(val);
  	},
  	lists (val) {
        this.selectValue=val[this.Index];
    }
  },
  created () {
  	this.showStatus = this.visibility;
  },
  methods: {
  	updateSelect() {
		this.selectList=this.selectValue;
  	},
  	getValue (val) {
        this.selectValue = val;
  	},
  	close (type) {
  		if(type === 'cancel'){
  			if(this.cancel){
  				setTimeout(() => {
  					this.cancel()
  				}, 300)
  			};
  		}else if(type === 'confirm'){
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
  },
  mounted () {
  	if(this.visibility){
	  	this.opacity = 1;
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
.sxx-all-all-tit{
	display: -webkit-box;
    display: -webkit-flex;
    display: flex;
	width: 100%;
}
.sxx-all-all-tit > div{
	-webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    font-size: 0.26rem;
    line-height: 0.6rem;
    color: #d9383f;
    text-align: center;
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
