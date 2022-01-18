import { createApp } from 'vue'
import App from './App.vue'
import { router } from './plugins/router'
import { api } from './plugins/api'
import { scope } from './plugins/scope'

createApp(App).use(router).use(api).use(scope).mount('#app')
