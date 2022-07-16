/**
 * 注册 SFC 导入方式
 */

import api from "/js/utils/api.js"
window.$api = api;
// 导入 Api 模块

const options = {
  moduleCache: {
    vue: Vue,
    less: window.less
  },
  async getFile(url) {
    const res = await fetch(url);
    if ( !res.ok )
      throw Object.assign(new Error(res.statusText + ' ' + url), { res });
    return {
      getContentData: asBinary => asBinary ? res.arrayBuffer() : res.text(),
    }
  },
  async addStyle(textContent) {
    const style = Object.assign(document.createElement('style'), { textContent });
    const ref = document.head.getElementsByTagName('style')[0] || null;
    document.head.insertBefore(style, ref);
  },
}
const { loadModule } = window['vue3-sfc-loader'];

window.i = function (module){
  return Vue.defineAsyncComponent( () => loadModule("/js/"+module, options))
};

const app = Vue.createApp({
  components: {
    'Main': i('main.vue'),
  },
  template: '<Main></Main>'
});

app.mount('#app');
