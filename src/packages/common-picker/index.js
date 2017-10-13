/**
 * Vue组件：列表滑动选择组件
 * 
 * 作者：屈万东、李增
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
 <sxx-common-picker ref="commonPicker" v-model="value" :list="options"></sxx-common-picker>
 ```
 ```js
 this.$refs.commonPicker.open();
 ```

 # options说明：
 ```js
 {
     list:[], //可选数据列表,[type:Array],必填,

     value:'', //默认选中的列表项,可以用v-model来双向绑定数值, [type:Number||String],可选

     confirm: fn, // 回调函数，在点击确认之后执行，[type: Function]，可选
                  // 函数接受一个参数，参数是返回的选中的数据

     cancel: fn, // 回调函数，在点击取消之后执行，[type: Function]，可选
 }
 ```
 # methods说明：
 ```js
 {
	 open: fn, // 打开组件的方法，
               // 用法：<sxx-common-picker ref="commonPicker"></sxx-common-picker>
               //       this.$refs.commonPicker.open()
     close: fn, // 关闭组件的方法，
                // 用法：<sxx-common-picker ref="commonPicker"></sxx-common-picker>
                //       this.$refs.commonPicker.close()
 }
 ```
 */

import CommonPicker from './src/main.vue';
CommonPicker.install = function(Vue, opt={}) {
	Vue.component(CommonPicker.name, CommonPicker)
}
export default CommonPicker;