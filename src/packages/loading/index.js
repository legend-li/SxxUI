/**
 * Vue组件：loading动画组件
 * 
 * 作者：李增
 * 邮箱：634401745@qq.com
 * 
 * 组件安装方法：
 *   #1 引入Vue && loading组件
 *     import Vue from 'Vue' 
 *     import Loading from 'xxx/loading'
 *   #2 安装组件
 *     Vue.component(Loading.name, Loading);
 * 
 * 用法：
 *   <sxx-loading></sxx-loading>
 * 
 * options说明：
 * {
 *     visible: false, // loading动画是否可见，默认为false，[type: Boolean][必填项]
 * }
 */

import Loading from './src/main.vue';
Loading.install = function(Vue, opt={}) {
	Vue.component(Loading.name, Loading)
}
export default Loading;