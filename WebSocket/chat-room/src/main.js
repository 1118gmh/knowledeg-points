import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";

Vue.config.productionTip = false

// Vue.use(
//   new VueSocketIO({
//     debug: false,
//     connection: SocketIO(),
//     vuex: {
//       store,
//       actionPrefix: "SOCKET_", //为vuex设置的两个前缀
//       mutationPrefix: "SOCKET_",
//     },
//   })
// );
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('ws://127.0.0.1:8888'),
  // vuex: {
  //     store,
  //     actionPrefix: 'SOCKET_',
  //     mutationPrefix: 'SOCKET_'
  // },
  // options: { path: "/my-app/" } //Optional options
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
