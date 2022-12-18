/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)

axios.defaults.baseURL = import.meta.env.VITE_CRUD_REST_API_URL


app
    .use(router)
    .use(VueAxios, axios)
    .mount('#app')
