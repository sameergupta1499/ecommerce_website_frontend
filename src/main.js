import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

const app =  createApp(App)

// use router
app.use(router)
//use vuex redux
app.use(store)
app.mount('#app')