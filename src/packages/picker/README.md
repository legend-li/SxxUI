# picker-component-Vue

# 组件安装方法：
 *   #1 引入Vue && picker组件
 *     import Vue from 'Vue' 
 *     import Picker from 'xxx/picker'
 *   #2 安装组件
 *     Vue.component(Picker.name, Picker);
 * 
# 用法：
```html
 <sxx-picker defaultValue="2017" onChange="getValue" list="listArr"></sxx-picker>
 或
 <sxx-picker v-model="year" list="listArr"></sxx-picker>
```

# options说明：
```js
   {
       defaultValue: '2017', // 默认滚动选中的值，可以用v-model来双向绑定数值 [type: String|Number]

       list: [], // 用来滚动选择的数据串，[type: Array]

       onChange: '', // 在滚动停止的时候，会执行onChange函数，函数接受一个参数，这个参数是返回的当前滚动选中的值，[type: Function]

   }
```
