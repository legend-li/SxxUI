/**
 * Vue组件：加载更多/加载最新组件
 * 
 * 作者：李增
 * 邮箱：634401745@qq.com
 * 
 * 组件安装方法：
 *   #1 引入Vue && LoadMore组件
 *     import Vue from 'Vue' 
 *     import LoadMore from 'xxx/load-more'
 *   #2 安装组件
 *     Vue.component(LoadMore.name, LoadMore);
 * 
 * 用法：
 *   <sxx-load-more>
 *       <ul>
 *           <li></li>
 *       </ul>
 *       <div></div>
 *   </sxx-load-more>
 * 
 * options说明：
 * {
 *     
 *     width: '', //LoadMore组件的宽度，[type: String,css的width属性的设置方法，支持所有width的css单位]
 *     
 *     height: '', //LoadMore组件的高度，[type: String,css的height属性的设置方法，支持所有height的css单位]
 * 
 *     topLoadStatus: false, //下拉刷新配置。为true的时候，表示打开下拉刷新功能；为false的时候，表示关闭下拉刷新功能；默认关闭下拉刷新功能，[type: Boolean]。
 *     
 *     bottomLoadStatus: false, //上拉加载更多配置。为true的时候，表示打开上拉加载更多功能；为false的时候，表示关闭上拉加载更多功能；默认关闭上拉加载更多功能，[type: Boolean]。
 *
 *     topLoading: '', // 在下拉触发刷新的时候，执行的函数钩子，[type: Function]。
 *                     // 函数接收一个参数，参数为一个函数，参数函数功能是关闭下拉刷新的loading状态，在topLoading函数内部需要关闭loading状态的时候执行参数函数
 *
 *     bottomLoading: '', // 在上拉触发加载更多的时候，执行的函数钩子，[type: Function]。
 *                        // 函数接收一个参数，参数为一个函数，参数函数功能是关闭上拉加载更多的loading状态，在bottomLoading函数内部需要关闭loading状态的时候执行参数函数
 *                        
 * }
 */

import LoadMore from './src/main.vue';
LoadMore.install = function(Vue, opt={}) {
	Vue.component(LoadMore.name, LoadMore)
}
export default LoadMore;