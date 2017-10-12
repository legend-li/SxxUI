<template>
  <div id="app">
  	<!--
  	<h1 style="font-size: 14px;">selectValue: {{selectValue}}</h1>
  	-->
  	<!--
  	<sxx-calendar :visibility="visibility" :defaultDate="defaultDate" :startDate="startDate" :endDate="endDate" :weekendDisabled="true" :cancel="cancel" :confirm="confirm"></sxx-calendar>
  	-->
  	
  	<sxx-datetime-picker ref="datetime" :type="'datetime'" v-model="datetime" :startDate="startDate" :endDate="endDate" :startHour="startHour" :endHour="endHour"
  	 :cancel="cancel" :confirm="confirm"></sxx-datetime-picker>
  	<!-- 
  	<sxx-loading :visible="loading"></sxx-loading>
  	-->
  	<!--
  	<sxx-picker :list="list" :defaultValue="00" :onChange="getValue"></sxx-picker>
  	
  	<sxx-load-more :topLoading="topLoading" :bottomLoading="bottomLoading" :topLoadStatus="true" :bottomLoadStatus="true" :width="'100%'" :height="'10rem'">
  		<div style="font-size: 18px;text-align: center;" v-for="item in 50" v-text="item"></div>
  	</sxx-load-more>
  	-->
  	<div @click="openDatetime">打开timedate组件</div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
  	return {
  		loading: true,
  		list: [2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035],
  		selectValue: '2016',
  		visibility: true,
  		datetime: '2017-01-01 06:01',
  		//datetime: '2000-02-03',
  		startDate: '2000-02-02',
  		endDate: '2022-12-03',
  		startHour: 6,
  		endHour: 18,
  		defaultDate: '2017-08-14'
  	}
  },
  watch: {
  	datetime (val) {
  		console.log('datetime:', val)
  	}
  },
  methods: {
  	topLoading (closeLoading) {
  		setTimeout(() => {
  			console.log('closeLoading。。。');
  			closeLoading();
  		}, 1000)
  	},
  	bottomLoading (closeLoading) {
  		console.log('bottom loading')
  		setTimeout(function(){
  			console.log('bottom closeLoading。。。');
  			closeLoading();
  		}, 5000)
  	},
  	cancel () {
  		this.visibility = false;
  		console.log('datetime组件已关闭！');
  	},
  	confirm (val) {
  		this.visibility = false;
  		console.log('datetime组件已关闭！');
  		console.log('选中的值为：', val);
  	},
  	getValue (val) {
  		this.selectValue = val;
  	},
  	openDatetime () {
  		this.datetime = '2016-01-01 07:02'
  		this.$refs.datetime.open();
  	}
  },
  mounted () {
  	//this.$refs.datetime.open();
  	this.openDatetime()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
