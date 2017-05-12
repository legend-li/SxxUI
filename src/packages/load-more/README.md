
# 组件安装方法：
 *   #1 引入Vue && DatetimePicker组件
 *     import Vue from 'Vue' 
 *     import LoadMore from 'xxx/load-more'
 *   #2 安装组件
 *     Vue.component(LoadMore.name, LoadMore);
 * 
# 用法：
 *   <sxx-load-more>
 *       <ul>
 *           <li></li>
 *       </ul>
 *       <div></div>
 *   </sxx-load-more>
 * 
# options说明：
   {
  
       topLoadStatus: false, //下拉刷新配置。为true的时候，表示打开下拉刷新功能；为false的时候，表示关闭下拉刷新功能；默认关闭下拉刷新功能，[type: Boolean]。
      
       bottomLoadStatus: false, //上拉加载更多配置。为true的时候，表示打开上拉加载更多功能；为false的时候，表示关闭上拉加载更多功能；默认关闭上拉加载更多功能，[type: Boolean]。
 
       topLoading: '', // 在下拉触发刷新的时候，执行的函数钩子，[type: Function]。
                       // 函数接收一个参数，参数为一个函数，参数函数功能是关闭下拉刷新的loading状态，在topLoading函数内部需要关闭loading状态的时候执行参数函数
 
       bottomLoading: '', // 在上拉触发加载更多的时候，执行的函数钩子，[type: Function]。
                          // 函数接收一个参数，参数为一个函数，参数函数功能是关闭上拉加载更多的loading状态，在bottomLoading函数内部需要关闭loading状态的时候执行参数函数
                         
   }
