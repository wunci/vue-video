// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './base/rem'
import VueLazyload from 'vue-lazyload'
import Toast from './components/common/Toast.js';
import promise from 'es6-promise';

promise.polyfill();
Vue.use(Toast);
Vue.use(VueLazyload, {
  loading: 'http://www.wclimb.site/images/imgLoading.svg'
})
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})