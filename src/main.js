import Vue from "vue";
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import App from "./App.vue";
import store from "./store";


Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
