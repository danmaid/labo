import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/rooms', component: () => import('./views/Rooms.vue') },
  { path: '/room-timeline', component: () => import('./views/RoomTimeline.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
