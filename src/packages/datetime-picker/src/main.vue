<template>
	<div id="sxx-datetime-picker" class="sxx-calendar" :style="{opacity: opacity}" v-if="showStatus">
		<div class="sxx-calendar-box">
			<div class="sxx-calendar-tit">
				<div @touchend="close('cancel')">取消</div>
				<div @touchend="close('confirm')">确定</div>
			</div>
			<div class="sxx-calendar-con">
				<div class="sxx-calendar-date-tit">
					<div v-if="type==='datetime' || type==='date'">年</div>
					<div v-if="type==='datetime' || type==='date'">月</div>
					<div v-if="type==='datetime' || type==='date'">日</div>
					<div v-if="type==='datetime' || type==='time'">时</div>
					<div v-if="type==='datetime' || type==='time'">分</div>
					<div v-if="type==='datetime' || type==='time'">秒</div>
				</div>
				<div class="sxx-calendar-date-con">
					<div v-if="type==='datetime' || type==='date' || type==='dateYM'">
						<sxx-picker :list="listY" :defaultValue="selectValueY" :onChange="getValue.bind(null, 'Y')"></sxx-picker>
					</div>
					<div v-if="type==='datetime' || type==='date' || type==='dateYM' || type==='dateMD'">
						<sxx-picker :list="listM" :defaultValue="selectValueM" :onChange="getValue.bind(null, 'M')"></sxx-picker>
					</div>
					<div v-if="type==='datetime' || type==='date' || type==='dateMD'">
						<sxx-picker :list="listD" :defaultValue="selectValueD" :onChange="getValue.bind(null, 'D')"></sxx-picker>
					</div>
					<div v-if="type==='datetime' || type==='time' || type==='timeHM'">
						<sxx-picker :list="listH" :defaultValue="selectValueH" :onChange="getValue.bind(null, 'H')"></sxx-picker>
					</div>
					<div v-if="type==='datetime' || type==='time' || type==='timeHM' || type==='timeMS'">
						<sxx-picker :list="listm" :defaultValue="selectValuem" :onChange="getValue.bind(null, 'm')"></sxx-picker>
					</div>
					<div v-if="type==='datetime' || type==='time' || type==='timeMS'">
						<sxx-picker :list="listS" :defaultValue="selectValueS" :onChange="getValue.bind(null, 'S')"></sxx-picker>
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
  name: 'sxx-datetime-picker',
  components: {
  	'sxx-picker': Picker
  },
  props: {
  	visibility: Boolean,
  	type: {
  		type: String,
  		required: true
  	},
  	defaultDatetime: {
      type: String,
      default: ''
    },
  	startDate: {
  		type: String,
  		default: function() {
  			let Y = new Date().getFullYear()-10;
  			return Y+'-01'+'-01';
  		}
  	},
  	endDate: {
  		type: String,
  		default: function() {
  			let Y = new Date().getFullYear()+10;
  			return Y+'-12'+'-31';
  		}
  	},
  	startHour: {
  		type: Number,
  		default: function() {
  			return 0;
  		}
  	},
  	endHour: {
  		type: Number,
  		default: function() {
  			return 23;
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
  		showStatus: true, //组件是否显示
  		thisY: new Date().getFullYear(), //今年的年份
  		thisM: new Date().getMonth()+1, //当前月份
  		thisD: new Date().getDate(), //当前日子
  		thisH: new Date().getHours(), //当前时间:小时
  		thism: new Date().getMinutes(), //当前时间:分钟
  		thisS: new Date().getSeconds(), //当前时间:秒钟
  		listY: [], //年可选列表
  		listM: [], //月可选列表
  		listD: [], //日可选列表
  		listH: [], //小时可选列表
  		listm: [], //分钟可选列表
  		listS: [], //秒可选列表
  		startY: String((new Date().getFullYear())-10),
  		startM: '01',
  		startD: '01',
  		endY: String((new Date().getFullYear())+10),
  		endM: '12',
  		endD: '31',
  		startH: '00',
  		endH: '23',
  		selectDatetime: '', //选中的日期/时间
  		selectValueY: '',
  		selectValueM: '',
  		selectValueD: '',
  		selectValueH: '',
  		selectValuem: '',
  		selectValueS: ''
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
  	defaultDatetime (val) {
  		this.resetDatetime();
  	},
  	selectValueY () {
  		this.updateSelect()
  	},
  	selectValueM () {
  		this.updateSelect()
  	},
  	selectValueD () {
  		this.updateSelect()
  	},
  	selectValueH () {
  		this.updateSelect()
  	},
  	selectValuem () {
  		this.updateSelect()
  	},
  	selectValueS () {
  		this.updateSelect()
  	}
  },
  created () {
  	this.showStatus = this.visibility;
  	this.resetDatetime();
  },
  methods: {
  	$message: Message,
  	resetDatetime () {
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
	  			//self.$message('传入组件DatetimePicker的props：defaultDatetime不在可选范围内！');
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
			  			//self.$message('传入组件DatetimePicker的props：defaultDatetime格式不正确！');
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
  	getValue (type, val) { //选中的日期/时间改变的时候，改变可选日期/时间
  		switch (type) {
  			case 'Y': 
  				this.selectValueY = val;
  				this.selectValueM = '01'
  				this.updateMonths(val);
		  		//console.log('year:', val);
		  		break;
		  	case 'M': 
		  		this.selectValueM = val;
		  		this.selectValueD = '01';
		  		this.updateDays(val);
  				//console.log('month:', val)
		  		break;
		  	case 'D': 
		  		this.selectValueD = val;
		  		//console.log('date:', val);
		  		break;
		  	case 'H': 
		  		this.selectValueH = val;
		  		//console.log('hour:', val);
		  		break;
		  	case 'm': 
		  		this.selectValuem = val;
		  		//console.log('minute:', val);
		  		break;
		  	case 'S': 
		  		this.selectValueS = val;
		  		//console.log('second:', val);
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

<style>
.sxx-calendar{
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
.sxx-calendar-box{
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	background-color: #fff;
}
.sxx-calendar-tit{
	width: 100%;
	border: 1px solid #eaeaea;
}
.sxx-calendar-tit:after{
	display: block;
	content: '';
	clear: both;
}
.sxx-calendar-tit > div{
	float: left;
	width: 50%;
	text-align: center;
	font-size: 0.3rem;
	line-height: 0.8rem;
	color: #d9383f;
}
.sxx-calendar-date-tit{
	display: -webkit-box;
    display: -webkit-flex;
    display: flex;
	width: 100%;
}
.sxx-calendar-date-tit > div{
	-webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    font-size: 0.26rem;
    line-height: 0.6rem;
    color: #d9383f;
    text-align: center;
}
.sxx-calendar-date-con{
	width: 100%;
	display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    overflow: hidden;
}
.sxx-calendar-date-con > div{
	position: relative;
	-webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    height: 4rem;
}
</style>
