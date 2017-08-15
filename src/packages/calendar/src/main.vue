<template>
	<div id="sxx-calendar" class="sxx-calendar2" :style="{opacity: opacity}" v-if="showStatus">
		<div class="sxx-calendar2-box">
			<div class="flex flex-pack-justify sxx-calendar2-title">
				<div class="flex sxx-calendar2-title-date">
					<div class="flex sxx-calendar2-title-YM" :class="dateThis==='YM'?'sxx-calendar2-date-this':''" @touchend="switchDate('YM')">
						<span v-cloak>{{selectValueY}}年</span>
						<span v-cloak>{{selectValueM}}月</span>
					</div>
					<div class="sxx-calendar2-title-D" :class="dateThis==='D'?'sxx-calendar2-date-this':''" @touchend="switchDate('D')">
						{{selectValueD>9||!selectValueD?selectValueD:'0'+selectValueD}}日
					</div>
				</div>
				<div class="flex color_d9383f sxx-calendar2-ok-cancel">
					<div class="sxx-calendar2-cancel" @touchend="close('cancel')">取 消</div>
					<div class="sxx-calendar2-ok" @touchend="close('confirm')">确 认</div>
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
						<div class="float-l" :class="day.disabled?'color_999':'color_333'" :style="{marginLeft: !index?dayLeft:'0px'}" v-for="(day, index) in days"
						 @touchend="!day.disabled?getValue('D', day, index):''" v-cloak>
							<span :class="day.selected?'sxx-calendar2-day-selected':''">{{day.text}}</span>
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
  		thisY: new Date().getFullYear(), //今年的年份,[type:Number]
  		thisM: new Date().getMonth()+1, //当前月份,[type:Number]
  		thisD: new Date().getDate(), //当前日子,[type:Number]
  		listY: [], //年可选列表，数组每一位是String类型
  		listM: [], //月可选列表，数组每一位是String类型
  		days: [], //一个月的每一天，数组每一位都是个对象，对象中的天(text)是Number类型
  		dayLeft: '0px', //日期的margin-left值
  		selectValueY: '', //选中的年,[type:String]
  		selectValueM: '', //选中的月,[type:String]
  		selectValueD: '', //选中的日,[type:Number]
  		selectValueDWeek: '', //选中的日期的星期数,[type:Number]
  		dateThis: 'D', //判断当前在选择的是年月||日，'YM'代表年月，'D'代表日
  		startY: '', //开始可选年,[type:Number]
  		startM: '', //开始可选月,[type:Number]
  		startD: '', //开始可选日,[type:Number]
  		endY: '', //结束可选年,[type:Number]
  		endM: '', //结束可选月,[type:Number]
  		endD: '', //结束可选日,[type:Number]
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
  		this.resetDatetime();
  	}
  },
  created () {
  	this.showStatus = this.visibility;
  	this.resetDatetime();
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
  	getValue (type, val, index) {
  		switch (type) {
  			case 'Y': 
  				this.selectValueY = val;
  				let listM = this.updateMonths(Number(val), this.startY, this.endY, this.startM, this.endM);
  				this.listM = listM;
  				let selectValueM = listM[0];
  				this.selectValueM = selectValueM;
  				let daysY = this.computedDays(Number(val), Number(selectValueM), this.startY, this.endY, this.startM, this.endM, this.startD, this.endD);
  				let day1Y = daysY[0];
		  		daysY.splice(0, 1, {
		  			text: day1Y.text,
	  				disabled: day1Y.disabled,
	  				week: day1Y.week,
	  				selected: day1Y.disabled?false:true
		  		});
		  		this.days = daysY;
  				this.selectValueD = day1Y.disabled?'':1;
		  		break;
		  	case 'M': 
		  		this.selectValueM = val;
		  		let daysM = this.computedDays(Number(this.selectValueY), Number(val), this.startY, this.endY, this.startM, this.endM, this.startD, this.endD);
		  		let day1M = daysM[0];
		  		daysM.splice(0, 1, {
		  			text: day1M.text,
	  				disabled: day1M.disabled,
	  				week: day1M.week,
	  				selected: true
		  		});
		  		this.days = daysM;
		  		this.selectValueD = 1;
		  		break;
		  	case 'D':
		  		this.selectValueD = val.text;
		  		this.selectValueDWeek = val.week;
		  		this.days = this.days.map((item, item_i) => {
		  			let obj = item;
		  			if(index !== item_i){
			  			obj.selected = false;
		  			}else{
		  				obj.selected = true;
		  			}
		  			return obj;
		  		});
		  		break;
  		}
  	},
  	resetDatetime () {
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
				console.log('Error:传入组件Calendar的startDate，格式不正确！');
				return;
		  	}
	  		let endDateArr = endDate.split('-');
		  	if(endDateArr.length===3){
		  		self.endY = endY = Number(endDateArr[0]);
		  		self.endM = endM = Number(endDateArr[1]);
		  		self.endD = endD = Number(endDateArr[2]);
		  	}else{
		  		console.log('Error:传入组件Calendar的endDate，格式不正确！');
		  		return;
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
				self.selectValueM = selectValueM = Number(defaultDateArr[1])>9?String(Number(defaultDateArr[1])):'0'+Number(defaultDateArr[1]);
				self.selectValueD = selectValueD = Number(defaultDateArr[2]);
			}else{
				console.log('Error:传入组件Calendar的defaultDate，格式不正确！');
				return;
			}
		}else{
			self.selectValueY = selectValueY = String(self.thisY);
			self.selectValueM = selectValueM = self.thisM>9?String(self.thisM):'0'+self.thisM;
			self.selectValueD = selectValueD = self.thisD>9?self.thisD:self.thisD;
		}
		let listY = [], listM = [], days = [];
		for(let i=startY; i<=endY; i++){
			listY.push(String(i));
		}
		self.listY = listY;
		let selectValueYStatus = listY.some((item, item_i) => {
			return Number(item) === Number(selectValueY);
		});
		if(selectValueYStatus){
			listM = self.updateMonths(selectValueY, startY, endY, startM, endM);
		}else{
			listM = ['01','02','03','04','05','06','07','08','09','10','11','12'];
		}
		self.listM = listM;
		let selectValueMStatus = listM.some((item, item_i) => {
			return Number(item) === Number(selectValueM);
		});
		if(selectValueMStatus){
			//生成默认月的每一天（即days）
			days = self.computedDays(Number(selectValueY), Number(selectValueM), startY, endY, startM, endM, startD, endD);
			let selectDay = days[selectValueD-1];
			if(selectDay){
				if(!selectDay.disabled){
					days.splice(selectValueD-1, 1, {
						text: selectDay.text,
		  				disabled: selectDay.disabled,
		  				week: selectDay.week,
		  				selected: true
					});
					self.selectValueDWeek = selectDay.week;
				}
			}
		}else{
			console.log('Error:传入组件Calendar的defaultDate不在startDate和endDate之间！');
			return;
		}
		self.days = days;
  	},
  	//计算可选月份列表
  	updateMonths (selectValueY, startY, endY, startM, endM) {
  		let listM = [];
  		if(startY===endY){
			if(startM === endM){
				listM.push(startM>9?String(startM):'0'+startM);
			}else if(startM<endM){
				for(let i=startM; i<=endM; i++){
					listM.push(i>9?String(i):'0'+i);
				}
			}else{
				console.log('Error:传入组件Calendar的startDate不能大于endDate！');
				return;
			}
		}else if(startY<endY){
			if(Number(selectValueY)===startY){
				for(let i=startM; i<=12; i++){
					listM.push(i>9?String(i):'0'+i);
				}
			}else if(Number(selectValueY)===endY){
				for(let i=1; i<=endY; i++){
					listM.push(i>9?String(i):'0'+i);
				}
			}else{
				listM = ['01','02','03','04','05','06','07','08','09','10','11','12'];
			}
		}else{
			console.log('Error:传入组件Calendar的startDate不能大于endDate！');
			return [];
		}
		return listM;
  	},
  	//计算Y年M月的每一天的数据，参数类型:Number
  	computedDays (Y, M, startY, endY, startM, endM, startD, endD) {
  		let day = [];
  		let totalDay = this.getDays(Y, M);
  		for(let i=1; i<=totalDay; i++){
  			let disabledStatus = false;
  			let week = this.computedWeek(Y, M, i);
  			if(i===1){
  				this.dayLeft = (week*1.02)+'rem';
  			}
  			if(this.weekendDisabled&&(week==0||week==6)){
  				disabledStatus = true;
  			}else{
  				if(Y===startY&&M===startM){
  					if(i<startD){
  						disabledStatus = true;
  					}
  				}
  				if(Y===endY&&M===endM){
  					if(i>endD){
  						disabledStatus = true;
  					}
  				}
  			}
  			day.push({
  				text: i,
  				disabled: disabledStatus,
  				week: week,
  				selected: false
  			});
  		}
  		return day;
  	},
  	//计算Y年M月D日是周几，参数Y、M、D的类型必须是number类型
  	computedWeek (Y, M, D) {
  		return new Date(Y,M>0?M-1:M,D).getDay();
  	},
  	//判断是否是闰年，参数Y类型:Number
  	isLeapYear (Y) {
  		if(typeof Y !== 'number') return;
  		return ((Y%4==0 && Y%100!=0) || (Y%100==0 && Y%400==0));
  	},
  	//计算某一个月的天数,参数Y和参数M的类型:Number
  	getDays (Y, M) {
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
  					let selectedDate = this.selectValueY+'-'+this.selectValueM+'-'+(this.selectValueD>9?this.selectValueD:'0'+this.selectValueD);
  					this.confirm(selectedDate, this.selectValueDWeek);
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
				.sxx-calendar2-YM-tit, .sxx-calendar2-YM-con{
					width: 100%;
					padding: 0 0.3rem;
					box-sizing: border-box;
				}
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
						> span{
							display: inline-block;
							width: 0.8rem;
							height: 0.8rem;
							margin: 0 auto;
							border-radius: 50%;
							text-align: center;
						}
						> .sxx-calendar2-day-selected{
							background-color: @color_d9383f;
							color: @color_fff;
						}
					}
				}
			}
		}
	}
}
</style>
