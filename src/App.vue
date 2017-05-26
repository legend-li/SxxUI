<template>
  <div id="app">
  	<!--
  	<h1 style="font-size: 14px;">selectValue: {{selectValue}}</h1>
  	-->
  	<sxx-datetime-picker :type="'datetime'" :defaultDatetime="defaultDatetime" :startDate="startDate" :endDate="endDate" :startHour="startHour" :endHour="endHour"
  	 :cancel="cancel" :confirm="confirm"></sxx-datetime-picker>
  	<!--
  	<sxx-picker :list="list" :defaultValue="2016" :onChange="getValue"></sxx-picker>
  	
  	<sxx-load-more :topLoading="topLoading" :bottomLoading="bottomLoading" :topLoadStatus="true" :bottomLoadStatus="true" :width="'100%'" :height="'10rem'">
  		<div style="font-size: 18px;text-align: center;" v-for="item in 50" v-text="item"></div>
  	</sxx-load-more>
  	-->
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
  	return {
  		list: [2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035],
  		selectValue: '2016',
  		defaultDatetime: '2000-02-03 09:42:00',
  		//defaultDatetime: '',
  		startDate: '2000-02-02',
  		endDate: '2020-12-31',
  		startHour: 6,
  		endHour: 18
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
  		console.log('datetime组件已关闭！');
  	},
  	confirm (val) {
  		console.log('datetime组件已关闭！');
  		console.log('选中的值为：', val);
  	},
  	getValue (val) {
  		this.selectValue = val;
  	}
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
