<template>
	<div id="sxx-select-picker" class="sxx-select" :style="{opacity: opacity}" v-if="showStatus" @touchend="cancelStatus">
		<div class="sxx-select-box" @touchend.stop >
			<div class="sxx-select-tit">
				<div>{{title}}</div>
			</div>
			<div class="sxx-select-con">
				<div class="select-list" v-for="(li,index) in list" @touchend="getListValue(index)">
					<div>{{li}}</div>
					<div class="select-status" :class="ResultValue===list[index]? 'select-selected': ''" ></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Picker from '../../picker/src/main.vue'
import Message from '../../message/src/main.js'
export default {
  name: 'sxx-select-picker',
  props: {
  	visibility: Boolean,
	title:{
  	 	type:String,
		required:true
	},
	list:{
  	    type:Array,
		required:true,
        validator: function (value) {
            return value.length < 6
        }
	},
    index:{
          type:Number,
          default:function () {
              return 0;
          }
    },
    confirm:{
  	    type:Function,
        required:true
	},
    cancel:{
	   type:Function,
	   required:true
    }
  },
  data () {
  	return {
  		opacity: 0, //默认初始化透明度
  		showStatus: false, //组件是否显示
		ResultValue:'',
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
    ResultValue (val) {
        this.Index=this.list.indexOf(val);
	}
  },
  created () {
  	this.showStatus = this.visibility;
  	this.ResultValue=this.list[this.Index];
  },
  methods: {
      getListValue (index) {
		this.ResultValue=this.list[index];
          setTimeout(() => {
              this.confirm(this.ResultValue);
              this.opacity = 0;
          }, 800)
	  },
      cancelStatus () {
		  this.cancel();
          this.opacity = 0;
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
	.sxx-select{
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
	.sxx-select-box{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
	}
	.sxx-select-tit{
		width: 100%;
		border: 1px solid #eaeaea;
		height:70px;
		line-height: 70px;
		background: #F8B62D;
		font-size: 30px;
		color:#ffffff;
		padding:0 30px;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
	}
	.sxx-select-con{
		width: 100%;
	}
	.sxx-select-con .select-list{
		width: 750px;
		position: relative;
		border-bottom: 1px solid #b2b2b2;
		height:90px;
		line-height: 90px;
		font-size: 30px;
		padding: 0 30px;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
	}
	.sxx-select-con .select-list .select-status{
		width:30px;
		height:90px;
		background: url("../img/select.png") no-repeat 50% 50%;
	}
	.sxx-select-con .select-list .select-selected{
		width:30px;
		height:90px;
		background: url("../img/selected.png") no-repeat 50% 50%;
	}

</style>
