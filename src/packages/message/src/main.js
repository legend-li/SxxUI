import Vue from 'vue';
let MessageConstructor = Vue.extend(require('./main.vue'));

let instance;
let ZIndex = 100;

var Message = function(options) {
  if (Vue.prototype.$isServer) return;
  options = options || {};
  if (typeof options === 'string') {
    options = {
      content: options
    };
  }

  instance = new MessageConstructor({
    data: options
  });
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.dom = instance.vm.$el;
  instance.dom.style.zIndex = ZIndex;
  ZIndex = ZIndex+1;
  return instance.vm;
};

export default Message;