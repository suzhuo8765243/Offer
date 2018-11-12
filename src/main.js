import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "reset-css";
import "font-awesome/css/font-awesome.min.css";

import { Toast, Dialog } from 'vant'
import 'vant/lib/vant-css/index.css'

Vue.config.productionTip = false;
Vue.use(Toast)
Vue.use(Dialog)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
