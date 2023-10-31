import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './axios'
import './assets/css/tailwind.css'
import CanvasJSChart from '@canvasjs/vue-charts';


createApp(App).use(store).use(CanvasJSChart).use(router).mount('#app')
