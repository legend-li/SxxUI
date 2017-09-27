<template>
	<div ref="sxxLoadMore" id="sxx-load-more" class="sxx-load-more" :style="{width: width, height: height}"
	 @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
		<div class="sxx-load-top" :style="{marginTop: loadTopMargin, transition: 'margin '+topTransition+'s'}" v-if="topLoadStatus&&topStatus">
			<div class="sxx-load-icon" :class="{'sxx-load-rotate': loadTopStatus===0}" v-if="loadTopStatus!==2">↓</div>
			<img :src="loadingAnimation" v-if="loadTopStatus===2" />
			<div class="sxx-load-text" v-text="loadTopStatus===0 ? loadTopText1 : (loadTopStatus===1 ? loadTopText2 : loadTopText3)"></div>
		</div>
		<slot></slot>
		<div class="sxx-load-bottom" v-if="bottomLoadStatus&&bottomStatus">
			<img :src="loadingAnimation" />
			<div class="sxx-load-text">加载更多......</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'sxx-load-more',
  props: {
  	width: {
  		type: String,
  		required: true
  	},
  	height: {
  		type: String,
  		required: true
  	},
  	topLoadStatus: Boolean,
  	bottomLoadStatus: Boolean,
  	topLoading: Function,
  	bottomLoading: Function
  },
  data () {
  	return {
  		loadingAnimation: require('./bars.svg'), //loading动画
  		$rootFontSize: parseFloat(document.querySelector('html').style.fontSize), //根fontSize的大小
  		topTransition: 0, //顶部loading盒子的过渡时间
  		bottomTransition: 0, //底部loading盒子的过渡时间
  		initLoadTopMargin: '-'+(parseFloat(document.querySelector('html').style.fontSize)*1.1)+'px', //load-top盒子的margin-top的初始值
  		loadTopMargin: '-'+(parseFloat(document.querySelector('html').style.fontSize)*1.1)+'px', //load-top盒子的margin-top的值
  		loadTopStatus: 0,
  		loadTopText1: '下拉即可刷新',
  		loadTopText2: '释放即可刷新',
  		loadTopText3: '正在刷新......',
  		dir: '',//第一次move滑动的方向
  		initStart: 0, //滚动盒子touchstart位置
  		start: 0, //上一个滚动位置
  		move: 0, //滚动盒子touchmove位置
  		topStatus: false, //是否到达顶部
  		bottomStatus: false, //是否到达底部
  		bottomIsLoading: false, //加载更多状态：true-正在加载，false-已经加载完毕
  	};
  },
  methods: {
  	getScrollTop () { //获取滚动盒子的scrollTop
  		return this.$refs.sxxLoadMore.scrollTop;
  	},
  	getScrollHeight () { //获取滚动盒子的滚动内容的总高度
  		return this.$refs.sxxLoadMore.scrollHeight;
  	},
  	getClientHeight () { //获取滚动盒子的可视区域的高度
  		return this.$refs.sxxLoadMore.clientHeight;
  	},
  	isTop () {
  		//console.log('getScrollTop：', this.getScrollTop())
  		if(this.getScrollTop() <= 0){
  			//console.log('到顶部了！')
  			return true;
  		}else{
  			return false;
  		}
  	},
  	isBottom () {
  		if(this.getScrollTop()+this.getClientHeight() >= this.getScrollHeight()-2){
  			//console.log('到底部了！')
  			return true;
  		}else{
  			return false;
  		}
  	},
  	clearTopTransition (s) {
  		setTimeout(() => {
  			this.topTransition = 0;
  		}, s*1000);
  	},
  	clearBottomTransition (s) {
  		setTimeout(() => {
  			this.bottomTransition = 0;
  		}, s*1000)
  	},
  	touchStart (e) {
  		let start = e.touches[0].pageY;
  		this.start = start;
  		this.initStart = start;
  		if(this.topLoadStatus){
  			if(this.isTop()){
	  			this.topStatus = true;
	  		}else{
	  			this.topStatus = false;
	  		}
  		}
  	},
  	touchMove (e) {
  		let move = e.touches[0].pageY;
  		//console.log('move:', move)
  		this.move = move;
  		let dir;
  		if(this.dir === ''){
  			if(move>this.initStart){
  				dir = 'down';
  				this.dir = dir;
  			}else if(move<this.initStart){
  				dir = 'up';
  				this.dir = dir;
  			}
  		}else{
  			dir = this.dir;
  		}
  		//下拉刷新
  		if(this.topLoadStatus && this.topStatus && dir==='down'){
  			e.stopPropagation();
  			e.preventDefault();
  			let dist = (move-this.start)/2;
  			let $marginTop = this.loadTopMargin;
  			let marginTopNew = parseFloat($marginTop)+dist;
  			if(marginTopNew>parseFloat(this.initLoadTopMargin)){
  				this.loadTopMargin = marginTopNew+'px';
  				if(marginTopNew>=0){
  					this.loadTopStatus = 1;
  				}else{
  					this.loadTopStatus = 0;
  				}
  			}
  			this.start = move;
  		}
  		//上拉加载更多
  		if(this.bottomLoadStatus && this.isBottom() && dir==='up' && !this.bottomIsLoading){
  			this.bottomStatus = true;
  			this.bottomIsLoading = true;
  			//console.log('加载更多......');
  			setTimeout(() => {
  				this.bottomLoading(() => {
	  				this.dir = '';
	  				this.bottomIsLoading = false;
	  				this.bottomStatus = false;
	  			})
  			}, 300)
  		}
  	},
  	touchEnd (e) {
  		const self = this;
  		if(self.topStatus){
  			if(self.loadTopStatus){
  				//console.log('loading...');
				self.loadTopStatus = 2;
  				self.topTransition = 0.3;
				let loadingTopMargin = '0px';
				self.loadTopMargin = loadingTopMargin;
				self.clearTopTransition(0.3);
				setTimeout(() => {
					function closeLoading() {
						//console.log('loaded!')
	  					self.topTransition = 0.3;
						let initTopMargin = self.initLoadTopMargin;
						self.loadTopMargin = initTopMargin;
						self.clearTopTransition(0.3);
						self.loadTopStatus = 0;
					}
					if(self.topLoading){
						self.topLoading(() => {
							closeLoading();
						});
					}else{
						setTimeout(() => {
							closeLoading();
						}, 500)
					}
				}, 300)
  			}else{
  				//console.log('reset top!');
  				self.topTransition = 0.3;
  				let initTopMargin = self.initLoadTopMargin;
  				self.loadTopMargin = initTopMargin;
  				self.clearTopTransition(0.3);
  			}
  		}
  		self.dir = '';
  	}
  }
}
</script>

<style>
.sxx-load-more{
	-webkit-transform:translate3d(0,0,0);
	transform:translate3d(0,0,0);
	word-break: break-all;
	overflow-x: hidden;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
}
.sxx-load-top, .sxx-load-bottom{
	display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    width: 100%;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-transform:translate3d(0,0,0);
	transform:translate3d(0,0,0);
}
.sxx-load-top > img, .sxx-load-bottom > img{
	display: inline-block;
	width: 0.3rem;
	margin-right: 0.1rem;
}
.sxx-load-icon{
	display: inline-block;
	padding-bottom: 0.1rem;
	width: 0.5rem;
	text-align: center;
	font-size: 0.4rem;
	line-height: 1.5;
	color: #d9383f;
	font-weight: 600;
	transition: transform 0.3s;
    -webkit-transition: transform 0.3s; /* Safari */
}
.sxx-load-rotate{
	transform:rotate(-180deg);
	-webkit-transform:rotate(-180deg);
}
.sxx-load-text{
	font-size: 0.28rem;
	color: #333;
	font-weight: 500;
}
</style>
