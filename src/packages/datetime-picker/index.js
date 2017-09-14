/**
 * Vue组件：日历时间组件
 * 
 * 作者：李增
 * 邮箱：634401745@qq.com
 * 
 * 组件安装方法：
 *   #1 引入Vue && DatetimePicker组件
 *     import Vue from 'Vue' 
 *     import DatetimePicker from 'xxx/datetime-picker'
 *   #2 安装组件
 *     Vue.component(DatetimePicker.name, DatetimePicker);
 * 
 * 用法：
 *   <sxx-datetime-picker></sxx-datetime-picker>
 * 
 * options说明：
 * {
 *     visibility: false, //组件是否可见，默认可见,[type: Boolean]，必填
 *     
 *	   type: '', //组件的类型，可选值：'datetime'、'datetimeHM'、'date'、'dateYM'、'dateMD'、'time'、'timeHM'、'timeMS'、默认值：'datetime'，[type: String]，可选
 *
 *     defaultDatetime: '', // 组件默认选中日期/时间，默认值为当前日期/时间，[type: String]，可选
 *
 *						// 格式为：yyyy-MM-dd HH:mm:ss或yyyy-MM-dd HH:mm或yyyy-MM-dd或HH:mm:ss或yyyy-MM或MM-dd或HH:mm或mm:ss
 *						// 注：格式yyyy-MM-dd HH:mm:ss对应type为datetime，
 *						//     格式yyyy-MM-dd HH:mm对应type为datetimeHM，
 *						//     格式yyyy-MM-dd对应type为date，
 *						//     格式HH:mm:ss对应type为time，
 *						//     格式yyyy-MM对应type为dateYM，
 *						//     格式MM-dd对应type为dateMD，
 *						//     格式HH:mm对应type为timeHM，
 *						//     格式mm:ss对应type为timeMS，
 *
 *     startDate: '', // 日期的最小可选值，默认为十年前的1月1日，[type: String]，可选
 *
 *					  // 格式为：yyyy-MM-dd或yyyy-MM或MM-dd
 *					  // 注：格式yyyy-MM-dd对应type为date||datetime||datetimeHM，
 *					  //     格式yyyy-MM对应type为dateYM，
 *					  //     格式MM-dd对应type为dateMD，
 *					  // startDate和endDate是一组配置，同时配置才有效
 *
 *     endDate: '', // 日期的最大可选值，默认为十年后的 12 月 31 日，[type: String]，可选
 *
 *					// 格式为：yyyy-MM-dd或yyyy-MM或MM-dd
 *					// 注：格式yyyy-MM-dd对应type为date||datetime||datetimeHM，
 *					//     格式yyyy-MM对应type为dateYM，
 *					//     格式MM-dd对应type为dateMD，
 *					// startDate和endDate是一组配置，同时配置才有效
 *
 *	   startHour: '', // 小时的最小可选值，默认为：0，[type: Number]，可选
 *	   
 *	                  // 注：type为'datetime'、'datetimeHM'、'time'、'timeHM'时有效
 *	                  //     startHour和endHour是一组配置，同时配置才有效
 *
 *	   endHour: '', // 小时的最大可选值，默认为：23，[type: Number]，可选
 *	   
 *	                // 注：type为'datetime'、'datetimeHM'、'time'、'timeHM'时有效
 *	                //     startHour和endHour是一组配置，同时配置才有效
 *
 *	   confirm: '', // 回调函数，在点击确认之后执行，[type: Function]，必填
 *	   				// 函数接受一个参数，参数是返回的选中的日期/时间，返回日期/时间格式为：yyyy-MM-dd HH:mm:ss或yyyy-MM-dd或HH:mm:ss或yyyy-MM或MM-dd或HH:mm或mm:ss
 *
 *	   cancel: '' // 回调函数，在点击取消之后执行，[type: Function]，必填
 * }
 */

import DatetimePicker from './src/main.vue';
DatetimePicker.install = function(Vue, opt={}) {
	Vue.component(DatetimePicker.name, DatetimePicker)
}
export default DatetimePicker;