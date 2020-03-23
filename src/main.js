import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import "./base/rem";
import VueLazyload from "vue-lazyload";
import Toast from "./components/common/Toast.js";
import promise from "es6-promise";
import Img from "./assets/imgLoading.svg";
promise.polyfill();
Vue.use(Toast);
Vue.use(VueLazyload, {
  loading: Img
});
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
});
