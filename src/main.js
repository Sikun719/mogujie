import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import netClient from "./network/index";
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$netClient = netClient;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

