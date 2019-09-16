import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "./registerServiceWorker";
import ElementUI from "element-ui";
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import "element-ui/lib/theme-chalk/index.css";
import './permission'
import moment from 'moment'//导入文件
Vue.prototype.$moment = moment;//赋值使用

Vue.use(mavonEditor)
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
