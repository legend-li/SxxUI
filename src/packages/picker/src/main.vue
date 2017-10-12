<template>
	<div id="sxx-picker" class="sxx-picker" :style="{opacity: opacity}">
		<div class="sxx-picker-box" @touchstart.stop.prevent="touchStart" @touchmove.stop.prevent="touchMove" @touchend.stop.prevent="touchEnd">
			<div class="sxx-picker-section" :style="{transform: 'translate3d(0px,'+translateY+'px'+',0px)', transitionDuration: transitionT+'s'}">
				<div v-for="dateY in list" v-text="dateY"></div>
			</div>
			<div class="sxx-picker-cover"></div>
			<div class="sxx-picker-selected" ref="dateSection"></div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'sxx-picker',
  props: {
  	list: { //list滚动列表
  		type: Array,
  		required: true
  	},
  	onChange: Function,
  	value: [String, Number]
  },
  data () {
  	return {
  		opacity: 0, //默认初始化透明度
  		sectionH: 0, //块的高度
  		translateY: 0, //translateY的值
  		start_y: 0, //touchstart的Y轴坐标
  		end_y: 0, //touchend的Y轴坐标
  		timeGap: 50, //平均速度检测时间间隔
  		transitionT: 0, //惯性滚动过渡耗时，单位秒(s)
  		lastMoveStart: 0, //最后一个惯性开始位置
  		lastMoveTime: 0, //平均速度计时开始
  		dir: 0, //滑动方向(0:无方向,1:从上往下,-1:从下往上)
  	};
  },
  watch: {
  	list (val, oldVal){
  		this.translateY = this.sectionH*2;
  		this.init(this.sectionH);
  	},
  	value (val, oldVal) {
  		this.init(this.sectionH);
  	}
  },
  methods: {
  	updateValue (Y) {
		//在滚动结束的时候，把滚动选中的值传给onChange方法，并执行onChange方法
  		if(this.onChange){
  			let val = '';
  			let sectionH = this.sectionH;
  			if(Y==0){
  				val = this.list[2];
  			}else{
  				let multiple = Y/sectionH;
  				val = this.list[2-multiple];
  			}
  			this.$emit('input', val);
  			this.onChange(val);
  		}
  	},
  	clearTransition (delay) {
  		const self = this;
  		// 清除translate过渡时间
  		//console.log('delay:', delay)
  		setTimeout(function() {
  			self.transitionT = 0;
  		}, delay||0);
  	},
  	resetTranslateY () {
  		//重置translateY值
  		if(this.translateY>this.sectionH*2){
			//重置下拉滚动位置
			//console.log('reset pull')
			this.transitionT = 0.3; //过渡时间
			let translateY = this.sectionH*2; //计算出当前应该滚动到的位置
			this.translateY = translateY; //设置当前应该滚动到的位置
			this.clearTransition(300); //清除过渡动画
			this.updateValue(translateY); //更新滚动选中的值
		}else if(this.translateY<-this.sectionH*(this.list.length-3)){
			//重置上拉滚动位置
			//console.log('reset up')
			this.transitionT = 0.3; //过渡时间
			let translateY = -(this.sectionH*(this.list.length-3)); //计算出当前应该滚动到的位置
			this.translateY = translateY; //设置当前应该滚动到的位置
			this.clearTransition(300); //清除过渡动画
			this.updateValue(translateY); //更新滚动选中的值
		}else{
			//console.log('dir:', this.dir);
			//微调滚动位置，使滚动的每一块对齐
			let remainder = Math.abs(this.translateY%this.sectionH); //取Y轴滚动距离的余数
			//console.log(remainder)
			if(this.dir>0){
				if(remainder>this.sectionH/2){
					//console.log('remainder:', remainder);
					this.transitionT = 0.1; //过渡时间
					let translateY = this.correctY('+1'); //计算当前矫正后的translateY
					this.translateY = translateY; //矫正translateY
					this.clearTransition(100); //清除过渡动画
					this.updateValue(translateY); //更新滚动选中的值
					//console.log('translateY:', this.correctY('+1'));
				}else{
					//console.log('remainder:', remainder);
					this.transitionT = 0.1; //过渡时间
					let translateY = this.correctY(); //计算当前矫正后的translateY
					this.translateY = translateY; //矫正translateY
					this.clearTransition(100); //清除过渡动画
					this.updateValue(translateY); //更新滚动选中的值
					//console.log('translateY:', this.correctY());
				}
			}else if(this.dir<0){
				//console.log('dir<0')
				if(remainder>this.sectionH/2){
					//console.log('remainder:', remainder)
					this.transitionT = 0.1; //过渡时间
					let translateY = this.correctY('-1'); //计算当前矫正后的translateY
					this.translateY = translateY; //矫正translateY
					this.clearTransition(100); //清除过渡动画
					this.updateValue(translateY); //更新滚动选中的值
					//console.log('translateY->0.5:', this.correctY('-1'));
				}else{
					//console.log('remainder:', remainder)
					this.transitionT = 0.1; //过渡时间
					let translateY = this.correctY(); //计算当前矫正后的translateY
					this.translateY = translateY; //矫正translateY
					this.clearTransition(100); //清除过渡动画
					this.updateValue(translateY); //更新滚动选中的值
					//console.log('translateY-<=0.5:', this.correctY())
				}
			}else{
				//console.log('correct else')
				this.translateY = this.correctY();
				this.updateValue(this.correctY()); //更新滚动选中的值
			}
		}
  	},
  	correctY (type) {
  		//获取矫正后的translateY值
  		let Y = 0;
  		if(type==='+1'){
  			if(Math.abs(this.translateY)>=this.sectionH){
  				if(this.translateY<0){
  					Y = parseInt(this.translateY/this.sectionH)*this.sectionH;
  				}else{
  					Y = (parseInt(this.translateY/this.sectionH)+1)*this.sectionH;
  				}
  			}else{
  				if(this.translateY>0){
  					Y = this.sectionH;
  				}else{
  					Y = 0;
  				}
  			}
  		}else if(type==='-1'){
  			if(Math.abs(this.translateY)>=this.sectionH){
  				if(this.translateY>0){
  					Y = parseInt(this.translateY/this.sectionH)*this.sectionH;
  				}else{
  					Y = (parseInt(this.translateY/this.sectionH)-1)*this.sectionH;
  				}
  			}else{
  				if(this.translateY>0){
  					Y = 0;
  				}else{
  					Y = -this.sectionH;
  				}
  			}
  			
  		}else{
  			Y = parseInt(this.translateY/this.sectionH)*this.sectionH;
  		}
  		return Y;
  	},
  	touchStart (e) {
  		this.clearTransition(0); //清除过渡动画
  		let start = e.touches[0].pageY;
  		this.start_y= start;
  		//记录惯性开始时间、惯性开始点Y轴位置
  		this.lastMoveTime = Date.now();
  		this.lastMoveStart = start;
  		//console.log('start:', start)
  	},
  	touchMove (e) {
  		const nowTime = Date.now();
  		let move = e.touches[0].pageY;

	　　const startY = this.start_y;
		const translateY = this.translateY;
		this.translateY = translateY+(move-startY);
		this.start_y= move;
		//console.log('result:', translateY+(move-startY))

  		//记录惯性开始时间、惯性开始点Y轴位置、滑动方向
  		if(nowTime - this.lastMoveTime > this.timeGap){
  			this.lastMoveTime = Date.now();
  			if(move > this.lastMoveStart){
  				this.dir = 1;
  			}else if(move < this.lastMoveStart){
  				this.dir = -1;
  			}else{
  				this.dir = 0;
  			}
  			this.lastMoveStart = move;
  		}
  		//console.log('move:', move)
  	},
  	touchEnd (e) {
  		const self = this;
  		const nowTime = Date.now();
  		const startY = self.start_y;
  		const translateY = self.translateY;
  		let end = e.changedTouches[0].pageY;
  		self.end_y= end;
  		let endTranslateY = translateY+(end-startY);
  		self.translateY = endTranslateY;
  		//console.log('endTranslateY:', endTranslateY);

		let v = (end-self.lastMoveStart)/(nowTime-self.lastMoveTime); //最后一段时间手指划动速度
		//console.log('v:', v)
		
		const dir = self.dir; //加速度方向

		const level = 0.7; //平均速度超出这个水平则触发惯性减速运行
		const sub_speed = level/self.timeGap; //每毫秒平均减速度

		if(Math.abs(v)>level){
			let transitionTime = parseInt(v/sub_speed)/1000; //惯性减速过渡需要时间(单位：s)
			//console.log('transitionTime:', transitionTime)
			self.transitionT = transitionTime; //更新过渡时间
			self.clearTransition(transitionTime*1000); //清除过渡动画
			let dist = 0; //初始化惯性减速滚动的距离
			let _v = Math.abs(v); //惯性减速的时时速度
			
			for(; _v>0;){	//计算出惯性减速需要滚动的距离
				dist += _v;
				_v -= sub_speed;
			}
			//console.log('dist:', dist);

			dist = dist;

			let endPoint = endTranslateY+dist*dir; //计算惯性滚动结束时的translateY的值
			self.translateY = endPoint; //设置惯性滚动结束时的translateY的值

			//在惯性减速运动结束后，执行重置translateY值的操作
			setTimeout(function() {
				self.resetTranslateY();
			}, transitionTime*1000)

			//console.log('translateY:', endPoint);
			//console.log('transitionT:', self.transitionT);
		}else{
			self.resetTranslateY();
		}
  		
  		//console.log('end:', end);
  	},
  	//初始化
  	init (dateSection) {
  		const self = this;
  		if(self.list.length>0){
	  		let valid = self.list.some((val, index) => {
	  			if(self.value === val){
		  			self.translateY = dateSection*(2-index)
		  			return true;
		  		}else{
		  			return false;
		  		}
		  	})
		  	if(!valid){
		  		self.translateY = dateSection*2;
		  		this.$emit('input', self.list[0]);
		  	}
	  		
	  	}
  	}
  },
  mounted () {
  	const self = this;
  	const dateSection = self.$refs.dateSection.clientHeight+2; //获取到滚动块的高度
  	self.sectionH = dateSection; //保存滚动块的高度
  	self.init(dateSection); //初始化
  	setTimeout(function() {
  		self.opacity = 1;
  	},1)
  }
}
</script>

<style>
.sxx-picker{
	z-index: 999;
	width: 100%;
	word-break: break-all;
	transition: opacity .3s ease;
	-webkit-transition: opacity .3s ease;
	overflow: hidden;
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
