<template>
	<div id="sxx-select" class="sxx-select" :style="{opacity: opacity}" v-if="showStatus" @touchend="close('cancel')">
		<div class="sxx-select-box" @touchend.stop >
			<div class="sxx-select-tit">
				<div>{{title}}</div>
			</div>
			<div class="sxx-select-con">
				<div class="select-list" v-for="(li,index) in list" @touchend="getListValue(li)">
					<div>{{li}}</div>
					<div class="select-status" :class="selectedValue===li? 'select-selected': ''" ></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'sxx-select',
  props: {
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
    value:{
          type:[Number,String]
    },
    confirm:{
  	    type:Function
	},
    cancel:{
	   type:Function
    }
  },
  data () {
  	return {
  		opacity: 0, //默认初始化透明度
  		showStatus: false, //组件是否显示
		selectedValue:'', //选中的值
  	};
  },
  watch: {
	value (val) {
		this.selectedValue = val;
	}
  },
  created () {
  	this.selectedValue = this.value;
  },
  methods: {
      getListValue (val) {
      	this.selectedValue = val;
      	setTimeout(() => {
			this.close('confirm');
		}, 80)
	  },
	  open () {
	  	this.showStatus = true;
	  	setTimeout(() => {
	  		this.opacity = 1;
	  	}, 10)
	  },
      close (type) {
      	if(type === 'cancel'){
      		if(this.cancel)
      			this.cancel();
      	}else if(type === 'confirm'){
      		this.$emit('input', this.selectedValue)
      		if(this.confirm)
  				this.confirm(this.selectedValue);
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
		height:0.7rem;
		line-height: 0.7rem;
		background: #F8B62D;
		font-size: 0.3rem;
		color:#ffffff;
		padding:0 0.3rem;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
	}
	.sxx-select-con{
		width: 100%;
	}
	.sxx-select-con .select-list{
		width: 7.50rem;
		position: relative;
		border-bottom: 1px solid #eaeaea;
		height:0.9rem;
		line-height: 0.9rem;
		font-size: 0.3rem;
		padding: 0 0.3rem;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
	}
	.sxx-select-con .select-list:last-child{
		border-bottom: none;
	}
	.sxx-select-con .select-list .select-status{
		width:0.3rem;
		height:0.9rem;
		background: url("../img/select.png") no-repeat center;
		background-size: contain;
	}
	.sxx-select-con .select-list .select-selected{
		width:0.3rem;
		height:0.9rem;
		background: url("../img/selected.png") no-repeat center;
		background-size: contain;
	}

</style>
