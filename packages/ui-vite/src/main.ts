import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory, RouteRecord, RouteRecordRaw } from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'

const routes: RouteRecordRaw[] = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/data-list', component: () => import('./views/DataList.vue') }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

createApp(App).use(router).mount('#app')
