import Vue from "vue";
import App from "./App.vue";
import store from "./store/store";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import "highlight.js/styles/xcode.css";

import echarts from 'echarts'

Vue.prototype.$echarts = echarts 
// use
Vue.use(mavonEditor);

Vue.use(ElementUI);


Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
