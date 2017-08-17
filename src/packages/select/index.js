/**
 * Vue组件：列表选择组件
 * 
 * 作者：屈万东
 * 邮箱：eb1912401521@163.com
 *
 # 组件安装方法：
 *   #1 引入Vue && Select组件
 *     import Vue from 'Vue'
 *     import Select from 'xxx/select'
 *   #2 安装组件
 *     Vue.component(Select.name, Select);
 *

 # 用法：
 ```html 
 <sxx-select></sxx-select>
 ```

 # options说明：
 ```js
 {
     visibility: false, //组件是否可见，默认可见,[type: Boolean]，必填

     title:'', //组件标题，默认为空,动态,[type: String],必填

     list:'' //组件列表数据，动态 [type: Array],最大长度为6,必填

     index:'' //默认选择的列表项,[type:Number]

     confirm: '', // 回调函数，在点击确认之后执行，[type: Function]，必填
                  // 函数接受一个参数，参数是返回的选中数据

     cancel: '' // 回调函数，在点击取消之后执行，[type: Function]，必填
 }
 */

import Select from './src/main.vue';
Select.install = function(Vue, opt={}) {
	Vue.component(Select.name, Select)
}
export default Select;