import { createApp } from 'vue'
import App from './App.vue'
import { router } from './plugins/router'
import { api } from './plugins/api'
import { scope } from './plugins/scope'
import { auth } from './plugins/auth'

createApp(App).use(router).use(api).use(scope).use(auth).mount('#app')
