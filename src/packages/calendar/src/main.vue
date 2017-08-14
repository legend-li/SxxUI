<template>
	<div id="sxx-calendar" class="sxx-calendar2" :style="{opacity: opacity}" v-if="showStatus">
		<div class="sxx-calendar2-box">
			<div class="flex flex-pack-justify sxx-calendar2-title">
				<div class="flex sxx-calendar2-title-date">
					<div class="flex sxx-calendar2-title-YM" :class="dateThis==='YM'?'sxx-calendar2-date-this':''" @touchend="switchDate('YM')">
						<span>2017年</span>
						<span>08月</span>
					</div>
					<div class="sxx-calendar2-title-D" :class="dateThis==='D'?'sxx-calendar2-date-this':''" @touchend="switchDate('D')">
						15日
					</div>
				</div>
				<div class="flex color_d9383f sxx-calendar2-ok-cancel">
					<div class="sxx-calendar2-cancel">取 消</div>
					<div class="sxx-calendar2-ok">确 认</div>
				</div>
			</div>
			<div class="sxx-calendar2-main">
				<div class="sxx-calendar2-YM-box" v-if="dateThis==='YM'">
					<div class="flex sxx-calendar2-YM-tit">
						<div class="flex-1">年</div>
						<div class="flex-1">月</div>
					</div>
					<div class="flex sxx-calendar2-YM-con">
						<div class="flex-1">
							<sxx-picker :list="listY" :defaultValue="selectValueY" :onChange="getValue.bind(null, 'Y')"></sxx-picker>
						</div>
						<div class="flex-1">
							<sxx-picker :list="listM" :defaultValue="selectValueM" :onChange="getValue.bind(null, 'M')"></sxx-picker>
						</div>
					</div>
				</div>
				<div class="sxx-calendar2-D-box" v-if="dateThis==='D'">
					<div class="flex sxx-calendar2-D-week">
						<div class="flex-1" :class="week==='日'||week==='六'?'color_999':'color_333'" v-for="week in weeks" v-cloak>{{week}}</div>
					</div>
					<div class="clear sxx-calendar2-D-day">
						<div class="float-l" :class="day.disabled?'color_999':'color_333'" :style="{marginLeft: !index?dayLeft:'0px'}" v-for="(day, index) in days" v-cloak>
							{{day}}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'sxx-calendar',
  props: {
  	visibility: Boolean,
  	defaultDate: {
      type: String,
      default: ''
    },
    startDate: {
    	type: String,
    	default: ''
    },
    endDate: {
    	type: String,
    	default: ''
    },
    weekendDisabled: {
    	type: Boolean,
    	default: false
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
  		showStatus: true, //组件是否显示
  		weeks: ['日','一','二','三','四','五','六'], //周列表
  		thisY: new Date().getFullYear(), //今年的年份
  		thisM: new Date().getMonth()+1, //当前月份
  		thisD: new Date().getDate(), //当前日子
  		listY: [2013,2014,2015,2016,2017,2018,2019], //年可选列表
  		listM: [1,2,3,4,5,6,7,8,9,10,11,12], //月可选列表
  		//listD: [], //日可选列表
  		days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30], //一个月的每一天
  		dayLeft: '6.12rem', //日期的margin-left值
  		selectValueY: '', //选中的年
  		selectValueM: '', //选中的月
  		selectValueD: '', //选中的日
  		dateThis: 'D', //判断当前在选择的是年月||日，'YM'代表年月，'D'代表日
  		startY: '', //开始可选年
  		startM: '', //开始可选月
  		startD: '', //开始可选日
  		endY: '', //结束可选年
  		endM: '', //结束可选月
  		endD: '', //结束可选日
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
  	defaultDate (val) {
  		//this.resetDatetime();
  	}
  },
  created () {
  	this.showStatus = this.visibility;
  	//this.resetDatetime();
  },
  methods: {
  	//切换到年月/日
  	switchDate (type) {
  		switch(type){
  			case 'YM':
  				this.dateThis = 'YM';
  				break;
  			case 'D':
  				this.dateThis = 'D';
  				break;
  		}
  	},
  	//选中的日期改变的时候，改变可选日期，并且保存选中的日期
  	getValue (type, val) {
  		switch (type) {
  			case 'Y': 
  				this.selectValueY = val;
  				//this.updateMonths(val);
		  		//console.log('year:', val);
		  		break;
		  	case 'M': 
		  		this.selectValueM = val;
		  		//this.updateDays(val);
  				//console.log('month:', val)
		  		break;
  		}
  	},
  	resetDatetime () {
  		return;
  		const self = this;
	  	// 更新可选日期
	  	let startY, startM, startD, endY, endM, endD;
	  	let startDate = self.startDate.trim();
	  	let endDate = self.endDate.trim();
	  	if(startDate&&endDate){
		  	let startDateArr = startDate.split('-');
	  		if(startDateArr.length===3){
		  		self.startY = startY = Number(startDateArr[0]);
			    self.startM = startM = Number(startDateArr[1]);
			    self.startD = startD = Number(startDateArr[2]);
		  	}else{
				console.log('传入组件Calendar的startDate，格式不正确！');
		  	}
	  		let endDateArr = endDate.split('-');
		  	if(endDateArr.length===3){
		  		self.endY = endY = Number(endDateArr[0]);
		  		self.endM = endM = Number(endDateArr[1]);
		  		self.endD = endD = Number(endDateArr[2]);
		  	}else{
		  		console.log('传入组件Calendar的endDate，格式不正确！');
		  	}
		}else{
			self.startY = startY = self.thisY-10;
			self.startM = startM = 1;
			self.startD = startD = 1;
			self.endY = endY = self.thisY+10;
	  		self.endM = endM = 12;
	  		self.endD = endD = 31;
		}
		let defaultDate = self.defaultDate.trim();
		let selectValueY, selectValueM, selectValueD;
		if(defaultDate){
			let defaultDateArr = defaultDate.split('-');
			if(defaultDateArr.length===3){
				self.selectValueY = selectValueY = String(Number(defaultDateArr[0]));
				self.selectValueM = selectValueM = Number(selectValueM)>9?String(Number(selectValueM)):'0'+Number(selectValueM);
				self.selectValueD = selectValueD = String(Number(selectValueD));
			}else{
				console.log('传入组件Calendar的defaultDate，格式不正确！');
			}
		}else{
			self.selectValueY = selectValueY = String(self.thisY);
			self.selectValueM = selectValueM = self.thisM>9?String(self.thisM):'0'+self.thisM;
			self.selectValueD = selectValueD = self.thisD>9?String(self.thisD):'0'+self.thisD;
		}
		let listY = [], listM = [];
		for(let i=startY; i<=endY; i++){
			listY.push(String(i));
		}
		self.listY = listY;
  	},


  	resetDatetime_old () {
  		const self = this;
	  	// 更新可选日期/时间
	    let startDate = self.startDate.trim();
	    let endDate = self.endDate.trim();
	    let startHour = Number(self.startH);
	    let endHour = Number(self.endH);
	    let startY = Number(self.startY);
	    let endY = Number(self.endY);
	    let startM = Number(self.startM);
	    let endM = Number(self.endM);
	    let startD = Number(self.startD);
	    let endD = Number(self.endD);
	    if(startDate){
	    	let arr = startDate.split('-');
	    	if(arr.length === 3){
	    		startY = Number(arr[0]);
	    		startM = Number(arr[1]);
	    		startD = Number(arr[2]);
	    		self.startY = arr[0];
	    		self.startM = arr[1];
	    		self.startD = arr[2];
	    	}
	    }
	    if(endDate){
	    	let arr = endDate.split('-');
	    	if(arr.length === 3){
	    		endY = Number(arr[0]);
	    		endM = Number(arr[1]);
	    		endD = Number(arr[2]);
	    		self.endY = arr[0];
	    		self.endM = arr[1];
	    		self.endD = arr[2];
	    	}
	    }

	    self.listY = [];
	    for(let m=startY, n=endY; m<=n; m++){
	    	self.listY.push(String(m));
	    }

	    self.listM = [];
		for(let i=1; i<=12; i++){
			let M = i>9 ? String(i) : '0'+i;
			self.listM.push(M);
		}
		
		let days = self.getDays(self.thisY, self.thisM);
		self.listD = [];
		for(let i=1; i<=days; i++){
			self.listD.push(i>9 ? String(i) : '0'+i);
		}

		if(self.startHour){
			startHour = self.startHour;
		}
		if(self.endHour){
			endHour = self.endHour;
		}

		self.listH = [];
	    for(let i=startHour, j=endHour; i<=j; i++){
	    	let H = i>9 ? String(i) : '0'+i;
	    	self.listH.push(H);
	    }

	    self.listm = [];
	    for(let i=0; i<60; i++){
	    	self.listm.push(i>9 ? String(i) : '0'+i);
	    }

	    self.listS = [];
	    for(let i=0; i<60; i++){
	    	self.listS.push(i>9 ? String(i) : '0'+i);
	    }

	  	// 更新默认选中日期/时间
	  	function defaultSelect() { //当没有接收到默认选中值的时候，选中当前日期/时间
	  		let thisY = String(self.thisY);
	  		let thisM = String(self.thisM>9 ? self.thisM : '0'+self.thisM);
	  		let thisD = String(self.thisD>9 ? self.thisD : '0'+self.thisD);
	  		let thisH = String(self.thisH>9 ? self.thisH : '0'+self.thisH);
	  		let thism = String(self.thism>9 ? self.thism : '0'+self.thism);
	  		let thisS = String(self.thisS>9 ? self.thisS : '0'+self.thisS);
	  		self.selectValueY = thisY;
			self.selectValueM = thisM;
			self.selectValueD = thisD;
	  		self.selectValueH = thisH;
			self.selectValuem = thism;
			self.selectValueS = thisS;
	  	}
	//    let selectValueM = self.thisM;
	  	let defaultDatetime = self.defaultDatetime.trim();
	  	if(defaultDatetime){
	  		let within = self.within(defaultDatetime, {
	  			startY: startY,
	  			endY: endY, 
	  			startM: startM,
	  			endM: endM, 
	  			startD: startD, 
	  			endD: endD, 
	  			startH: startHour,
	  			endH: endHour
	  		});
	  		if(!within){
	  			defaultSelect();
	  			self.$message('传入组件DatetimePicker的props：defaultDatetime不在可选范围内！');
	  			console.log('传入组件DatetimePicker的props：defaultDatetime不在可选范围内！');
	  			return;
	  		}
	  		let dateTimeArr = defaultDatetime.split(' ');
	  		if(dateTimeArr.length>0&&dateTimeArr.length<3){
	  			self.selectDatetime = defaultDatetime; //更新默认选中日期/时间到确定按钮选中的日期/时间
	  			dateTimeArr.forEach(function(item, index) {
					if(!item) return;
			  		let dateArr = item.split('-'), timeArr = item.split(':');
			  		if(dateArr.length === 3){
			  			self.selectValueY = dateArr[0];
						self.selectValueM = dateArr[1];
						self.selectValueD = dateArr[2];

			  			if(Number(dateArr[0]) === startY){
			  				let listM = [];
				  			for(let i=startM, j=12; i<=j; i++){
				  				let M = i>9 ? String(i) : '0'+i;
				  				listM.push(M);
				  			}
				  			self.listM = listM;
			  			}else if(Number(dateArr[0]) === endY){
			  				let listM = [];
				  			for(let i=1, j=endM; i<=j; i++){
				  				let M = i>9 ? String(i) : '0'+i;
				  				listM.push(M);
				  			}
				  			self.listM = listM;
			  			}

			  			if(Number(dateArr[1]) === startM){
			  				let listD = [];
				  			for(let i=startD, j=self.getDays(Number(dateArr[0]), Number(dateArr[1])); i<=j; i++){
				  				let D = i>9 ? String(i) : '0'+i;
				  				listD.push(D);
				  			}
				  			self.listD = listD;
			  			}else if(Number(dateArr[1]) === endM){
			  				let listD = [];
				  			for(let i=1, j=endD; i<=j; i++){
				  				let D = i>9 ? String(i) : '0'+i;
				  				listD.push(D);
				  			}
				  			self.listD = listD;
			  			}else{
			  				let listD = [];
				  			for(let i=1, j=self.getDays(Number(dateArr[0]), Number(dateArr[1])); i<=j; i++){
				  				let D = i>9 ? String(i) : '0'+i;
				  				listD.push(D);
				  			}
				  			self.listD = listD;
			  			}
			  		}else if(timeArr.length === 3){
						self.selectValueH = timeArr[0];
						self.selectValuem = timeArr[1];
						self.selectValueS = timeArr[2];
			  		}else{
			  			self.$message('传入组件DatetimePicker的props：defaultDatetime格式不正确！');
			  			console.log('传入组件DatetimePicker的props：defaultDatetime格式不正确！');
			  		}
				})
	  		}
	  	}else{
	  		defaultSelect();
	  	}
  	},
  	within (str, obj) { //校验默认得datetime是否在可选范围之内
  		const self = this;
  		if(str){
  			if(!str.trim()) return false;
  		}
  		let arr = str.split(' '), result = true;
  		arr.forEach((item, index) => {
  			let dateArr = item.split('-');
  			let timeArr = item.split(':');
  			if(dateArr.length === 3){
  				if(dateArr[0]<self.startY || dateArr[0]>self.endY){
  					result = false;
  				}
  				if(dateArr[1]<self.startM || dateArr[1]>self.endM){
  					result = false;
  				}
  				if(dateArr[2]<self.startD || dateArr[2]>self.endD){
  					result = false;
  				}
  			}else if(timeArr.length === 3){
  				if(timeArr[0]<self.startH || timeArr[0]>self.endH){
  					result = false;
  				}
  			}else{
  				result = false;
  			}
  		});
  		return result;
  	},
  	isLeapYear (Y) { //判断是否是闰年，参数Y类型:Number
  		if(typeof Y !== 'number') return;
  		return ((Y%4==0 && Y%100!=0) || (Y%100==0 && Y%400==0));
  	},
  	getDays (Y, M) { //计算某一个月的天数,参数Y和参数M的类型:Number
  		const self = this;
  		let day31 = [1, 3, 5, 7, 8, 10, 12];
  		
		let day31Status = day31.some((item, index) => {
			return item===M;
		});
		if(day31Status){
			 return 31;
		}else{
			if(M===2 && self.isLeapYear(Y)){
				return 29;
			}else if(M===2 && !self.isLeapYear(Y)){
				return 28;
			}else{
				return 30;
			}
		}
  	},
  	updateSelect() {
  		// 更新选中日期/时间
  		const self = this;
  		let thisY = self.selectValueY;
  		let thisM = self.selectValueM;
  		let thisD = self.selectValueD;
  		let thisH = self.selectValueH;
  		let thism = self.selectValuem;
  		let thisS = self.selectValueS;
		switch (self.type) {
			case 'datetime':
				self.selectDatetime = thisY + '-' + thisM + '-' + thisD + ' ' + thisH + ':' + thism + ':' + thisS;
				break;
			case 'date':
				self.selectDatetime = thisY + '-' + thisM + '-' + thisD;
				break;
			case 'time':
				self.selectDatetime = thisH + ':' + thism + ':' + thisS;
				break;
		}
  	},
  	updateMonths (selectY) { //更新可选月份列表
  		const self = this;
  		if(selectY===self.startY){
  			let newListM = [];
  			for(let i=Number(self.startM); i<=12; i++){
  				newListM.push(i>9 ? String(i) : '0'+i);
  			}
  			self.listM = newListM;
  		}else if(selectY===self.endY){
  			let newListM = [];
  			for(let i=1; i<=self.endM; i++){
  				newListM.push(i>9 ? String(i) : '0'+i);
  			}
  			self.listM = newListM;
  		}else{
  			self.listM = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  		}
  	},
  	updateDays (selectM) { //更新月内可选天
  		const self = this;
  		if(self.selectValueY===self.startY && selectM===self.startM){
  			let newListD = [], days = self.getDays(Number(self.selectValueY), Number(self.selectValueM));
  			for(let i=Number(self.startD); i<=days; i++){
  				newListD.push(i>9 ? String(i) : '0'+i);
  			}
  			self.listD = newListD;
  		}else if(self.selectValueY===self.endY && selectM===self.endM){
  			let newListD = [], days = self.getDays(Number(self.selectValueY), Number(self.selectValueM));
  			if(self.endD<days){
  				days = Number(self.endD);
  			}
  			for(let i=1; i<=days; i++){
  				newListD.push(i>9 ? String(i) : '0'+i);
  			}
  			self.listD = newListD;
  		}else{
  			let newListD = [], days = self.getDays(Number(self.selectValueY), Number(self.selectValueM));
  			for(let i=1; i<=days; i++){
  				newListD.push(i>9 ? String(i) : '0'+i);
  			}
  			self.listD = newListD;
  		}
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
  					this.confirm(this.selectDatetime)
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

<style lang="less">
@import url(../../../static/less/default-theme.less);
@import url(../../../static/less/common.less);
.sxx-calendar2{
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
	.sxx-calendar2-box{
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color: @color_fff;
		box-sizing: border-box;
		overflow: hidden;
		.sxx-calendar2-title, .sxx-calendar2-main{
			width: 100%;
			padding: 0 0.18rem;
			box-sizing: border-box;
		}
		.sxx-calendar2-title{
			font-size: @fs_30;
			line-height: 0.8rem;
			height: 0.8rem;
			border-bottom: 1px solid @color_eaeaea;
			box-sizing: border-box;
			.sxx-calendar2-title-date{
				width: 3rem;
				margin-left: 0.1rem;
				.sxx-calendar2-title-YM, .sxx-calendar2-title-D{
					z-index: 5;
					height: 0.8rem;
					color: @color_d9383f;
					text-align: center;
					box-sizing: border-box;
				}
				.sxx-calendar2-date-this{
					border-bottom: 1px solid @color_d9383f;
				}
				.sxx-calendar2-title-YM{
					width: 1.9rem;
					> span{
						&:first-child{
							width: 1.1rem;
						}
						&:last-child{
							width: 0.8rem;
						}
					}
				}
				.sxx-calendar2-title-D{
					width: 0.7rem;
				}
			}
			.sxx-calendar2-ok-cancel{
				.sxx-calendar2-cancel, .sxx-calendar2-ok{
					width: 1rem;
				}
				.sxx-calendar2-cancel{
					margin-right: 0.5rem;
					text-align: left;
				}
				.sxx-calendar2-ok{
					width: 1rem;
					text-align: center;
				}
			}
		}
		.sxx-calendar2-main{
			.sxx-calendar2-YM-box{
				width: 100%;
				.sxx-calendar2-YM-tit{
					width: 100%;
					> div{
						height: 0.8rem;
						font-size: @fs_28;
						line-height: 0.8rem;
						text-align: center;
					}
				}
			}
			.sxx-calendar2-D-box{
				width: 100%;
				.sxx-calendar2-D-week{
					width: 100%;
					> div{
						height: 0.8rem;
						line-height: 0.8rem;
						font-size: @fs_26;
						text-align: center;
					}
				}
				.sxx-calendar2-D-day{
					width: 100%;
					> div{
						width: 1.02rem;
						height: 0.8rem;
						line-height: 0.8rem;
						font-size: @fs_26;
						text-align: center;
					}
				}
			}
		}
	}
}
</style>
