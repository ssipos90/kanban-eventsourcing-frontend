import Vue from 'vue';

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VCard,
  VForm,
  VTextField,
  VSelect,
  VCheckbox,
  VProgressCircular,
  VSnackbar,
  transitions
} from 'vuetify';

import 'vuetify/src/stylus/app.styl';

import App from './App';
import router from './router';
import store from './store';

store.dispatch('loginFromStorage').catch(e => {
  console.log(e.message);
});

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VCard,
    VForm,
    VTextField,
    VSelect,
    VCheckbox,
    VProgressCircular,
    VSnackbar,
    transitions
  }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
