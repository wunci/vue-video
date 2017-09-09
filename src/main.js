// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './base/rem'
import VueLazyload from 'vue-lazyload'

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