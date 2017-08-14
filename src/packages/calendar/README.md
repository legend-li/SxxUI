
# 组件安装方法：
 *   #1 引入Vue && Calendar组件
 *     import Vue from 'Vue' 
 *     import Calendar from 'xxx/calendar'
 *   #2 安装组件
 *     Vue.component(Calendar.name, Calendar);
 *
 
# 用法：
 ```html  
 <sxx-calendar></sxx-calendar>
 ```
 
# options说明：
 ```js
   {
       visibility: false, //组件是否可见，默认可见,[type: Boolean]，必填
   	   
       defaultDate: '', // 组件默认选中日期，默认值为当天日期，[type: String]，可选
                        // 格式为：yyyy-MM-dd

       startDate: '', // 组件可选开始日期，默认为十年前的1月1日，[type: String]，可选
                      // 格式为：yyyy-MM-dd

       endDate: '', // 组件可选结束日期，默认为十年后的12月31日，[type: String]，可选
                    // 格式为：yyyy-MM-dd

       weekendDisabled: false, // 周六、周日是否可以选择，默认可以选择，可选

       confirm: '', // 回调函数，在点击确认之后执行，[type: Function]，必填
                    // 函数接受一个参数，参数是返回的选中的日期，返回日期格式为：yyyy-MM-dd
                    
       cancel: '' // 回调函数，在点击取消之后执行，[type: Function]，必填
   }
 ```
