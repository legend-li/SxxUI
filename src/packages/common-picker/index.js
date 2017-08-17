/**
 * Vue组件：列表滑动选择组件
 * 
 * 作者：屈万东
 * 邮箱：eb1912401521@163.com
 * 
 * # 组件安装方法：
 *   #1 引入Vue && CommonPicker 组件
 *     import Vue from 'Vue'
 *     import CommonPicker from 'xxx/common-picker'
 *   #2 安装组件
 *     Vue.component(CommonPicker.name, CommonPicker);
 *

 # 用法：
 ```html 
 <sxx-common-picker></sxx-common-picker>
 ```

 # options说明：
 ```js
 {
     visibility: false, //组件是否可见，默认可见,[type: Boolean]，必填

     lists:[] //数组，弹框中的列表,[type:Array],必填,

     index:'' //默认选中的列表项,[type:Number],可选

     confirm: '', // 回调函数，在点击确认之后执行，[type: Function]，必填
                  // 函数接受一个参数，参数是返回的选中的数据

     cancel: '' // 回调函数，在点击取消之后执行，[type: Function]，必填
 }
 */

import CommonPicker from './src/main.vue';
CommonPicker.install = function(Vue, opt={}) {
	Vue.component(CommonPicker.name, CommonPicker)
}
export default CommonPicker;