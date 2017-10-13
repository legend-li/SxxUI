import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import pageAuto from './pageAuto'
import DatetimePicker from './packages/datetime-picker'
import Picker from './packages/picker'
import LoadMore from './packages/load-more'
import Message from './packages/message'
import Calendar from './packages/calendar'
import Loading from './packages/loading'
import CommonPicker from './packages/common-picker'
import Select from './packages/select'

pageAuto();	//修改页面根元素font-size大小，以适应不同屏幕大小移动设备

Vue.use(Picker);
Vue.use(DatetimePicker);
Vue.use(LoadMore);
Vue.use(Message);
Vue.use(Calendar);
Vue.use(Loading);
Vue.use(CommonPicker);
Vue.use(Select);


new Vue({
  el: '#app',
  render: h => h(App),
  mounted () {
//  	this.$message('提示')
  }
})
