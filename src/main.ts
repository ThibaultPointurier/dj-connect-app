import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import { setupAxios } from './config/api'

// Configuration d'Axios
setupAxios(axios)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialisation du store d'authentification
import { useAuthStore } from './stores/auth_store'
const authStore = useAuthStore(pinia)
authStore.initializeAxiosToken()

app.mount('#app')
