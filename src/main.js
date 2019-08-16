import Vue from "vue";
import App from "./App.vue";
import store from "./store/store";
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'highlight.js/styles/xcode.css'
// use
Vue.use(mavonEditor)



Vue.use(ElementUI);

Vue.use(VueQuillEditor)

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
