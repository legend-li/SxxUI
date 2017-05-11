import Vue from 'vue'
import App from './App.vue'
import pageAuto from './pageAuto'
import DatetimePicker from './packages/datetime-picker'
import Picker from './packages/picker'
import LoadMore from './packages/load-more'
import Message from './packages/message'

pageAuto();	//修改页面根元素font-size大小，以适应不同屏幕大小移动设备

Vue.use(Picker);
Vue.use(DatetimePicker);
Vue.use(LoadMore);
Vue.use(Message);

new Vue({
  el: '#app',
  render: h => h(App),
  mounted () {
  	this.$message('提示')
  }
})
