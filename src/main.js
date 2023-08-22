import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/lib/components';
import * as directives from 'vuetify/lib/directives';
// import 'vuetify/dist/vuetify.css';
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
import "@mdi/font/css/materialdesignicons.css";

const app = createApp(App);

// Using vuetify
const vuetify = createVuetify({
  components,
  directives,
  theme: { defaultTheme: 'light' },
});
app.use(vuetify);

// Use router
app.use(router);

// Use vuex (redux)
app.use(store);
app.mount('#app');
