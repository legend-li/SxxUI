
# 组件安装方法：
 *   #1 引入Vue && Select组件
 *     import Vue from 'Vue' 
 *     import Select from 'xxx/select'
 *   #2 安装组件
 *     Vue.component(Select.name, Select);
 *
 
# 用法：
 ```html
 <sxx-select v-model="value" title="性别" list="['男','女']"></sxx-select>
 ```
 ```js
 this.$refs.select.open()
 ```
 
# options说明：
 ```js
   {
     title:'', //组件标题，默认为空,动态,[type: String],必填

     list:[] //组件列表数据，动态 [type: Array],最大长度为6,必填

     value:'' //选中的列表项,可以用v-model来双向绑定数值，[type:Number||String]，可选

     confirm: '', // 回调函数，在点击确认之后执行，[type: Function]，可选
                  // 函数接受一个参数，参数是返回的选中数据

     cancel: '' // 回调函数，在点击取消之后执行，[type: Function]，可选
   }
 ```
# methods说明：
 ```js
   {
	 open: fn, // 打开组件的方法，
               // 用法：<sxx-select ref="select"></sxx-select>
               //       this.$refs.select.open()
     close: fn, // 关闭组件的方法，
                // 用法：<sxx-select ref="select"></sxx-select>
                //       this.$refs.select.close()
   }
 ```