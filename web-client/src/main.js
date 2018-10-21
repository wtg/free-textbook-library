// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Meta from 'vue-meta'
import App from '@/App'
import router from '@/routers'
import store from '@/store'

// vue-meta
// supports `meta` object returned with `module.defaults`
Vue.use(Meta)

// bootstrap-vue
// Bootstrap components and directives
Vue.use(BootstrapVue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router: router,
  template: '<App/>',
  components: { App }
})
