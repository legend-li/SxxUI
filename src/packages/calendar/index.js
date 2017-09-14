/**
 * Vue组件：日历组件
 * 
 * 作者：李增
 * 邮箱：634401745@qq.com
 * 
 * 组件安装方法：
 *   #1 引入Vue && Calendar组件
 *     import Vue from 'Vue' 
 *     import Calendar from 'xxx/calendar'
 *   #2 安装组件
 *     Vue.component(Calendar.name, Calendar);
 * 
 * 用法：
 *   <sxx-calendar></sxx-calendar>
 * 
 * options说明：
 * {
 *     visibility: false, //组件是否可见，默认可见,[type: Boolean]，必填
 *     
 *     defaultDate: '', // 组件默认选中日期，默认值为当天日期，[type: String]，可选
 *						// 格式为：yyyy-MM-dd
 *						
 *	   startDate: '', // 组件可选开始日期，默认为十年前的1月1日，[type: String]，可选
 *                    // 格式为：yyyy-MM-dd，注：startDate和endDate是一组配置，同时使用才有效果，否则会报错
 *
 *     endDate: '', // 组件可选结束日期，默认为十年后的12月31日，[type: String]，可选
 *                  // 格式为：yyyy-MM-dd，注：startDate和endDate是一组配置，同时使用才有效果，否则会报错
 *
 *     weekendDisabled: false, // 周六、周日是否可以选择，默认可以选择，可选
 *     
 *	   confirm: '', // 回调函数，在点击确认之后执行，[type: Function]，必填
 *	   				// 函数接收两个参数，第一个参数是返回的选中的日期，日期格式为：yyyy-MM-dd
                    // 第二个参数是返回的选中的日期的星期数，星期数格式为0-6的Number数字，0：周日，1-6分别对应周一至周六
 *
 *	   cancel: '' // 回调函数，在点击取消之后执行，[type: Function]，必填
 * }
 */

import Calendar from './src/main.vue';
Calendar.install = function(Vue, opt={}) {
	Vue.component(Calendar.name, Calendar)
}
export default Calendar;