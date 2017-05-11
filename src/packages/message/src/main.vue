<template>
  <div id="Message" class="message" :class="{'message-info': type===0, 'message-pop': type!==0}" :style="{opacity: opacity,transitionDuration: transitionTime+'s'}"
   @touchstart.prevent>
  	<div class="information" v-if="type===0" v-text="title"></div>
    <div class="display-table" v-else>
    	<div class="display-table-cell">
    		<div class="popup">
    			<div class="message-text">
    				<div class="title" v-text="title" v-if="title"></div>
    				<div class="content" v-text="content" v-if="content"></div>
    			</div>
    			<div class="btn-group" v-if="type===2">
	    			<div class="cancel" @touchend="close('cancel')">取消</div>
	    			<div class="affirm" @touchend="close('affirm')">确认</div>
    			</div>
    			<div class="affirm" @touchend="close('affirm')"  v-if="type===1">确认</div>
    		</div>
    	</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data () {
  	return {
  		type: 1,
  		title: '',
  		content: '',
  		transitionTime: 0.3,
  		autoOffTime: 1,
  		callback: '',
  		opacity: 0
  	};
  },
  methods: {
  	close (type) {
  		this.opacity = 0;
  		this.$el.addEventListener('transitionend', this.destroyElement.bind(this,type));
  	},
  	destroyElement (type) {
        this.$el.removeEventListener('transitionend', this.destroyElement);
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
        if(type === 'affirm'){
        	if (typeof this.callback === 'function') {
	          this.callback();
	        }
        }
    }
  },
  mounted () {
  	const self = this;
  	setTimeout(function() {
  		self.opacity = 1;
  		if(self.type === 0){
  			setTimeout(function() {
  				self.close();
  			}, self.autoOffTime*1000);
  		}
  	},1)
  }
}
</script>

<style>
.message{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	word-break: break-all;
}
.message-pop{
	background-color: rgba(0,0,0,0.4);
}
.message-info{
	background-color: rgba(0,0,0,0);
}
.message{
	transition: opacity .3s ease;
	-webkit-transition: opacity .3s ease;
}
.message .information{
	width: 100%;
	padding: 0.2rem 0.1rem;
	text-align: center;
	font-size: 0.28rem;
	line-height: 1;
	background-color: #333;
	color: #fff;
}
.message .display-table{
	display: table;
	width: 100%;
	height: 90%;
}
.message .display-table-cell{
	display: table-cell;
  vertical-align: middle;
  text-align: center;
  width: 100%;
	height: 90%;
}
.message .popup{
	width: 5rem;
	margin: 0 auto;
	font-size: 0.24rem;
	color: white;
	background-color: white;
	border-radius: 0.2rem;
	overflow: hidden;
}
.message .message-text{
	width: 100%;
	padding-left: 0.4rem;
	padding-right: 0.4rem;
	padding-top: 0.4rem;
	padding-bottom: 0.4rem;
	box-sizing: border-box;
	border-bottom: 1px solid #927a27;
}
.message .title{
	width: 100%;
	font-size: 0.28rem;
	color: #333333;
	text-align: center;
}
.message .content{
	width: 100%;
	padding-top: 0.2rem;
	font-size: 0.24rem;
	color: #333333;
	line-height: 1.8;
	text-align: left;
}
.message .affirm, .message .cancel{
	padding: 0.24rem;
	text-align: center;
	font-size: 0.28rem;
	color: #f8b62d;
	box-sizing: border-box;
}
.message .affirm{
	width: 100%;
}
.message .btn-group{
	width: 100%;
}
.message .btn-group .cancel, .message .btn-group .affirm{
	float: left;
}
.message .btn-group:after{
	display: block;
	content: ' ';
	clear: both;
}
.message .btn-group .affirm{
	width: 50%;
}
.message .btn-group .cancel{
	width: 50%;
	border-right: 1px solid #927a27;
}
</style>
