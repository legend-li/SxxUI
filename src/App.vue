<template>
  <div id="app">
  	<button style="border: 2px solid #ccc; padding: 5px;margin: 5px; border-radius: 4px;" @click="openDatetime">打开timedate组件</button>
  	<button style="border: 2px solid #ccc; padding: 5px;margin: 5px; border-radius: 4px;" @click="openCommonPicker">打开common-picker组件</button>
  	<button style="border: 2px solid #ccc; padding: 5px;margin: 5px; border-radius: 4px;" @click="openSelect">打开select组件</button>
  	
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
  	<sxx-picker :list="list" :value="2014" :onChange="getValue"></sxx-picker>
  	
  	<sxx-load-more :topLoading="topLoading" :bottomLoading="bottomLoading" :topLoadStatus="true" :bottomLoadStatus="true" :width="'100%'" :height="'10rem'">
  		<div style="font-size: 18px;text-align: center;" v-for="item in 50" v-text="item"></div>
  	</sxx-load-more>
  	-->
  	<sxx-common-picker ref="commonPicker" :list="commonList" v-model="selectCommon" :confirm="getCommonPicker"></sxx-common-picker>
  	<sxx-select ref="select" v-model="selected" title="性别" :list="selectOptions"></sxx-select>
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
  		defaultDate: '2017-08-14',
  		selectCommon: '',
  		commonList: ['江苏','湖南','湖北','广西','浙江','福建','湖南','河南'],
  		selected: '女',
  		selectOptions: ['男','女'],
  	}
  },
  watch: {
  	datetime (val) {
  		console.log('datetime:', val)
  	},
  	selectCommon (val) {
  		console.log('commonpicker:', val);
  	},
  	selected (val) {
  		console.log('selected:', val)
  	}
  },
  methods: {
  	topLoading (closeLoading) {
  		setTimeout(() => {
  			console.log('closeLoading。。。');
  			closeLoading();
  		}, 500)
  	},
  	bottomLoading (closeLoading) {
  		console.log('bottom loading')
  		setTimeout(function(){
  			console.log('bottom closeLoading。。。');
  			closeLoading();
  		}, 500)
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
  	},
  	openCommonPicker () {
  		this.$refs.commonPicker.open();
  		this.selectCommon = '河南';
  	},
  	getCommonPicker (val) {
  		console.log('commonpicker2:', val);
  	},
  	openSelect () {
  		this.$refs.select.open();
  	}
  },
  mounted () {
  	//this.$refs.datetime.open();
  	//this.openDatetime()
  	//this.openCommonPicker();
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
