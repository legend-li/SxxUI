
## 组件安装方法：
 *   #1 引入Vue && message组件
 *     import Vue from 'Vue' 
 *     import Message from 'xxx/message'
 *   #2 安装组件
 *     Vue.use(Message);
 * 
 # 全局用法：
    Vue.prototype.$message(option);
  
 # 组件内部用法：
    this.$message(option);
  
 # options说明：
  {
      type: 1, // 消息弹窗类型，
                 0:不带按钮的消息弹窗，并且定时N秒后自动关闭，支持配置定时关闭时间
                 1:带有“确认”按钮的消息弹窗，
                 2:带有“确认”，“取消”按钮的消息弹窗，
                 默认为1，[type:Number]
      title: '', // 消息弹窗标题内容，默认为空字符串，[type: String]
      content: '', // 弹窗正文内容，默认为空字符串，[type: String]
      transitionTime: 0.3, // 打开/关闭弹窗过渡时间，默认是0.3s，[type: Number, 单位:s]
      autoOffTime: 0.3, //自动关闭消息时间，默认是0.3s，[type: Number, 单位:s]
      callback: '' // 回调函数，在弹窗确认按钮点击之后执行，[type: Function]
  }
 
## 说明：
- 组件布局基于rem，根（html）font-size为100px，UI设计稿宽度为750px，下面给出一段页面rem自适应js代码方案：
#### //pageAuto.js:
```js
/**
 * js控制rem根大小， 实现页面自适应---------------------------------李增
 * 634401745@qq.com
 * 2015/10/8
 */
export default function() {
    var de = document.documentElement,cw = de.clientWidth;
    if (!cw) return;
    const ratio = window.sxxApi.ratio = cw / 750;
    // if (!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)) cw = 450;
    de.style.fontSize = 100 * ratio + 'px';
    cw = de = null;
}
/******************************************************************************************/
```
#### //用法：
```js
import pageAuto from './xxx/xxx/pageAuto'
pageAuto();	//修改页面根元素font-size大小，以适应不同屏幕大小移动设备
```
